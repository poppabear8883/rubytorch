import { test, expect } from '@playwright/test'

test('dev server responds', async ({ page }) => {
  const res = await page.goto('/')
  expect(res?.ok()).toBeTruthy()
  await expect(page.locator('#root')).toBeAttached()
})
