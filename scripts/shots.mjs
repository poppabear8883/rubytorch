// Viewport screenshots at section positions, after real scrolling (so scroll motion runs).
// Usage: node scripts/shots.mjs <width> <height> [selectors...]  -> .shots/<w>-<i>.png
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'
const [w = '1440', h = '900', ...sels] = process.argv.slice(2)
const base = process.env.BASE_URL ?? 'http://localhost:5173'
const reduced = process.env.REDUCED === '1'
mkdirSync('.shots', { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: +w, height: +h }, reducedMotion: reduced ? 'reduce' : 'no-preference' })
await page.goto(base, { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
const targets = sels.length ? sels : ['#top', '#about', '#products', '#cinderlens', '#flintpath', '#approach', '#principles', '#contact', 'footer']
let i = 0
for (const s of targets) {
  const [sel, off = '0'] = s.split('@')
  const y = await page.evaluate(([q, o]) => {
    const el = document.querySelector(q)
    return el ? el.getBoundingClientRect().top + scrollY + Number(o) : 0
  }, [sel, off])
  // scroll in steps so IntersectionObservers and scroll-linked values update
  const cur = await page.evaluate(() => scrollY)
  const steps = 12
  for (let k = 1; k <= steps; k++) {
    await page.evaluate((v) => window.scrollTo(0, v), cur + ((y - cur) * k) / steps)
    await page.waitForTimeout(40)
  }
  await page.waitForTimeout(900)
  const name = `.shots/${w}${reduced ? 'r' : ''}-${String(i++).padStart(2, '0')}-${sel.replace(/[^a-z0-9]/gi, '')}.png`
  await page.screenshot({ path: name })
  console.log(name)
}
await browser.close()
