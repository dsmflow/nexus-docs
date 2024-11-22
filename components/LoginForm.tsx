import { useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        router.push('/')
      } else {
        console.error('Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className="nx-mt-8 nx-space-y-6 nx-bg-white dark:nx-bg-neutral-900 nx-shadow-lg nx-rounded-lg nx-p-8">
      <form className="nx-space-y-6" onSubmit={handleSubmit}>
        <div className="nx-space-y-6">
          <div>
            <label htmlFor="email-address" className="nx-block nx-text-sm nx-font-medium nx-text-slate-700 dark:nx-text-slate-300">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="nx-mt-1 nx-block nx-w-full nx-appearance-none nx-rounded-md nx-border nx-border-slate-300 nx-px-3 nx-py-2 nx-placeholder-slate-400 nx-shadow-sm focus:nx-border-primary-500 focus:nx-outline-none focus:nx-ring-primary-500 sm:nx-text-sm dark:nx-border-slate-600 dark:nx-bg-neutral-800 dark:nx-text-slate-100"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="nx-block nx-text-sm nx-font-medium nx-text-slate-700 dark:nx-text-slate-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="nx-mt-1 nx-block nx-w-full nx-appearance-none nx-rounded-md nx-border nx-border-slate-300 nx-px-3 nx-py-2 nx-placeholder-slate-400 nx-shadow-sm focus:nx-border-primary-500 focus:nx-outline-none focus:nx-ring-primary-500 sm:nx-text-sm dark:nx-border-slate-600 dark:nx-bg-neutral-800 dark:nx-text-slate-100"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="nx-w-full nx-flex nx-justify-center nx-rounded-md nx-border nx-border-transparent nx-bg-primary-500 nx-py-2 nx-px-4 nx-text-sm nx-font-medium nx-text-white nx-shadow-sm hover:nx-bg-primary-600 focus:nx-outline-none focus:nx-ring-2 focus:nx-ring-primary-500 focus:nx-ring-offset-2 dark:nx-text-black"
        >
          Sign in
        </button>
      </form>
    </div>
  )
}
