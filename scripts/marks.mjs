#!/usr/bin/env node
// Prepares transparent, trimmed product marks from raw/brand/incoming/ into public/brand/.
// ForceIDE ships on near-black, so its background is keyed out by brightness (colour un-premultiplied).
// Collab AI Pro and Phoenix already have alpha; stray fringe pixels are cleared and the art is trimmed.
// Usage: node scripts/marks.mjs
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const inDir = resolve(root, 'raw/brand/incoming')
const outDir = resolve(root, 'public/brand')

async function prepare(file, out, { key = false, size = 640 } = {}) {
  const { data, info } = await sharp(resolve(inDir, file)).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const px = Buffer.from(data)
  for (let i = 0; i < px.length; i += 4) {
    if (key) {
      const m = Math.max(px[i], px[i + 1], px[i + 2])
      const a = Math.min(1, Math.max(0, (m - 24) / 70))
      px[i + 3] = Math.round(a * 255)
      if (a > 0 && a < 1) for (let c = 0; c < 3; c++) px[i + c] = Math.min(255, Math.round(px[i + c] / a))
    } else if (px[i + 3] < 24) {
      px[i + 3] = 0
    }
  }
  // trim on pixels that are clearly opaque, so stray specks don't widen the box
  let x0 = info.width, y0 = info.height, x1 = 0, y1 = 0
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++)
      if (px[(y * info.width + x) * 4 + 3] > 200) {
        x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y)
      }
  const img = sharp(px, { raw: { width: info.width, height: info.height, channels: 4 } })
  const t = { width: x1 - x0 + 1, height: y1 - y0 + 1 }
  const left = x0
  const top = y0
  await img
    .extract({ left, top, width: t.width, height: t.height })
    .resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(resolve(outDir, out))
  console.log('marks:', out, `${t.width}x${t.height}`)
}

await prepare('forceide-mark.png', 'forceide-mark.png', { key: true })
await prepare('collab-ai-pro-mark.png', 'collab-mark.png')
await prepare('phoenix-mark.png', 'phoenix-mark.png')
