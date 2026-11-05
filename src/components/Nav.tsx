import { useCallback, useEffect, useRef, useState } from 'react'
import { navLinks, CTA } from '../content/nav'
import { Lockup } from './Logo'
import { Container } from './Container'
import { MobileMenu } from './MobileMenu'

/**
 * Fixed nav, h-16. Transparent over the hero; solid surface + hairline once
 * 80% of the hero has scrolled past.
 */
export function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const hero = document.getElementById('top')
    const update = () => {
      const h = hero?.offsetHeight ?? window.innerHeight
      setSolid(window.scrollY > h * 0.8 - 64)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false)
    if (returnFocus) requestAnimationFrame(() => trigger.current?.focus())
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-blush/15 bg-surface' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <a href="#main" className="sr-only-focusable label absolute top-3 left-3 z-10 rounded-full bg-ivory px-4 py-2 text-graphite">
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" aria-label="RubyTorch, back to top" className="-ml-1 flex rounded-sm p-1">
          <Lockup />
        </a>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[0.9rem] text-blush transition-colors duration-200 hover:text-ivory"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={CTA.talk.href}
            className="hidden h-10 items-center rounded-full bg-crimson px-5 text-[0.9rem] font-medium text-ivory transition-colors hover:bg-ruby sm:inline-flex"
          >
            {CTA.talk.label}
          </a>
          <button
            ref={trigger}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="label -mr-2 inline-flex h-11 items-center gap-2.5 rounded-full px-3 text-ivory lg:hidden"
          >
            Menu
            <svg viewBox="0 0 18 10" className="w-[18px]" aria-hidden="true">
              <path d="M0 1h18M6 9h12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </Container>
      <MobileMenu open={open} onClose={close} />
    </header>
  )
}
