import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the token from the cookie or header
  const token = request.cookies.get('auth-token')?.value || request.headers.get('Authorization')

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/api/auth']
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Redirect to login if no token is present
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // You can add additional token validation here
  // For example, verify JWT token or check against your auth service

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/auth/* (authentication endpoints)
     * 2. /login (login page)
     * 3. /_next/static (static files)
     * 4. /_next/image (image optimization files)
     * 5. /favicon.ico (favicon file)
     */
    '/((?!api/auth|login|_next/static|_next/image|favicon.ico).*)',
  ],
}
