import { Bike, LayoutDashboard, RotateCcw, ShoppingBag, Store, UserRound } from 'lucide-react'
import { useDemo } from '../../state/DemoContext'
import type { Role } from '../../types'

const ROLES: { id: Role; label: string; icon: typeof UserRound }[] = [
  { id: 'customer', label: 'Customer', icon: UserRound },
  { id: 'merchant', label: 'Merchant', icon: Store },
  { id: 'driver', label: 'Driver', icon: Bike },
  { id: 'admin', label: 'Admin', icon: LayoutDashboard },
]

export function TopBar({ onOpenCart }: { onOpenCart: () => void }) {
  const { role, setRole, cartCount, resetDemo } = useDemo()

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#070b14]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-2 to-brand text-lg shadow-[0_6px_20px_-6px_rgba(255,107,53,0.8)]">
            🛵
          </div>
          <div className="leading-tight">
            <p className="text-sm font-extrabold tracking-tight">BMDelivery</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-2">Interactive demo</p>
          </div>
        </div>

        <nav
          aria-label="Demo roles"
          className="order-3 flex w-full gap-1 overflow-x-auto rounded-2xl border border-white/8 bg-white/[0.035] p-1 sm:order-none sm:ml-auto sm:w-auto"
        >
          {ROLES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setRole(id)}
              aria-current={role === id ? 'page' : undefined}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-[11px] font-bold transition sm:px-4 sm:text-xs ${
                role === id
                  ? 'bg-gradient-to-r from-brand to-brand-2 text-[#1a1006] shadow-lg'
                  : 'text-muted hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          {role === 'customer' && (
            <button
              type="button"
              onClick={onOpenCart}
              className="btn-ghost relative !px-3"
              aria-label="Open basket"
            >
              <ShoppingBag size={15} />
              <span>Basket</span>
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-brand text-[10px] font-extrabold text-[#1a1006]">
                  {cartCount}
                </span>
              )}
            </button>
          )}
          <span className="hidden items-center gap-1.5 rounded-full border border-mint/25 bg-mint/10 px-2.5 py-1.5 text-[10px] font-bold text-mint md:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" /> Simulated data
          </span>
          <button
            type="button"
            onClick={resetDemo}
            className="btn-ghost !px-3"
            title="Reset all demo data"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  )
}
