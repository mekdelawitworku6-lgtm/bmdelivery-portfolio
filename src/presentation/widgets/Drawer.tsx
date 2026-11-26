import { X } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
  variant?: 'right' | 'center'
  size?: string
}

export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  variant = 'right',
  size,
}: DrawerProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  const panelClass =
    variant === 'center'
      ? 'w-full max-w-2xl rounded-[24px]'
      : `ml-auto h-full w-full ${size ?? 'max-w-[430px]'} rounded-l-[24px]`

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        aria-label="Close panel"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
      />
      <div
        className={`animate-in relative flex h-full flex-col overflow-hidden border border-white/10 bg-[#0d1627] shadow-2xl ${panelClass} ${variant === 'center' ? 'm-auto max-h-[90vh]' : ''}`}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/8 px-6 py-5">
          <div>
            <h2 className="text-lg font-extrabold tracking-tight">{title}</h2>
            {subtitle && <p className="muted mt-0.5 text-xs">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-muted transition hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  )
}
