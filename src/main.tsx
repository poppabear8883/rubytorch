import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/sora'
import '@fontsource-variable/inter'
import './index.css'
import App from './App.tsx'

const isKit = import.meta.env.DEV && (location.pathname === '/__kit' || new URLSearchParams(location.search).has('kit'))

async function boot() {
  const Root = isKit ? (await import('./dev/Kit.tsx')).default : App
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Root />
    </StrictMode>,
  )
}
boot()
