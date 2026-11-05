import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { approach } from '../content/copy'
import { images } from '../content/images'
import { Container } from '../components/Container'
import { SectionLabel } from '../components/SectionLabel'
import { ImageSlot } from '../components/ImageSlot'
import { Reveal } from '../components/Reveal'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'

/** Discover → Model → Ship → Compound. A Crimson rule draws across, steps stagger in. */
export function Approach() {
  const reduced = usePrefersReducedMotion()
  const stepsRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 0.85', 'start 0.4'] })
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1])
  const imgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: imgP } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(imgP, [0, 1], ['-5%', '5%'])

  return (
    <section id="approach" aria-labelledby="approach-title" className="relative bg-surface-alt py-24 md:py-36">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div ref={imgRef} className="relative max-w-[30rem] overflow-hidden bg-surface lg:max-w-none" style={{ aspectRatio: '4 / 5' }}>
              <motion.div className="absolute -inset-y-[6%] inset-x-0" style={reduced ? undefined : { y: imgY }}>
                <ImageSlot spec={images.approach} fill />
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <SectionLabel tone="blush">
              {approach.label}
            </SectionLabel>
            <Reveal>
              <h2
                id="approach-title"
                className="mt-8 font-display text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.03] font-semibold tracking-[-0.035em] text-ivory"
              >
                {approach.title}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 max-w-[32rem] text-lg leading-relaxed text-blush">{approach.intro}</p>
            </Reveal>

            <ol ref={stepsRef} className="relative mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              <div aria-hidden="true" className="absolute -top-px right-0 left-0 h-px bg-blush/15 sm:col-span-2">
                <motion.div className="h-full origin-left bg-crimson" style={{ scaleX: reduced ? 1 : draw }} />
              </div>
              {approach.steps.map((s, i) => (
                <Reveal as="li" key={s.name} delay={i * 80} className="pt-8">
                  <p className="label text-blush">0{i + 1}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-ivory">{s.name}</h3>
                  <p className="mt-3 leading-relaxed text-blush">{s.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
