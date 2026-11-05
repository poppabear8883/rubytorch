import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { navLinks, CTA } from '../content/nav'
import { Lockup } from './Logo'
import { Arrow } from './Button'

/**
 * Full-screen menu sheet below 1024px: focus trap, Esc to close, scroll lock,
 * focus returns to the trigger (handled by the caller via onClose).
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: (returnFocus: boolean) => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const el = ref.current!
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    const focusables = () =>
      Array.from(el.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter((n) => n.offsetParent !== null)
    focusables()[0]?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose(true)
        return
      }
      if (e.key !== 'Tab') return
      const f = focusables()
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null
  return createPortal(
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[60] flex flex-col bg-surface-raised lg:hidden"
    >
      <div className="flex h-16 items-center justify-between px-5 sm:px-8">
        <a href="#top" onClick={() => onClose(false)} aria-label="RubyTorch, back to top" className="flex">
          <Lockup />
        </a>
        <button
          type="button"
          onClick={() => onClose(true)}
          className="label -mr-2 inline-flex h-11 items-center gap-2 rounded-full px-3 text-ivory"
          aria-label="Close menu"
        >
          Close
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <nav aria-label="Primary" className="flex flex-1 flex-col justify-between px-5 pt-8 pb-10 sm:px-8">
        <ul className="border-t border-blush/15">
          {navLinks.map((l, i) => (
            <li key={l.href} className="border-b border-blush/15">
              <a
                href={l.href}
                onClick={() => onClose(false)}
                className="flex items-baseline gap-5 py-5 font-display text-[2rem] leading-none font-semibold tracking-[-0.03em] text-ivory"
              >
                <span className="label text-blush">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={CTA.talk.href}
          onClick={() => onClose(false)}
          className="mt-10 inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-crimson text-base font-medium text-ivory hover:bg-ruby"
        >
          {CTA.talk.label}
          <Arrow />
        </a>
      </nav>
    </div>,
    document.body,
  )
}
