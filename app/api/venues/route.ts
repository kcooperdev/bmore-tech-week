import { NextResponse } from 'next/server'
import { EVENT } from '@/lib/data'
import { FormError, parseVenueInput } from '@/lib/validate'
import { createVenue } from '@/lib/store'
import { appendToSheet, venueSheetFields } from '@/lib/sheets'
import type { Venue } from '@/lib/models'

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
    const input = parseVenueInput(body)
    const venue: Venue = {
      id: crypto.randomUUID(),
      year: '2027',
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...input,
    }
    await createVenue(venue)
    await appendToSheet('hosts', venueSheetFields(venue))
    return NextResponse.json({ ok: true, id: venue.id })
  } catch (err) {
    if (err instanceof FormError) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }
    console.error('[venues] create failed', err)
    return NextResponse.json({ error: 'Could not save venue.' }, { status: 500 })
  }
}
