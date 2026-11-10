import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { hero } from '../content/copy'
import { CTA, tagline } from '../content/nav'
import { products } from '../content/products'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { HeroMedia } from '../components/HeroMedia'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'

/**
 * Cinematic 100svh hero over a muted looping video (still poster for reduced
 * motion). Copy is visible at first paint: the line reveal is CSS only.
 * Scroll-linked copy fade is layered on with motion.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const [paused, setPaused] = useState(false)
  const [canPause, setCanPause] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const copyY = useTransform(scrollYProgress, [0, 0.55], [0, -40])

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex h-[100svh] max-h-[1080px] min-h-[640px] flex-col overflow-hidden bg-surface"
    >
      <HeroMedia paused={paused} onAvailable={setCanPause} />

      <motion.div className="flex flex-1 flex-col" style={reduced ? undefined : { opacity: copyOpacity, y: copyY }}>
        <Container className="flex flex-1 flex-col justify-end pt-24 pb-8 md:pt-28 lg:pb-14">
          <p className="label rt-rise flex items-center gap-3 text-blush" style={{ animationDelay: '60ms' }}>
            <span aria-hidden="true" className="h-px w-8 bg-crimson" />
            {hero.eyebrow}
          </p>

          <h1 id="hero-title" className="mt-6">
            <span className="sr-only">
              {hero.lead.join(' ')} {hero.support}
            </span>
            <span
              aria-hidden="true"
              className="block font-display text-[clamp(3.5rem,19vw,5.5rem)] leading-[0.92] font-extrabold tracking-[-0.035em] uppercase text-ivory md:hidden"
            >
              {hero.leadMobile.map((l, i) => (
                <span key={l} className="rt-line">
                  <span className={i === hero.leadMobile.length - 1 ? 'text-crimson' : undefined} style={{ animationDelay: `${140 + i * 90}ms` }}>
                    {l}
                  </span>
                </span>
              ))}
            </span>
            <span
              aria-hidden="true"
              className="hidden font-display text-[clamp(4.5rem,9vw,9.5rem)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase text-ivory md:block"
            >
              {hero.lead.map((l, i) => (
                <span key={l} className="rt-line">
                  <span className={i === hero.lead.length - 1 ? 'text-crimson' : undefined} style={{ animationDelay: `${140 + i * 90}ms` }}>
                    {l}
                  </span>
                </span>
              ))}
            </span>
            <span aria-hidden="true" className="mt-6 block h-[3px] w-20 bg-crimson md:mt-8" />
            <span
              aria-hidden="true"
              className="rt-rise mt-6 block max-w-[36ch] font-display text-[1.375rem] leading-[1.2] font-medium tracking-[-0.02em] text-ivory md:text-[clamp(1.5rem,2.4vw,2.25rem)]"
              style={{ animationDelay: '380ms' }}
            >
              {hero.support}
            </span>
          </h1>

          <div className="mt-6 flex flex-col gap-7 md:mt-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="rt-rise max-w-[36rem] text-[1.0625rem] leading-relaxed text-blush md:text-lg" style={{ animationDelay: '460ms' }}>
              {hero.subline}
            </p>
            <div className="rt-rise flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '540ms' }}>
              <Button href={CTA.talk.href} arrow>
                {CTA.talk.label}
              </Button>
              <Button href={CTA.explore.href} variant="secondary">
                {CTA.explore.label}
              </Button>
            </div>
          </div>
        </Container>

        <div className="border-t border-blush/15 bg-surface/70 backdrop-blur-sm">
          <Container className="flex h-14 items-center justify-between gap-4">
            <p className="label hidden text-blush sm:block">{tagline}</p>
            <ul className="hidden items-center gap-6 md:flex" aria-label="Jump to a product">
              {products.map((p) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="inline-flex items-center gap-2 text-sm text-blush transition-colors hover:text-ivory"
                  >
                    <img src={p.mark.src} alt="" width={p.mark.w} height={p.mark.h} className="h-4 w-auto" />
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
            {canPause ? (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="label -mr-2 ml-auto inline-flex h-11 items-center gap-2.5 rounded-full px-3 text-blush transition-colors hover:text-ivory"
              >
                <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true" fill="currentColor">
                  {paused ? <path d="M2 1l9 5-9 5z" /> : <path d="M2 1h3v10H2zM7 1h3v10H7z" />}
                </svg>
                {paused ? 'Play background video' : 'Pause background video'}
              </button>
            ) : (
              <span className="label ml-auto text-blush sm:hidden">{tagline}</span>
            )}
          </Container>
        </div>
      </motion.div>
    </section>
  )
}
