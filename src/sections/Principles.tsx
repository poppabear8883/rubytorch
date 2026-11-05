import { principles } from '../content/copy'
import { Container } from '../components/Container'
import { SectionLabel } from '../components/SectionLabel'
import { Reveal } from '../components/Reveal'

/** Three asymmetric blocks: one large, two stacked. No stats, logos or testimonials. */
export function Principles() {
  const [big, ...rest] = principles.items
  return (
    <section id="principles" aria-labelledby="principles-title" className="relative bg-surface py-24 md:py-36">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>{principles.label}</SectionLabel>
          </div>
          <Reveal className="lg:col-span-8">
            <h2
              id="principles-title"
              className="font-display text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.03] font-semibold tracking-[-0.035em] text-ivory"
            >
              {principles.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <article className="relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden bg-surface-alt p-8 md:min-h-[30rem] md:p-12">
              <span aria-hidden="true" className="absolute top-0 left-0 h-1 w-24 bg-crimson" />
              <p className="font-display text-[5rem] leading-none font-semibold tracking-[-0.06em] text-crimson md:text-[7rem]">
                01
              </p>
              <div>
                <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-semibold tracking-[-0.03em] text-ivory">
                  {big.name}
                </h3>
                <p className="mt-4 max-w-[30rem] text-lg leading-relaxed text-blush">{big.body}</p>
              </div>
            </article>
          </Reveal>
          <div className="grid gap-4 lg:col-span-5">
            {rest.map((p, i) => (
              <Reveal key={p.name} delay={(i + 1) * 80}>
                <article className="flex h-full flex-col justify-between gap-10 border border-blush/15 bg-surface p-8 md:p-10">
                  <p className="font-display text-[2.5rem] leading-none font-semibold tracking-[-0.05em] text-crimson">
                    0{i + 2}
                  </p>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ivory">{p.name}</h3>
                    <p className="mt-3 leading-relaxed text-blush">{p.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
