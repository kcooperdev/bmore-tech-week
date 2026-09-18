import type {
  AMENITIES,
  COST_TYPES,
  FORMATS,
  NEIGHBORHOODS,
  TOPICS,
  VENUE_TYPES,
  VOLUNTEER_ROLES,
  WEEK_DATES,
} from '@/lib/data'

export type Year = '2027'

export type WeekDate = (typeof WEEK_DATES)[number]['iso']
export type Neighborhood = (typeof NEIGHBORHOODS)[number]
export type Topic = (typeof TOPICS)[number]
export type TalkFormat = (typeof FORMATS)[number]
export type VenueType = (typeof VENUE_TYPES)[number]
export type CostType = (typeof COST_TYPES)[number]
export type Amenity = (typeof AMENITIES)[number]

export type VolunteerRole = (typeof VOLUNTEER_ROLES)[number]['id']
export type VenueStatus = 'pending' | 'reviewed'
export type SpeakerStatus = 'pending' | 'reviewed'
export type VolunteerStatus = 'pending' | 'reviewed'
export type EventStatus = 'draft' | 'approved' | 'published'

export type Venue = {
  id: string
  year: Year
  name: string
  neighborhood: Neighborhood
  address: string
  capacity: number
  availableDates: WeekDate[]
  venueType: VenueType
  costType: CostType
  costAmount: number | null
  amenities: Amenity[]
  contactName: string
  contactEmail: string
  status: VenueStatus
  createdAt: string
}

export type Speaker = {
  id: string
  year: Year
  name: string
  email: string
  talkTitle: string
  talkDescription: string
  topic: Topic
  format: TalkFormat
  preferredNeighborhood: Neighborhood | 'Any'
  preferredDate: WeekDate | 'Any'
  linkedinUrl: string
  websiteUrl: string
  portfolioUrl: string
  status: SpeakerStatus
  createdAt: string
}

export type Volunteer = {
  id: string
  year: Year
  name: string
  email: string
  phone: string
  roles: VolunteerRole[]
  availableDates: WeekDate[]
  preferredNeighborhood: Neighborhood | 'Any'
  notes: string
  status: VolunteerStatus
  createdAt: string
}

export type EventRecord = {
  id: string
  year: Year
  slug: string
  name: string
  description: string
  venueId: string
  speakerId: string
  date: WeekDate
  time: string
  neighborhood: Neighborhood
  topic: Topic
  format: TalkFormat
  status: EventStatus
  matchScore: number
  matchReasons: string[]
  createdAt: string
  publishedAt: string | null
}

export type TicketSignup = {
  id: string
  email: string
  createdAt: string
}

export type StoreData = {
  venues: Venue[]
  speakers: Speaker[]
  events: EventRecord[]
  volunteers: Volunteer[]
  ticketSignups: TicketSignup[]
}

export type PublicEvent = EventRecord & {
  venueName: string
  venueAddress: string
  speakerName: string
}
