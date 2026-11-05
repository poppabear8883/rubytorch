import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { images } from '../content/images'
import { hero } from '../content/copy'
import { CTA } from '../content/nav'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Grain } from '../components/Grain'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'

const spec = images.hero

/**
 * Cinematic 100svh hero (capped at 1080px). Everything is visible at first
 * paint: the line reveal and the image settle are pure CSS. Scroll-linked
 * parallax (≤6%) and copy fade are layered on with motion.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '6%'])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const copyY = useTransform(scrollYProgress, [0, 0.55], [0, -40])

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex h-[100svh] max-h-[1080px] min-h-[600px] flex-col overflow-hidden bg-surface"
    >
      {/* image layer */}
      <motion.div className="absolute inset-0 -z-10" style={reduced ? undefined : { y: imgY }}>
        <picture>
          <source media="(max-width: 1023.98px)" srcSet={spec.srcMobile} width={1024} height={1536} />
          <img
            src={spec.src}
            alt={spec.alt}
            width={spec.width}
            height={spec.height}
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            className="rt-settle h-full w-full object-cover object-[62%_100%] lg:object-[68%_50%]"
          />
        </picture>
        {/* tonal scrims: left + bottom on desktop, top + bottom on mobile */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_11_15/0.94)_0%,rgb(11_11_15/0.86)_44%,rgb(11_11_15/0.35)_66%,rgb(11_11_15/0)_80%,rgb(11_11_15/0.5)_100%)] lg:bg-[linear-gradient(90deg,rgb(11_11_15/0.94)_0%,rgb(11_11_15/0.78)_32%,rgb(11_11_15/0.15)_62%,rgb(11_11_15/0)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 hidden h-2/5 bg-[linear-gradient(0deg,rgb(11_11_15/0.95)_0%,rgb(11_11_15/0)_100%)] lg:block" />
        <Grain />
      </motion.div>

      <motion.div
        className="flex flex-1 flex-col"
        style={reduced ? undefined : { opacity: copyOpacity, y: copyY }}
      >
        <Container className="flex flex-1 flex-col pt-28 pb-10 md:pt-32 lg:justify-end lg:pb-20">
          <p className="label rt-rise text-blush" style={{ animationDelay: '60ms' }}>
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(2.6rem,11.4vw,4.25rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-ivory md:mt-8 md:text-[clamp(4rem,7.4vw,7.5rem)] md:leading-[0.94]"
          >
            <span className="sr-only">{hero.lines.join(' ')}</span>
            {hero.linesMobile.map((l, i) => (
              <span key={`m${i}`} aria-hidden="true" className="rt-line md:hidden">
                <span style={{ animationDelay: `${140 + i * 80}ms` }}>
                  {i === hero.linesMobile.length - 1 ? <span className="text-crimson">{l}</span> : l}
                </span>
              </span>
            ))}
            {hero.lines.map((l, i) => (
              <span key={`d${i}`} aria-hidden="true" className="rt-line hidden md:block">
                <span style={{ animationDelay: `${140 + i * 80}ms` }}>
                  {i === hero.lines.length - 1 ? (
                    <>
                      with <span className="text-crimson">intelligence.</span>
                    </>
                  ) : (
                    l
                  )}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-7 flex flex-col gap-8 md:mt-10 lg:flex-row lg:items-end lg:justify-between">
            <p
              className="rt-rise max-w-[34rem] text-[1.0625rem] leading-relaxed text-blush md:text-lg"
              style={{ animationDelay: '380ms' }}
            >
              {hero.subline}
            </p>
            <div className="rt-rise flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '460ms' }}>
              <Button href={CTA.explore.href} arrow>
                {CTA.explore.label}
              </Button>
              <Button href={CTA.talk.href} variant="secondary">
                {CTA.talk.label}
              </Button>
            </div>
          </div>
        </Container>

        <div className="hidden border-t border-blush/15 md:block">
          <Container className="flex h-14 items-center justify-between">
            <p className="label text-blush">Four flagship products · one platform</p>
            <a href="#about" className="label inline-flex items-center gap-3 text-blush transition-colors hover:text-ivory">
              Scroll
              <svg viewBox="0 0 10 16" className="h-4 w-2.5" aria-hidden="true">
                <path d="M5 1v13M1 10l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </a>
          </Container>
        </div>
      </motion.div>
    </section>
  )
}
