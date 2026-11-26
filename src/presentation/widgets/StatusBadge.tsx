import type { OrderStage } from '../../types'

const STYLES: Record<OrderStage, string> = {
  placed: 'bg-sky-400/12 text-sky-300 border-sky-400/25',
  confirmed: 'bg-indigo-400/12 text-indigo-300 border-indigo-400/25',
  preparing: 'bg-amber-400/12 text-amber-300 border-amber-400/25',
  ready: 'bg-orange-400/12 text-orange-300 border-orange-400/25',
  picked: 'bg-violet-400/12 text-violet-300 border-violet-400/25',
  'on-the-way': 'bg-brand/15 text-brand-2 border-brand/30',
  delivered: 'bg-mint/12 text-mint border-mint/25',
}

const LABELS: Record<OrderStage, string> = {
  placed: 'Placed',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready',
  picked: 'Picked up',
  'on-the-way': 'On the way',
  delivered: 'Delivered',
}

export function StatusBadge({ stage }: { stage: OrderStage }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${STYLES[stage]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {LABELS[stage]}
    </span>
  )
}
