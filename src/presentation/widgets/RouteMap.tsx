import type { OrderStage } from '../../types'

const PROGRESS: Record<OrderStage, number> = {
  placed: 0.06,
  confirmed: 0.16,
  preparing: 0.3,
  ready: 0.44,
  picked: 0.58,
  'on-the-way': 0.8,
  delivered: 1,
}

interface RouteMapProps {
  stage: OrderStage
  label?: string
}

export function RouteMap({ stage, label }: RouteMapProps) {
  const progress = PROGRESS[stage]
  const riderX = 40 + progress * 520
  const riderY = 152 - Math.sin(progress * Math.PI) * 66

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1524]">
      <svg viewBox="0 0 600 200" className="h-48 w-full sm:h-56" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Delivery route map">
        <defs>
          <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse">
            <path d="M 34 0 L 0 0 0 34" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
          </pattern>
          <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFB020" />
            <stop offset="100%" stopColor="#21D6A5" />
          </linearGradient>
        </defs>
        <rect width="600" height="200" fill="url(#grid)" />
        <g fill="rgba(255,255,255,0.035)">
          <rect x="18" y="16" width="92" height="46" rx="6" />
          <rect x="140" y="10" width="118" height="40" rx="6" />
          <rect x="298" y="18" width="86" height="58" rx="6" />
          <rect x="446" y="12" width="126" height="44" rx="6" />
          <rect x="26" y="86" width="74" height="48" rx="6" />
          <rect x="168" y="118" width="104" height="60" rx="6" />
          <rect x="314" y="110" width="122" height="66" rx="6" />
          <rect x="484" y="96" width="88" height="86" rx="6" />
        </g>
        <g stroke="rgba(255,255,255,0.11)" strokeWidth="7" fill="none">
          <path d="M0 76 H600" />
          <path d="M0 152 H600" />
          <path d="M124 0 V200" />
          <path d="M424 0 V200" />
        </g>
        <path
          d="M40 152 C 150 152, 170 86, 290 86 S 430 152, 560 152"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M40 152 C 150 152, 170 86, 290 86 S 430 152, 560 152"
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10 8"
          className={stage === 'delivered' ? '' : 'animate-dash'}
        />
        <g>
          <circle cx="40" cy="152" r="11" fill="#FFB020" opacity="0.2" />
          <circle cx="40" cy="152" r="6" fill="#FFB020" />
          <text x="40" y="133" textAnchor="middle" fontSize="18">🍽️</text>
          <circle cx="560" cy="152" r="11" fill="#21D6A5" opacity="0.2" />
          <circle cx="560" cy="152" r="6" fill="#21D6A5" />
          <text x="560" y="133" textAnchor="middle" fontSize="18">📍</text>
        </g>
        <g style={{ transform: `translate(${riderX}px, ${riderY}px)`, transition: 'transform 900ms cubic-bezier(.4,0,.2,1)' }}>
          <circle r="18" fill="#FF6B35" opacity="0.16" />
          <circle r="11" fill="#FF6B35" stroke="#FFD3BC" strokeWidth="2" />
          <text y="6" textAnchor="middle" fontSize="13">🛵</text>
        </g>
      </svg>
      {label && (
        <div className="absolute bottom-3 left-3 rounded-lg border border-white/10 bg-black/55 px-3 py-1.5 text-[11px] font-semibold backdrop-blur">
          {label}
        </div>
      )}
      <div className="absolute right-3 top-3 rounded-lg border border-white/10 bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-mint backdrop-blur">
        Live map
      </div>
    </div>
  )
}
