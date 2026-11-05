import type { ElementType } from 'react'

/**
 * Line-by-line mask-up reveal, CSS only (starts at first paint, never waits on JS).
 * Visual spans are aria-hidden; a visually hidden copy carries the full text.
 */
export function SplitLines({
  lines,
  as: Tag = 'h1',
  className = '',
  lineClassName = '',
  stagger = 80,
  startDelay = 100,
}: {
  lines: string[]
  as?: ElementType
  className?: string
  lineClassName?: string
  stagger?: number
  startDelay?: number
}) {
  return (
    <Tag className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      {lines.map((line, i) => (
        <span key={i} aria-hidden="true" className={`rt-line ${lineClassName}`}>
          <span style={{ animationDelay: `${startDelay + i * stagger}ms` }}>{line}</span>
        </span>
      ))}
    </Tag>
  )
}
