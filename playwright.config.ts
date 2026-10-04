import { defineConfig } from '@playwright/test'

const port = 5173 + Number(process.env.WORKTREE_PORT_OFFSET ?? 0)

export default defineConfig({
  testDir: 'site/tests',
  timeout: 45_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE_URL ?? `http://localhost:${port}`,
    trace: 'off',
  },
  projects: [
    { name: 'w360', use: { viewport: { width: 360, height: 780 } } },
    { name: 'w768', use: { viewport: { width: 768, height: 1024 } } },
    { name: 'w1440', use: { viewport: { width: 1440, height: 900 } } },
  ],
})
