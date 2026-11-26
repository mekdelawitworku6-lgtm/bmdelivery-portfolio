import { Clock3, Star } from 'lucide-react'
import { useState } from 'react'
import { money } from '../../lib/format'
import type { Restaurant } from '../../types'

interface RestaurantCardProps {
  restaurant: Restaurant
  onOpen: (restaurant: Restaurant) => void
}

export function RestaurantCard({ restaurant, onOpen }: RestaurantCardProps) {
  const [failed, setFailed] = useState(false)

  return (
    <button
      type="button"
      onClick={() => onOpen(restaurant)}
      className="widget widget-hover group overflow-hidden text-left"
    >
      <div className="relative h-36 overflow-hidden">
        {failed ? (
          <div
            className="grid h-full place-items-center text-5xl"
            style={{ background: `linear-gradient(135deg, ${restaurant.accent}44, #101a2c)` }}
          >
            {restaurant.emoji}
          </div>
        ) : (
          <img
            src={restaurant.image}
            alt={restaurant.name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1627] via-transparent to-transparent" />
        {restaurant.badge && (
          <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-bold backdrop-blur">
            {restaurant.badge}
          </span>
        )}
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full border border-white/15 bg-black/65 px-2 py-1 text-[11px] font-bold backdrop-blur">
          <Star size={11} className="fill-brand-2 text-brand-2" />
          {restaurant.rating}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-extrabold tracking-tight">{restaurant.name}</h3>
        <p className="muted mt-1 text-[11px]">{restaurant.cuisine}</p>
        <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3 text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Clock3 size={13} className="text-mint" />
            {restaurant.etaMin[0]}–{restaurant.etaMin[1]} min
          </span>
          <span className="muted">{money(restaurant.deliveryFee)} delivery</span>
        </div>
      </div>
    </button>
  )
}
