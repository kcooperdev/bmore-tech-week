export const SITE_URL = 'https://www.bmoretechweek.com'

export const EVENT = {
  name: 'Baltimore Tech Week',
  edition: 'Night Edition',
  year: '2027',
  theme: 'heARTbeat of Baltimore',
  themePlain: 'Heartbeat of Baltimore',
  dates: 'April 26 to 30, 2027',
  datesShort: 'April 26–30',
  nightWindow: '5:30–10PM',
  startDate: '2027-04-26',
  endDate: '2027-04-30',
  opensOn: 'Dec 1st, 2026',
  opensOnIso: '2026-12-01',
  speakerDeadline: 'February 1, 2027',
  speakerDeadlineIso: '2027-02-01',
  speakerDecision: 'March 1',
  speakerDecisionIso: '2027-03-01',
  city: 'Baltimore, MD',
  locationName: 'Baltimore',
  region: 'MD',
  country: 'US',
  tagline: 'Five nights. Across Baltimore.',
  ticketsStatus: 'coming soon' as const,
  submissionsOpen: true,
  speakerCallOpen: true,
  infoSessionUrl: 'https://luma.com/on6frsgw',
  infoSessionVolunteerUrl: 'https://app.youform.com/forms/rggnoncr',
  infoSessionDate: 'August 27',
  infoSessionStatus: 'sold out' as const,
  buildRoomPath: '/buildroom',
  eventsPath: '/events',
  programmingPath: '/programming',
  talksPath: '/talks',
  venuesPath: '/venues',
  venueSubmitPath: '/venues/submit',
  weekPath: '/week',
  whyPath: '/why',
  speakersPath: '/speakers',
  partnersPath: '/partners',
  sponsorsPath: '/sponsors',
  ambassadorsPath: '/ambassadors',
  demoPath: '/demo',
  ticketsPath: '/tickets',
  speakerSubmitPath: '/speakers',
  volunteerSubmitPath: '/volunteers/submit',
  adminPath: '/admin',
  contactEmail: 'team@bmoretechweek.com',
  speakBookingUrl: '',
  speakApplyUrl: '',
  partnerApplyUrl: '',
  sponsorApplyUrl: '',
  sponsorCallUrl: 'https://tidycal.com/bmore-tech-week/30-minute-meeting',
  instagramUrl: 'https://www.instagram.com/baltimoretechweekhq',
  instagramHandle: '@baltimoretechweekhq',
  linkedinUrl: 'https://www.linkedin.com/company/baltimore-tech-week-2027',
}

export const CTA = {
  submitVenue: 'Host a night',
  submitTalk: 'Give a Talk',
  callForSpeakers: 'Give a Talk',
  partnerWithUs: 'Partner',
  sponsorUs: 'Sponsor',
  beAmbassador: 'Be an Ambassador',
  submitVolunteer: 'Volunteer',
  viewEvents: 'See what’s on',
  getInvolved: 'Get Involved',
  comingSoon: 'More details coming soon',
} as const

export type ApplyKind = 'speak' | 'partner' | 'sponsor' | 'ambassador'

export function isApplyOpenNow() {
  return true
}

export function applyRequestOpen(request: Request) {
  return isApplyOpenNow() || request.headers.get('x-btw-demo') === '1'
}

export function applyFetchHeaders(demo = false): HeadersInit {
  return {
    'Content-Type': 'application/json',
    ...(demo ? { 'x-btw-demo': '1' } : {}),
  }
}

export function applyLink(kind: ApplyKind) {
  return {
    href: {
      speak: '/apply/speak',
      partner: '/apply/partner',
      sponsor: '/apply/sponsor',
      ambassador: '/apply/ambassador',
    }[kind],
    external: true,
  }
}

export function involveLink(kind: ApplyKind) {
  return {
    href: {
      speak: EVENT.speakersPath,
      partner: EVENT.partnersPath,
      sponsor: EVENT.sponsorsPath,
      ambassador: EVENT.ambassadorsPath,
    }[kind],
  }
}

