import { BadgeCheck, ChefHat, CircleDollarSign, Clock3, Flame, Star, Store, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { getRestaurant } from '../../data/mockData'
import { money } from '../../lib/format'
import { useDemo } from '../../state/DemoContext'
import type { DemoOrder } from '../../types'
import { HourlyChart } from '../widgets/HourlyChart'
import { StatCard } from '../widgets/StatCard'
import { StatusBadge } from '../widgets/StatusBadge'
import { Toggle } from '../widgets/Toggle'

const ACTIONS: Partial<Record<DemoOrder['stage'], string>> = {
  confirmed: 'Accept order',
  preparing: 'Mark as ready',
  ready: 'Hand to rider',
}

export function MerchantView() {
  const { orders, advanceOrder, storeOnline, setStoreOnline, availability, toggleAvailability, showNotice } = useDemo()
  const [tab, setTab] = useState<'active' | 'completed'>('active')
  const store = getRestaurant('spice-vault')!
  const storeOrders = orders.filter((order) => order.restaurantId === store.id)
  const queue = storeOrders.filter((order) =>
    tab === 'active'
      ? ['confirmed', 'preparing', 'ready'].includes(order.stage)
      : ['picked', 'on-the-way', 'delivered'].includes(order.stage),
  )

  return (
    <div className="space-y-8">
      <section className="widget flex flex-wrap items-center gap-4 p-5 sm:p-6">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/15 text-2xl">🍲</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight">{store.name}</h1>
            <BadgeCheck size={18} className="text-brand-2" />
          </div>
          <p className="muted mt-1 text-xs">Bole Road, Addis Ababa · {store.cuisine}</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
          <div className={`h-2 w-2 rounded-full ${storeOnline ? 'bg-mint shadow-[0_0_10px_#21d6a5]' : 'bg-slate-500'}`} />
          <div>
            <p className="text-xs font-bold">{storeOnline ? 'Store is open' : 'Store is paused'}</p>
            <p className="muted text-[10px]">Accepting orders</p>
          </div>
          <Toggle
            checked={storeOnline}
            onChange={(value) => {
              setStoreOnline(value)
              showNotice(value ? 'Store is now open' : 'Store paused — no new orders')
            }}
            label="Toggle store status"
          />
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue today" value={money(18450)} hint="↑ 12.4% vs yesterday" icon={<CircleDollarSign size={17} />} tone="brand" />
        <StatCard label="Orders today" value="64" hint="8 currently in queue" icon={<Store size={17} />} tone="blue" />
        <StatCard label="Avg. prep time" value="14 min" hint="↓ 3 min from last week" icon={<Clock3 size={17} />} tone="mint" />
        <StatCard label="Store rating" value="4.8 ★" hint="From 1,240 reviews" icon={<Star size={17} />} tone="violet" />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="widget p-5 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="eyebrow">Operations</span>
              <h2 className="mt-1 text-lg font-extrabold">Order queue</h2>
            </div>
            <div className="inline-flex rounded-xl border border-white/8 bg-white/[0.035] p-1">
              {(['active', 'completed'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition ${tab === item ? 'bg-white/10 text-white' : 'text-muted'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {queue.length === 0 && (
              <div className="grid h-40 place-items-center text-center">
                <div>
                  <p className="text-2xl">🎉</p>
                  <p className="muted mt-2 text-xs">No orders in this view</p>
                </div>
              </div>
            )}
            {queue.map((order) => {
              const action = ACTIONS[order.stage]
              return (
                <div key={order.id} className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-extrabold">{order.id}</p>
                        <StatusBadge stage={order.stage} />
                      </div>
                      <p className="muted mt-1 text-[11px]">{order.placedAt} · {order.customer} · {order.address}</p>
                    </div>
                    <p className="text-sm font-extrabold text-brand-2">{money(order.total)}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {order.items.map((line) => (
                      <span key={line.name} className="rounded-lg bg-white/5 px-2 py-1 text-[11px] text-slate-300">
                        {line.emoji} {line.name} × {line.qty}
                      </span>
                    ))}
                  </div>
                  {action && (
                    <div className="mt-4 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => showNotice(`${order.id} declined (demo)`)}
                        className="btn-ghost !py-2 !text-[11px]"
                      >
                        Decline
                      </button>
                      <button
                        type="button"
                        onClick={() => advanceOrder(order.id)}
                        className="btn-primary !py-2 !text-[11px]"
                      >
                        {action}
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-5">
          <div className="widget p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="eyebrow">Today</span>
                <h3 className="mt-1 text-base font-extrabold">Orders by hour</h3>
              </div>
              <span className="rounded-lg bg-mint/12 px-2 py-1 text-[10px] font-bold text-mint">Peak 12:00</span>
            </div>
            <HourlyChart highlightHour="12" />
          </div>
          <div className="widget space-y-3 p-5">
            <p className="text-xs font-extrabold uppercase tracking-wider text-muted">Kitchen insights</p>
            {[
              { icon: <Flame size={15} />, title: 'Doro Wat Combo is your top seller', detail: '38 orders today' },
              { icon: <TrendingUp size={15} />, title: 'Lunch rush starts at 11:30', detail: 'Prep 6 extra portions' },
              { icon: <ChefHat size={15} />, title: 'Prep time improved by 3 min', detail: 'Keep it up!' },
            ].map((insight) => (
              <div key={insight.title} className="flex gap-3 rounded-xl border border-white/8 bg-white/[0.025] p-3">
                <span className="text-brand-2">{insight.icon}</span>
                <div>
                  <p className="text-[11px] font-bold">{insight.title}</p>
                  <p className="muted mt-0.5 text-[10px]">{insight.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="widget p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="eyebrow">Catalogue</span>
            <h2 className="mt-1 text-lg font-extrabold">Menu availability</h2>
          </div>
          <p className="muted text-[11px]">Flip a switch to simulate going out of stock</p>
        </div>
        <div className="grid gap-2.5 md:grid-cols-2">
          {store.menu.map((item) => (
            <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-lg">{item.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold">{item.name}</p>
                <p className="muted text-[10px]">{money(item.price)}</p>
              </div>
              <span className={`text-[10px] font-bold ${availability[item.id] ? 'text-mint' : 'text-muted'}`}>
                {availability[item.id] ? 'Available' : 'Out of stock'}
              </span>
              <Toggle
                checked={availability[item.id]}
                onChange={() => toggleAvailability(item.id)}
                label={`Toggle ${item.name} availability`}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
