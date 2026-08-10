export const SITE_URL = 'https://www.bmoretechweek.com'

export const EVENT = {
  name: 'Baltimore Tech Week',
  year: '2027',
  theme: 'heARTbeat of Baltimore',
  themePlain: 'Heartbeat of Baltimore',
  dates: 'April 26 to 30, 2027',
  startDate: '2027-04-26',
  endDate: '2027-04-30',
  city: 'Baltimore, MD',
  locationName: 'Baltimore',
  region: 'MD',
  country: 'US',
  tagline: 'Where tech meets culture in Charm City.',
  infoSessionUrl: 'https://luma.com/on6frsgw',
  infoSessionVolunteerUrl: 'https://app.youform.com/forms/rggnoncr',
  infoSessionDate: 'August 27',
  infoSessionStatus: 'sold out' as const,
  earlyAccessPath: '/early-access',
  buildRoomPath: '/buildroom',
  contactEmail: 'team@bmoretechweek.com',
  instagramUrl: 'https://www.instagram.com/baltimoretechweekhq',
  instagramHandle: '@baltimoretechweekhq',
  linkedinUrl: 'https://www.linkedin.com/company/baltimore-tech-week-2027',
}

export const CTA = {
  label: 'RSVP for the Info Session',
  short: 'Info Session',
  volunteer: 'Volunteer for the Info Session',
  earlyAccess: 'Join Early Access',
  earlyAccessShort: 'Early Access',
  earlyAccessNav: 'Early Access. Can’t make the info session? Start here.',
  missedEvent: 'Can’t make the info session',
} as const

export const STATS = [
  { value: '5', label: 'Days of programming' },
  { value: '30+', label: 'Events' },
  { value: '4', label: 'Mixers' },
]

export const VISION = [
  'It’s five days in Baltimore for people building, shipping, and showing up for tech.',
  'Days are for tech talks, fireside chats, and demos. Nights are for mixers.',
  'We’re building it with the city, not dropping a conference on top of it.',
  'It’s free. You just need to RSVP.',
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

export const EARLY_ACCESS = {
  heroEyebrow: 'Baltimore Tech Week 2027',
  heroTitle: 'Five days of curated community, culture, and technology.',
  heroSupport: 'See Baltimore tech through Baltimore eyes.',
  whatsComing: [
    'Tech talks featuring Baltimore builders',
    'Live demos from emerging startups',
    'Fireside chats with voices shaping the city',
    'Mixers connecting founders, creators, technologists',
    'Nighttime events blending tech, culture, and community',
    'A curated week designed to feel like Baltimore, not Silicon Valley',
  ],
  programmingNote:
    'The full programming will be announced after the August 27 info session.',
  programmingSupport:
    'If you want first access to events, speakers, venues, and experiences, join the early access list.',
  missedTitle: 'You’re still early',
  missedLead:
    'August 27 is sold out. Join Early Access for the recap and everything that drops next.',
  missedCta: 'Can’t make the info session',
  missedPerks: [
    'The full recap',
    'The first programming drop',
    'Host onboarding',
    'Sponsor opportunities',
    'Invitations to pre-week mixers and community events',
  ],
  whyMatters: [
    'Baltimore deserves a tech week that reflects its identity: bold, creative, community-rooted, and full of momentum.',
    'This isn’t a week with 100+ scattered events. It’s a curated five-day experience built with intention.',
  ],
  whoFor: [
    'Founders',
    'Engineers',
    'Designers',
    'Artists',
    'Students',
    'Investors',
    'Creators',
    'Community leaders',
  ],
} as const
