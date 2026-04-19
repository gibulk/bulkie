import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Admin routes protection
  if (pathname.startsWith('/admin')) {
    // Skip middleware for login page and API routes
    if (pathname === '/admin/login' || pathname.startsWith('/api/')) {
      return NextResponse.next()
    }
    
    // Check for auth token in cookies or headers
    const token = request.cookies.get('admin_token')?.value
    
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
  ],
}
