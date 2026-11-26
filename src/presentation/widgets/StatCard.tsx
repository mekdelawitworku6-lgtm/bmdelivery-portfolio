import type { ReactNode } from 'react'

const TONES = {
  brand: 'text-brand bg-brand/12 border-brand/20',
  mint: 'text-mint bg-mint/12 border-mint/20',
  blue: 'text-sky-300 bg-sky-400/12 border-sky-400/20',
  violet: 'text-violet-300 bg-violet-400/12 border-violet-400/20',
}

interface StatCardProps {
  label: string
  value: string
  hint?: string
  icon: ReactNode
  tone?: keyof typeof TONES
}

export function StatCard({ label, value, hint, icon, tone = 'brand' }: StatCardProps) {
  return (
    <div className="widget p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium text-muted">{label}</p>
        <span className={`rounded-xl border p-2 ${TONES[tone]}`}>{icon}</span>
      </div>
      <p className="mt-4 text-2xl font-extrabold tracking-tight">{value}</p>
      {hint && <p className="mt-1 text-[11px] text-muted">{hint}</p>}
    </div>
  )
}
