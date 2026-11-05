import { test, expect } from '@playwright/test'
import sharp from 'sharp'

// Non-blocking checks (plan §7): reported, fixed if cheap. Each uses expect.soft.

const lum = (r: number, g: number, b: number) => {
  const f = (v: number) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}
const ratio = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)

test.describe('non-blocking', () => {
  test('exactly one h1 and alt text on all images', async ({ page }) => {
    await page.goto('/')
    expect.soft(await page.locator('h1').count()).toBe(1)
    const missing = await page.evaluate(() =>
      Array.from(document.images)
        .filter((i) => !i.hasAttribute('alt'))
        .map((i) => i.src),
    )
    expect.soft(missing).toEqual([])
  })

  test('aria-current moves between products and the index stays pinned', async ({ page }) => {
    await page.goto('/')
    const desktop = (page.viewportSize()?.width ?? 0) >= 1024
    const nav = desktop ? page.locator('aside nav[aria-label="Products"]') : page.locator('section#products > div > nav[aria-label="Products"]')
    const seen: string[] = []
    let pinnedTops: number[] = []
    for (const id of ['cinderlens', 'flintpath', 'brasswire', 'kilnshift']) {
      await page.evaluate((i) => {
        const el = document.getElementById(i)!
        window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - innerHeight * 0.3, behavior: 'instant' as ScrollBehavior })
      }, id)
      await page.waitForTimeout(400)
      const cur = await nav.locator('[aria-current="true"]').getAttribute('href')
      seen.push(cur ?? 'none')
      pinnedTops.push(Math.round(await nav.evaluate((n) => n.getBoundingClientRect().top)))
    }
    expect.soft(seen).toEqual(['#cinderlens', '#flintpath', '#brasswire', '#kilnshift'])
    pinnedTops = Array.from(new Set(pinnedTops.slice(1))) // first band: the index has not reached its pin yet
    expect.soft(pinnedTops.length, `index top positions while scrolling: ${pinnedTops}`).toBe(1)
  })

  test('text over the hero image keeps >= 4.5:1 at its brightest pixel', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(1900) // let the CSS settle finish
    const boxes = await page.evaluate(() => {
      const hero = document.getElementById('top')!
      const pick = (el: Element | null) => {
        if (!el) return null
        const range = document.createRange()
        range.selectNodeContents(el)
        const r = range.getBoundingClientRect() // the text itself, not the full block
        return { x: Math.max(0, r.x), y: Math.max(0, r.y), width: Math.min(r.width, innerWidth - r.x), height: r.height }
      }
      const out = {
        eyebrow: pick(hero.querySelector('p.label')),
        subline: pick(hero.querySelector('p.text-blush:not(.label)')),
      }
      // hide copy so we sample only the image + scrim behind it
      hero.querySelectorAll('h1, p, a').forEach((e) => ((e as HTMLElement).style.visibility = 'hidden'))
      return out
    })
    const blush = lum(0xe7, 0xc7, 0xcf)
    for (const [name, box] of Object.entries(boxes)) {
      if (!box || box.width < 1) continue
      const buf = await page.screenshot({ clip: box })
      const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true })
      let max = 0
      for (let i = 0; i < data.length; i += info.channels) max = Math.max(max, lum(data[i], data[i + 1], data[i + 2]))
      const r = ratio(blush, max)
      test.info().annotations.push({ type: 'contrast', description: `${name}: ${r.toFixed(2)}:1 at brightest pixel` })
      expect.soft(r, `${name} contrast at brightest pixel`).toBeGreaterThanOrEqual(4.5)
    }
  })

  test('@visual hero and first band', async ({ page }) => {
    const w = page.viewportSize()?.width ?? 0
    test.skip(w !== 360 && w !== 1440, 'snapshots at 360 and 1440 only')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.waitForTimeout(500)
    await expect.soft(page).toHaveScreenshot(`hero-${w}.png`, { maxDiffPixelRatio: 0.02 })
    await page.evaluate(() => document.getElementById('cinderlens')!.scrollIntoView({ behavior: 'instant' as ScrollBehavior }))
    await page.waitForTimeout(500)
    await expect.soft(page).toHaveScreenshot(`band-${w}.png`, { maxDiffPixelRatio: 0.02 })
  })
})
