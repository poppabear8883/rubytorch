import type { ReactNode, MouseEventHandler } from 'react'

type Props = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'link'
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  arrow?: boolean
}

const base =
  'group inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-medium transition-colors duration-200 select-none'

const styles = {
  primary: 'h-12 rounded-full bg-crimson px-6 text-[0.95rem] text-ivory hover:bg-ruby active:bg-ruby',
  secondary:
    'h-12 rounded-full border border-ivory/30 px-6 text-[0.95rem] text-ivory hover:border-ivory hover:bg-ivory/5',
  link: 'text-[0.95rem] text-ivory underline decoration-blush/40 decoration-1 underline-offset-[6px] hover:decoration-ivory',
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={`size-4 shrink-0 ${className}`} fill="none">
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Button({ href, children, variant = 'primary', className = '', onClick, arrow = false }: Props) {
  return (
    <a href={href} onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      <span>{children}</span>
      {arrow && <Arrow className="transition-transform duration-300 ease-out group-hover:translate-x-1" />}
    </a>
  )
}
