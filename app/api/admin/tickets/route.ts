import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-guard'
import { sendTicketsOpen } from '@/lib/ticket-mail'

export async function POST(request: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (body.confirm !== 'send') {
    return NextResponse.json({ error: 'Send confirm is required' }, { status: 400 })
  }

  const url = String(body.url || '').trim()
  if (!url.startsWith('https://')) {
    return NextResponse.json({ error: 'Ticket link must be an https URL' }, { status: 400 })
  }

  try {
    await sendTicketsOpen(url)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[tickets] open send failed', err)
    return NextResponse.json({ error: 'Could not send the ticket note.' }, { status: 500 })
  }
}
