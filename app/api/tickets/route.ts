import { NextResponse } from 'next/server'
import { FormError, parseWaitlistInput } from '@/lib/validate'
import { createTicketSignup } from '@/lib/store'
import { appendToSheet, ticketSheetFields } from '@/lib/sheets'
import { sendTicketConfirmation } from '@/lib/ticket-mail'
import type { TicketSignup } from '@/lib/models'

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const input = parseWaitlistInput(body)
    const signup: TicketSignup = {
      id: crypto.randomUUID(),
      email: input.email,
      pass: input.pass,
      createdAt: new Date().toISOString(),
    }
    const saved = await createTicketSignup(signup)
    if (saved.id === signup.id) {
      await appendToSheet('tickets', ticketSheetFields(saved))
      await sendTicketConfirmation(saved.email, saved.pass || '')
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof FormError) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }
    console.error('[tickets] create failed', err)
    return NextResponse.json({ error: 'Could not save email.' }, { status: 500 })
  }
}
