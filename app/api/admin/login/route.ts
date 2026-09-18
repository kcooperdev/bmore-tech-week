import { NextResponse } from 'next/server'
import {
  adminCookieName,
  adminCookieOptions,
  getAdminPassword,
  makeAdminToken,
} from '@/lib/auth'

export async function POST(request: Request) {
  const password = getAdminPassword()
  if (!password) {
    return NextResponse.json({ error: 'Admin password is not configured.' }, { status: 503 })
  }

  let body: { password?: string }
  try {
    body = (await request.json()) as { password?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (String(body.password || '') !== password) {
    return NextResponse.json({ error: 'Wrong password.' }, { status: 401 })
  }

  const token = await makeAdminToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(adminCookieName(), token, adminCookieOptions())
  return res
}
