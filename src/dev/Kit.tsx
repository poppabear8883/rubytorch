// Dev-only component kit: open /__kit on the dev server. Not included in production builds.
import { Logo, Lockup } from '../components/Logo'
import { Button } from '../components/Button'
import { ImageSlot } from '../components/ImageSlot'
import { SectionLabel } from '../components/SectionLabel'
import { Container } from '../components/Container'
import { Nav } from '../components/Nav'
import { images } from '../content/images'

const swatches = [
  ['graphite', 'bg-graphite'],
  ['surface-alt', 'bg-surface-alt'],
  ['surface-raised', 'bg-surface-raised'],
  ['ivory', 'bg-ivory'],
  ['blush', 'bg-blush'],
  ['ember', 'bg-ember'],
  ['crimson', 'bg-crimson'],
  ['ruby', 'bg-ruby'],
  ['deep-ruby', 'bg-deep-ruby'],
] as const

export default function Kit() {
  return (
    <>
      <Nav />
      <main className="min-h-svh bg-surface pt-28 pb-24 text-ink">
        <Container className="flex flex-col gap-16">
          <SectionLabel index="K">Dev kit</SectionLabel>

          <section className="flex flex-wrap gap-3">
            {swatches.map(([name, cls]) => (
              <div key={name} className="w-28">
                <div className={`h-16 border border-blush/15 ${cls}`} />
                <p className="label mt-2 text-blush">{name}</p>
              </div>
            ))}
          </section>

          <section className="flex flex-wrap items-end gap-8">
            {[16, 24, 32].map((s) => (
              <div key={s} style={{ width: s, height: s }}>
                <Logo variant="flame" className="size-full" />
              </div>
            ))}
            {[64, 128].map((s) => (
              <div key={s} style={{ width: s, height: s }}>
                <Logo variant="flame" className="size-full" />
              </div>
            ))}
            <div style={{ width: 120, height: 248 }}>
              <Logo variant="torch" className="size-full" />
            </div>
            <Lockup />
          </section>

          <section className="flex flex-wrap gap-3">
            <Button href="#products" arrow>
              Explore the products
            </Button>
            <Button href="#contact" variant="secondary">
              Book a demo
            </Button>
          </section>

          <section className="grid max-w-3xl gap-4 md:grid-cols-2">
            <ImageSlot spec={images['product-forceide']} />
            <ImageSlot spec={images.approach} />
          </section>
        </Container>
      </main>
    </>
  )
}
