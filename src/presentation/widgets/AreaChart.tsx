import { HOURLY_ORDERS } from '../../data/mockData'

export function AreaChart() {
  const width = 620
  const height = 190
  const values = HOURLY_ORDERS.map((row) => row.revenue)
  const max = Math.max(...values)
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width
    const y = height - (value / max) * (height - 24) - 12
    return [x, y] as const
  })
  const line = points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${line} L${width},${height} L0,${height} Z`

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full" preserveAspectRatio="none" role="img" aria-label="Revenue by hour">
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="revenueLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFB020" />
            <stop offset="100%" stopColor="#FF6B35" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((line) => (
          <line
            key={line}
            x1="0"
            x2={width}
            y1={height * line}
            y2={height * line}
            stroke="rgba(255,255,255,0.07)"
            strokeDasharray="4 6"
          />
        ))}
        <path d={area} fill="url(#revenueFill)" />
        <path d={line} fill="none" stroke="url(#revenueLine)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {points.map(([x, y], index) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={index === 4 ? 5 : 2.5}
            fill={index === 4 ? '#FFB020' : '#101a2c'}
            stroke="#FFB020"
            strokeWidth="2"
          />
        ))}
      </svg>
      <div className="mt-1 flex justify-between text-[10px] text-muted">
        {HOURLY_ORDERS.filter((_, index) => index % 2 === 0).map((row) => (
          <span key={row.hour}>{row.hour}:00</span>
        ))}
      </div>
    </div>
  )
}
