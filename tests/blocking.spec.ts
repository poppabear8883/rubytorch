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

  test('no text is clipped at the right edge (body clips overflow, so scrollWidth alone misses it)', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(300)
    const clipped = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth
      const bad: string[] = []
      const walker = document.createTreeWalker(document.querySelector('main')!.parentElement!, NodeFilter.SHOW_TEXT)
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const text = (n.textContent ?? '').trim()
        const parent = n.parentElement!
        if (!text || parent.closest('.sr-only, script, style, header')) continue
        const range = document.createRange()
        range.selectNodeContents(n)
        for (const r of Array.from(range.getClientRects())) {
          if (r.width && r.right > vw + 1) bad.push(`${parent.tagName} "${text.slice(0, 30)}" right=${Math.round(r.right)}`)
        }
      }
      return bad
    })
    expect(clipped).toEqual([])
  })

  test('nav anchors land below the sticky nav', async ({ page }) => {
    await page.goto('/')
    const desktop = (page.viewportSize()?.width ?? 0) >= 1024
    for (const id of ['about', 'products', 'principles', 'contact']) {
      if (desktop) {
        await page.locator(`header nav[aria-label="Primary"] a[href="#${id}"]`).click()
      } else {
        await page.getByRole('button', { name: 'Menu', exact: true }).click()
        await page.getByRole('dialog').getByRole('list').locator(`a[href="#${id}"]`).click()
      }
      await expectLandsBelowPinned(page, id)
    }
  })

  test('both hero CTAs land below the sticky nav', async ({ page }) => {
    await page.goto('/')
    await page.locator('#top').getByRole('link', { name: 'Explore the products' }).click()
    await expectLandsBelowPinned(page, 'products')
    await page.evaluate(() => window.scrollTo(0, 0))
    await settle(page)
    await page.locator('#top').getByRole('link', { name: 'Book a demo' }).click()
    await expectLandsBelowPinned(page, 'contact')
  })

  test('family cards land each product world below the nav and switcher', async ({ page }) => {
    await page.goto('/')
    for (const id of ['forceide', 'collab-ai-pro', 'phoenix']) {
      await page.locator(`#about a[href="#${id}"]`).click()
      await expectLandsBelowPinned(page, id)
    }
  })

  test('footer links: ForceIDE and Collab AI Pro anchor, Phoenix is external', async ({ page }) => {
    await page.goto('/')
    for (const id of ['forceide', 'collab-ai-pro']) {
      await page.locator(`footer a[href="#${id}"]`).click()
      await expectLandsBelowPinned(page, id)
    }
    const phoenix = page.locator('footer nav[aria-label="Footer products"] a', { hasText: 'Phoenix' })
    await expect(phoenix).toHaveAttribute('href', 'https://phoenixaipro.com')
    await expect(phoenix).toHaveAttribute('target', '_blank')
    await expect(phoenix).toHaveAttribute('rel', /noopener/)
  })

  test('product worlds: name, four features, trust line and the right CTA', async ({ page }) => {
    await page.goto('/')
    const worlds: [string, string, string, string | RegExp][] = [
      ['forceide', 'ForceIDE', 'Book a demo', '#contact'],
      ['collab-ai-pro', 'Collab AI Pro', 'Book a demo', '#contact'],
      ['phoenix', 'Phoenix', 'Visit Phoenix', 'https://phoenixaipro.com'],
    ]
    for (const [id, name, cta, href] of worlds) {
      const world = page.locator(`section#${id}`)
      await expect(world.getByText(name, { exact: true }).first()).toBeAttached()
      await expect(world.locator('h3')).toHaveCount(4)
      await expect(world.getByText('Governed by design')).toBeAttached()
      await expect(world.getByRole('link', { name: cta })).toHaveAttribute('href', href)
    }
    // the four invented products are gone
    const body = (await page.locator('body').innerText()).toLowerCase()
    for (const old of ['cinderlens', 'flintpath', 'brasswire', 'kilnshift']) expect(body).not.toContain(old)
  })

  test('hero video: decorative, muted, plays once, with a working pause control', async ({ page }) => {
    await page.goto('/')
    const video = page.locator('#top video')
    await expect(video).toBeAttached()
    await expect(video.locator('xpath=ancestor::div[@aria-hidden="true"]')).toHaveCount(1)
    expect(await video.evaluate((v: HTMLVideoElement) => v.muted && !v.loop)).toBe(true)
    expect(await video.locator('source').evaluateAll((els) => els.map((e) => e.getAttribute('type')))).toEqual(['video/webm', 'video/mp4'])
    const pause = page.locator('#top').getByRole('button', { name: 'Pause background video' })
    await expect(pause).toBeVisible()
    await pause.click()
    const play = page.locator('#top').getByRole('button', { name: 'Play background video' })
    await expect(play).toBeVisible()
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true)
  })

  test('hero video: plays once, holds the last frame and drops the pause control', async ({ page }) => {
    await page.goto('/')
    const video = page.locator('#top video')
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.ended), { timeout: 15_000 }).toBe(true)
    await expect(page.locator('#top').getByRole('button', { name: /background video/ })).toHaveCount(0)
    await page.waitForTimeout(500)
    expect(await video.evaluate((v: HTMLVideoElement) => v.ended && v.paused && v.currentTime > 7)).toBe(true)
  })

  test('reduced motion: still poster instead of video, no pause control', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 800 } })
    const page = await ctx.newPage()
    await page.goto('/')
    await expect(page.locator('#top video')).toHaveCount(0)
    await expect(page.locator('#top').getByRole('button', { name: /background video/ })).toHaveCount(0)
    await expect(page.locator('#top img').first()).toBeVisible()
    await ctx.close()
  })

  test('Phoenix motif labels stay inside the motif', async ({ page }) => {
    await page.goto('/')
    const motif = page.locator('#phoenix [role="img"]')
    await motif.scrollIntoViewIfNeeded()
    const overflow = await motif.evaluate((el) => {
      const box = el.getBoundingClientRect()
      return Array.from(el.querySelectorAll('p, span'))
        .filter((n) => (n.textContent ?? '').trim() && getComputedStyle(n).display !== 'none' && n.getClientRects().length)
        .filter((n) => { const r = n.getBoundingClientRect(); return r.right > box.right + 1 || r.left < box.left - 1 })
        .map((n) => n.textContent)
    })
    expect(overflow).toEqual([])
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
