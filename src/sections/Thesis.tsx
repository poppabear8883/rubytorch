import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { thesis } from '../content/copy'
import { Container } from '../components/Container'
import { SectionLabel } from '../components/SectionLabel'
import { Reveal } from '../components/Reveal'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'

const BLUSH = '#E7C7CF'
const IVORY = '#F5F2F0'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const color = useTransform(progress, range, [BLUSH, IVORY])
  return <motion.span style={{ color }}>{children}</motion.span>
}

/**
 * Editorial statement that brightens word by word from Blush (well above AA)
 * to Ivory as it scrolls through. Colour only, never opacity. The animated
 * spans are aria-hidden; screen readers get the plain sentence.
 */
export function Thesis() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.45'] })
  const words = thesis.lines.flatMap((line, li) => line.split(' ').map((w) => ({ w, li })))
  const n = words.length

  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-surface py-28 md:py-40">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionLabel>{thesis.label}</SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <h2
              id="about-title"
              ref={ref}
              className="font-display text-[clamp(2rem,5.2vw,4.5rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-blush"
            >
              <span className="sr-only">{thesis.lines.join(' ')}</span>
              <span aria-hidden="true">
                {thesis.lines.map((_, li) => (
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
            <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-9">
              <Reveal className="md:col-span-5 md:col-start-5">
                <p className="text-lg leading-relaxed text-blush">{thesis.body}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
