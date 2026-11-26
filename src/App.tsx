import { useState } from 'react'
import { TopBar } from './presentation/components/TopBar'
import { CartDrawer } from './presentation/widgets/CartDrawer'
import { Toast } from './presentation/widgets/Toast'
import { AdminView } from './presentation/views/AdminView'
import { CustomerView } from './presentation/views/CustomerView'
import { DriverView } from './presentation/views/DriverView'
import { MerchantView } from './presentation/views/MerchantView'
import { DemoProvider, useDemo } from './state/DemoContext'

function DemoApp() {
  const { role } = useDemo()
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <TopBar onOpenCart={() => setCartOpen(true)} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {role === 'customer' && <CustomerView onOpenCart={() => setCartOpen(true)} />}
        {role === 'merchant' && <MerchantView />}
        {role === 'driver' && <DriverView />}
        {role === 'admin' && <AdminView />}
      </main>
      <footer className="border-t border-white/8 px-4 py-8 text-center sm:px-6">
        <p className="text-xs font-bold">BMDelivery · Interactive portfolio demo</p>
        <p className="muted mt-1 text-[11px]">
          All people, orders and numbers are simulated. No backend, no login, no real payments.
        </p>
        <div className="mt-3 flex justify-center gap-2 text-[10px] font-semibold text-muted">
          {['React', 'TypeScript', 'Vite', 'Tailwind CSS'].map((tech) => (
            <span key={tech} className="rounded-full border border-white/8 px-2 py-1">{tech}</span>
          ))}
        </div>
      </footer>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onTrack={() => setCartOpen(false)} />
      <Toast />
    </div>
  )
}

export default function App() {
  return (
    <DemoProvider>
      <DemoApp />
    </DemoProvider>
  )
}
