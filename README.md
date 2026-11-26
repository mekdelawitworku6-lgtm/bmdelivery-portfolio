# BMDelivery — Interactive Portfolio Demo

A polished, **backend-free** demo of the BMDelivery platform. Everything runs in the browser with simulated data: browsing restaurants, building a basket, placing an order, following a live delivery, managing a store, running deliveries and watching an operations dashboard.

## Features

- **Customer** — search and filter restaurants, browse menus, add items to a basket, choose a delivery address, place an order and follow an animated order timeline with a live route map. Order status advances automatically (or manually with *Simulate next update*).
- **Merchant** — store open/pause toggle, KPIs, hourly order chart, accept/advance the order queue, and flip menu items in/out of stock.
- **Driver** — online toggle, earnings stats, active job with pickup/drop-off details, animated route, and step-by-step delivery completion.
- **Admin** — GMV/order/driver KPIs, revenue trend, city coverage, and filterable live orders / merchants / drivers tables.

The demo opens with a landing page that explains the journey in four steps. Choose a role card to open its pre-filled demo login form (any password works), then explore that role's full dashboard. Use **Switch role** in the top bar to go back and sign in as someone else, and **Reset** to restore all demo data. No real accounts, API calls, database or payments are involved.

### Demo accounts

| Role | Email | Password |
|---|---|---|
| Customer | `customer@demo.bmdelivery.com` | `Demo@12345` |
| Merchant | `merchant@spicevault.com` | `Demo@12345` |
| Driver | `driver@danielk.com` | `Demo@12345` |
| Admin | `admin@bmdelivery.com` | `Demo@12345` |

## Tech stack

React + TypeScript + Vite + Tailwind CSS v4 + lucide-react. All state lives in a React context (`src/state/DemoContext.tsx`), and all sample data is in `src/data/mockData.ts`.

## Run locally

```bash
cd apps/portfolio-demo
npm install
npm run dev
```

Open the URL printed by Vite. To verify the production build:

```bash
npm run build
npm run preview
```

## Deploy to Render (static site, free)

### Option A — Blueprint (recommended)

1. Push this repository to GitHub/GitLab.
2. In Render, click **New + → Blueprint** and select the repository.
3. Render reads the root [`render.yaml`](../../render.yaml) and creates the static site.
4. Open the generated `bm-delivery-portfolio-demo.onrender.com` URL.

### Option B — Manual static site

1. **New + → Static Site**, select the repository.
2. Set:
   - **Root Directory**: `apps/portfolio-demo`
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `dist`
   - **Environment**: `NODE_VERSION = 22`
3. Click **Create Static Site**.

The Vite config uses `base: './'`, so the built assets work from any static path, including Render's preview URLs.

## Customising for a portfolio

- Replace the name, colours and copy in `src/App.tsx`, `src/presentation/components/TopBar.tsx` and `src/index.css`.
- Swap the sample restaurants in `src/data/mockData.ts` and, if needed, point `restaurant.image` at your own assets in `public/`.
- Add a link to your portfolio/CV in the footer in `src/App.tsx`.
