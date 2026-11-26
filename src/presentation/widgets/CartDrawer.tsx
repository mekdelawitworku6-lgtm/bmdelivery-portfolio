import { MapPin, ShoppingBag, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { getRestaurant } from '../../data/mockData'
import { money } from '../../lib/format'
import { useDemo } from '../../state/DemoContext'
import { Drawer } from './Drawer'
import { QuantityStepper } from './QuantityStepper'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  onTrack: () => void
}

export function CartDrawer({ open, onClose, onTrack }: CartDrawerProps) {
  const { cart, cartCount, cartTotal, changeQty, clearCart, placeOrder, addresses } = useDemo()
  const [address, setAddress] = useState(addresses[0])
  const restaurant = cart[0] ? getRestaurant(cart[0].restaurantId) : undefined
  const fee = restaurant?.deliveryFee ?? 0

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Your basket"
      subtitle={restaurant ? `From ${restaurant.name}` : 'Your cart is currently empty'}
    >
      {cart.length === 0 ? (
        <div className="grid h-64 place-items-center text-center">
          <div>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/5 text-3xl">🛍️</div>
            <p className="mt-4 text-sm font-bold">Nothing here yet</p>
            <p className="muted mt-1 text-xs">Pick a restaurant and add something delicious.</p>
            <button type="button" onClick={onClose} className="btn-ghost mt-5">
              Browse restaurants
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2.5">
            {cart.map((line) => (
              <div
                key={line.item.id}
                className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-3"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5 text-xl">
                  {line.item.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold">{line.item.name}</p>
                  <p className="mt-0.5 text-xs font-semibold text-mint">
                    {money(line.item.price * line.qty)}
                  </p>
                </div>
                <QuantityStepper
                  qty={line.qty}
                  onDecrease={() => changeQty(line.item.id, -1)}
                  onIncrease={() => changeQty(line.item.id, 1)}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted transition hover:text-red-300"
          >
            <Trash2 size={12} /> Clear basket
          </button>

          <div className="mt-6">
            <label className="mb-2 flex items-center gap-1.5 text-xs font-bold" htmlFor="delivery-address">
              <MapPin size={13} className="text-brand-2" /> Deliver to
            </label>
            <select
              id="delivery-address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="input"
            >
              {addresses.map((option) => (
                <option key={option} value={option} className="bg-panel">
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 space-y-2 rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-xs">
            <div className="flex justify-between text-muted">
              <span>Subtotal ({cartCount} items)</span>
              <span className="text-slate-200">{money(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Delivery fee</span>
              <span className="text-slate-200">{money(fee)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-white/10 pt-3 text-sm font-extrabold">
              <span>Total</span>
              <span className="text-brand-2">{money(cartTotal + fee)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              placeOrder(address)
              onTrack()
            }}
            className="btn-primary mt-5 w-full"
          >
            <ShoppingBag size={15} /> Place order · {money(cartTotal + fee)}
          </button>
          <p className="muted mt-3 text-center text-[10px]">
            Demo checkout — no payment is taken and no backend is involved.
          </p>
        </>
      )}
    </Drawer>
  )
}
