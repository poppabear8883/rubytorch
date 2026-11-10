import { principles } from '../content/copy'
import { images } from '../content/images'
import { Container } from '../components/Container'
import { SectionLabel } from '../components/SectionLabel'
import { Reveal } from '../components/Reveal'
import { ImageSlot } from '../components/ImageSlot'
import { Grain } from '../components/Grain'

const icons = {
  gate: (
    <>
      <path d="M4 20V8M20 20V8" />
      <path d="M4 12h16M4 16h16" />
      <path d="M12 3v5M9.5 5.5L12 3l2.5 2.5" />
    </>
  ),
  ledger: (
    <>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M14 3v5h5M9 13h7M9 17h7" />
    </>
  ),
  tenant: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <path d="M17 14v6M14 17h6" />
    </>
  ),
  model: (
    <>
      <path d="M8 4l-5 8 5 8M16 4l5 8-5 8" />
      <path d="M13.5 6l-3 12" />
    </>
  ),
}

/** How we build: four commitments shared by all three products, on the ruby shell. */
export function Principles() {
  return (
    <section id="principles" aria-labelledby="principles-title" className="relative bg-surface-alt py-24 md:py-36">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel tone="blush">{principles.label}</SectionLabel>
            <Reveal>
              <h2
                id="principles-title"
                className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] font-extrabold tracking-[-0.04em] uppercase text-ivory"
              >
                How we <span className="text-crimson">build.</span>
              </h2>
              <span aria-hidden="true" className="mt-7 block h-[3px] w-20 bg-crimson" />
            </Reveal>
            <Reveal delay={100} className="mt-10 hidden lg:block">
              <div className="relative">
                <ImageSlot spec={images.approach} decorative className="aspect-[4/5]" />
                <Grain />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgb(11_11_15/0.5),transparent_50%)]" />
              </div>
            </Reveal>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {principles.items.map((p, i) => (
              <li key={p.name}>
                <Reveal delay={(i % 2) * 80} className="h-full">
                  <article className="relative flex h-full min-h-[18rem] flex-col justify-start overflow-hidden border border-blush/15 bg-surface p-7 md:p-9">
                    <span aria-hidden="true" className="absolute top-0 left-0 h-[3px] w-20 bg-crimson" />
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-11 text-crimson" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      {icons[p.icon]}
                    </svg>
                    <div className="mt-14">
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.025em] text-ivory">{p.name}</h3>
                      <p className="mt-3 leading-relaxed text-blush">{p.body}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
