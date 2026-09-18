import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-guard'
import { FormError, parseEventInput } from '@/lib/validate'
import { createEvent, listEvents, listSpeakers, listVenues, updateEvent } from '@/lib/store'
import { scoreMatch } from '@/lib/matching'
import { uniqueSlug } from '@/lib/slug'
import type { EventRecord, EventStatus } from '@/lib/models'

export async function POST(request: Request) {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const input = parseEventInput(body)
    const [venues, speakers, events] = await Promise.all([listVenues(), listSpeakers(), listEvents()])
    const venue = venues.find((item) => item.id === input.venueId)
    const speaker = speakers.find((item) => item.id === input.speakerId)
    if (!venue || !speaker) {
      return NextResponse.json({ error: 'Venue or speaker not found' }, { status: 404 })
    }
    if (!venue.availableDates.includes(input.date)) {
      return NextResponse.json({ error: 'That date is not on the venue availability list.' }, { status: 400 })
    }

    const match = scoreMatch(speaker, venue)
    const slug = uniqueSlug(input.name, events.map((item) => item.slug))
    const event: EventRecord = {
      id: crypto.randomUUID(),
      year: '2027',
      slug,
      name: input.name,
      description: input.description,
      venueId: venue.id,
      speakerId: speaker.id,
      date: input.date,
      time: input.time,
      neighborhood: venue.neighborhood,
      topic: speaker.topic,
      format: speaker.format,
      status: 'draft',
      matchScore: match.score,
      matchReasons: match.reasons,
      createdAt: new Date().toISOString(),
      publishedAt: null,
    }
    await createEvent(event)
    return NextResponse.json({ event })
  } catch (err) {
    if (err instanceof FormError) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }
    console.error('[admin/events] create failed', err)
    return NextResponse.json({ error: 'Could not create event.' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  const body = (await request.json().catch(() => null)) as {
    id?: string
    status?: EventStatus
  } | null

  if (!body?.id || !body.status || !['draft', 'approved', 'published'].includes(body.status)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const patch: Partial<EventRecord> = { status: body.status }
  if (body.status === 'published') patch.publishedAt = new Date().toISOString()
  if (body.status !== 'published') patch.publishedAt = null

  const event = await updateEvent(body.id, patch)
  if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  return NextResponse.json({ event })
}
