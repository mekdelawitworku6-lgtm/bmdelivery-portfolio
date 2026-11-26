export type Role = 'customer' | 'merchant' | 'driver' | 'admin'

export type OrderStage =
  | 'placed'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'picked'
  | 'on-the-way'
  | 'delivered'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  emoji: string
  tag?: string
  popular?: boolean
}

export interface Restaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  reviews: number
  etaMin: [number, number]
  deliveryFee: number
  image: string
  emoji: string
  badge?: string
  tags: string[]
  accent: string
  menu: MenuItem[]
}

export interface CartLine {
  restaurantId: string
  item: MenuItem
  qty: number
}

export interface OrderItem {
  name: string
  emoji: string
  qty: number
  price: number
}

export interface DemoOrder {
  id: string
  restaurantId: string
  restaurantName: string
  items: OrderItem[]
  total: number
  placedAt: string
  stage: OrderStage
  address: string
  customer: string
  driver: string
  etaMin: number
  city: string
}

export const ORDER_STAGES: OrderStage[] = [
  'placed',
  'confirmed',
  'preparing',
  'ready',
  'picked',
  'on-the-way',
  'delivered',
]

export const STAGE_LABELS: Record<OrderStage, string> = {
  placed: 'Order placed',
  confirmed: 'Restaurant confirmed',
  preparing: 'Preparing your food',
  ready: 'Ready for pickup',
  picked: 'Driver picked up',
  'on-the-way': 'On the way to you',
  delivered: 'Delivered',
}

export function nextStage(stage: OrderStage): OrderStage {
  const index = ORDER_STAGES.indexOf(stage)
  return ORDER_STAGES[Math.min(index + 1, ORDER_STAGES.length - 1)]
}
