import type { DemoOrder, MenuItem, Restaurant } from '../types'

const item = (
  id: string,
  name: string,
  description: string,
  price: number,
  emoji: string,
  options: { tag?: string; popular?: boolean } = {},
): MenuItem => ({ id, name, description, price, emoji, ...options })

export const CATEGORIES = [
  { id: 'all', label: 'All', emoji: '✨' },
  { id: 'ethiopian', label: 'Ethiopian', emoji: '🍲' },
  { id: 'pizza', label: 'Pizza', emoji: '🍕' },
  { id: 'burgers', label: 'Burgers', emoji: '🍔' },
  { id: 'healthy', label: 'Healthy', emoji: '🥗' },
  { id: 'asian', label: 'Asian', emoji: '🍜' },
  { id: 'coffee', label: 'Coffee', emoji: '☕' },
  { id: 'desserts', label: 'Desserts', emoji: '🍰' },
]

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'spice-vault',
    name: 'Spice Vault',
    cuisine: 'Ethiopian · Grills',
    rating: 4.8,
    reviews: 1240,
    etaMin: [25, 35],
    deliveryFee: 49,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80',
    emoji: '🍲',
    badge: 'Top rated',
    tags: ['ethiopian', 'healthy'],
    accent: '#FF6B35',
    menu: [
      item('sv-1', 'Doro Wat Combo', 'Slow-cooked chicken, injera, spiced lentils', 380, '🍗', {
        popular: true,
        tag: 'Bestseller',
      }),
      item('sv-2', 'Beef Tibs', 'Sizzling beef, rosemary, sautéed peppers', 420, '🥩', { popular: true }),
      item('sv-3', 'Vegan Platter', 'Five vegetarian sides with fresh injera', 310, '🥬'),
      item('sv-4', 'Kitfo Special', 'Minced beef, clarified butter, cottage cheese', 460, '🌶️', { tag: 'Chef’s pick' }),
      item('sv-5', 'Spiced Coffee', 'Traditional coffee ceremony blend', 85, '☕'),
    ],
  },
  {
    id: 'pizza-fabbrica',
    name: 'Pizza Fabbrica',
    cuisine: 'Italian · Wood-fired',
    rating: 4.7,
    reviews: 890,
    etaMin: [30, 40],
    deliveryFee: 39,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=80',
    emoji: '🍕',
    badge: 'Free garlic bread',
    tags: ['pizza'],
    accent: '#FF4D4D',
    menu: [
      item('pf-1', 'Margherita', 'San Marzano tomato, mozzarella, basil', 360, '🍕', { popular: true }),
      item('pf-2', 'Diavola', 'Spicy salami, chilli honey, mozzarella', 420, '🌶️'),
      item('pf-3', 'Quattro Formaggi', 'Four cheese blend with truffle oil', 450, '🧀', { tag: 'Popular' }),
      item('pf-4', 'Garlic Bread', 'Wood-fired, herb butter', 120, '🥖'),
    ],
  },
  {
    id: 'burger-district',
    name: 'Burger District',
    cuisine: 'Burgers · American',
    rating: 4.6,
    reviews: 2100,
    etaMin: [20, 30],
    deliveryFee: 29,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=80',
    emoji: '🍔',
    tags: ['burgers'],
    accent: '#F5A623',
    menu: [
      item('bd-1', 'Smash Double', 'Two patties, cheddar, house sauce', 340, '🍔', { popular: true }),
      item('bd-2', 'Crispy Chicken', 'Buttermilk chicken, slaw, pickles', 320, '🍗'),
      item('bd-3', 'Truffle Fries', 'Parmesan, truffle oil, herbs', 140, '🍟'),
      item('bd-4', 'Chocolate Shake', 'Thick cocoa shake with whipped cream', 110, '🥤'),
    ],
  },
  {
    id: 'green-bowl',
    name: 'Green Bowl',
    cuisine: 'Healthy · Salads',
    rating: 4.9,
    reviews: 640,
    etaMin: [15, 25],
    deliveryFee: 35,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80',
    emoji: '🥗',
    badge: 'Fresh daily',
    tags: ['healthy'],
    accent: '#20D6A5',
    menu: [
      item('gb-1', 'Power Bowl', 'Quinoa, avocado, greens, tahini', 330, '🥑', { popular: true }),
      item('gb-2', 'Citrus Salmon', 'Salmon, orange, fennel, baby spinach', 480, '🐟'),
      item('gb-3', 'Berry Smoothie', 'Mixed berries, banana, almond milk', 160, '🫐'),
    ],
  },
  {
    id: 'wok-and-roll',
    name: 'Wok & Roll',
    cuisine: 'Asian · Noodles',
    rating: 4.7,
    reviews: 1120,
    etaMin: [25, 35],
    deliveryFee: 45,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&q=80',
    emoji: '🍜',
    tags: ['asian'],
    accent: '#7B8CFF',
    menu: [
      item('wr-1', 'Spicy Ramen', 'Rich broth, chilli oil, soft egg', 370, '🍜', { popular: true }),
      item('wr-2', 'Chow Mein', 'Wok-tossed noodles, vegetables, soy', 330, '🥡'),
      item('wr-3', 'Crispy Dumplings', 'Six pieces with sesame dipping sauce', 220, '🥟'),
    ],
  },
  {
    id: 'cafe-lumina',
    name: 'Café Lumina',
    cuisine: 'Coffee · Bakery',
    rating: 4.8,
    reviews: 430,
    etaMin: [10, 20],
    deliveryFee: 25,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=80',
    emoji: '☕',
    badge: 'Fastest near you',
    tags: ['coffee', 'desserts'],
    accent: '#B9805B',
    menu: [
      item('cl-1', 'Flat White', 'Double espresso, silky microfoam', 95, '☕', { popular: true }),
      item('cl-2', 'Cardamom Latte', 'House syrup, espresso, steamed milk', 110, '🌿'),
      item('cl-3', 'Butter Croissant', 'Flaky, baked fresh this morning', 85, '🥐'),
      item('cl-4', 'Cinnamon Roll', 'Warm, glazed, finished with cream cheese', 120, '🍥'),
    ],
  },
  {
    id: 'nipa-kitchen',
    name: 'Nipa Kitchen',
    cuisine: 'Ethiopian · Home food',
    rating: 4.9,
    reviews: 770,
    etaMin: [30, 45],
    deliveryFee: 39,
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900&q=80',
    emoji: '🍛',
    tags: ['ethiopian'],
    accent: '#E0488B',
    menu: [
      item('nk-1', 'Shiro Wat', 'Creamy chickpea stew with injera', 290, '🍲', { popular: true }),
      item('nk-2', 'Doro Wot', 'Weekend-style chicken stew, boiled egg', 400, '🍗'),
      item('nk-3', 'Gomen Be Siga', 'Collard greens with slow-cooked beef', 350, '🥬'),
    ],
  },
  {
    id: 'sugar-lab',
    name: 'Sugar Lab',
    cuisine: 'Desserts · Ice cream',
    rating: 4.7,
    reviews: 510,
    etaMin: [15, 25],
    deliveryFee: 29,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&q=80',
    emoji: '🍰',
    tags: ['desserts', 'coffee'],
    accent: '#C77DFF',
    menu: [
      item('sl-1', 'Molten Chocolate Cake', 'Warm center, vanilla ice cream', 210, '🍫', { popular: true }),
      item('sl-2', 'Pistachio Gelato', 'House-made, pistachio from Simien', 180, '🍨'),
      item('sl-3', 'Cheesecake Slice', 'Baked New York style with berry compote', 195, '🍰'),
    ],
  },
]

