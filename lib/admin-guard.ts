import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { adminCookieName, isAdminToken } from '@/lib/auth'

export async function requireAdmin() {
  const token = (await cookies()).get(adminCookieName())?.value
  if (!(await isAdminToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
