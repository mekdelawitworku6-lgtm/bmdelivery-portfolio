import { Bike, CheckCircle2, CircleDollarSign, MapPin, Navigation, PackageCheck, Star, Timer } from 'lucide-react'
import { DRIVER_DELIVERIES } from '../../data/mockData'
import { money } from '../../lib/format'
import { useDemo } from '../../state/DemoContext'
import { RouteMap } from '../widgets/RouteMap'
import { StatCard } from '../widgets/StatCard'
import { StatusBadge } from '../widgets/StatusBadge'
import { Toggle } from '../widgets/Toggle'

export function DriverView() {
  const { orders, advanceOrder, driverOnline, setDriverOnline, showNotice } = useDemo()
  const active =
    orders.find((order) => order.stage === 'ready') ??
    orders.find((order) => order.stage === 'picked') ??
    orders.find((order) => order.stage === 'on-the-way')

  const action = active
    ? active.stage === 'ready'
      ? { label: 'Pick up order', next: 'picked' }
      : active.stage === 'picked'
        ? { label: 'Start delivery', next: 'on-the-way' }
        : { label: 'Mark as delivered', next: 'delivered' }
    : null

  return (
    <div className="space-y-8">
      <section className="widget flex flex-wrap items-center gap-4 p-5 sm:p-6">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-2 to-brand text-sm font-black">DK</span>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-extrabold tracking-tight">Daniel K.</h1>
          <p className="muted mt-1 text-xs">Bike rider · Addis Ababa · 4.9 ★</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
          <div className={`h-2 w-2 rounded-full ${driverOnline ? 'bg-mint shadow-[0_0_10px_#21d6a5]' : 'bg-slate-500'}`} />
          <div>
            <p className="text-xs font-bold">{driverOnline ? 'You are online' : 'You are offline'}</p>
            <p className="muted text-[10px]">{driverOnline ? 'Receiving new requests' : 'Requests paused'}</p>
          </div>
          <Toggle checked={driverOnline} onChange={setDriverOnline} label="Toggle driver online status" />
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Earnings today" value={money(1240)} hint="↑ 8% vs yesterday" icon={<CircleDollarSign size={17} />} tone="brand" />
        <StatCard label="Deliveries" value="18" hint="3 more than yesterday" icon={<PackageCheck size={17} />} tone="mint" />
        <StatCard label="Acceptance rate" value="96%" hint="Last 30 days" icon={<Timer size={17} />} tone="blue" />
        <StatCard label="Customer rating" value="4.9 ★" hint="From 620 ratings" icon={<Star size={17} />} tone="violet" />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="widget p-5 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="eyebrow">Current job</span>
              <h2 className="mt-1 text-lg font-extrabold">Active delivery</h2>
            </div>
            {active && <StatusBadge stage={active.stage} />}
          </div>
          {!driverOnline && (
            <div className="mb-4 rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-xs font-semibold text-amber-200">
              You are offline. Go online to continue this delivery.
            </div>
          )}
          {active ? (
            <>
              <RouteMap stage={active.stage} label={`${active.etaMin} min · ${active.city}`} />
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-brand-2">Pickup</p>
                  <p className="text-sm font-bold">{active.restaurantName}</p>
                  <p className="muted mt-1 text-[11px]">Bole Road, Addis Ababa</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {active.items.map((line) => (
                      <span key={line.name} className="rounded-lg bg-white/5 px-2 py-1 text-[10px] text-slate-300">
                        {line.emoji} × {line.qty}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-mint">Drop-off</p>
                  <p className="text-sm font-bold">{active.customer}</p>
                  <p className="muted mt-1 text-[11px]">{active.address}</p>
                  <p className="mt-3 text-xs font-extrabold text-brand-2">Earning {money(78)}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="muted text-[11px]">Order {active.id} · placed {active.placedAt}</p>
                <button
                  type="button"
                  disabled={!driverOnline}
                  onClick={() => {
                    advanceOrder(active.id)
                    showNotice(`${active.id}: ${action?.label.toLowerCase()}`)
                  }}
                  className="btn-primary"
                >
                  {active.stage === 'delivered' ? <CheckCircle2 size={15} /> : <Navigation size={15} />}
                  {action?.label ?? 'Complete'}
                </button>
              </div>
            </>
          ) : (
            <div className="grid h-72 place-items-center text-center">
              <div>
                <p className="text-4xl">☕</p>
                <p className="mt-4 text-sm font-bold">No active delivery</p>
                <p className="muted mt-1 text-xs">You are all caught up for now.</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="widget p-5">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-wider text-muted">Recent deliveries</p>
            <div className="space-y-2">
              {DRIVER_DELIVERIES.map((delivery) => (
                <div key={delivery.id} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-mint/12 text-mint"><CheckCircle2 size={15} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-bold">{delivery.restaurant}</p>
                    <p className="muted truncate text-[10px]">{delivery.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-mint">+{money(delivery.earning)}</p>
                    <p className="muted text-[9px]">{delivery.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="widget p-5">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-wider text-muted">Your vehicle</p>
            <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/12 text-brand-2"><Bike size={20} /></span>
              <div>
                <p className="text-sm font-bold">Bajaj Boxer</p>
                <p className="muted text-[11px]">Plate AA-4829 · Bole zone</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-[11px]">
              <MapPin size={13} className="text-brand-2" />
              <span className="muted">Current zone</span>
              <span className="ml-auto font-bold">Bole, Addis Ababa</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
