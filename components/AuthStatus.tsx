import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function AuthStatus() {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check auth status on mount and after route changes
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/user')
        if (res.ok) {
          const data = await res.json()
          setEmail(data.email)
        } else {
          setEmail(null)
        }
      } catch (error) {
        setEmail(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router.asPath])

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (res.ok) {
        setEmail(null)
        router.push('/login')
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return null // Or a loading spinner
  }

  if (!email) {
    return null // Don't show anything if not logged in
  }

  return (
    <div className="nx-flex nx-items-center nx-gap-2 nx-p-2 nx-text-sm">
      <span className="nx-text-gray-600 dark:nx-text-gray-400">
        Signed in as {email}
      </span>
      <button
        onClick={handleLogout}
        className="nx-text-primary-500 hover:nx-text-primary-600 dark:hover:nx-text-primary-400 nx-font-medium"
      >
        Sign out
      </button>
    </div>
  )
}
