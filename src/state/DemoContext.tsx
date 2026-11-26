import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { DELIVERY_ADDRESSES, getRestaurant, INITIAL_ORDERS, RESTAURANTS } from '../data/mockData'
import { money, shortTime } from '../lib/format'
import { nextStage, type CartLine, type DemoOrder, type MenuItem, type Role } from '../types'

interface DemoContextValue {
  role: Role
  setRole: (role: Role) => void
  cart: CartLine[]
  cartCount: number
  cartTotal: number
  addToCart: (restaurantId: string, item: MenuItem) => void
  changeQty: (itemId: string, delta: number) => void
  clearCart: () => void
  orders: DemoOrder[]
  trackingId: string | null
  setTrackingId: (id: string | null) => void
  trackedOrder: DemoOrder | undefined
  placeOrder: (address: string) => void
  advanceOrder: (id: string) => void
  driverOnline: boolean
  setDriverOnline: (value: boolean) => void
  storeOnline: boolean
  setStoreOnline: (value: boolean) => void
  availability: Record<string, boolean>
  toggleAvailability: (id: string) => void
  notice: string | null
  showNotice: (message: string) => void
  clearNotice: () => void
  resetDemo: () => void
  addresses: string[]
}

const DemoContext = createContext<DemoContextValue | null>(null)

const initialAvailability = (): Record<string, boolean> =>
  Object.fromEntries(RESTAURANTS.flatMap((r) => r.menu.map((item) => [item.id, true])))

export function DemoProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('customer')
  const [cart, setCart] = useState<CartLine[]>([])
  const [orders, setOrders] = useState<DemoOrder[]>(INITIAL_ORDERS)
  const [trackingId, setTrackingId] = useState<string | null>(null)
  const [driverOnline, setDriverOnline] = useState(true)
  const [storeOnline, setStoreOnline] = useState(true)
  const [availability, setAvailability] = useState<Record<string, boolean>>(initialAvailability)
  const [notice, setNotice] = useState<string | null>(null)

  const showNotice = useCallback((message: string) => setNotice(message), [])
  const clearNotice = useCallback(() => setNotice(null), [])

  const addToCart = useCallback(
    (restaurantId: string, item: MenuItem) => {
      setCart((current) => {
        const otherRestaurant = current.find((line) => line.restaurantId !== restaurantId)
        const base = otherRestaurant ? [] : current
        const existing = base.find((line) => line.item.id === item.id)
        if (existing) {
          return base.map((line) =>
            line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
          )
        }
        return [...base, { restaurantId, item, qty: 1 }]
      })
      showNotice(`${item.name} added to your basket`)
    },
    [showNotice],
  )

  const changeQty = useCallback((itemId: string, delta: number) => {
    setCart((current) =>
      current
        .map((line) => (line.item.id === itemId ? { ...line, qty: line.qty + delta } : line))
        .filter((line) => line.qty > 0),
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)
  const cartTotal = cart.reduce((sum, line) => sum + line.qty * line.item.price, 0)

  const placeOrder = useCallback(
    (address: string) => {
      if (!cart.length) return
      const restaurant = getRestaurant(cart[0].restaurantId)
      if (!restaurant) return
      const id = `BM-${24100 + orders.length}`
      const order: DemoOrder = {
        id,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        items: cart.map((line) => ({
          name: line.item.name,
          emoji: line.item.emoji,
          qty: line.qty,
          price: line.item.price,
        })),
        total: cartTotal + restaurant.deliveryFee,
        placedAt: shortTime(),
        stage: 'placed',
        address,
        customer: 'You',
        driver: 'Daniel K.',
        etaMin: restaurant.etaMin[1],
        city: 'Addis Ababa',
      }
      setOrders((current) => [order, ...current])
      setTrackingId(id)
      setCart([])
      showNotice(`Order ${id} placed successfully`)
    },
    [cart, cartTotal, orders.length, showNotice],
  )

  const advanceOrder = useCallback(
    (id: string) => {
      setOrders((current) =>
        current.map((order) =>
          order.id === id ? { ...order, stage: nextStage(order.stage) } : order,
        ),
      )
      const order = orders.find((candidate) => candidate.id === id)
      if (order) showNotice(`${id} is now ${nextStage(order.stage).replace('-', ' ')}`)
    },
    [orders, showNotice],
  )

  const toggleAvailability = useCallback((id: string) => {
    setAvailability((current) => ({ ...current, [id]: !current[id] }))
  }, [])

  const resetDemo = useCallback(() => {
    setRole('customer')
    setCart([])
    setOrders(INITIAL_ORDERS)
    setTrackingId(null)
    setDriverOnline(true)
    setStoreOnline(true)
    setAvailability(initialAvailability())
    showNotice('Demo data reset')
  }, [showNotice])

  const trackedOrder = orders.find((order) => order.id === trackingId)
  const value = useMemo<DemoContextValue>(
    () => ({
      role,
      setRole,
      cart,
      cartCount,
      cartTotal,
      addToCart,
      changeQty,
      clearCart,
      orders,
      trackingId,
      setTrackingId,
      trackedOrder,
      placeOrder,
      advanceOrder,
      driverOnline,
      setDriverOnline,
      storeOnline,
      setStoreOnline,
      availability,
      toggleAvailability,
      notice,
      showNotice,
      clearNotice,
      resetDemo,
      addresses: DELIVERY_ADDRESSES,
    }),
    [
      role,
      cart,
      cartCount,
      cartTotal,
      addToCart,
      changeQty,
      clearCart,
      orders,
      trackingId,
      trackedOrder,
      placeOrder,
      advanceOrder,
      driverOnline,
      storeOnline,
      availability,
      notice,
      showNotice,
      clearNotice,
      resetDemo,
    ],
  )

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo(): DemoContextValue {
  const context = useContext(DemoContext)
  if (!context) throw new Error('useDemo must be used inside DemoProvider')
  return context
}

export const formatMoney = money
