import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-guard'
import { updateVenue } from '@/lib/store'

export async function PATCH(request: Request) {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  const body = (await request.json().catch(() => null)) as { id?: string; status?: 'pending' | 'reviewed' } | null
  if (!body?.id || (body.status !== 'pending' && body.status !== 'reviewed')) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const venue = await updateVenue(body.id, { status: body.status })
  if (!venue) return NextResponse.json({ error: 'Venue not found' }, { status: 404 })
  return NextResponse.json({ venue })
}
