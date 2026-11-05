import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const port = 5173 + Number(process.env.WORKTREE_PORT_OFFSET ?? 0)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { host: true, port, strictPort: true, allowedHosts: true },
  preview: { host: true, port: port + 100, allowedHosts: true },
})
