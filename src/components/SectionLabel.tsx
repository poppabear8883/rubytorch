/** Small tracked label with index. `tone="ember"` only on pure Graphite (plan §2a). */
export function SectionLabel({ index, children, tone = 'ember' }: { index?: string; children: string; tone?: 'ember' | 'blush' }) {
  return (
    <p className={`label flex items-center gap-3 ${tone === 'ember' ? 'text-ember' : 'text-blush'}`}>
      {index && <span className="tabular-nums">{index}</span>}
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      <span>{children}</span>
    </p>
  )
}
