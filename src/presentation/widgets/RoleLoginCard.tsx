import { ArrowRight, Bike, Check, LayoutDashboard, Store, UserRound } from 'lucide-react'
import type { DemoAccount } from '../../data/demoAccounts'

const ICONS = {
  customer: UserRound,
  merchant: Store,
  driver: Bike,
  admin: LayoutDashboard,
}

interface RoleLoginCardProps {
  account: DemoAccount
  onSignIn: (account: DemoAccount) => void
}

export function RoleLoginCard({ account, onSignIn }: RoleLoginCardProps) {
  const Icon = ICONS[account.role]

  return (
    <div className="widget widget-hover relative flex h-full flex-col overflow-hidden p-5">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-25"
        style={{ background: account.accent }}
      />
      <div className="relative flex items-start justify-between">
        <span
          className="grid h-12 w-12 place-items-center rounded-2xl border"
          style={{ color: account.accent, borderColor: `${account.accent}55`, background: `${account.accent}18` }}
        >
          <Icon size={22} />
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-muted">
          Demo access
        </span>
      </div>
      <p className="relative mt-5 text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: account.accent }}>
        {account.tagline}
      </p>
      <h3 className="relative mt-1 text-lg font-extrabold tracking-tight">{account.label}</h3>
      <p className="muted relative mt-2 text-xs leading-relaxed">{account.description}</p>
      <ul className="relative mt-4 space-y-2">
        {account.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-[11px] text-slate-300">
            <Check size={12} style={{ color: account.accent }} /> {feature}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => onSignIn(account)}
        className="btn-primary relative mt-auto w-full !py-3"
      >
        Sign in as {account.label} <ArrowRight size={15} />
      </button>
      <p className="muted relative mt-3 truncate text-center text-[10px]">{account.email}</p>
    </div>
  )
}
