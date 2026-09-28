import { Resend } from 'resend'
import { EVENT } from '@/lib/data'
import { ticketMessage } from '@/lib/ticket-copy'

function client() {
  const key = process.env.RESEND_API_KEY?.trim()
  if (!key) return null
  return new Resend(key)
}

function fromAddress() {
  return process.env.RESEND_FROM?.trim() || `Baltimore Tech Week <${EVENT.contactEmail}>`
}

export async function addTicketContact(email: string) {
  const resend = client()
  if (!resend) return
  const segmentId = process.env.RESEND_SEGMENT_ID?.trim()
  const created = await resend.contacts.create({
    email,
    unsubscribed: false,
    ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
  })
  if (!created.error) return
  if (!segmentId) {
    console.error('[resend] contact', created.error)
    return
  }
  const added = await resend.contacts.segments.add({ email, segmentId })
  if (added.error) console.error('[resend] segment', added.error)
}

export async function sendTicketConfirmation(email: string, pass: string) {
  const resend = client()
  if (!resend) return
  const message = ticketMessage('confirm', { pass })
  const sent = await resend.emails.send({
    from: fromAddress(),
    to: email,
    subject: message.subject,
    text: message.text,
    html: message.html,
  })
  if (sent.error) console.error('[resend] email', sent.error)
  await addTicketContact(email)
}

export async function sendTicketsOpen(url: string) {
  const resend = client()
  const segmentId = process.env.RESEND_SEGMENT_ID?.trim()
  if (!resend || !segmentId) throw new Error('Resend is not configured')
  const message = ticketMessage('open', { url })
  const sent = await resend.broadcasts.create({
    segmentId,
    from: fromAddress(),
    subject: message.subject,
    text: message.text,
    html: message.html,
    send: true,
  })
  if (sent.error) {
    console.error('[resend] broadcast', sent.error)
    throw new Error('Could not send the ticket note')
  }
}
