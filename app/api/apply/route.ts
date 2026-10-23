import { NextResponse } from 'next/server'
import { applyRequestOpen, EVENT } from '@/lib/data'
import { FormError, parseApplyInput } from '@/lib/validate'
import { createTicketSignup } from '@/lib/store'
import { appendToSheet, ticketSheetFields } from '@/lib/sheets'
import { syncToEventOps } from '@/lib/ops-sync'
import type { TicketSignup } from '@/lib/models'

export async function POST(request: Request) {
  if (!applyRequestOpen(request)) {
    return NextResponse.json({ error: `Applications open ${EVENT.opensOn}` }, { status: 503 })
  }

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const input = parseApplyInput(body)
    const signup: TicketSignup = {
      id: crypto.randomUUID(),
      email: input.email,
      pass: input.pass,
      name: input.name,
      organization: input.organization || undefined,
      role: input.role || undefined,
      website: input.website || undefined,
      notes: input.notes || undefined,
      createdAt: new Date().toISOString(),
    }
    const saved = await createTicketSignup(signup)
    if (saved.id === signup.id) {
      await appendToSheet('tickets', ticketSheetFields(saved))
    }
    await syncToEventOps({
      kind: input.kind,
      category:
        input.kind === 'sponsor'
          ? 'sponsors'
          : input.kind === 'ambassador'
            ? 'ambassadors'
            : 'community_partners',
      name: saved.name,
      email: saved.email,
      organization: saved.organization,
      role: saved.role,
      title: saved.role,
      website: saved.website,
      pass: saved.pass,
      ...(input.kind === 'sponsor' ? { sponsorTier: saved.pass } : {}),
      notes: saved.notes,
    })
    return NextResponse.json({ ok: true, id: saved.id, kind: input.kind })
  } catch (err) {
    if (err instanceof FormError) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }
    console.error('[apply] create failed', err)
    return NextResponse.json({ error: 'Could not save application.' }, { status: 500 })
  }
}
