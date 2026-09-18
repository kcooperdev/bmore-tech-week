import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { adminCookieName, isAdminToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get(adminCookieName())?.value
    if (!(await isAdminToken(token))) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('from', pathname)
      return NextResponse.redirect(url)
    }
  }

  const proto = request.headers.get('x-forwarded-proto')
  const host = request.headers.get('host') ?? ''

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
