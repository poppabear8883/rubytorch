import { useState, type CSSProperties } from 'react'
import type { ImageSpec } from '../content/images'

type Props = {
  spec: ImageSpec
  className?: string
  imgClassName?: string
  imgStyle?: CSSProperties
  priority?: boolean
  /** fill the parent instead of using the spec ratio */
  fill?: boolean
  /** decorative: empty alt (when the surrounding text already says it) */
  decorative?: boolean
}

/**
 * Renders a manifest image inside a fixed frame with a surface background, so
 * nothing jumps or flashes while it loads. srcMobile switches below 768px.
 * In dev, placeholder images carry a small tag so nobody mistakes them for finals.
 */
export function ImageSlot({ spec, className = '', imgClassName = '', imgStyle, priority = false, fill = false, decorative = false }: Props) {
  const [src, setSrc] = useState(spec.src)
  return (
    <div
      className={`relative overflow-hidden bg-surface-alt ${fill ? 'h-full w-full' : 'w-full'} ${className}`}
      style={fill ? undefined : { aspectRatio: spec.ratio }}
    >
      <picture>
        {spec.srcMobile && src === spec.src && <source media="(max-width: 767.98px)" srcSet={spec.srcMobile} />}
        <img
          src={src}
          onError={() => {
            if (spec.fallback && src !== spec.fallback) setSrc(spec.fallback)
          }}
          alt={decorative ? '' : spec.alt}
          width={spec.width}
          height={spec.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          {...(priority ? { fetchPriority: 'high' as const } : {})}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
          style={{ objectPosition: spec.objectPosition, ...imgStyle }}
        />
      </picture>
      {import.meta.env.DEV && spec.status === 'placeholder' && (
        <span className="label absolute top-3 right-3 rounded-full bg-graphite/80 px-2.5 py-1 text-[0.625rem] text-blush">
          Placeholder
        </span>
      )}
    </div>
  )
}
