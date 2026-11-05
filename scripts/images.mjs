#!/usr/bin/env node
// Image pipeline (plan §4): raw PNG in raw/ -> graded, QA'd WebP in public/images/.
// Colour QA: the saturated highlights must sit in the ruby band around Crimson
// (#C81E4A, hue ~344°). Orange (> 15°) or magenta (< 320°) fails.
// A gentle hue rotation nudges pure red toward Crimson so every image shares one grade.
// Usage: node scripts/images.mjs [name ...]
import sharp from 'sharp'
import { readdirSync, mkdirSync, statSync } from 'node:fs'
import { resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const rawDir = resolve(root, 'raw')
const outDir = resolve(root, 'public/images')
mkdirSync(outDir, { recursive: true })

const TARGET_HUE = 347 // between Crimson (344°) and pure red; reads as ruby, not orange

function hsv(r, g, b) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  if (d) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  return { h, s: max ? d / max : 0, v: max / 255 }
}

async function stats(input) {
  const { data, info } = await sharp(input).resize(256).raw().toBuffer({ resolveWithObject: true })
  let sx = 0
  let sy = 0
  let n = 0
  let lum = 0
  let orange = 0
  let magenta = 0
  const px = info.width * info.height
  for (let i = 0; i < data.length; i += info.channels) {
    const { h, s, v } = hsv(data[i], data[i + 1], data[i + 2])
    lum += v
    if (s > 0.45 && v > 0.25) {
      const rad = (h * Math.PI) / 180
      sx += Math.cos(rad) * v
      sy += Math.sin(rad) * v
      n++
      if (h > 15 && h < 60) orange++
      if (h > 270 && h < 320) magenta++
    }
  }
  let hue = (Math.atan2(sy, sx) * 180) / Math.PI
  if (hue < 0) hue += 360
  return { hue, saturatedShare: n / px, orangeShare: n ? orange / n : 0, magentaShare: n ? magenta / n : 0, meanLum: lum / px }
}

const hueDist = (a, b) => {
  const d = Math.abs(a - b) % 360
  return d > 180 ? 360 - d : d
}

const only = process.argv.slice(2)
const files = readdirSync(rawDir).filter((f) => f.endsWith('.png') && (!only.length || only.includes(basename(f, '.png'))))
let failed = false
for (const f of files) {
  const name = basename(f, '.png')
  const input = resolve(rawDir, f)
  const before = await stats(input)
  // rotate hue toward target (bounded so we never wreck the grade)
  let rot = 0
  if (before.saturatedShare > 0.002) {
    let d = TARGET_HUE - before.hue
    if (d > 180) d -= 360
    if (d < -180) d += 360
    rot = Math.max(-14, Math.min(14, Math.round(d)))
  }
  const out = resolve(outDir, `${name}.webp`)
  let img = sharp(input)
  if (rot) img = img.modulate({ hue: (rot + 360) % 360 })
  await img.webp({ quality: 82, effort: 6, smartSubsample: true }).toFile(out)
  const after = await stats(out)
  const okHue = after.saturatedShare < 0.002 || hueDist(after.hue, 344) <= 12
  const ok = okHue && after.orangeShare < 0.08 && after.magentaShare < 0.08
  if (!ok) failed = true
  const kb = (statSync(out).size / 1024).toFixed(0)
  console.log(
    `${ok ? 'PASS' : 'FAIL'} ${name.padEnd(18)} hue ${before.hue.toFixed(0)}° -> ${after.hue.toFixed(0)}° (rot ${rot}) ` +
      `sat ${(after.saturatedShare * 100).toFixed(1)}% orange ${(after.orangeShare * 100).toFixed(1)}% magenta ${(after.magentaShare * 100).toFixed(1)}% ` +
      `lum ${after.meanLum.toFixed(3)} ${kb}KB`,
  )
}
if (failed) process.exit(1)
