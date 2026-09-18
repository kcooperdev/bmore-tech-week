import { NextResponse } from 'next/server'
import { EVENT } from '@/lib/data'
import { FormError, parseVolunteerInput } from '@/lib/validate'
import { createVolunteer } from '@/lib/store'
import { appendToSheet, volunteerSheetFields } from '@/lib/sheets'
import type { Volunteer } from '@/lib/models'

export async function POST(request: Request) {
  if (!EVENT.submissionsOpen) {
    return NextResponse.json({ error: 'Coming soon' }, { status: 503 })
  }

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const input = parseVolunteerInput(body)
    const volunteer: Volunteer = {
      id: crypto.randomUUID(),
      year: '2027',
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...input,
    }
    await createVolunteer(volunteer)
    await appendToSheet('volunteers', volunteerSheetFields(volunteer))
    return NextResponse.json({ ok: true, id: volunteer.id })
  } catch (err) {
    if (err instanceof FormError) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }
    console.error('[volunteers] create failed', err)
    return NextResponse.json({ error: 'Could not save volunteer.' }, { status: 500 })
  }
}
