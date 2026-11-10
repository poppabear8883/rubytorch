import { useEffect, useRef, useState, type FormEvent } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { contact } from '../content/copy'
import { products } from '../content/products'
import { getInterest, onInterest } from '../lib/interest'
import { images } from '../content/images'
import { Container } from '../components/Container'
import { SectionLabel } from '../components/SectionLabel'
import { ImageSlot } from '../components/ImageSlot'
import { Grain } from '../components/Grain'
import { Logo } from '../components/Logo'
import { usePrefersReducedMotion } from '../lib/useReducedMotion'

const field =
  'mt-2 block w-full rounded-none border-0 border-b border-blush/30 bg-transparent px-0 py-3 text-base text-ivory placeholder:text-blush/75 transition-colors focus:border-ivory focus:bg-ivory/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory'

/** Full-bleed CTA image with scrim + solid form panel. Demo form: no network. */
export function Contact() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.2'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1])
  const [sent, setSent] = useState(false)
  const [interest, setInterest] = useState(getInterest)
  useEffect(() => onInterest(setInterest), [])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!e.currentTarget.reportValidity()) return
    setSent(true)
  }

  return (
    <section id="contact" ref={ref} aria-labelledby="contact-title" className="relative isolate bg-surface">
      <div className="grid grid-cols-1 lg:min-h-[48rem] lg:grid-cols-12">
        {/* image + headline */}
        <div className="relative flex min-h-[34rem] flex-col justify-end overflow-hidden lg:col-span-7 lg:min-h-0">
          <motion.div className="absolute inset-0 -z-10" style={reduced ? undefined : { scale }}>
            <ImageSlot spec={images.cta} fill decorative />
          </motion.div>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgb(11_11_15/0.96)_0%,rgb(11_11_15/0.7)_45%,rgb(11_11_15/0.2)_100%)] lg:bg-[linear-gradient(90deg,rgb(11_11_15/0.9)_0%,rgb(11_11_15/0.55)_55%,rgb(11_11_15/0.1)_100%)]" />
          <div className="absolute inset-0 -z-10">
            <Grain />
          </div>
          <Container className="py-16 md:py-24 lg:max-w-none lg:pr-16 lg:pl-12 xl:pl-[max(3rem,calc((100vw-90rem)/2+3rem))]">
            <Logo variant="torch" className="h-24 w-auto md:h-32" title="RubyTorch" />
            <div className="mt-10">
              <SectionLabel tone="blush">
                {contact.label}
              </SectionLabel>
            </div>
            <h2
              id="contact-title"
              className="mt-6 max-w-[14ch] font-display text-[clamp(2.5rem,5.4vw,5rem)] leading-[0.98] font-extrabold tracking-[-0.04em] uppercase text-ivory"
            >
              {contact.title}
            </h2>
            <p className="mt-6 max-w-[30rem] text-lg leading-relaxed text-blush">{contact.body}</p>
          </Container>
        </div>

        {/* form panel */}
        <div className="bg-surface-raised lg:col-span-5">
          <div className="mx-auto flex h-full max-w-xl flex-col justify-center px-5 py-16 sm:px-8 md:py-24 lg:px-12">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ivory">{contact.formTitle}</h3>
            <p className="mt-2 text-blush">{contact.formIntro}</p>
            <form className="mt-10 flex flex-col gap-8" onSubmit={onSubmit} noValidate={false}>
              <label className="block">
                <span className="label text-blush">Name</span>
                <input name="name" type="text" autoComplete="name" required className={field} placeholder="Your name" />
              </label>
              <label className="block">
                <span className="label text-blush">Work email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={field}
                  placeholder="you@company.com"
                />
              </label>
              <label className="block">
                <span className="label text-blush">Product of interest</span>
                <select
                  name="product"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className={`${field} appearance-none bg-[length:1rem] bg-[right_0.25rem_center] bg-no-repeat pr-8`}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23E7C7CF' stroke-width='1.5'><path d='M3 6l5 5 5-5'/></svg>\")",
                  }}
                >
                  <option value="" className="bg-surface-raised">Not sure yet</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id} className="bg-surface-raised">
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="label text-blush">Message</span>
                <textarea
                  name="message"
                  rows={4}
                  className={`${field} resize-none`}
                  placeholder="What would you like to speed up?"
                />
              </label>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-crimson px-7 text-[0.95rem] font-medium text-ivory transition-colors hover:bg-ruby"
                >
                  Book a demo
                </button>
                <p role="status" aria-live="polite" className="text-sm text-blush">
                  {sent ? contact.thanks : ''}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
