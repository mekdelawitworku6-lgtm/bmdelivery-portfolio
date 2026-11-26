import { Activity, Building2, CircleDollarSign, Package, Truck } from 'lucide-react'
import { useState } from 'react'
import { ADMIN_DRIVERS, ADMIN_MERCHANTS, CITY_VOLUME } from '../../data/mockData'
import { money } from '../../lib/format'
import { useDemo } from '../../state/DemoContext'
import type { OrderStage } from '../../types'
import { AreaChart } from '../widgets/AreaChart'
import { StatCard } from '../widgets/StatCard'
import { StatusBadge } from '../widgets/StatusBadge'

type TableTab = 'orders' | 'merchants' | 'drivers'
type OrderFilter = 'all' | 'active' | 'completed'

const isActive = (stage: OrderStage) => !['picked', 'on-the-way', 'delivered'].includes(stage)

export function AdminView() {
  const { orders } = useDemo()
  const [table, setTable] = useState<TableTab>('orders')
  const [filter, setFilter] = useState<OrderFilter>('all')
  const visibleOrders = orders.filter((order) =>
    filter === 'all' ? true : filter === 'active' ? isActive(order.stage) : !isActive(order.stage),
  )

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Control tower</span>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">Operations overview</h1>
          <p className="muted mt-2 text-xs">A live view of the marketplace, fleet and order flow.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-mint/25 bg-mint/10 px-3 py-2 text-[11px] font-bold text-mint">
          <Activity size={14} /> Live demo data · updated now
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="GMV this month" value={money(2840000)} hint="↑ 18.2% vs last month" icon={<CircleDollarSign size={17} />} tone="brand" />
        <StatCard label="Active orders" value="128" hint="Across 5 cities" icon={<Package size={17} />} tone="blue" />
        <StatCard label="Active drivers" value="42" hint="86% acceptance rate" icon={<Truck size={17} />} tone="mint" />
        <StatCard label="Merchants" value="68" hint="6 pending approval" icon={<Building2 size={17} />} tone="violet" />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="widget p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="eyebrow">Today</span>
              <h2 className="mt-1 text-lg font-extrabold">Revenue trend</h2>
            </div>
            <p className="text-sm font-extrabold text-mint">{money(184500)}</p>
          </div>
          <AreaChart />
        </div>
        <div className="widget p-5 sm:p-6">
          <div className="mb-5">
            <span className="eyebrow">Coverage</span>
            <h2 className="mt-1 text-lg font-extrabold">Orders by city</h2>
          </div>
          <div className="space-y-4">
            {CITY_VOLUME.map((city) => (
              <div key={city.city}>
                <div className="mb-1.5 flex justify-between text-[11px]">
                  <span className="font-semibold text-slate-300">{city.city}</span>
                  <span className="muted">{city.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
                    style={{ width: `${city.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-white/8 bg-white/[0.025] p-3 text-[11px] text-muted">
            <span className="font-bold text-mint">+2 new cities</span> added this quarter.
          </div>
        </div>
      </section>

      <section className="widget overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-4 sm:px-6">
          <div className="inline-flex rounded-xl border border-white/8 bg-white/[0.035] p-1">
            {([
              ['orders', 'Live orders'],
              ['merchants', 'Merchants'],
              ['drivers', 'Drivers'],
            ] as [TableTab, string][]).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTable(id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition ${table === id ? 'bg-white/10 text-white' : 'text-muted'}`}
              >
                {label}
              </button>
            ))}
          </div>
          {table === 'orders' && (
            <div className="inline-flex rounded-xl border border-white/8 bg-white/[0.035] p-1">
              {(['all', 'active', 'completed'] as OrderFilter[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-3 py-1.5 text-[11px] font-bold capitalize transition ${filter === item ? 'bg-brand/20 text-brand-2' : 'text-muted'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          {table === 'orders' && (
            <table className="w-full min-w-[680px] text-left text-xs">
              <thead className="text-[10px] uppercase tracking-wider text-muted">
                <tr className="border-b border-white/8">
                  <th className="px-6 py-3">Order</th>
                  <th className="px-4 py-3">Restaurant</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {visibleOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 transition hover:bg-white/[0.025]">
                    <td className="px-6 py-3 font-bold">{order.id}</td>
                    <td className="px-4 py-3 text-slate-300">{order.restaurantName}</td>
                    <td className="px-4 py-3 text-slate-300">{order.customer}</td>
                    <td className="px-4 py-3 text-muted">{order.city}</td>
                    <td className="px-4 py-3"><StatusBadge stage={order.stage} /></td>
                    <td className="px-6 py-3 text-right font-bold text-brand-2">{money(order.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {table === 'merchants' && (
            <table className="w-full min-w-[680px] text-left text-xs">
              <thead className="text-[10px] uppercase tracking-wider text-muted">
                <tr className="border-b border-white/8">
                  <th className="px-6 py-3">Merchant</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Orders</th>
                  <th className="px-4 py-3">GMV</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {ADMIN_MERCHANTS.map((merchant) => (
                  <tr key={merchant.name} className="border-b border-white/5 transition hover:bg-white/[0.025]">
                    <td className="px-6 py-3 font-bold">{merchant.name}</td>
                    <td className="px-4 py-3 text-muted">{merchant.city}</td>
                    <td className="px-4 py-3 text-slate-300">{merchant.orders}</td>
                    <td className="px-4 py-3 text-slate-300">{money(merchant.gmv)}</td>
                    <td className="px-4 py-3 text-brand-2">★ {merchant.rating}</td>
                    <td className="px-6 py-3 text-right">
                      <span className={`rounded-full border px-2 py-1 text-[10px] font-bold ${merchant.status === 'Active' ? 'border-mint/25 bg-mint/10 text-mint' : 'border-amber-400/25 bg-amber-400/10 text-amber-300'}`}>
                        {merchant.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {table === 'drivers' && (
            <table className="w-full min-w-[680px] text-left text-xs">
              <thead className="text-[10px] uppercase tracking-wider text-muted">
                <tr className="border-b border-white/8">
                  <th className="px-6 py-3">Driver</th>
                  <th className="px-4 py-3">Zone</th>
                  <th className="px-4 py-3">Deliveries</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {ADMIN_DRIVERS.map((driver) => (
                  <tr key={driver.name} className="border-b border-white/5 transition hover:bg-white/[0.025]">
                    <td className="px-6 py-3 font-bold">{driver.name}</td>
                    <td className="px-4 py-3 text-muted">{driver.zone}</td>
                    <td className="px-4 py-3 text-slate-300">{driver.deliveries}</td>
                    <td className="px-4 py-3 text-brand-2">★ {driver.rating}</td>
                    <td className="px-6 py-3 text-right text-slate-300">{driver.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  )
}
