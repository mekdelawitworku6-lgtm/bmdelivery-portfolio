import { Bike, LayoutDashboard, LogOut, RotateCcw, ShoppingBag, Store, UserRound } from 'lucide-react'
import { accountForRole } from '../../data/demoAccounts'
import { useDemo } from '../../state/DemoContext'
import type { Role } from '../../types'

const ROLE_ICONS: Record<Role, typeof UserRound> = {
  customer: UserRound,
  merchant: Store,
  driver: Bike,
  admin: LayoutDashboard,
}

interface TopBarProps {
  onOpenCart: () => void
  onSwitchRole: () => void
}

export function TopBar({ onOpenCart, onSwitchRole }: TopBarProps) {
  const { role, cartCount, resetDemo } = useDemo()
  const account = accountForRole(role)
  const RoleIcon = ROLE_ICONS[role]

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

        <div
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-[11px] font-bold"
          title={account.email}
        >
          <RoleIcon size={14} style={{ color: account.accent }} />
          <span className="text-muted">Signed in as</span>
          <span>{account.label}</span>
          <span className="ml-1 h-1.5 w-1.5 rounded-full bg-mint" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button type="button" onClick={onSwitchRole} className="btn-ghost !px-3" title="Back to role selection">
            <LogOut size={14} />
            <span className="hidden sm:inline">Switch role</span>
          </button>
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
