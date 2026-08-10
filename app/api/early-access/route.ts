import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'

type Body = {
  name?: string
  email?: string
  company?: string
  wantHost?: boolean
  wantSponsor?: boolean
  wantVolunteer?: boolean
  wantCommunityPartner?: boolean
}

type Signup = {
  name: string
  email: string
  company: string | null
  wantHost: boolean
  wantSponsor: boolean
  wantVolunteer: boolean
  wantCommunityPartner: boolean
  at: string
}

function yes(v: unknown) {
  return Boolean(v)
}

const LOCAL_FILE = path.join(process.cwd(), 'data', 'early-access-submissions.json')

async function saveLocal(payload: Signup) {
  await mkdir(path.dirname(LOCAL_FILE), { recursive: true })
  let rows: Signup[] = []
  try {
    const raw = await readFile(LOCAL_FILE, 'utf8')
    const parsed = JSON.parse(raw) as unknown
    if (Array.isArray(parsed)) rows = parsed as Signup[]
  } catch {
    // First signup or empty file
  }
  rows.push(payload)
  await writeFile(LOCAL_FILE, `${JSON.stringify(rows, null, 2)}\n`, 'utf8')
}

async function saveWebhook(webhook: string, payload: Signup) {
  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    redirect: 'follow',
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`webhook ${res.status}: ${text.slice(0, 300)}`)
  }
}

export async function POST(request: Request) {
  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim().toLowerCase()
  const company = String(body.company || '').trim()
  const wantHost = yes(body.wantHost)
  const wantSponsor = yes(body.wantSponsor)
  const wantVolunteer = yes(body.wantVolunteer)
  const wantCommunityPartner = yes(body.wantCommunityPartner)
  const at = new Date().toISOString()

  if (!name || name.length > 120) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
  }
  if (company.length > 160) {
    return NextResponse.json({ error: 'Company is too long' }, { status: 400 })
  }

  const payload: Signup = {
    name,
    email,
    company: company || null,
    wantHost,
    wantSponsor,
    wantVolunteer,
    wantCommunityPartner,
    at,
  }

  const webhook = process.env.EARLY_ACCESS_WEBHOOK_URL?.trim()
  const isProd = process.env.NODE_ENV === 'production'

  // Local file: works on your machine only. Vercel cannot write a persistent file for you.
  if (!isProd) {
    try {
      await saveLocal(payload)
      console.info('[early-access] saved locally → data/early-access-submissions.json', { email, at })
    } catch (err) {
      console.error('[early-access] local save failed', err)
      return NextResponse.json({ error: 'Could not save signup locally.' }, { status: 500 })
    }
  }

  if (webhook) {
    try {
      await saveWebhook(webhook, payload)
      console.info('[early-access] sent to webhook', { email, at })
    } catch (err) {
      console.error('[early-access] webhook error', err)
      if (isProd) {
        return NextResponse.json({ error: 'Could not save signup. Try again in a moment.' }, { status: 502 })
      }
      // Dev: local file already saved; still succeed
    }
    return NextResponse.json({ ok: true })
  }

  if (!isProd) {
    return NextResponse.json({ ok: true, local: true })
  }

  console.error('[early-access] EARLY_ACCESS_WEBHOOK_URL is not set')
  return NextResponse.json(
    { error: 'Signups are not connected yet. Email team@bmoretechweek.com and we will add you.' },
    { status: 503 },
  )
}
