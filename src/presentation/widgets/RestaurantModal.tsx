import { Clock3, MapPin, Plus, ShoppingBag, Star } from 'lucide-react'
import { money } from '../../lib/format'
import { useDemo } from '../../state/DemoContext'
import type { Restaurant } from '../../types'
import { Drawer } from './Drawer'

interface RestaurantModalProps {
  restaurant: Restaurant | null
  onClose: () => void
  onViewBasket: () => void
}

export function RestaurantModal({ restaurant, onClose, onViewBasket }: RestaurantModalProps) {
  const { addToCart, cartCount } = useDemo()
  if (!restaurant) return null

  return (
    <Drawer
      open={Boolean(restaurant)}
      onClose={onClose}
      title={restaurant.name}
      subtitle={`${restaurant.cuisine} · ${restaurant.rating} ★ (${restaurant.reviews.toLocaleString()} reviews)`}
      variant="center"
    >
      <div className="relative mb-5 h-36 overflow-hidden rounded-2xl border border-white/10">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1627] to-transparent" />
        <div className="absolute bottom-3 left-4 flex flex-wrap gap-2 text-[11px] font-semibold">
          <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur">
            <Clock3 size={12} className="text-mint" /> {restaurant.etaMin[0]}–{restaurant.etaMin[1]} min
          </span>
          <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur">
            <MapPin size={12} className="text-brand-2" /> {money(restaurant.deliveryFee)} delivery
          </span>
          <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur">
            <Star size={12} className="fill-brand-2 text-brand-2" /> {restaurant.rating}
          </span>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-extrabold">Menu</h3>
        <span className="muted text-[11px]">{restaurant.menu.length} items</span>
      </div>
      <div className="space-y-2.5">
        {restaurant.menu.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-3"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5 text-xl">
              {item.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-[13px] font-bold">{item.name}</p>
                {item.tag && (
                  <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[9px] font-bold text-brand-2">
                    {item.tag}
                  </span>
                )}
              </div>
              <p className="muted mt-0.5 truncate text-[11px]">{item.description}</p>
              <p className="mt-1 text-xs font-bold text-mint">{money(item.price)}</p>
            </div>
            <button
              type="button"
              onClick={() => addToCart(restaurant.id, item)}
              aria-label={`Add ${item.name} to basket`}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-brand/30 bg-brand/15 text-brand-2 transition hover:bg-brand/30"
            >
              <Plus size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 mt-5 flex items-center justify-between gap-3 border-t border-white/10 bg-[#0d1627]/95 py-3 backdrop-blur">
        <p className="muted text-xs">
          {cartCount > 0 ? `${cartCount} item${cartCount === 1 ? '' : 's'} in basket` : 'Add items to get started'}
        </p>
        <button type="button" onClick={onViewBasket} className="btn-primary">
          <ShoppingBag size={15} /> View basket
        </button>
      </div>
    </Drawer>
  )
}
