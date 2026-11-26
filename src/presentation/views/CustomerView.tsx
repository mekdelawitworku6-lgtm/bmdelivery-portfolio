import { ArrowRight, Bike, ChevronRight, Clock3, MapPin, Navigation, Play, Search, ShoppingBag, Star } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { CATEGORIES, RESTAURANTS } from '../../data/mockData'
import { money } from '../../lib/format'
import { useDemo } from '../../state/DemoContext'
import type { Restaurant } from '../../types'
import { RestaurantCard } from '../widgets/RestaurantCard'
import { RestaurantModal } from '../widgets/RestaurantModal'
import { RouteMap } from '../widgets/RouteMap'
import { StatusBadge } from '../widgets/StatusBadge'
import { OrderTimeline } from '../widgets/OrderTimeline'

export function CustomerView({ onOpenCart }: { onOpenCart: () => void }) {
  const { orders, trackedOrder, trackingId, setTrackingId, advanceOrder } = useDemo()
  const [tab, setTab] = useState<'discover' | 'track'>('discover')
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Restaurant | null>(null)

  useEffect(() => {
    if (trackingId) setTab('track')
  }, [trackingId])

  useEffect(() => {
    if (!trackedOrder || trackedOrder.stage === 'delivered') return
    const timer = window.setTimeout(() => advanceOrder(trackedOrder.id), 16000)
    return () => window.clearTimeout(timer)
  }, [trackedOrder, advanceOrder])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return RESTAURANTS.filter((restaurant) => {
      const matchesCategory = category === 'all' || restaurant.tags.includes(category)
      const matchesSearch =
        !query ||
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisine.toLowerCase().includes(query) ||
        restaurant.menu.some((item) => item.name.toLowerCase().includes(query))
      return matchesCategory && matchesSearch
    })
  }, [category, search])

  const activeOrder = trackedOrder ?? orders[0]

  return (
    <div className="space-y-12">
      <section className="relative grid items-center gap-8 overflow-hidden rounded-[28px] border border-white/8 bg-panel/60 px-6 py-10 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-14">
        <div className="hero-glow pointer-events-none absolute -left-24 -top-32 h-80 w-80 rounded-full blur-3xl" />
        <div className="relative">
          <span className="eyebrow">Food, delivered beautifully</span>
          <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
            Cravings? <span className="bg-gradient-to-r from-brand-2 to-brand bg-clip-text text-transparent">Consider them handled.</span>
          </h1>
          <p className="muted mt-5 max-w-lg text-sm leading-relaxed sm:text-base">
            Discover neighbourhood favourites, order in seconds and watch your rider arrive in real time. This is a fully interactive demo with simulated data.
          </p>
          <div className="mt-7 flex max-w-lg flex-col gap-2.5 sm:flex-row">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search food, restaurants or cuisines"
                aria-label="Search food"
                className="input !py-3.5 !pl-11"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setTab('discover')
                window.setTimeout(() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' }), 60)
              }}
              className="btn-primary !py-3.5"
            >
              Explore <ArrowRight size={15} />
            </button>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-semibold text-slate-300">
            <span className="flex items-center gap-1.5"><MapPin size={13} className="text-brand-2" /> Addis Ababa</span>
            <span className="flex items-center gap-1.5"><Clock3 size={13} className="text-mint" /> 18 min average</span>
            <span className="flex items-center gap-1.5"><Star size={13} className="fill-brand-2 text-brand-2" /> 4.8 average rating</span>
          </div>
        </div>

        <div className="relative hidden justify-center lg:flex">
          <div className="animate-float widget w-full max-w-sm rotate-[-3deg] p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-mint">Live order</span>
              <span className="rounded-full border border-mint/25 bg-mint/10 px-2 py-0.5 text-[10px] font-bold text-mint">On time</span>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/15 text-2xl">🍲</span>
              <div>
                <p className="text-sm font-extrabold">Spice Vault</p>
                <p className="muted text-[11px]">Doro Wat Combo · +2 items</p>
              </div>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-brand to-brand-2" />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="muted">Rider Daniel is nearby</span>
              <span className="font-bold text-brand-2">8 min left</span>
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-2 to-brand text-sm font-black">DK</span>
              <div className="flex-1">
                <p className="text-xs font-bold">Daniel K.</p>
                <p className="muted text-[10px]">Bike · 4.9 ★</p>
              </div>
              <Bike size={18} className="text-brand-2" />
            </div>
          </div>
          <div className="animate-float absolute -bottom-4 -right-2 widget rotate-[5deg] px-4 py-3" style={{ animationDelay: '1.2s' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-mint">ETA</p>
            <p className="mt-1 text-xl font-extrabold">12<span className="text-sm text-muted"> min</span></p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { value: '2,400+', label: 'Restaurants', icon: '🍽️' },
          { value: '18 min', label: 'Average delivery', icon: '⚡' },
          { value: '4.9 / 5', label: 'Customer rating', icon: '⭐' },
          { value: '24 / 7', label: 'Live support', icon: '💬' },
        ].map((stat) => (
          <div key={stat.label} className="widget flex items-center gap-3 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-lg">{stat.icon}</span>
            <div>
              <p className="text-base font-extrabold">{stat.value}</p>
              <p className="muted text-[11px]">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="eyebrow">Explore</span>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight">What are you craving?</h2>
          </div>
          <div className="inline-flex rounded-xl border border-white/8 bg-white/[0.035] p-1">
            <button
              type="button"
              onClick={() => setTab('discover')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${tab === 'discover' ? 'bg-white/10 text-white' : 'text-muted'}`}
            >
              Discover
            </button>
            <button
              type="button"
              onClick={() => setTab('track')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${tab === 'track' ? 'bg-white/10 text-white' : 'text-muted'}`}
            >
              My orders {orders.length > 0 && <span className="text-brand-2">· {orders.length}</span>}
            </button>
          </div>
        </div>

        {tab === 'discover' ? (
          <div id="discover" className="space-y-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {CATEGORIES.map((categoryItem) => (
                <button
                  key={categoryItem.id}
                  type="button"
                  onClick={() => setCategory(categoryItem.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition ${
                    category === categoryItem.id
                      ? 'border-brand/50 bg-brand/15 text-brand-2'
                      : 'border-white/8 bg-white/[0.03] text-muted hover:text-white'
                  }`}
                >
                  <span>{categoryItem.emoji}</span> {categoryItem.label}
                </button>
              ))}
            </div>

            {filtered.length ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {filtered.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} onOpen={setSelected} />
                ))}
              </div>
            ) : (
              <div className="widget grid h-48 place-items-center text-center">
                <div>
                  <p className="text-2xl">🔍</p>
                  <p className="mt-3 text-sm font-bold">No matches found</p>
                  <button type="button" onClick={() => { setSearch(''); setCategory('all') }} className="btn-ghost mt-3">
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="widget overflow-hidden p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-muted">Tracking</p>
                  <h3 className="text-lg font-extrabold">{activeOrder?.id}</h3>
                </div>
                {activeOrder && <StatusBadge stage={activeOrder.stage} />}
              </div>
              {activeOrder && (
                <>
                  <RouteMap stage={activeOrder.stage} label={activeOrder.address} />
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="mb-4 text-xs font-extrabold uppercase tracking-wider text-muted">Delivery progress</p>
                      <OrderTimeline stage={activeOrder.stage} />
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                        <p className="mb-3 text-xs font-extrabold uppercase tracking-wider text-muted">Your rider</p>
                        <div className="flex items-center gap-3">
                          <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-2 to-brand text-sm font-black">DK</span>
                          <div>
                            <p className="text-sm font-bold">{activeOrder.driver}</p>
                            <p className="muted text-[11px]">Bike · 4.9 ★ · 1,240 deliveries</p>
                          </div>
                          <Navigation size={16} className="ml-auto text-mint" />
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                        <p className="mb-3 text-xs font-extrabold uppercase tracking-wider text-muted">Order summary</p>
                        {activeOrder.items.map((line) => (
                          <div key={line.name} className="flex justify-between py-1 text-xs">
                            <span className="text-slate-300">{line.emoji} {line.name} × {line.qty}</span>
                            <span className="muted">{money(line.price * line.qty)}</span>
                          </div>
                        ))}
                        <div className="mt-2 flex justify-between border-t border-white/10 pt-2 text-sm font-extrabold">
                          <span>Total</span>
                          <span className="text-brand-2">{money(activeOrder.total)}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => advanceOrder(activeOrder.id)}
                        disabled={activeOrder.stage === 'delivered'}
                        className="btn-primary w-full"
                      >
                        <Play size={14} /> Simulate next update
                      </button>
                      <p className="muted text-center text-[10px]">Status also advances automatically every 16 seconds.</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="widget h-fit p-5">
              <p className="mb-4 text-xs font-extrabold uppercase tracking-wider text-muted">Order history</p>
              <div className="space-y-2">
                {orders.slice(0, 7).map((order) => (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() => setTrackingId(order.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
                      activeOrder?.id === order.id
                        ? 'border-brand/40 bg-brand/10'
                        : 'border-white/8 bg-white/[0.02] hover:bg-white/5'
                    }`}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/5 text-lg">
                      {order.items[0]?.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold">{order.restaurantName}</p>
                      <p className="muted text-[10px]">{order.id} · {order.placedAt}</p>
                    </div>
                    <StatusBadge stage={order.stage} />
                    <ChevronRight size={14} className="shrink-0 text-muted" />
                  </button>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                <p className="flex items-center gap-2 text-xs font-bold">
                  <ShoppingBag size={14} className="text-brand-2" /> Ready to order again?
                </p>
                <button type="button" onClick={() => setTab('discover')} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-2">
                  Browse restaurants <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <RestaurantModal
        restaurant={selected}
        onClose={() => setSelected(null)}
        onViewBasket={() => {
          setSelected(null)
          onOpenCart()
        }}
      />
    </div>
  )
}
