import { NextResponse } from 'next/server'
import { EVENT } from '@/lib/data'
import { FormError, parseSpeakerInput } from '@/lib/validate'
import { createSpeaker } from '@/lib/store'
import { appendToSheet, speakerSheetFields } from '@/lib/sheets'
import type { Speaker } from '@/lib/models'

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
    const input = parseSpeakerInput(body)
    const speaker: Speaker = {
      id: crypto.randomUUID(),
      year: '2027',
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...input,
    }
    await createSpeaker(speaker)
    await appendToSheet('speakers', speakerSheetFields(speaker))
    return NextResponse.json({ ok: true, id: speaker.id })
  } catch (err) {
    if (err instanceof FormError) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }
    console.error('[speakers] create failed', err)
    return NextResponse.json({ error: 'Could not save talk.' }, { status: 500 })
  }
}
