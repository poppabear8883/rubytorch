import type { CSSProperties } from 'react'

/** Phoenix: Backlog → Planning → In Progress → Review → Complete, with a person approving at Planning and Review. */
const columns = ['Backlog', 'Planning', 'In Progress', 'Review', 'Complete']
/** Shorter labels below 640px, where five columns share about 300px. */
const short = ['Backlog', 'Plan', 'Doing', 'Review', 'Done']
const gates = new Set([1, 3])
const cards: { delay: string; rest: string; w: string }[] = [
  { delay: '0s', rest: '0%', w: '70%' },
  { delay: '-3.4s', rest: '200%', w: '55%' },
  { delay: '-6.7s', rest: '400%', w: '85%' },
]

export function FlowMotif() {
  return (
    <div aria-hidden="true">
      <div className="grid grid-cols-5">
        {columns.map((c, i) => (
          <div key={c} className={`border-l border-blush/15 px-1.5 first:border-l-0 first:pl-0 ${i === 4 ? 'pr-0' : ''}`}>
            <p className="label text-[0.6875rem] leading-tight tracking-[0.12em] text-ivory sm:text-[0.75rem] sm:tracking-[0.16em]"><span className="sm:hidden">{short[i]}</span>
              <span className="hidden sm:inline">{c}</span>
            </p>
            <p
              className={`label mt-2 flex h-4 items-center gap-1 text-[0.6875rem] tracking-[0.1em] ${gates.has(i) ? 'text-ph-amber' : 'text-transparent'}`}
            >
              {gates.has(i) && (
                <>
                  <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6.5l2.5 2.5L10 3.5" />
                  </svg>
                  <span className="hidden sm:inline">Approve</span>
                </>
              )}
            </p>
          </div>
        ))}
      </div>
      <div className="relative mt-3 h-[8.25rem]">
        <div className="absolute inset-0 grid grid-cols-5">
          {columns.map((c) => (
            <div key={c} className="border-l border-blush/10 first:border-l-0" />
          ))}
        </div>
        {cards.map((c, i) => (
          <div
            key={i}
            className="motif-card"
            style={{ top: `${i * 2.75}rem`, animationDelay: c.delay, '--rest': c.rest } as CSSProperties}
          >
            <div className="rounded-md border border-ph-amber/50 bg-surface-raised p-2">
              <span className="block h-1.5 rounded-full bg-ph-amber" style={{ width: c.w }} />
              <span className="mt-1.5 block h-1.5 w-2/5 rounded-full bg-blush/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
