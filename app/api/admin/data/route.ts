import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-guard'
import { listEvents, listSpeakers, listVenues, listVolunteers } from '@/lib/store'

export async function GET() {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  const [venues, speakers, events, volunteers] = await Promise.all([
    listVenues(),
    listSpeakers(),
    listEvents(),
    listVolunteers(),
  ])

  return NextResponse.json({ venues, speakers, events, volunteers })
}
