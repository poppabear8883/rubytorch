import { test, expect, type Page } from '@playwright/test'

/** Wait until window.scrollY stops changing (smooth scrolling settles). */
async function settle(page: Page) {
  let last = -1
  for (let i = 0; i < 40; i++) {
    const y = await page.evaluate(() => Math.round(window.scrollY))
    if (y === last) return
    last = y
    await page.waitForTimeout(120)
  }
}

/** Bottom edge of everything pinned at the top: the nav, plus the chip row if pinned. */
async function pinnedBottom(page: Page) {
  return page.evaluate(() => {
    let bottom = document.querySelector('header')!.getBoundingClientRect().bottom
    const chips = document.querySelector('nav[aria-label="Products"]')?.parentElement
    if (chips && getComputedStyle(chips).display !== 'none') {
      const r = chips.getBoundingClientRect()
      if (r.top <= bottom + 1 && r.bottom > 0) bottom = Math.max(bottom, r.bottom)
    }
    return bottom
  })
}

async function expectLandsBelowPinned(page: Page, id: string) {
  await settle(page)
  const top = await page.evaluate((i) => document.getElementById(i)!.getBoundingClientRect().top, id)
  const pinned = await pinnedBottom(page)
  expect(top, `#${id} top (${top}) should be below pinned UI (${pinned})`).toBeGreaterThanOrEqual(pinned - 1)
  expect(top, `#${id} should be near the top of the viewport`).toBeLessThan(260)
}

test.describe('blocking', () => {
  test('no horizontal overflow', async ({ page }) => {
    await page.goto('/')
    for (const y of [0, 0.25, 0.5, 0.75, 1]) {
      await page.evaluate((f) => window.scrollTo(0, document.body.scrollHeight * f), y)
      await page.waitForTimeout(150)
      const { sw, cw } = await page.evaluate(() => ({
        sw: document.documentElement.scrollWidth,
        cw: document.documentElement.clientWidth,
      }))
      expect(sw).toBeLessThanOrEqual(cw)
    }
  })

  test('nav anchors land below the sticky nav', async ({ page }) => {
    await page.goto('/')
    const desktop = (page.viewportSize()?.width ?? 0) >= 1024
    for (const id of ['products', 'approach', 'principles', 'contact']) {
      if (desktop) {
        await page.locator(`header nav[aria-label="Primary"] a[href="#${id}"]`).click()
      } else {
        await page.getByRole('button', { name: 'Menu', exact: true }).click()
        await page.getByRole('dialog').getByRole('list').locator(`a[href="#${id}"]`).click()
      }
      await expectLandsBelowPinned(page, id)
    }
  })

  test('both CTAs land below the sticky nav', async ({ page }) => {
    await page.goto('/')
    await page.locator('#top').getByRole('link', { name: 'Explore our products' }).click()
    await expectLandsBelowPinned(page, 'products')
    await page.evaluate(() => window.scrollTo(0, 0))
    await settle(page)
    await page.locator('#top').getByRole('link', { name: 'Talk to us' }).click()
    await expectLandsBelowPinned(page, 'contact')
  })

  test('product links land below the nav and chip row', async ({ page }) => {
    await page.goto('/')
    for (const id of ['cinderlens', 'flintpath', 'brasswire', 'kilnshift']) {
      await page.locator(`footer a[href="#${id}"]`).click()
      await expectLandsBelowPinned(page, id)
    }
  })

  test('mobile menu: opens, traps focus, Esc closes and returns focus', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) >= 1024, 'menu is for <1024px')
    await page.goto('/')
    const trigger = page.getByRole('button', { name: 'Menu', exact: true })
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await trigger.click()
    const dialog = page.getByRole('dialog', { name: 'Site menu' })
    await expect(dialog).toBeVisible()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    // focus starts inside and stays inside through a full Tab cycle, both directions
    expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true)
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
      expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true)
    }
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Shift+Tab')
      expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true)
    }
    // scroll lock
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe('hidden')
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe('hidden')
  })

  test('reduced motion: all content visible without scrolling into view', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 800 } })
    const page = await ctx.newPage()
    await page.goto('/')
    await page.waitForTimeout(300)
    const hidden = await page.evaluate(() => {
      const bad: string[] = []
      const els = document.querySelectorAll('main *, footer *')
      for (const el of Array.from(els)) {
        const cs = getComputedStyle(el)
        if (parseFloat(cs.opacity) < 1 && !(el as HTMLElement).closest('[aria-hidden="true"]')) {
          // allow intentional design opacity utilities on rules (no text)
          if ((el.textContent ?? '').trim() || el.tagName === 'IMG') bad.push(`${el.tagName}.${el.className} opacity=${cs.opacity}`)
        }
        if (cs.clipPath && cs.clipPath !== 'none' && !el.classList.contains('sr-only')) bad.push(`${el.tagName} clip=${cs.clipPath}`)
        if (cs.transform && cs.transform !== 'none' && cs.transform !== 'matrix(1, 0, 0, 1, 0, 0)') {
          if ((el.textContent ?? '').trim() && el.closest('main')) bad.push(`${el.tagName}.${el.className} transform=${cs.transform}`)
        }
      }
      return bad
    })
    expect(hidden).toEqual([])
    // thesis words are fully Ivory
    const thesisColors = await page.evaluate(() =>
      Array.from(document.querySelectorAll('#about-title [aria-hidden="true"] span'))
        .filter((s) => s.children.length === 0)
        .map((s) => getComputedStyle(s).color),
    )
    expect(new Set(thesisColors)).toEqual(new Set(['rgb(245, 242, 240)']))
    await ctx.close()
  })
})
