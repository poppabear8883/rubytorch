/**
 * Image manifest (plan §4). Every image on the site is listed here.
 * - status "final": generated, graded and ready to ship.
 * - status "placeholder": stand-in art for the product shots. Swap the file in
 *   public/images/ (same name, same 3:2 source, shown at 16/10) and set status to "final".
 * Masters live in site/raw/*.png; `node scripts/images.mjs` grades them to WebP with colour QA.
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
    alt: 'A black metal monolith split by a seam of ruby light that reveals fine circuitry inside.',
    src: '/images/hero-desktop.webp',
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
  'product-cinderlens': {
    id: 'product-cinderlens',
    section: 'Portfolio · Cinderlens',
    ratio: '16 / 10',
    subject: 'Cinderlens review UI: a code diff with crimson review annotations and a side panel.',
    direction: 'Replace with a real product screenshot or a lit device shot in the house grade.',
    alt: 'The Cinderlens review interface showing a code diff with highlighted review notes.',
    src: '/images/product-cinderlens.webp',
    width: 1536,
    height: 1024,
    status: 'placeholder',
  },
  'product-flintpath': {
    id: 'product-flintpath',
    section: 'Portfolio · Flintpath',
    ratio: '16 / 10',
    subject: 'Flintpath dashboard: a branching test-path graph beside a grid of test results.',
    direction: 'Replace with a real product screenshot or a lit device shot in the house grade.',
    alt: 'The Flintpath dashboard with a branching test graph and a grid of test results.',
    src: '/images/product-flintpath.webp',
    width: 1536,
    height: 1024,
    status: 'placeholder',
  },
  'product-brasswire': {
    id: 'product-brasswire',
    section: 'Portfolio · Brasswire',
    ratio: '16 / 10',
    subject: 'Brasswire canvas: connector blocks joined by crimson wires, one block selected.',
    direction: 'Replace with a real product screenshot or a lit device shot in the house grade.',
    alt: 'The Brasswire canvas with integration blocks connected by ruby lines.',
    src: '/images/product-brasswire.webp',
    width: 1536,
    height: 1024,
    status: 'placeholder',
  },
  'product-kilnshift': {
    id: 'product-kilnshift',
    section: 'Portfolio · Kilnshift',
    ratio: '16 / 10',
    subject: 'Kilnshift view: a tangled legacy treemap on the left, the restructured system on the right.',
    direction: 'Replace with a real product screenshot or a lit device shot in the house grade.',
    alt: 'The Kilnshift view comparing a tangled legacy codebase with its modernised structure.',
    src: '/images/product-kilnshift.webp',
    width: 1536,
    height: 1024,
    status: 'placeholder',
  },
} satisfies Record<string, ImageSpec>

export type ImageId = keyof typeof images
