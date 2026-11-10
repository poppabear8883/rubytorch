import { links } from './links'

export const navLinks = [
  { href: '#about', label: 'Family' },
  { href: '#products', label: 'Products' },
  { href: '#principles', label: 'How we build' },
  { href: '#contact', label: 'Contact' },
] as const

export const CTA = {
  explore: { href: '#products', label: 'Explore the products' },
  talk: { href: '#contact', label: 'Book a demo' },
} as const

export const tagline = "Ignite what's next"

export const externalLinks = links
