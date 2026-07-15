import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const proto = request.headers.get('x-forwarded-proto')
  const host = request.headers.get('host') ?? 'www.bmoretechweek.com'

  // Force HTTPS when behind a proxy that still reports http
  if (proto === 'http') {
    const url = request.nextUrl.clone()
    url.protocol = 'https:'
    url.host = host.startsWith('www.') ? host : `www.${host.replace(/^www\./, '')}`
    return NextResponse.redirect(url, 308)
  }

  // Prefer www canonical host
  if (host === 'bmoretechweek.com') {
    const url = request.nextUrl.clone()
    url.host = 'www.bmoretechweek.com'
    url.protocol = 'https:'
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
