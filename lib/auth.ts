const COOKIE_NAME = 'btw_admin'

function bytesToHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function getAdminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD
  if (process.env.NODE_ENV !== 'production') return 'bmore-admin'
  return ''
}

export async function makeAdminToken() {
  const password = getAdminPassword()
  const secret = process.env.ADMIN_SESSION_SECRET || 'btw-night-edition'
  const data = new TextEncoder().encode(`btw-admin:${password}:${secret}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return bytesToHex(digest)
}

export async function isAdminToken(token: string | undefined | null) {
  if (!token || !getAdminPassword()) return false
  const expected = await makeAdminToken()
  if (token.length !== expected.length) return false
  let mismatch = 0
  for (let i = 0; i < token.length; i += 1) {
    mismatch |= token.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return mismatch === 0
}

export function adminCookieName() {
  return COOKIE_NAME
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  }
}
