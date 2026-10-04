import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { products, type Product } from '../content/products'
import { images } from '../content/images'
import { Container } from '../components/Container'
import { SectionLabel } from '../components/SectionLabel'
import { ImageSlot } from '../components/ImageSlot'
import { Reveal } from '../components/Reveal'
import { Arrow } from '../components/Button'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'

/**
 * The "Ember Index": a sticky 01–04 rail (≥1024px) or sticky chip row (<1024px)
 * tracks four product bands. A Crimson rule fills with progress; the active
 * index turns Ember (on Graphite only) and carries aria-current.
 */
export function Portfolio() {
  const bandsRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [chipsAtEnd, setChipsAtEnd] = useState(false)
  const reduced = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({ target: bandsRef, offset: ['start 0.55', 'end 0.6'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  const fill = reduced ? scrollYProgress : smooth

  useEffect(() => {
    const els = products.map((p) => document.getElementById(p.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement))
        }
      },
      { rootMargin: '-45% 0px -54% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="products" aria-labelledby="products-title" className="relative bg-surface pb-16 md:pb-28">
      <Container className="border-t border-blush/15 pt-24 md:pt-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>Portfolio</SectionLabel>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2
                id="products-title"
                className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-ivory"
              >
                Four flagship products.
                <br />
                <span className="text-blush">One standard of craft.</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-8 max-w-[36rem] text-lg leading-relaxed text-blush">
                Every RubyTorch product takes one stubborn part of the software lifecycle and hands it to AI that
                engineers can trust. Same platform, same security model, same bar.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* <1024px: sticky chip row */}
      <div className="sticky top-16 z-30 mt-14 border-y border-blush/15 bg-surface-raised lg:hidden">
        <nav aria-label="Products" className="relative mx-auto max-w-[90rem]">
          <ul
            onScroll={(e) => {
              const el = e.currentTarget
              setChipsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
            }}
            className="flex snap-x gap-1 overflow-x-auto px-3 [scrollbar-width:none] sm:px-6"
          >
            {products.map((p, i) => (
              <li key={p.id} className="shrink-0 snap-start">
                <a
                  href={`#${p.id}`}
                  aria-current={active === i ? 'true' : undefined}
                  className={`relative flex h-12 items-center gap-2 px-3 text-[0.9rem] transition-colors ${
                    active === i ? 'text-ivory' : 'text-blush hover:text-ivory'
                  }`}
                >
                  <span className="label text-[0.68rem]">{p.index}</span>
                  {p.name}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 bottom-0 h-0.5 origin-left bg-crimson transition-transform duration-300 ${
                      active === i ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
          {/* edge fade: hints that the row scrolls, hidden once the end is reached */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface-raised to-transparent transition-opacity duration-200 ${
              chipsAtEnd ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </nav>
      </div>

      <Container className="mt-4 lg:mt-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10">
          {/* ≥1024px: sticky index rail */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24">
              <nav aria-label="Products">
                <div className="relative pl-8">
                  <div aria-hidden="true" className="absolute top-1 bottom-1 left-0 w-px bg-blush/15">
                    <motion.div className="h-full w-full origin-top bg-crimson" style={{ scaleY: fill }} />
                  </div>
                  <ol className="flex flex-col gap-1">
                    {products.map((p, i) => (
                      <li key={p.id}>
                        <a
                          href={`#${p.id}`}
                          aria-current={active === i ? 'true' : undefined}
                          className="group flex items-baseline gap-5 py-3"
                        >
                          <span
                            className={`label transition-colors duration-300 ${
                              active === i ? 'text-ember' : 'text-blush group-hover:text-ivory'
                            }`}
                          >
                            {p.index}
                          </span>
                          <span
                            className={`font-display text-2xl font-semibold tracking-[-0.02em] transition-colors duration-300 ${
                              active === i ? 'text-ivory' : 'text-blush group-hover:text-ivory'
                            }`}
                          >
                            {p.name}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </nav>
              <div className="mt-16 flex items-end gap-3 pl-8" aria-hidden="true">
                <span className="relative block h-[7.5rem] overflow-hidden font-display text-[7.5rem] leading-none font-semibold tracking-[-0.06em] text-crimson tabular-nums">
                  <motion.span
                    className="block"
                    animate={{ y: `${-active * 100}%` }}
                    transition={reduced ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {products.map((p) => (
                      <span key={p.id} className="block h-[7.5rem]">
                        {p.index}
                      </span>
                    ))}
                  </motion.span>
                </span>
                <span className="label mb-3 text-blush">/ 04</span>
              </div>
            </div>
          </aside>

          <div ref={bandsRef} className="lg:col-span-8">
            {products.map((p, i) => (
              <ProductBand key={p.id} product={p} first={i === 0} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function ProductBand({ product: p, first }: { product: Product; first: boolean }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.35'] })
  const clip = useTransform(scrollYProgress, [0, 1], ['inset(14% 10% 14% 10%)', 'inset(0% 0% 0% 0%)'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1])

  return (
    <article
      id={p.id}
      ref={ref}
      aria-labelledby={`${p.id}-name`}
      className={`scroll-mt-32 py-14 md:py-20 lg:scroll-mt-24 lg:py-24 ${first ? 'lg:pt-0' : 'border-t border-blush/15'}`}
    >
      <motion.div style={reduced ? undefined : { clipPath: clip }} className="overflow-hidden bg-surface-alt">
        <motion.div style={reduced ? undefined : { scale }}>
          <ImageSlot spec={images[p.image]} />
        </motion.div>
      </motion.div>

      <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-8 md:gap-10">
        <div className="md:col-span-3">
          <p className="label text-ember">
            {p.index} · {p.category}
          </p>
          <h3
            id={`${p.id}-name`}
            className="mt-4 font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.04em] text-ivory"
          >
            {p.name}
          </h3>
        </div>
        <div className="md:col-span-5">
          <Reveal>
            <p className="font-display text-[1.5rem] leading-snug font-medium tracking-[-0.02em] text-ivory">
              {p.promise}
            </p>
            <p className="mt-4 leading-relaxed text-blush">{p.body}</p>
          </Reveal>
          <ul className="mt-8 border-t border-blush/15">
            {p.capabilities.map((c, i) => (
              <Reveal as="li" key={c} delay={i * 80} className="flex gap-4 border-b border-blush/15 py-3.5 text-[0.95rem] text-ivory">
                <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-crimson" />
                {c}
              </Reveal>
            ))}
          </ul>
          <a
            href={`#${p.id}`}
            className="group mt-8 inline-flex items-center gap-2.5 text-[0.95rem] font-medium text-ivory underline decoration-blush/40 underline-offset-[6px] transition-colors hover:decoration-ivory"
          >
            See {p.name}
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </article>
  )
}
