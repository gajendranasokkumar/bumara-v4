import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const onboarded = request.cookies.get('onboarded')?.value === 'true'

  // When coming from Get Started, set cookie and clean the URL
  if (url.pathname === '/dashboard' && url.searchParams.get('onboarded') === '1') {
    const cleanUrl = new URL('/dashboard', url)
    const response = NextResponse.redirect(cleanUrl)
    response.cookies.set('onboarded', 'true', { path: '/', maxAge: 60 * 60 * 24 * 365 })
    return response
  }

  // If already onboarded, skip the landing page
  if (url.pathname === '/' && onboarded) {
    return NextResponse.redirect(new URL('/dashboard', url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard'],
}


