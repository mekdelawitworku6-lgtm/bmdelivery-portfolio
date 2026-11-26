import { HOURLY_ORDERS } from '../../data/mockData'

interface HourlyChartProps {
  metric?: 'orders' | 'revenue'
  highlightHour?: string
}

export function HourlyChart({ metric = 'orders', highlightHour }: HourlyChartProps) {
  const values = HOURLY_ORDERS.map((row) => row[metric])
  const max = Math.max(...values)

  return (
    <div>
      <div className="relative flex h-44 items-end gap-1.5 border-b border-white/10 px-1 sm:gap-2.5">
        {[0.25, 0.5, 0.75].map((line) => (
          <div
            key={line}
            className="pointer-events-none absolute left-0 right-0 border-t border-dashed border-white/7"
            style={{ bottom: `${line * 100}%` }}
          />
        ))}
        {HOURLY_ORDERS.map((row) => {
          const value = row[metric]
          const isPeak = value === max
          const isHighlighted = highlightHour === row.hour
          return (
            <div
              key={row.hour}
              className="group relative flex h-full flex-1 items-end justify-center"
              title={`${row.hour}:00 — ${metric === 'orders' ? `${value} orders` : `ETB ${value.toLocaleString()}`}`}
            >
              <div
                className={`w-full max-w-7 rounded-t-md transition-all duration-300 ${
                  isPeak || isHighlighted
                    ? 'bg-gradient-to-t from-brand/60 to-brand-2'
                    : 'bg-gradient-to-t from-sky-500/20 to-sky-400/60 group-hover:to-brand'
                }`}
                style={{ height: `${Math.max(8, (value / max) * 100)}%` }}
              />
              <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#0b1220] px-2 py-1 text-[10px] font-semibold opacity-0 shadow-xl transition group-hover:opacity-100">
                {metric === 'orders' ? `${value} orders` : `ETB ${value.toLocaleString()}`}
              </span>
            </div>
          )
        })}
      </div>
      <div className="mt-2 flex gap-1.5 px-1 sm:gap-2.5">
        {HOURLY_ORDERS.map((row) => (
          <span key={row.hour} className="flex-1 text-center text-[9px] text-muted">
            {indexLabel(row.hour)}
          </span>
        ))}
      </div>
    </div>
  )
}

function indexLabel(hour: string) {
  return Number(hour) % 2 === 0 ? hour : ''
}
