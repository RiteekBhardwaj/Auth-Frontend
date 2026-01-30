import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('refreshToken')?.value
  const { pathname } = req.nextUrl

  //logged in
  if (token && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  //not logged in
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*']
}
