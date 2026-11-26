import type { ReactNode } from 'react'

interface HowItWorksStepProps {
  number: string
  title: string
  description: string
  icon: ReactNode
  accent: string
}

export function HowItWorksStep({ number, title, description, icon, accent }: HowItWorksStepProps) {
  return (
    <div className="widget relative p-5">
      <div className="flex items-center justify-between">
        <span
          className="grid h-11 w-11 place-items-center rounded-xl border"
          style={{ color: accent, borderColor: `${accent}50`, background: `${accent}18` }}
        >
          {icon}
        </span>
        <span className="text-3xl font-extrabold tracking-tight text-white/8">{number}</span>
      </div>
      <h3 className="mt-4 text-sm font-extrabold">{title}</h3>
      <p className="muted mt-1.5 text-[11px] leading-relaxed">{description}</p>
    </div>
  )
}
