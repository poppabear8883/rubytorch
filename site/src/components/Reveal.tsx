import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react'

/**
 * Fade-and-rise once on entry (600ms, 20px). The hidden state is applied only
 * after mount, so content is visible without JS; reduced motion shows it at once.
 * Never used above the fold or on the hero (plan §5).
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: ElementType
}) {
  const ref = useRef<HTMLElement>(null)
  const [state, setState] = useState<'static' | 'hidden' | 'shown'>('static')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // already on screen at mount: leave it static (no flash)
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight * 0.92 && r.bottom > 0) return
    setState('hidden')
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState('shown')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={state === 'static' ? undefined : { transitionDelay: `${delay}ms` }}
      className={`${state === 'static' ? '' : 'transition-[opacity,translate] duration-[600ms] ease-out-expo'} ${
        state === 'hidden' ? 'translate-y-5 opacity-0' : ''
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
