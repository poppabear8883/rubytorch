/**
 * RubyTorch mark: the official artwork Mike supplied (masters in site/raw/brand/,
 * trimmed copies in site/public/brand/). Transparent PNGs with an Ivory handle,
 * so dark backgrounds only.
 *
 * flame: 334×450 · torch: 206×457. Swap for vendor SVGs when available;
 * keep the same file names and nothing else needs to change.
 */
type Variant = 'flame' | 'flame-small' | 'torch'

const SRC = {
  flame: { src: '/brand/flame.png', w: 334, h: 450 },
  torch: { src: '/brand/torch.png', w: 206, h: 457 },
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
  const s = variant === 'torch' ? SRC.torch : SRC.flame
  return (
    <img
      src={s.src}
      width={s.w}
      height={s.h}
      alt={title ?? ''}
      aria-hidden={title ? undefined : true}
      decoding="async"
      draggable={false}
      className={`object-contain select-none ${className}`}
    />
  )
}

/** Flame + live wordmark, for the nav and footer. */
export function Lockup({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Logo variant="flame" className="h-7 w-auto shrink-0" title={null} />
      <span className="font-display text-[1.15rem] font-semibold tracking-[-0.02em] text-ivory">RubyTorch</span>
    </span>
  )
}
