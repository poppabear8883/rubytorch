/**
 * Image manifest (plan §4). Every image on the site is listed here.
 * - status "final": generated, graded and ready to ship.
 * - status "placeholder": stand-in art. Swap the file in public/images/ (same name) and set status to "final".
 * Masters live in raw/*.png; `node scripts/images.mjs` grades them to WebP with colour QA.
 *
 * House style (every brief): cinematic, low-key, near-black #0B0B0F, one ruby light source
 * matching Crimson #C81E4A falling off to Deep Ruby #8B0029, fine grain. No faces, no orange
 * or magenta neon, no glowing brains or holograms, no text.
 */
export type ImageSpec = {
  id: string
  section: string
  ratio: string // CSS aspect-ratio of the frame on the page
  subject: string
  direction: string
  alt: string
  src: string
  srcMobile?: string
  /** shown if src fails to load (used while @designer media is still being delivered) */
  fallback?: string
  width: number
  height: number
  objectPosition?: string
  status: 'final' | 'placeholder'
}

export const images = {
  hero: {
    id: 'hero',
    section: 'Hero',
    ratio: '3 / 2',
    subject: 'Macro of an obsidian metal and smoked-glass monolith; a crimson seam cuts through it and reveals etched circuitry.',
    direction:
      'Desktop (≥1024px): subject in the right two-thirds, left third dark for the headline. Mobile and tablet (<1024px): subject in the lower half, top 45% dark. Raking crimson light, shallow depth of field.',
    alt: '',
    src: '/images/hero-poster.webp',
    fallback: '/images/hero-desktop.webp',
    srcMobile: '/images/hero-mobile.webp',
    width: 1536,
    height: 1024,
    objectPosition: '68% 50%',
    status: 'final',
  },
  approach: {
    id: 'approach',
    section: 'Approach',
    ratio: '4 / 5',
    subject: 'A dark engineering desk at night: a dim monitor of code and a crimson task light.',
    direction: 'Low three-quarter angle, single crimson lamp pool, walnut and brushed metal, no people.',
    alt: 'A quiet engineering desk at night, lit by a single crimson lamp beside a monitor of code.',
    src: '/images/approach.webp',
    width: 1024,
    height: 1536,
    objectPosition: '50% 40%',
    status: 'final',
  },
  cta: {
    id: 'cta',
    section: 'Contact',
    ratio: '3 / 2',
    subject: 'A vast dark industrial space with one horizontal line of crimson light reflected in a polished floor.',
    direction: 'Architectural and symmetric, left half calm and dark for copy.',
    alt: 'A dark architectural hall with a single line of ruby light running along the floor.',
    src: '/images/cta.webp',
    width: 1536,
    height: 1024,
    objectPosition: '60% 50%',
    status: 'final',
  },
  'product-forceide': {
    id: 'product-forceide',
    section: 'Products · ForceIDE',
    ratio: '16 / 10',
    subject: 'ForceIDE world graphic: blue to cyan light forms around a code editor and a release pipeline.',
    direction: 'Media from @designer. Blue #1060FF to cyan #00E5FF on near-black, no text.',
    alt: 'Blue and cyan light forms on a dark ground, suggesting a code editor and a release pipeline.',
    src: '/images/product-forceide.webp',
    fallback: '/images/hero-desktop.webp',
    width: 1536,
    height: 1024,
    status: 'final',
  },
  'product-collab': {
    id: 'product-collab',
    section: 'Products · Collab AI Pro',
    ratio: '16 / 10',
    subject: 'Collab AI Pro world graphic: orange, teal and violet voices meeting at one point.',
    direction: 'Media from @designer. Orange #FF7A3D, teal #08C99B, violet #6E4BFF on near-black, no text.',
    alt: 'Orange, teal and violet ribbons of light meeting at a single point on a dark ground.',
    src: '/images/product-collab.webp',
    fallback: '/images/hero-desktop.webp',
    width: 1536,
    height: 1024,
    status: 'final',
  },
  'product-phoenix': {
    id: 'product-phoenix',
    section: 'Products · Phoenix',
    ratio: '16 / 10',
    subject: 'Phoenix world graphic: flame and amber light rising through five stages.',
    direction: 'Media from @designer. Flame to amber on near-black, no text.',
    alt: 'Flame and amber light rising through a row of five columns on a dark ground.',
    src: '/images/product-phoenix.webp',
    fallback: '/images/hero-desktop.webp',
    width: 1536,
    height: 1024,
    status: 'final',
  },
  family: {
    id: 'family',
    section: 'Family',
    ratio: '3 / 2',
    subject: 'Family overview: the three product colours as light on a ruby shell.',
    direction: 'Media from @designer. Decorative backdrop for the family band.',
    alt: '',
    src: '/images/family.webp',
    width: 1536,
    height: 1024,
    status: 'final',
  },
} satisfies Record<string, ImageSpec>

export type ImageId = keyof typeof images
