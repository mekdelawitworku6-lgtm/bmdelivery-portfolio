import { ArrowRight, Bike, ChefHat, LayoutDashboard, MapPin, ShoppingBag, Store, UserRound } from 'lucide-react'
import { DEMO_ACCOUNTS, type DemoAccount } from '../../data/demoAccounts'
import { HowItWorksStep } from '../widgets/HowItWorksStep'
import { RoleLoginCard } from '../widgets/RoleLoginCard'

export function LandingView({ onSignIn }: { onSignIn: (account: DemoAccount) => void }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/8 bg-[#070b14]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-2 to-brand text-lg shadow-[0_6px_20px_-6px_rgba(255,107,53,0.8)]">
              🛵
            </div>
            <div className="leading-tight">
              <p className="text-sm font-extrabold tracking-tight">BMDelivery</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-2">Interactive demo</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-ghost !py-2"
          >
            How it works <ArrowRight size={14} />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-20 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section className="relative grid items-center gap-10 overflow-hidden rounded-[28px] border border-white/8 bg-panel/60 px-6 py-12 sm:px-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="hero-glow pointer-events-none absolute -left-28 -top-36 h-96 w-96 rounded-full blur-3xl" />
          <div className="relative">
            <span className="eyebrow">BMDelivery · Product tour</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              One platform.{' '}
              <span className="bg-gradient-to-r from-brand-2 to-brand bg-clip-text text-transparent">
                Four sides of every delivery.
              </span>
            </h1>
            <p className="muted mt-6 max-w-xl text-sm leading-relaxed sm:text-base">
              Follow a single order from the customer's first tap to the admin's live dashboard. Pick a role, sign in with the prefilled demo account, and explore the whole workflow — no backend, no setup, no real data.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onSignIn(DEMO_ACCOUNTS[0])}
                className="btn-primary !px-6 !py-3.5"
              >
                Sign in as Customer <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-ghost !px-6 !py-3.5"
              >
                See how it works
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold text-slate-300">
              <span className="flex items-center gap-1.5"><MapPin size={13} className="text-brand-2" /> Addis Ababa</span>
              <span className="flex items-center gap-1.5"><Bike size={13} className="text-mint" /> Live rider tracking</span>
              <span className="flex items-center gap-1.5"><ShoppingBag size={13} className="text-brand-2" /> 8 demo restaurants</span>
            </div>
          </div>

          <div className="relative hidden justify-center lg:flex">
            <div className="animate-float widget w-full max-w-sm rotate-[-3deg] p-5">
              <div className="flex items-center justify-between">
                <span className="eyebrow">One order, four views</span>
                <span className="rounded-full border border-mint/25 bg-mint/10 px-2 py-0.5 text-[10px] font-bold text-mint">Live</span>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { icon: <UserRound size={16} />, label: 'Customer', detail: 'Placed the order', color: '#FF6B35' },
                  { icon: <ChefHat size={16} />, label: 'Merchant', detail: 'Preparing the food', color: '#FFB020' },
                  { icon: <Bike size={16} />, label: 'Driver', detail: 'Rider on the way', color: '#21D6A5' },
                  { icon: <LayoutDashboard size={16} />, label: 'Admin', detail: 'Order visible in control tower', color: '#7B8CFF' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.025] p-3">
                    <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ color: row.color, background: `${row.color}20` }}>
                      {row.icon}
                    </span>
                    <div>
                      <p className="text-xs font-bold">{row.label}</p>
                      <p className="muted text-[10px]">{row.detail}</p>
                    </div>
                    <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: row.color }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-float absolute -bottom-5 -right-1 widget rotate-[5deg] px-4 py-3" style={{ animationDelay: '1.4s' }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-mint">ETA</p>
              <p className="mt-1 text-xl font-extrabold">12<span className="text-sm text-muted"> min</span></p>
            </div>
          </div>
        </section>

        <section id="how-it-works">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="eyebrow">How it works</span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">Follow the journey</h2>
            </div>
            <p className="muted max-w-md text-xs">Each role sees the same order from a different angle. Sign in as any of them to explore.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <HowItWorksStep
              number="01"
              title="Customer orders"
              description="Find a restaurant, add dishes to the basket and place an order with one tap."
              icon={<UserRound size={20} />}
              accent="#FF6B35"
            />
            <HowItWorksStep
              number="02"
              title="Merchant prepares"
              description="The store accepts the order, prepares it and marks it ready for pickup."
              icon={<ChefHat size={20} />}
              accent="#FFB020"
            />
            <HowItWorksStep
              number="03"
              title="Driver delivers"
              description="A rider picks up the order and moves it through pickup, transit and delivery."
              icon={<Bike size={20} />}
              accent="#21D6A5"
            />
            <HowItWorksStep
              number="04"
              title="Admin observes"
              description="The control tower shows every order, merchant, driver and revenue trend in real time."
              icon={<LayoutDashboard size={20} />}
              accent="#7B8CFF"
            />
          </div>
        </section>

        <section id="roles">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="eyebrow">Choose a role</span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">Sign in to explore</h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-muted">
              Pre-filled credentials · any password works
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEMO_ACCOUNTS.map((account) => (
              <RoleLoginCard key={account.role} account={account} onSignIn={onSignIn} />
            ))}
          </div>
        </section>

        <section className="widget flex flex-wrap items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-brand-2"><Store size={20} /></span>
            <div>
              <p className="text-sm font-extrabold">Everything here is simulated</p>
              <p className="muted mt-0.5 text-[11px]">No database, no API calls, no payments. Use Reset inside the app to restore the demo.</p>
            </div>
          </div>
          <button type="button" onClick={() => onSignIn(DEMO_ACCOUNTS[3])} className="btn-ghost">
            Explore as Admin <ArrowRight size={14} />
          </button>
        </section>
      </main>

      <footer className="border-t border-white/8 px-4 py-8 text-center sm:px-6">
        <p className="text-xs font-bold">BMDelivery · Interactive portfolio demo</p>
        <div className="mt-3 flex justify-center gap-2 text-[10px] font-semibold text-muted">
          {['React', 'TypeScript', 'Vite', 'Tailwind CSS'].map((tech) => (
            <span key={tech} className="rounded-full border border-white/8 px-2 py-1">{tech}</span>
          ))}
        </div>
      </footer>
    </div>
  )
}