export const DELIVERY_ADDRESSES = [
  'Bole Road, Addis Ababa',
  'Kazanchis, Addis Ababa',
  'Saris, Addis Ababa',
  'Megenagna, Addis Ababa',
]

const makeOrder = (
  id: string,
  restaurantId: string,
  stage: DemoOrder['stage'],
  itemNames: [string, string, number, number][],
  address: string,
  customer: string,
  placedAt: string,
  city = 'Addis Ababa',
): DemoOrder => {
  const restaurant = RESTAURANTS.find((r) => r.id === restaurantId)!
  return {
    id,
    restaurantId,
    restaurantName: restaurant.name,
    items: itemNames.map(([name, emoji, qty, price]) => ({ name, emoji, qty, price })),
    total: itemNames.reduce((sum, [, , qty, price]) => sum + qty * price, 0) + restaurant.deliveryFee,
    placedAt,
    stage,
    address,
    customer,
    driver: 'Daniel K.',
    etaMin: restaurant.etaMin[1],
    city,
  }
}

export const INITIAL_ORDERS: DemoOrder[] = [
  makeOrder(
    'BM-24081',
    'spice-vault',
    'preparing',
    [
      ['Doro Wat Combo', '🍗', 1, 380],
      ['Spiced Coffee', '☕', 2, 85],
    ],
    'Bole Road, Addis Ababa',
    'Marta H.',
    '12:42 PM',
  ),
  makeOrder(
    'BM-24080',
    'burger-district',
    'on-the-way',
    [
      ['Smash Double', '🍔', 2, 340],
      ['Truffle Fries', '🍟', 1, 140],
    ],
    'Kazanchis, Addis Ababa',
    'Eyob A.',
    '12:26 PM',
  ),
  makeOrder(
    'BM-24079',
    'green-bowl',
    'delivered',
    [['Power Bowl', '🥑', 1, 330]],
    'Saris, Addis Ababa',
    'Senay T.',
    '11:58 AM',
  ),
  makeOrder(
    'BM-24078',
    'spice-vault',
    'ready',
    [
      ['Beef Tibs', '🥩', 1, 420],
      ['Vegan Platter', '🥬', 1, 310],
    ],
    'Megenagna, Addis Ababa',
    'Nahom B.',
    '12:51 PM',
  ),
  makeOrder(
    'BM-24075',
    'spice-vault',
    'confirmed',
    [['Kitfo Special', '🌶️', 1, 460]],
    'Saris, Addis Ababa',
    'Yordanos G.',
    '12:57 PM',
  ),
  makeOrder(
    'BM-24072',
    'spice-vault',
    'delivered',
    [['Vegan Platter', '🥬', 2, 310]],
    'Bole Road, Addis Ababa',
    'Kaleb S.',
    '11:09 AM',
  ),
  makeOrder(
    'BM-24077',
    'pizza-fabbrica',
    'delivered',
    [['Diavola', '🍕', 1, 420]],
    'Bole Road, Addis Ababa',
    'Lidiya M.',
    '11:21 AM',
  ),
  makeOrder(
    'BM-24076',
    'cafe-lumina',
    'delivered',
    [
      ['Flat White', '☕', 2, 95],
      ['Butter Croissant', '🥐', 1, 85],
    ],
    'Kazanchis, Addis Ababa',
    'Fikru D.',
    '10:47 AM',
  ),
]