export const STATS = [
  { value: '5:30', label: 'Doors each night' },
  { value: '5', label: 'Industries' },
  { value: '$40', label: 'Week pass' },
]

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Show up',
    body: 'Doors open at 5:30. Rooms will be announced. Come for one night or stay the week.',
  },
  {
    step: '02',
    title: 'Sit in a session',
    body: 'Workshops, panels, and tech talks. Stay for one, or stay the whole night.',
  },
  {
    step: '03',
    title: 'Talk to people after',
    body: 'The room is small on purpose. Stay after the session. That is the point of a night format.',
  },
  {
    step: '04',
    title: 'Come back tomorrow, if you want',
    body: 'Five nights. You do not have to do every night. One still counts.',
  },
] as const

export const VOLUNTEER_ROLES = [
  {
    id: 'check-in',
    label: 'Check-in',
    body: 'Greet people, get names down, keep the door moving.',
  },
  {
    id: 'set-up',
    label: 'Set up',
    body: 'Chairs, signs, water, AV. Show up early and make the room ready.',
  },
  {
    id: 'breakdown',
    label: 'Breakdown',
    body: 'Stack chairs, pack cables, leave the room better than we found it.',
  },
] as const

export const VISION = [
  'Five nights. Across Baltimore.',
  'Rooms in neighborhoods, not a single convention hall.',
  'Talks, workshops, and panels from people who actually work here.',
  'It should feel easy. A venue, a night, and whoever else showed up.',
  'Support the room you’re in. See a part of the city you don’t always get to.',
]

export const AUDIENCES = [
  'Founders, developers, designers, and students',
  'People who want a neighborhood room, not a ballroom',
  'Neighbors curious about what’s being built here',
  'Anyone after 5:30 for one night or all five',
  'Community groups and companies backing the week',
]

export const PARTNERS = [
  {
    name: '4MLK',
    role: 'Info session host venue',
    href: 'https://www.4mlk.com/',
    logo: '/images/4mlk-logo.webp',
    image: '/images/4mlk-exterior.webp',
    address: '4 N. Martin Luther King Jr. Blvd',
    city: 'Baltimore, MD 21201',
  },
]

export const WEEK_DATES = [
  { iso: '2027-04-26', weekday: 'Monday', label: 'Monday, April 26', short: 'Apr 26' },
  { iso: '2027-04-27', weekday: 'Tuesday', label: 'Tuesday, April 27', short: 'Apr 27' },
  { iso: '2027-04-28', weekday: 'Wednesday', label: 'Wednesday, April 28', short: 'Apr 28' },
  { iso: '2027-04-29', weekday: 'Thursday', label: 'Thursday, April 29', short: 'Apr 29' },
  { iso: '2027-04-30', weekday: 'Friday', label: 'Friday, April 30', short: 'Apr 30' },
] as const

export const TIME_SLOTS = [
  '6:00 PM – 7:30 PM',
  '6:30 PM – 8:00 PM',
  '7:00 PM – 8:30 PM',
  '7:30 PM – 9:00 PM',
  '8:00 PM – 10:00 PM',
  '6:00 PM – 10:00 PM',
] as const

export const NEIGHBORHOODS = [
  'BioPark',
  'Station North',
  'Hampden',
  'Inner Harbor',
  'Harbor East',
  'Downtown',
  '4MLK / Westside',
  'Fells Point',
  'Federal Hill',
  'Mount Vernon',
  'Canton',
  'Remington',
  'Other',
] as const

export const TOPICS = [
  'AI',
  'Cyber',
  'Startup',
  'Product',
  'Data',
  'Design',
  'Engineering',
  'Community',
] as const

export const FORMATS = ['panel', 'workshop', 'tech talk', 'fireside', 'lightning', 'social talk'] as const

export const VENUE_TYPES = ['tech', 'social', 'hybrid'] as const

export const COST_TYPES = ['Free', 'Low-Cost', 'Standard'] as const

export const AMENITIES = [
  'AV',
  'Seating',
  'Bar',
  'WiFi',
  'Projector',
  'Microphone',
  'Stage',
  'Outdoor space',
  'Accessible',
  'Parking',
] as const
