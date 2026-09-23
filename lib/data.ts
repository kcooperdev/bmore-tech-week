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
  speakerDeadline: 'February 1, 2027',
  speakerDeadlineIso: '2027-02-01',
  speakerDecision: 'March 1',
  speakerDecisionIso: '2027-03-01',
  city: 'Baltimore, MD',
  locationName: 'Baltimore',
  region: 'MD',
  country: 'US',
  tagline: 'Talks after 5:30, all over town.',
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
  speakersPath: '/speakers',
  speakerSubmitPath: '/speakers',
  volunteerSubmitPath: '/volunteers/submit',
  adminPath: '/admin',
  contactEmail: 'team@bmoretechweek.com',
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
  { value: '5', label: 'Nights' },
  { value: '5:30–10', label: 'Every evening' },
  { value: 'Citywide', label: 'Walkable rooms' },
]

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Open a room',
    body: 'If you’ve got space after 5:30, bar, office, gallery, studio, we can put a night in it.',
  },
  {
    step: '02',
    title: 'Bring a talk',
    body: 'Something you’d actually say in a room. Panel, fireside, workshop, or just people talking.',
  },
  {
    step: '03',
    title: 'We pair them up',
    body: 'Same night, same neighborhood, a room that fits. Then it goes on the schedule.',
  },
  {
    step: '04',
    title: 'Crew the night',
    body: 'Check-in, set up, breakdown. That’s how a room actually runs.',
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
  'It’s five nights in Baltimore for people building, shipping, and showing up for tech.',
  'Events run 6PM to 10PM. Days stay yours. Nights belong to the city.',
  'Venues open rooms. Speakers bring talks. We match them into official events.',
  'We’re building it with the city, not dropping a conference on top of it.',
  'Most of it sits between Harbor East, Downtown, and 4MLK so you can walk it.',
]

export const AUDIENCES = [
  'People building companies here',
  'Engineers, designers, and makers who want real rooms, not another Zoom',
  'Founders who want fireside chats and demos, not a badge farm',
  'Students trying to meet the people doing the work',
  'Neighbors who are just curious what Baltimore’s cooking next',
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