export const HOURLY_ORDERS = [
  { hour: '08', orders: 12, revenue: 4200 },
  { hour: '09', orders: 26, revenue: 9100 },
  { hour: '10', orders: 34, revenue: 12400 },
  { hour: '11', orders: 48, revenue: 18600 },
  { hour: '12', orders: 62, revenue: 24300 },
  { hour: '13', orders: 55, revenue: 21200 },
  { hour: '14', orders: 39, revenue: 15100 },
  { hour: '15', orders: 31, revenue: 11800 },
  { hour: '16', orders: 28, revenue: 10600 },
  { hour: '17', orders: 41, revenue: 16400 },
  { hour: '18', orders: 57, revenue: 22900 },
  { hour: '19', orders: 46, revenue: 18300 },
]

export const CITY_VOLUME = [
  { city: 'Addis Ababa', value: 78 },
  { city: 'Adama', value: 46 },
  { city: 'Hawassa', value: 34 },
  { city: 'Bahir Dar', value: 27 },
  { city: 'Dire Dawa', value: 19 },
]

export const DRIVER_DELIVERIES = [
  { id: 'BM-24079', restaurant: 'Green Bowl', address: 'Saris, Addis Ababa', earning: 68, time: '12:18 PM' },
  { id: 'BM-24074', restaurant: 'Wok & Roll', address: 'Bole Road, Addis Ababa', earning: 74, time: '11:36 AM' },
  { id: 'BM-24071', restaurant: 'Café Lumina', address: 'Kazanchis, Addis Ababa', earning: 52, time: '10:52 AM' },
  { id: 'BM-24065', restaurant: 'Sugar Lab', address: 'Megenagna, Addis Ababa', earning: 61, time: '10:05 AM' },
]

export const ADMIN_MERCHANTS = [
  { name: 'Spice Vault', city: 'Addis Ababa', orders: 412, gmv: 148200, status: 'Active', rating: 4.8 },
  { name: 'Pizza Fabbrica', city: 'Addis Ababa', orders: 356, gmv: 132400, status: 'Active', rating: 4.7 },
  { name: 'Burger District', city: 'Adama', orders: 298, gmv: 98700, status: 'Active', rating: 4.6 },
  { name: 'Green Bowl', city: 'Addis Ababa', orders: 241, gmv: 82200, status: 'Active', rating: 4.9 },
  { name: 'Nipa Kitchen', city: 'Hawassa', orders: 187, gmv: 64300, status: 'Pending', rating: 4.9 },
]

export const ADMIN_DRIVERS = [
  { name: 'Daniel K.', zone: 'Bole', deliveries: 62, rating: 4.9, status: 'On delivery' },
  { name: 'Mekdes T.', zone: 'Kazanchis', deliveries: 51, rating: 4.8, status: 'Online' },
  { name: 'Abel M.', zone: 'Saris', deliveries: 47, rating: 4.7, status: 'Online' },
  { name: 'Ruth A.', zone: 'Megenagna', deliveries: 39, rating: 4.9, status: 'Offline' },
]

export function getRestaurant(id: string): Restaurant | undefined {
  return RESTAURANTS.find((restaurant) => restaurant.id === id)
}
