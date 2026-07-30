import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const proto = request.headers.get('x-forwarded-proto')
  const host = request.headers.get('host') ?? ''

  // Only rewrite the real production domain — never touch localhost / LAN / preview hosts
  const isApex = host === 'bmoretechweek.com'
  const isWww = host === 'www.bmoretechweek.com'
  if (!isApex && !isWww) {
    return NextResponse.next()
  }

  if (proto === 'http' || isApex) {
    const url = request.nextUrl.clone()
    url.protocol = 'https:'
    url.host = 'www.bmoretechweek.com'
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
