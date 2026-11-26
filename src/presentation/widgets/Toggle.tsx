interface ToggleProps {
  checked: boolean
  onChange: (value: boolean) => void
  label: string
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
        checked ? 'border-mint/40 bg-mint/30' : 'border-white/10 bg-white/10'
      }`}
    >
      <span
        className={`absolute top-0.5 h-4.5 w-4.5 rounded-full transition-all ${
          checked ? 'left-[22px] bg-mint shadow-[0_0_12px_rgba(33,214,165,0.7)]' : 'left-0.5 bg-slate-400'
        }`}
      />
    </button>
  )
}
