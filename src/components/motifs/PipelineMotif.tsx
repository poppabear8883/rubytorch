/** ForceIDE: validate → review gate → deploy. A packet runs to the gate, waits for approval, then goes on. */
const nodes = [
  { name: 'Validate', icon: <path d="M5 12.5l4.5 4.5L19 7.5" /> },
  { name: 'Review gate', icon: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />, gate: true },
  { name: 'Deploy', icon: <path d="M12 20V5M6 11l6-6 6 6" /> },
]

export function PipelineMotif() {
  return (
    <div className="relative px-1 pt-1 pb-1" aria-hidden="true">
      <div className="relative flex items-start justify-between">
        <div className="absolute top-[22px] right-[22px] left-[22px] h-px bg-blush/25">
          <span className="motif-packet" />
        </div>
        {nodes.map((n) => (
          <div key={n.name} className="relative flex w-24 flex-col items-center gap-3 first:items-start last:items-end">
            <span
              className={`flex size-11 items-center justify-center rounded-full border bg-surface-alt ${
                n.gate ? 'motif-gate border-fx-cyan text-fx-cyan' : 'border-blush/30 text-blush'
              }`}
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                {n.icon}
              </svg>
            </span>
            <span className="label text-[0.75rem] whitespace-nowrap text-ivory">{n.name}</span>
          </div>
        ))}
      </div>
      <p className="label mt-5 border-t border-blush/15 pt-4 text-[0.75rem] text-blush">Autopilot stops at the gate. A person deploys.</p>
    </div>
  )
}
