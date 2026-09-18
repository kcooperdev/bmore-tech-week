import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-guard'
import { updateVolunteer } from '@/lib/store'

export async function PATCH(request: Request) {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  const body = (await request.json().catch(() => null)) as { id?: string; status?: 'pending' | 'reviewed' } | null
  if (!body?.id || (body.status !== 'pending' && body.status !== 'reviewed')) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const volunteer = await updateVolunteer(body.id, { status: body.status })
  if (!volunteer) return NextResponse.json({ error: 'Volunteer not found' }, { status: 404 })
  return NextResponse.json({ volunteer })
}
