import { formatCost, formatWeekDate } from '@/lib/format'
import type { Speaker, Venue, Volunteer } from '@/lib/models'

type SheetTab = 'hosts' | 'speakers' | 'volunteers' | 'tickets'

export function ticketSheetFields(signup: { id: string; email: string; createdAt: string }) {
  return {
    submittedAt: signup.createdAt,
    id: signup.id,
    email: signup.email,
  }
}

export async function appendToSheet(tab: SheetTab, fields: Record<string, string>) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim()
  if (!url) return

  const secret = process.env.GOOGLE_SHEETS_SECRET?.trim() || ''

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, tab, fields }),
      cache: 'no-store',
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      console.error(`[sheets] ${tab} webhook failed`, res.status, text)
    }
  } catch (err) {
    console.error(`[sheets] ${tab} webhook error`, err)
  }
}

function dates(values: string[]) {
  return values.map((iso) => formatWeekDate(iso, 'short')).join(', ')
}

export function venueSheetFields(venue: Venue): Record<string, string> {
  return {
    submittedAt: venue.createdAt,
    id: venue.id,
    name: venue.name,
    neighborhood: venue.neighborhood,
    address: venue.address,
    capacity: String(venue.capacity),
    availableDates: dates(venue.availableDates),
    venueType: venue.venueType,
    cost: formatCost(venue.costType, venue.costAmount),
    amenities: venue.amenities.join(', '),
    contactName: venue.contactName,
    contactEmail: venue.contactEmail,
    status: venue.status,
  }
}

export function speakerSheetFields(speaker: Speaker): Record<string, string> {
  return {
    submittedAt: speaker.createdAt,
    id: speaker.id,
    name: speaker.name,
    email: speaker.email,
    talkTitle: speaker.talkTitle,
    talkDescription: speaker.talkDescription,
    topic: speaker.topic,
    format: speaker.format,
    preferredNeighborhood: speaker.preferredNeighborhood,
    preferredDate:
      speaker.preferredDate === 'Any' ? 'Any night' : formatWeekDate(speaker.preferredDate, 'short'),
    linkedinUrl: speaker.linkedinUrl,
    websiteUrl: speaker.websiteUrl,
    portfolioUrl: speaker.portfolioUrl,
    status: speaker.status,
  }
}

export function volunteerSheetFields(volunteer: Volunteer): Record<string, string> {
  return {
    submittedAt: volunteer.createdAt,
    id: volunteer.id,
    name: volunteer.name,
    email: volunteer.email,
    phone: volunteer.phone,
    roles: volunteer.roles.join(', '),
    availableDates: dates(volunteer.availableDates),
    preferredNeighborhood: volunteer.preferredNeighborhood,
    notes: volunteer.notes,
    status: volunteer.status,
  }
}
