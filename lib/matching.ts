import type { EventRecord, Speaker, Venue } from '@/lib/models'
import type { TalkFormat, Topic, VenueType } from '@/lib/models'

export type MatchResult = {
  score: number
  reasons: string[]
}

const TOPIC_TO_VENUE: Record<Topic, VenueType> = {
  AI: 'tech',
  Cyber: 'tech',
  Data: 'tech',
  Engineering: 'tech',
  Product: 'hybrid',
  Startup: 'hybrid',
  Design: 'hybrid',
  Community: 'social',
}

function formatFitsLayout(format: TalkFormat, venue: Venue): string | null {
  if (format === 'workshop' && venue.capacity >= 24) {
    return 'Capacity fits a workshop'
  }
  if (format === 'social talk' && (venue.venueType === 'social' || venue.amenities.includes('Bar'))) {
    return 'Layout fits a social talk'
  }
  if (
    (format === 'panel' || format === 'fireside') &&
    (venue.amenities.includes('AV') || venue.amenities.includes('Microphone'))
  ) {
    return 'AV supports this talk format'
  }
  if (format === 'panel' && venue.capacity >= 40) {
    return 'Room size fits a panel'
  }
  return null
}

export function scoreMatch(speaker: Speaker, venue: Venue): MatchResult {
  let score = 0
  const reasons: string[] = []

  const dateOk =
    speaker.preferredDate === 'Any' || venue.availableDates.includes(speaker.preferredDate)
  if (dateOk) {
    score += 40
    reasons.push(
      speaker.preferredDate === 'Any'
        ? 'Venue dates are open'
        : 'Date matches venue availability',
    )
  }

  const neighborhoodOk =
    speaker.preferredNeighborhood === 'Any' ||
    speaker.preferredNeighborhood === venue.neighborhood
  if (neighborhoodOk) {
    score += 25
    reasons.push(
      speaker.preferredNeighborhood === 'Any'
        ? 'Neighborhood is flexible'
        : 'Neighborhood match',
    )
  }

  const expectedType = TOPIC_TO_VENUE[speaker.topic]
  if (venue.venueType === expectedType || venue.venueType === 'hybrid') {
    score += 20
    reasons.push(`Topic (${speaker.topic}) fits a ${venue.venueType} room`)
  }

  const layout = formatFitsLayout(speaker.format, venue)
  if (layout) {
    score += 15
    reasons.push(layout)
  }

  return { score: Math.min(100, score), reasons }
}

export function rankVenuesForSpeaker(speaker: Speaker, venues: Venue[]) {
  return venues
    .map((venue) => ({ venue, ...scoreMatch(speaker, venue) }))
    .sort((a, b) => b.score - a.score)
}

export function rankSpeakersForVenue(venue: Venue, speakers: Speaker[]) {
  return speakers
    .map((speaker) => ({ speaker, ...scoreMatch(speaker, venue) }))
    .sort((a, b) => b.score - a.score)
}

export function isVenueBookedOnDate(events: EventRecord[], venueId: string, date: string) {
  return events.some(
    (event) =>
      event.venueId === venueId &&
      event.date === date &&
      event.status !== 'draft',
  )
}
