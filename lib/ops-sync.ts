const DEFAULT_DEV_URL = 'http://localhost:3001/api/webhook/intake'

function intakeUrl() {
  const configured = process.env.EVENT_OPS_INTAKE_URL?.trim()
  if (configured) return configured
  if (process.env.NODE_ENV === 'development') return DEFAULT_DEV_URL
  return ''
}

function eventId() {
  return process.env.EVENT_OPS_EVENT_ID?.trim() || 'evt-bmore-2027'
}

export async function syncToEventOps(payload: Record<string, unknown>) {
  const url = intakeUrl()
  if (!url) return

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Event-Id': eventId(),
      },
      body: JSON.stringify({
        eventId: eventId(),
        source: 'bmoretechweek.com',
        ...payload,
      }),
      cache: 'no-store',
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error('[ops-sync] intake failed', res.status, text)
    }
  } catch (err) {
    console.error('[ops-sync] intake error', err)
  }
}
