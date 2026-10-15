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
  opensOn: 'Nov 1st, 2026',
  speakerDeadline: 'February 1, 2027',
  speakerDeadlineIso: '2027-02-01',
  speakerDecision: 'March 1',
  speakerDecisionIso: '2027-03-01',
  city: 'Baltimore, MD',
  locationName: 'Baltimore',
  region: 'MD',
  country: 'US',
  tagline: 'One week. Coworking by day, the conference at night.',
  ticketsStatus: 'coming soon' as const,
  submissionsOpen: false,
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
  ticketsPath: '/tickets',
  speakerSubmitPath: '/speakers',
  volunteerSubmitPath: '/volunteers/submit',
  adminPath: '/admin',
  contactEmail: 'team@bmoretechweek.com',
  // Calendar URL for partner and sponsor calls. Empty until that link exists.
  speakBookingUrl: '',
  instagramUrl: 'https://www.instagram.com/baltimoretechweekhq',
  instagramHandle: '@baltimoretechweekhq',
  linkedinUrl: 'https://www.linkedin.com/company/baltimore-tech-week-2027',
}

export const CTA = {
  submitVenue: 'Host a night',
  submitTalk: 'Apply to speak',
  callForSpeakers: 'Call for Speakers',
  submitVolunteer: 'Volunteer',
  viewEvents: 'See what’s on',
  getInvolved: 'Get involved',
  comingSoon: 'More details coming soon',
} as const

export const STATS = [
  { value: '5', label: 'Days in the city' },
  { value: '5:30–10', label: 'Every evening' },
  { value: 'Shops', label: 'A new one each day' },
]

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Show up',
    body: 'Bring a laptop to that day’s coffee shop. The shop changes, so the neighborhood does too.',
  },
  {
    step: '02',
    title: 'Work',
    body: 'Grab a coffee. Get something done. Meet someone if you feel like it. Leave when you want.',
  },
  {
    step: '03',
    title: 'Stay for night',
    body: 'The tech conference starts when the laptops close. Baltimore Tech Week, around the city.',
  },
  {
    step: '04',
    title: 'Or just the day',
    body: 'You don’t have to do both. A coffee and a few hours still counts.',
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
  'Baltimore Tech Week is one week. By day it’s Charm City CoWeek, in coffee shops across the city.',
  'Bring a laptop. The shop changes through the week. You don’t have to network the whole day.',
  'At night it’s the conference. Same week, when the laptops close.',
  'It should feel easy. Coffee, a neighborhood, and whoever else is working.',
  'Support the shop you’re in. See a part of the city you don’t always get to.',
]

export const AUDIENCES = [
  'Anyone with a laptop and a free afternoon',
  'Founders, developers, designers, and students',
  'People who want a coffee shop, not a ballroom',
  'Neighbors curious about what’s being built here',
  'Anyone who might stay for the night, or might not',
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
  'Harbor East',
  'Downtown',
  '4MLK / Westside',
  'Fells Point',
  'Federal Hill',
  'Mount Vernon',
  'Station North',
  'Hampden',
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

export const FORMATS = ['panel', 'fireside', 'workshop', 'lightning', 'social talk'] as const

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
