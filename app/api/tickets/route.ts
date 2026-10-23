import { NextResponse } from 'next/server'
import { FormError, parseWaitlistInput } from '@/lib/validate'
import { createTicketSignup } from '@/lib/store'
import { appendToSheet, ticketSheetFields } from '@/lib/sheets'
import { sendTicketConfirmation } from '@/lib/ticket-mail'
import { syncToEventOps } from '@/lib/ops-sync'
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
      name: input.name || undefined,
      organization: input.organization || undefined,
      role: input.role || undefined,
      website: input.website || undefined,
      notes: input.notes || undefined,
      createdAt: new Date().toISOString(),
    }
    const saved = await createTicketSignup(signup)
    if (saved.id === signup.id) {
      await appendToSheet('tickets', ticketSheetFields(saved))
      await sendTicketConfirmation(saved.email, saved.pass || '')
    }
    await syncToEventOps({
      kind: 'updates',
      category: 'updates',
      name: saved.name || saved.email,
      email: saved.email,
      organization: saved.organization || '',
      role: saved.role,
      website: saved.website,
      passType: saved.pass || 'Updates list',
      primaryDetail: saved.pass || 'Updates list',
      secondaryDetail: 'Homepage popup',
      source: 'Homepage popup',
      notes: saved.notes,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof FormError) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }
    console.error('[tickets] create failed', err)
    return NextResponse.json({ error: 'Could not save email.' }, { status: 500 })
  }
}
