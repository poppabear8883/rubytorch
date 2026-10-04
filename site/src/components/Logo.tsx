/**
 * RubyTorch mark, hand-drawn as SVG from the brand description (plan §2c).
 * Back flame Deep Ruby, middle flame Crimson, small front flame Ruby Red,
 * torch handle Ivory. A Graphite keyline separates the layers so the mark
 * holds together at small sizes. Dark backgrounds only.
 *
 * NOTE: this is a redraw, not the vendor artwork. Replace with the official
 * SVG when it is available (see site/README.md).
 */
type Variant = 'flame' | 'flame-small' | 'torch'

const C = {
  deep: '#8B0029',
  crimson: '#C81E4A',
  ruby: '#B0103A',
  ivory: '#F5F2F0',
  graphite: '#0B0B0F',
}

// Detailed flames (64×64 box, base at y=62)
const BACK =
  'M32 62C17.5 62 9 51.5 10.5 39 11.8 28.6 19.5 22.6 21.5 9.5 27 15 29.6 20.4 30.8 26.5 33.4 18.2 38 11 44.5 3 46.5 15.5 56 25.5 55.5 40 55 52.5 46 62 32 62Z'
const MID =
  'M32 62C21.6 62 15.5 54.6 16.4 45.6 17.2 37.6 22.6 33.4 25.4 24 29.2 29.4 30.8 33 31.6 37.6 34.4 31.2 37.8 26.6 41.4 19.6 45.4 29.4 49.4 36 49 46 48.6 55.4 42 62 32 62Z'
const FRONT =
  'M32 62C25.6 62 22.4 57.6 23 52.4 23.6 47.2 27.4 44.6 29.6 38.6 33.4 43.4 36.8 46.6 38.8 51.2 41.2 56.8 38.2 62 32 62Z'

// Simplified flames for 16–24px: fewer tongues, wider gaps
const BACK_S = 'M32 62C16 62 8 50 11 36 14 24 24 18 28 2 38 12 56 24 54 42 52.5 54 44 62 32 62Z'
const MID_S = 'M32 62C22 62 17 55 18.5 46 20 38 27 33 30 20 37 29 47 36 46 47 45 56 40 62 32 62Z'
const FRONT_S = 'M32 62C26 62 23 58 24 52.5 25 47.5 29 44.5 31 38 36 43.5 40 47 40 52.5 40 58 37 62 32 62Z'

function Flames({ small = false }: { small?: boolean }) {
  const kl = small ? 4.5 : 2.6 // Graphite keyline between layers
  return (
    <g strokeLinejoin="round">
      <path d={small ? BACK_S : BACK} fill={C.deep} />
      <path d={small ? MID_S : MID} fill={C.crimson} stroke={C.graphite} strokeWidth={kl} paintOrder="stroke" />
      <path d={small ? FRONT_S : FRONT} fill={C.ruby} stroke={C.graphite} strokeWidth={kl} paintOrder="stroke" />
    </g>
  )
}

export function Logo({
  variant = 'flame',
  className = '',
  title = 'RubyTorch',
}: {
  variant?: Variant
  className?: string
  title?: string | null
}) {
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true as const }
  if (variant === 'torch') {
    return (
      <svg viewBox="0 0 64 132" className={className} {...a11y} focusable="false">
        <Flames />
        {/* collar */}
        <path d="M17 66h30l-2.4 7H19.4Z" fill={C.ivory} />
        {/* tapered handle with two grip notches */}
        <path d="M21 76h22l-6.6 52.5a2 2 0 0 1-2 1.5h-4.8a2 2 0 0 1-2-1.5Z" fill={C.ivory} />
        <path d="M22.4 88h19.2M23.9 100h16.2" stroke={C.graphite} strokeWidth="2.2" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 64 64" className={className} {...a11y} focusable="false">
      <Flames small={variant === 'flame-small'} />
    </svg>
  )
}

/** Flame + live wordmark, for the nav and footer. */
export function Lockup({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Logo variant="flame-small" className="size-7 shrink-0" title={null} />
      <span className="font-display text-[1.15rem] font-semibold tracking-[-0.02em] text-ivory">RubyTorch</span>
    </span>
  )
}
