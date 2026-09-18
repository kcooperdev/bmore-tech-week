import {
  AMENITIES,
  COST_TYPES,
  FORMATS,
  NEIGHBORHOODS,
  TIME_SLOTS,
  TOPICS,
  VENUE_TYPES,
  VOLUNTEER_ROLES,
  WEEK_DATES,
} from '@/lib/data'
import type { Amenity, CostType, TalkFormat, Topic, VenueType, VolunteerRole, WeekDate } from '@/lib/models'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_OPTIONAL = /^(https?:\/\/[^\s]+)?$/i
const DATES = new Set(WEEK_DATES.map((d) => d.iso))
const NEIGHBORHOOD_SET = new Set(NEIGHBORHOODS)
const TOPIC_SET = new Set(TOPICS)
const FORMAT_SET = new Set(FORMATS)
const VENUE_TYPE_SET = new Set(VENUE_TYPES)
const COST_SET = new Set(COST_TYPES)
const AMENITY_SET = new Set(AMENITIES)
const TIME_SET = new Set(TIME_SLOTS)
const ROLE_SET = new Set(VOLUNTEER_ROLES.map((role) => role.id))

export class FormError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FormError'
  }
}

function str(value: unknown, label: string, max: number, required = true) {
  const text = String(value ?? '').trim()
  if (!text) {
    if (required) throw new FormError(`${label} is required`)
    return ''
  }
  if (text.length > max) throw new FormError(`${label} is too long`)
  return text
}

function email(value: unknown, label: string) {
  const text = str(value, label, 200).toLowerCase()
  if (!EMAIL.test(text)) throw new FormError(`Valid ${label.toLowerCase()} is required`)
  return text
}

function optionalUrl(value: unknown, label: string) {
  const text = str(value, label, 300, false)
  if (text && !URL_OPTIONAL.test(text)) throw new FormError(`${label} must be a valid URL`)
  return text
}

function int(value: unknown, label: string, min: number, max: number) {
  const n = Number(value)
  if (!Number.isFinite(n) || n < min || n > max) {
    throw new FormError(`${label} must be between ${min} and ${max}`)
  }
  return Math.round(n)
}

function included<T extends string>(value: unknown, set: Set<T>, label: string): T {
  const text = String(value ?? '').trim() as T
  if (!set.has(text)) throw new FormError(`${label} is invalid`)
  return text
}

export function parseVenueInput(body: Record<string, unknown>) {
  const costType = included(body.costType, COST_SET, 'Cost type') as CostType
  const availableDates = Array.isArray(body.availableDates)
    ? body.availableDates.map((d) => included(d, DATES, 'Available date') as WeekDate)
    : []
  if (availableDates.length === 0) throw new FormError('Select at least one available date')

  const amenities = Array.isArray(body.amenities)
    ? body.amenities.map((item) => included(item, AMENITY_SET, 'Amenity') as Amenity)
    : []

  const costAmount =
    costType === 'Free' ? null : int(body.costAmount, 'Cost amount', 1, 100000)

  return {
    name: str(body.name, 'Venue name', 120),
    neighborhood: included(body.neighborhood, NEIGHBORHOOD_SET, 'Neighborhood'),
    address: str(body.address, 'Address', 200),
    capacity: int(body.capacity, 'Capacity', 1, 5000),
    availableDates,
    venueType: included(body.venueType, VENUE_TYPE_SET, 'Venue type') as VenueType,
    costType,
    costAmount,
    amenities,
    contactName: str(body.contactName, 'Contact name', 120),
    contactEmail: email(body.contactEmail, 'Contact email'),
  }
}

export function parseSpeakerInput(body: Record<string, unknown>) {
  const preferredNeighborhoodRaw = String(body.preferredNeighborhood ?? '').trim()
  const preferredNeighborhood =
    preferredNeighborhoodRaw === 'Any'
      ? ('Any' as const)
      : included(preferredNeighborhoodRaw, NEIGHBORHOOD_SET, 'Preferred neighborhood')

  const preferredDateRaw = String(body.preferredDate ?? '').trim()
  const preferredDate =
    preferredDateRaw === 'Any' ? ('Any' as const) : (included(preferredDateRaw, DATES, 'Preferred date') as WeekDate)

  return {
    name: str(body.name, 'Speaker name', 120),
    email: email(body.email, 'Email'),
    talkTitle: str(body.talkTitle, 'Talk title', 140),
    talkDescription: str(body.talkDescription, 'Talk description', 1200),
    topic: included(body.topic, TOPIC_SET, 'Topic') as Topic,
    format: included(body.format, FORMAT_SET, 'Format') as TalkFormat,
    preferredNeighborhood,
    preferredDate,
    linkedinUrl: optionalUrl(body.linkedinUrl, 'LinkedIn'),
    websiteUrl: optionalUrl(body.websiteUrl, 'Website'),
    portfolioUrl: optionalUrl(body.portfolioUrl, 'Portfolio'),
  }
}

export function parseVolunteerInput(body: Record<string, unknown>) {
  const roles = Array.isArray(body.roles)
    ? body.roles.map((role) => included(role, ROLE_SET, 'Role') as VolunteerRole)
    : []
  if (roles.length === 0) throw new FormError('Pick at least one role')

  const availableDates = Array.isArray(body.availableDates)
    ? body.availableDates.map((d) => included(d, DATES, 'Available date') as WeekDate)
    : []
  if (availableDates.length === 0) throw new FormError('Select at least one night')

  const neighborhoodRaw = String(body.preferredNeighborhood ?? '').trim()
  const preferredNeighborhood =
    neighborhoodRaw === 'Any'
      ? ('Any' as const)
      : included(neighborhoodRaw, NEIGHBORHOOD_SET, 'Preferred neighborhood')

  const phone = str(body.phone, 'Phone', 40, false)
  if (phone && phone.replace(/\D/g, '').length < 7) {
    throw new FormError('Phone number looks short')
  }

  return {
    name: str(body.name, 'Name', 120),
    email: email(body.email, 'Email'),
    phone,
    roles,
    availableDates,
    preferredNeighborhood,
    notes: str(body.notes, 'Notes', 600, false),
  }
}

export function parseWaitlistInput(body: Record<string, unknown>) {
  return {
    email: email(body.email, 'Email'),
  }
}

export function parseEventInput(body: Record<string, unknown>) {
  return {
    name: str(body.name, 'Event name', 140),
    description: str(body.description, 'Description', 1200),
    venueId: str(body.venueId, 'Venue', 80),
    speakerId: str(body.speakerId, 'Speaker', 80),
    date: included(body.date, DATES, 'Date') as WeekDate,
    time: included(body.time, TIME_SET, 'Time'),
  }
}
