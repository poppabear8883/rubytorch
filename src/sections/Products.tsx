import { useEffect, useState, type CSSProperties } from 'react'
import { products as copy, } from '../content/copy'
import { products, type Product } from '../content/products'
import { images } from '../content/images'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { ImageSlot } from '../components/ImageSlot'
import { Grain } from '../components/Grain'
import { Arrow } from '../components/Button'
import { PipelineMotif } from '../components/motifs/PipelineMotif'
import { VoicesMotif } from '../components/motifs/VoicesMotif'
import { FlowMotif } from '../components/motifs/FlowMotif'
import { setInterest } from '../lib/interest'

const vars = (p: Product) =>
  ({ '--a1': p.accent.a1, '--a2': p.accent.a2, '--a3': p.accent.a3 ?? p.accent.a2 }) as CSSProperties

/** Which product world is crossing the middle of the viewport. Drives aria-current on the switcher. */
function useActiveProduct() {
  const [active, setActive] = useState(products[0].id)
  useEffect(() => {
    const els = products.map((p) => document.getElementById(p.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

/** Sticky switcher under the main nav. It lives inside #products, so it unpins when the worlds end. */
function ProductRail({ active }: { active: string }) {
  return (
    <div className="sticky top-16 z-40 border-y border-blush/15 bg-surface/90 backdrop-blur-md">
      <Container>
        <nav aria-label="Products" className="flex h-12 items-center justify-between gap-2 sm:justify-start sm:gap-10">
          <span className="label hidden text-blush lg:block">{copy.label}</span>
          {products.map((p) => {
            const on = p.id === active
            return (
              <a
                key={p.id}
                href={`#${p.id}`}
                aria-current={on ? 'true' : undefined}
                className={`label relative flex h-12 items-center gap-2 transition-colors ${on ? 'text-ivory' : 'text-blush hover:text-ivory'}`}
              >
                <img src={p.mark.src} alt="" width={p.mark.w} height={p.mark.h} className="h-4 w-auto" />
                {p.name}
                <span
                  aria-hidden="true"
                  className="accent-rule absolute inset-x-0 bottom-0 h-[2px] origin-left transition-transform duration-500 ease-out-expo"
                  style={{ ...vars(p), transform: on ? 'scaleX(1)' : 'scaleX(0)' }}
                />
              </a>
            )
          })}
        </nav>
      </Container>
    </div>
  )
}

function Motif({ p }: { p: Product }) {
  const inner = p.motif === 'pipeline' ? <PipelineMotif /> : p.motif === 'voices' ? <VoicesMotif /> : <FlowMotif />
  return (
    <div role="img" aria-label={p.motifLabel} className="world-frame bg-surface-alt p-5 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.8)] md:p-6">
      {inner}
    </div>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 shrink-0" fill="none">
      <path d="M5 3h8v8M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function World({ p, flip }: { p: Product; flip: boolean }) {
  const spec = images[p.image]
  const cta = p.cta
  return (
    <section
      id={p.id}
      aria-labelledby={`${p.id}-title`}
      style={vars(p)}
      className="world relative isolate scroll-mt-32 overflow-hidden py-20 md:py-32"
    >
      <div aria-hidden="true" className="world-grid pointer-events-none absolute inset-0 -z-10" />
      <Container>
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-12">
          {/* copy */}
          <div className={`lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
            <Reveal>
              <div className="flex items-center gap-5">
                <img src={p.mark.src} alt="" width={p.mark.w} height={p.mark.h} className="h-14 w-auto md:h-16" />
                <div>
                  <p className="label text-blush">
                    {p.index} <span aria-hidden="true">/</span> 03
                  </p>
                  <p className="font-display text-[1.75rem] leading-none font-bold tracking-[-0.03em] text-ivory md:text-[2rem]">{p.name}</p>
                </div>
              </div>
              <p className="label mt-8" style={{ color: p.accent.text }}>
                {p.category}
              </p>
              <h2
                id={`${p.id}-title`}
                className="mt-4 font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-ivory"
              >
                {p.headline}
              </h2>
              <span aria-hidden="true" className="accent-rule mt-7 block h-[3px] w-20" />
              <p className="mt-7 max-w-[34rem] text-[1.0625rem] leading-relaxed text-blush">{p.summary}</p>
              <p className="mt-6 max-w-[34rem] text-[0.95rem] leading-relaxed text-ivory">
                <span className="label mr-3 text-blush">{copy.builtFor}</span>
                {p.forWho}
              </p>
            </Reveal>
          </div>

          {/* graphic + motif */}
          <div className={`lg:col-span-7 ${flip ? 'lg:order-1 lg:col-start-1' : ''}`}>
            <Reveal delay={120} className="relative">
              <div
                aria-hidden="true"
                className="world-glow pointer-events-none absolute -top-16 -right-10 -z-10 size-[28rem] max-w-[90%] rounded-full blur-3xl"
              />
              <div className="world-frame overflow-hidden">
                <ImageSlot spec={spec} className="rounded-none" />
                <Grain />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(0deg,rgb(11_11_15/0.55)_0%,rgb(11_11_15/0)_45%)]"
                />
              </div>
              <div className="relative -mt-12 px-3 sm:-mt-16 sm:px-8 md:-mt-20 md:px-12">
                <Motif p={p} />
              </div>
            </Reveal>
          </div>
        </div>

        {/* features */}
        <ul className="mt-16 grid grid-cols-1 gap-x-12 border-t border-blush/15 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-x-8">
          {p.features.map((f, i) => (
            <li key={f.title} className="border-b border-blush/15 py-7 lg:border-b-0 lg:pr-4">
              <Reveal delay={i * 70}>
                <p className="label flex items-center gap-3 text-blush">
                  <span aria-hidden="true" className="accent-rule h-[2px] w-6" />
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.02em] text-ivory">{f.title}</h3>
                <p className="mt-2.5 leading-relaxed text-blush">{f.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* trust + CTA */}
        <div className="mt-6 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-[44rem] gap-5 border-l-[3px] py-1 pl-5" style={{ borderImage: 'linear-gradient(180deg, var(--a1), var(--a2)) 1' }}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 size-6 shrink-0" fill="none" stroke={p.accent.text} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <p className="leading-relaxed text-ivory">
              <span className="label mb-1.5 block" style={{ color: p.accent.text }}>
                {copy.trustLabel}
              </span>
              {p.trust}
            </p>
          </div>
          <a
            href={cta.href}
            {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            onClick={cta.interest ? () => setInterest(cta.interest!) : undefined}
            className="group inline-flex h-12 shrink-0 items-center justify-center gap-2.5 self-start rounded-full bg-crimson px-6 text-[0.95rem] font-medium whitespace-nowrap text-ivory transition-colors duration-200 hover:bg-ruby active:bg-ruby lg:self-auto"
          >
            {cta.label}
            {cta.external ? (
              <>
                <span className="sr-only"> (opens in a new tab)</span>
                <ExternalIcon />
              </>
            ) : (
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </a>
        </div>
      </Container>
    </section>
  )
}

export function Products() {
  const active = useActiveProduct()
  return (
    <div id="products" className="relative scroll-mt-24">
      <ProductRail active={active} />
      {products.map((p, i) => (
        <World key={p.id} p={p} flip={i % 2 === 1} />
      ))}
    </div>
  )
}
