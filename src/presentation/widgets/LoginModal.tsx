import { LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import type { DemoAccount } from '../../data/demoAccounts'
import type { Role } from '../../types'
import { Drawer } from './Drawer'

interface LoginModalProps {
  account: DemoAccount | null
  onClose: () => void
  onSuccess: (role: Role) => void
}

export function LoginModal({ account, onClose, onSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!account) return
    setEmail(account.email)
    setPassword(account.password)
    setError('')
  }, [account])

  if (!account) return null

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!email.includes('@')) {
      setError('Enter a valid demo email address.')
      return
    }
    if (!password) {
      setError('Enter a password to continue.')
      return
    }
    onSuccess(account.role)
  }

  return (
    <Drawer
      open
      onClose={onClose}
      title={`Sign in as ${account.label}`}
      subtitle="Demo credentials are pre-filled. Any password works."
      variant="center"
      size="max-w-md"
    >
      <form onSubmit={submit} className="mx-auto max-w-md">
        <div
          className="mb-6 flex items-center gap-3 rounded-2xl border p-4"
          style={{ borderColor: `${account.accent}45`, background: `${account.accent}12` }}
        >
          <ShieldCheck size={20} style={{ color: account.accent }} />
          <div>
            <p className="text-xs font-bold">Demo {account.label.toLowerCase()} account</p>
            <p className="muted mt-0.5 text-[11px]">No backend, no verification — nothing is sent anywhere.</p>
          </div>
        </div>

        <label htmlFor="demo-email" className="mb-1.5 block text-xs font-bold">
          Email address
        </label>
        <div className="relative">
          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            id="demo-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="input !pl-10"
            autoComplete="username"
          />
        </div>

        <label htmlFor="demo-password" className="mb-1.5 mt-4 block text-xs font-bold">
          Password
        </label>
        <div className="relative">
          <LockKeyhole size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            id="demo-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="input !pl-10"
            autoComplete="current-password"
          />
        </div>

        {error && <p className="mt-3 text-[11px] font-semibold text-red-300">{error}</p>}

        <button type="submit" className="btn-primary mt-6 w-full !py-3">
          Continue to {account.label} dashboard
        </button>
        <button
          type="button"
          onClick={() => {
            setEmail(account.email)
            setPassword(account.password)
            setError('')
          }}
          className="btn-ghost mt-3 w-full"
        >
          Restore demo credentials
        </button>
        <p className="muted mt-5 text-center text-[10px]">
          This is a portfolio demo. The login screen simulates the real BMDelivery sign-in experience.
        </p>
      </form>
    </Drawer>
  )
}
