import type { Role } from '../types'

export interface DemoAccount {
  role: Role
  label: string
  tagline: string
  description: string
  email: string
  password: string
  accent: string
  features: string[]
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: 'customer',
    label: 'Customer',
    tagline: 'Order and track in real time',
    description: 'Browse restaurants, build a basket, check out and follow the rider on a live map.',
    email: 'customer@demo.bmdelivery.com',
    password: 'Demo@12345',
    accent: '#FF6B35',
    features: ['Restaurant discovery', 'Basket & checkout', 'Live order tracking'],
  },
  {
    role: 'merchant',
    label: 'Merchant',
    tagline: 'Run the kitchen',
    description: 'Accept incoming orders, manage prep status, watch sales and control menu stock.',
    email: 'merchant@spicevault.com',
    password: 'Demo@12345',
    accent: '#FFB020',
    features: ['Order queue', 'Sales analytics', 'Menu availability'],
  },
  {
    role: 'driver',
    label: 'Driver',
    tagline: 'Deliver with confidence',
    description: 'Go online, pick up an order, follow the route and complete the delivery step by step.',
    email: 'driver@danielk.com',
    password: 'Demo@12345',
    accent: '#21D6A5',
    features: ['Online status', 'Active delivery', 'Earnings & history'],
  },
  {
    role: 'admin',
    label: 'Admin',
    tagline: 'See the whole platform',
    description: 'Monitor marketplace GMV, orders, merchants, drivers and city coverage from one view.',
    email: 'admin@bmdelivery.com',
    password: 'Demo@12345',
    accent: '#7B8CFF',
    features: ['Revenue dashboard', 'Live order table', 'Merchant & driver directories'],
  },
]

export function accountForRole(role: Role): DemoAccount {
  return DEMO_ACCOUNTS.find((account) => account.role === role) ?? DEMO_ACCOUNTS[0]
}
