// Rough scroll-smoothness check: wheel-scroll through the page and record rAF frame gaps.
import { chromium } from '@playwright/test'
const b = await chromium.launch({ args: ['--disable-gpu-vsync'] })
const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
await p.goto(process.env.BASE_URL ?? 'http://localhost:5173/', { waitUntil: 'networkidle' })
await p.evaluate(() => {
  window.__gaps = []
  let last = performance.now()
  const tick = (t) => { window.__gaps.push(t - last); last = t; requestAnimationFrame(tick) }
  requestAnimationFrame(tick)
})
for (let i = 0; i < 160; i++) { await p.mouse.wheel(0, 70); await p.waitForTimeout(16) }
const g = await p.evaluate(() => window.__gaps.slice(5))
g.sort((a, b) => a - b)
const avg = g.reduce((a, x) => a + x, 0) / g.length
const pct = (q) => g[Math.floor(g.length * q)]
console.log(`frames=${g.length} avg=${avg.toFixed(1)}ms (~${(1000 / avg).toFixed(0)}fps) p95=${pct(0.95).toFixed(1)}ms long(>50ms)=${g.filter((x) => x > 50).length}`)
await b.close()
