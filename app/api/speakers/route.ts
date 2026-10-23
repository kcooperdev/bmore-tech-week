import { NextResponse } from 'next/server'
import { applyRequestOpen, EVENT } from '@/lib/data'
import { FormError, parseSpeakerInput } from '@/lib/validate'
import { createSpeaker } from '@/lib/store'
import { appendToSheet, speakerSheetFields } from '@/lib/sheets'
import { syncToEventOps } from '@/lib/ops-sync'
import type { Speaker } from '@/lib/models'

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
    await syncToEventOps({
      kind: 'speak',
      category: 'speakers',
      name: speaker.name,
      email: speaker.email,
      phone: speaker.phone,
      company: speaker.company,
      title: speaker.title,
      cityState: speaker.cityState,
      talkTitle: speaker.talkTitle,
      sessionTitle: speaker.talkTitle,
      talkDescription: speaker.talkDescription,
      sessionDescription: speaker.talkDescription,
      takeaways: speaker.takeaways,
      format: speaker.format,
      sessionType: speaker.format,
      preferredNights: speaker.preferredNights,
      topics: speaker.topics,
      audienceLevel: speaker.audienceLevel,
      spokenBefore: speaker.spokenBefore ? 'yes' : 'no',
      panelistFallback: speaker.panelistFallback ? 'yes' : 'no',
      serveAsPanelist: speaker.panelistFallback ? 'yes' : 'no',
      accessibility: speaker.accessibility,
      notes: speaker.notes,
      previousTalks: speaker.previousTalks,
      linkedinUrl: speaker.linkedinUrl,
      websiteUrl: speaker.websiteUrl,
      website: speaker.websiteUrl,
    })
    return NextResponse.json({ ok: true, id: speaker.id })
  } catch (err) {
    if (err instanceof FormError) {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }
    console.error('[speakers] create failed', err)
    return NextResponse.json({ error: 'Could not save talk.' }, { status: 500 })
  }
}
