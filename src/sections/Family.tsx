import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { family } from '../content/copy'
import { products } from '../content/products'
import { images } from '../content/images'
import { Container } from '../components/Container'
import { SectionLabel } from '../components/SectionLabel'
import { Reveal } from '../components/Reveal'
import { Arrow } from '../components/Button'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'
import type { CSSProperties } from 'react'

const BLUSH = '#E7C7CF'
const IVORY = '#F5F2F0'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const color = useTransform(progress, range, [BLUSH, IVORY])
  return <motion.span style={{ color }}>{children}</motion.span>
}

/**
 * The family band: a statement that brightens word by word (colour only, Blush
 * to Ivory), then three product cards that tint with each product's accents on
 * hover or focus and anchor to the product worlds.
 */
export function Family() {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduced = usePrefersReducedMotion()
  const [bgOk, setBgOk] = useState(true)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.45'] })
  const words = family.lines.flatMap((line, li) => line.split(' ').map((w) => ({ w, li })))
  const n = words.length

  return (
    <section id="about" aria-labelledby="about-title" className="relative isolate overflow-hidden bg-surface py-24 md:py-36">
      {bgOk && (
        <img
          src={images.family.src}
          alt=""
          aria-hidden="true"
          onError={() => setBgOk(false)}
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full w-full object-cover opacity-30 [mask-image:linear-gradient(180deg,#000_0%,transparent_75%)]"
        />
      )}
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionLabel>{family.label}</SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <h2
              id="about-title"
              ref={ref}
              className="font-display text-[clamp(2.25rem,5.6vw,5rem)] leading-[1.02] font-extrabold tracking-[-0.04em] uppercase text-blush"
            >
              <span className="sr-only">{family.lines.join(' ')}</span>
              <span aria-hidden="true">
                {family.lines.map((_, li) => (
                  <span key={li} className="md:block">
                    {words
                      .map((x, i) => ({ ...x, i }))
                      .filter((x) => x.li === li)
                      .map(({ w, i }) => (
                        <span key={i}>
                          {reduced ? (
                            <span className="text-ivory">{w}</span>
                          ) : (
                            <Word progress={scrollYProgress} range={[i / n, Math.min(1, (i + 1.6) / n)]}>
                              {w}
                            </Word>
                          )}{' '}
                        </span>
                      ))}
                  </span>
                ))}
              </span>
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-9">
              <Reveal className="md:col-span-6">
                <span aria-hidden="true" className="mb-6 block h-[3px] w-20 bg-crimson" />
                <p className="text-lg leading-relaxed text-blush">{family.body}</p>
              </Reveal>
            </div>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-4 md:mt-24 md:grid-cols-3">
          {products.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={i * 80} className="h-full">
                <a
                  href={`#${p.id}`}
                  className="family-card group flex h-full min-h-[22rem] flex-col justify-between overflow-hidden p-7 md:p-8"
                  style={{ '--a1': p.accent.a1, '--a2': p.accent.a2 } as CSSProperties}
                >
                  <span aria-hidden="true" className="accent-rule absolute inset-x-0 top-0 h-[3px]" style={{ '--a1': p.accent.a1, '--a2': p.accent.a2, '--a3': p.accent.a3 } as CSSProperties} />
                  <div className="flex items-start justify-between">
                    <img
                      src={p.mark.src}
                      alt=""
                      width={p.mark.w}
                      height={p.mark.h}
                      className="h-16 w-auto transition-transform duration-500 ease-out-expo group-hover:scale-110"
                    />
                    <span className="label text-blush">{p.index}</span>
                  </div>
                  <div className="mt-16">
                    <p className="label" style={{ color: p.accent.text }}>
                      {p.category}
                    </p>
                    <h3 className="mt-3 font-display text-[1.75rem] leading-none font-bold tracking-[-0.03em] text-ivory">{p.name}</h3>
                    <p className="mt-4 leading-relaxed text-blush">{p.headline}</p>
                    <span className="mt-6 inline-flex items-center gap-2.5 text-[0.95rem] font-medium text-ivory">
                      See {p.name}
                      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="label mt-10 flex items-center gap-3 text-blush">
          <span aria-hidden="true" className="h-px w-8 bg-crimson" />
          {family.statement}
        </p>
      </Container>
    </section>
  )
}
