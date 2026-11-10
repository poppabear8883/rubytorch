/** Collab AI Pro: several model voices converge into one shared transcript; only the human gives instructions. */
const voices = [
  { name: 'Claude', color: 'var(--color-cb-orange)' },
  { name: 'GPT', color: 'var(--color-cb-teal)' },
  { name: 'Local model', color: 'var(--color-cb-violet)' },
]

export function VoicesMotif() {
  return (
    <div aria-hidden="true" className="grid grid-cols-[auto_1fr_auto] items-stretch gap-0">
      <ul className="flex flex-col justify-between gap-3 py-1">
        {voices.map((v) => (
          <li key={v.name} className="label flex h-8 items-center gap-2.5 text-[0.75rem] text-ivory">
            <span className="size-2.5 rounded-full" style={{ background: v.color, boxShadow: `0 0 10px ${v.color}` }} />
            {v.name}
          </li>
        ))}
      </ul>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full min-h-28 w-full" fill="none">
        {voices.map((v, i) => (
          <path
            key={v.name}
            className="motif-dash"
            d={`M0 ${[16, 50, 84][i]} C50 ${[16, 50, 84][i]}, 50 50, 100 50`}
            stroke={v.color}
            strokeWidth="1.75"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            style={{ animationDelay: `${i * -0.5}s` }}
          />
        ))}
      </svg>
      <div className="flex flex-col items-end justify-center gap-3 text-right">
        <span className="flex size-11 items-center justify-center rounded-full border border-cb-violet bg-surface-alt text-cb-violet">
          <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
            <path d="M12 2c.8 5.5 3.5 8.2 10 10-6.5 1.8-9.2 4.5-10 10-.8-5.5-3.5-8.2-10-10 6.5-1.8 9.2-4.5 10-10z" />
          </svg>
        </span>
        <span className="label text-[0.75rem] leading-tight text-ivory">
          One shared
          <br />
          transcript
        </span>
      </div>
      <p className="label col-span-3 mt-5 border-t border-blush/15 pt-4 text-[0.75rem] text-blush">Only human turns count as instructions.</p>
    </div>
  )
}
