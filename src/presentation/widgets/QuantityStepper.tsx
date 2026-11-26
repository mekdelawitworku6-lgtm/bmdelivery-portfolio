import { Minus, Plus } from 'lucide-react'

interface QuantityStepperProps {
  qty: number
  onDecrease: () => void
  onIncrease: () => void
}

export function QuantityStepper({ qty, onDecrease, onIncrease }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1">
      <button
        type="button"
        onClick={onDecrease}
        aria-label="Decrease quantity"
        className="grid h-7 w-7 place-items-center rounded-lg text-muted transition hover:bg-white/10 hover:text-white"
      >
        <Minus size={13} />
      </button>
      <span className="w-5 text-center text-xs font-bold">{qty}</span>
      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="grid h-7 w-7 place-items-center rounded-lg text-muted transition hover:bg-white/10 hover:text-white"
      >
        <Plus size={13} />
      </button>
    </div>
  )
}
