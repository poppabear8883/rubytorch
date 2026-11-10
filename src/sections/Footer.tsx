import { products } from '../content/products'
import { footer } from '../content/copy'
import { tagline } from '../content/nav'
import { navLinks } from '../content/nav'
import { Container } from '../components/Container'
import { Lockup } from '../components/Logo'

export function Footer() {
  return (
    <footer className="border-t border-blush/15 bg-surface">
      <Container className="grid gap-12 py-16 grid-cols-1 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <a href="#top" aria-label="RubyTorch, back to top" className="inline-flex">
            <Lockup />
          </a>
          <p className="mt-6 max-w-[22rem] leading-relaxed text-blush">
            {footer.blurb}
          </p>
          <p className="label mt-8 flex items-center gap-3 text-blush">
            <span aria-hidden="true" className="h-px w-8 bg-crimson" />
            {tagline}
          </p>
        </div>
        <nav aria-label="Footer products" className="md:col-span-3 md:col-start-7">
          <p className="label text-ember">Products</p>
          <ul className="mt-5 flex flex-col gap-3">
            {products.map((p) => (
              <li key={p.id}>
                <a
                  href={p.cta.external ? p.cta.href : `#${p.id}`}
                  {...(p.cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center gap-2 text-blush transition-colors hover:text-ivory"
                >
                  {p.name}
                  {p.cta.external && (
                    <>
                      <span className="sr-only"> (opens in a new tab)</span>
                      <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5" fill="none">
                        <path d="M5 3h8v8M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
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
