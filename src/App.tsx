import { useState } from 'react'
import { accountForRole, type DemoAccount } from './data/demoAccounts'
import { TopBar } from './presentation/components/TopBar'
import { CartDrawer } from './presentation/widgets/CartDrawer'
import { LoginModal } from './presentation/widgets/LoginModal'
import { Toast } from './presentation/widgets/Toast'
import { AdminView } from './presentation/views/AdminView'
import { CustomerView } from './presentation/views/CustomerView'
import { DriverView } from './presentation/views/DriverView'
import { LandingView } from './presentation/views/LandingView'
import { MerchantView } from './presentation/views/MerchantView'
import { DemoProvider, useDemo } from './state/DemoContext'
import type { Role } from './types'

function DemoApp() {
  const { role, setRole, showNotice } = useDemo()
  const [screen, setScreen] = useState<'landing' | 'app'>('landing')
  const [loginAccount, setLoginAccount] = useState<DemoAccount | null>(null)
  const [cartOpen, setCartOpen] = useState(false)

  const signIn = (signedInRole: Role) => {
    setRole(signedInRole)
    setScreen('app')
    setLoginAccount(null)
    showNotice(`Signed in as ${accountForRole(signedInRole).label}`)
  }

  return (
    <div className="min-h-screen">
      {screen === 'landing' ? (
        <LandingView onSignIn={setLoginAccount} />
      ) : (
        <>
          <TopBar onOpenCart={() => setCartOpen(true)} onSwitchRole={() => setScreen('landing')} />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {role === 'customer' && <CustomerView onOpenCart={() => setCartOpen(true)} />}
            {role === 'merchant' && <MerchantView />}
            {role === 'driver' && <DriverView />}
            {role === 'admin' && <AdminView />}
          </main>
          <footer className="border-t border-white/8 px-4 py-8 text-center sm:px-6">
            <p className="text-xs font-bold">BMDelivery · Interactive portfolio demo</p>
            <p className="muted mt-1 text-[11px]">
              All people, orders and numbers are simulated. No backend, no real accounts, no payments.
            </p>
          </footer>
          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onTrack={() => setCartOpen(false)} />
        </>
      )}

      <LoginModal account={loginAccount} onClose={() => setLoginAccount(null)} onSuccess={signIn} />
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
