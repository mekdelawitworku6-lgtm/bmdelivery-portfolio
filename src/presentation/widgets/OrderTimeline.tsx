import { Check } from 'lucide-react'
import { ORDER_STAGES, STAGE_LABELS, type OrderStage } from '../../types'

const DESCRIPTIONS: Record<OrderStage, string> = {
  placed: 'We received your order',
  confirmed: 'Kitchen accepted your order',
  preparing: 'Your food is being prepared',
  ready: 'Packed and waiting for pickup',
  picked: 'Rider collected your order',
  'on-the-way': 'Rider is heading to you',
  delivered: 'Enjoy your meal!',
}

export function OrderTimeline({ stage }: { stage: OrderStage }) {
  const currentIndex = ORDER_STAGES.indexOf(stage)

  return (
    <ol className="space-y-0">
      {ORDER_STAGES.map((step, index) => {
        const done = index < currentIndex
        const active = index === currentIndex
        return (
          <li key={step} className="relative flex gap-3 pb-5 last:pb-0">
            {index < ORDER_STAGES.length - 1 && (
              <span
                className={`absolute left-[13px] top-7 h-[calc(100%-16px)] w-0.5 ${done ? 'bg-mint/60' : 'bg-white/10'}`}
              />
            )}
            <span
              className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[11px] font-bold ${
                done
                  ? 'border-mint/50 bg-mint/20 text-mint'
                  : active
                    ? 'border-brand/60 bg-brand/20 text-brand-2'
                    : 'border-white/10 bg-white/5 text-muted'
              }`}
            >
              {done ? <Check size={14} /> : index + 1}
              {active && (
                <span className="absolute inset-0 animate-ping rounded-full border border-brand/40" />
              )}
            </span>
            <div className="pt-0.5">
              <p className={`text-sm font-bold ${active ? 'text-white' : done ? 'text-slate-300' : 'text-muted'}`}>
                {STAGE_LABELS[step]}
              </p>
              <p className="mt-0.5 text-[11px] text-muted">{DESCRIPTIONS[step]}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
