// Combine screenshots into one contact sheet: node scripts/sheet.mjs out.png a.png b.png ...
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url.replace('/scripts/', '/site/scripts/'))
const sharp = require('sharp')
const [out, ...files] = process.argv.slice(2)
const metas = await Promise.all(files.map((f) => sharp(f).metadata()))
const scale = Math.min(1, 1800 / metas.reduce((a, m) => a + m.width + 10, 0))
const tiles = await Promise.all(files.map((f, i) => sharp(f).resize(Math.round(metas[i].width * scale)).toBuffer({ resolveWithObject: true })))
const W = tiles.reduce((a, t) => a + t.info.width + 10, 0)
const H = Math.max(...tiles.map((t) => t.info.height))
let x = 0
const comp = tiles.map((t) => { const c = { input: t.data, left: x, top: 0 }; x += t.info.width + 10; return c })
await sharp({ create: { width: W, height: H, channels: 3, background: '#444' } }).composite(comp).png().toFile(out)
console.log(out, W, H)
