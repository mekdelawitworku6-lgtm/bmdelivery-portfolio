import { CheckCircle2, X } from 'lucide-react'
import { useEffect } from 'react'
import { useDemo } from '../../state/DemoContext'

export function Toast() {
  const { notice, clearNotice } = useDemo()

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(clearNotice, 3400)
    return () => window.clearTimeout(timer)
  }, [notice, clearNotice])

  if (!notice) return null

  return (
    <div className="animate-in fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-mint/25 bg-[#101a2c] px-4 py-3 text-xs font-semibold shadow-2xl">
      <CheckCircle2 size={17} className="text-mint" />
      <span>{notice}</span>
      <button type="button" onClick={clearNotice} aria-label="Dismiss notification" className="ml-2 text-muted hover:text-white">
        <X size={14} />
      </button>
    </div>
  )
}
