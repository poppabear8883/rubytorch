import { products } from '../content/products'
import { navLinks } from '../content/nav'
import { Container } from '../components/Container'
import { Lockup } from '../components/Logo'

export function Footer() {
  return (
    <footer className="border-t border-blush/15 bg-surface">
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <a href="#top" aria-label="RubyTorch, back to top" className="inline-flex">
            <Lockup />
          </a>
          <p className="mt-6 max-w-[22rem] leading-relaxed text-blush">
            A holding company for AI-native software. We build, own and scale products engineered with AI at the core.
          </p>
        </div>
        <nav aria-label="Footer products" className="md:col-span-3 md:col-start-7">
          <p className="label text-ember">Products</p>
          <ul className="mt-5 flex flex-col gap-3">
            {products.map((p) => (
              <li key={p.id}>
                <a href={`#${p.id}`} className="text-blush transition-colors hover:text-ivory">
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer sections" className="md:col-span-3">
          <p className="label text-ember">Company</p>
          <ul className="mt-5 flex flex-col gap-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-blush transition-colors hover:text-ivory">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-blush/15 py-8 text-sm text-blush sm:flex-row sm:justify-between">
        <p>© 2026 RubyTorch LLC. All rights reserved.</p>
        <p>
          <a href="#" className="transition-colors hover:text-ivory">
            Privacy
          </a>
          <span aria-hidden="true" className="mx-3">
            ·
          </span>
          <a href="#" className="transition-colors hover:text-ivory">
            Terms
          </a>
        </p>
      </Container>
    </footer>
  )
}
