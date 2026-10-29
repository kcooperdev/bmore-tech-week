import { EVENT } from '@/lib/data'

export const DEMO_SPEAK = {
  form: {
    name: 'Test Maya Ortiz',
    email: 'test.speak@bmoretechweek.com',
    phone: '410-555-0142',
    pronouns: 'she / her',
    cityState: 'Baltimore, MD',
    yearsAround: 'I live here now',
    title: 'Staff engineer',
    company: 'Harbor Labs',
    linkedinUrl: 'https://www.linkedin.com/in/test-maya-ortiz',
    websiteUrl: 'https://harborlabs.example',
    heardAbout: 'A meetup or group',
    format: 'techtalk',
    talkTitle: 'What broke on our first MedTech deploy, and what we changed',
    description:
      'A 25-minute tech talk from a Baltimore team that shipped a clinical workflow tool and learned the hard way. We cover the night the pager went off, the three decisions we reversed, and the checklist we now hand every new engineer. Built for people who ship here, not a product demo. Test data from the demo desk.',
    takeaways:
      '1. How we isolated a production incident without taking the clinic offline.\n2. A three-question review we run before every MedTech release.\n3. What we tell new hires about working next to a hospital.',
    audience: 'Intermediate',
    spokenBefore: 'yes',
    panelist: 'yes',
    accessibility: 'Aisle seat near the front. No strobe on slides.',
    notes: 'Test data from the demo desk. Safe to delete.',
    neighborhood: 'BioPark',
  },
  nights: ['2027-04-26', '2027-04-30'],
  topics: ['MedTech / Biotech', 'Software Engineering', 'Careers'],
  links: [
    { kind: 'Talk' as const, url: 'https://harborlabs.example/talks', note: 'Local meetup, 2025' },
    { kind: 'Talk' as const, url: '', note: 'Internal eng all-hands' },
    { kind: 'Article' as const, url: 'https://harborlabs.example/incident-writeup', note: 'Postmortem after the first deploy' },
  ],
}

export const DEMO_PARTNER = {
  form: {
    name: 'Test Jordan Blake',
    email: 'test.partner@bmoretechweek.com',
    phone: '410-555-0198',
    pronouns: 'they / them',
    title: 'Organizer',
    organization: 'Station North Builders',
    type: 'Meetup',
    size: '50–200 people',
    neighborhood: 'Station North',
    website: 'https://stationnorthbuilders.example',
    instagram: '@snbuilders',
    audience: 'Designers, artists, and creative technologists in Station North. About 80 people on a good Tuesday.',
    heardAbout: 'A friend',
    notes: 'Test data from the demo desk. Safe to delete.',
  },
  channels: ['Newsletter', 'Instagram', 'In-person meetup'],
  help: ['Share the week with our people', 'Help with student tickets'],
  nights: ['Creative Tech', 'AI'],
}

export const DEMO_SPONSOR = {
  form: {
    name: 'Test Priya Shah',
    email: 'test.sponsor@bmoretechweek.com',
    phone: '410-555-0177',
    title: 'Head of partnerships',
    organization: 'Chesapeake Cloud',
    website: 'https://chesapeakecloud.example',
    size: '51–200',
    tier: 'innovation',
    decision: 'I recommend, someone else signs',
    heardAbout: 'LinkedIn',
    booked: 'yes',
    notes: 'Test data from the demo desk. Ask about a table on Founders night. Safe to delete.',
  },
  goals: ['Brand in Baltimore', 'Recruiting / talent'],
}

export const DEMO_AMBASSADOR = {
  form: {
    name: 'Test Chris Vale',
    email: 'test.ambassador@bmoretechweek.com',
    phone: '410-555-0114',
    pronouns: 'he / him',
    city: 'Baltimore, MD',
    yearsAround: 'Most of my life',
    organization: 'UMBC',
    title: 'Student organizer',
    neighborhood: 'Other',
    reach: 'A regular group (50–200)',
    why: 'I’ll tell our campus Slack, the CS Discord, and the Tuesday meetup. I’ll post the five nights once and walk two classmates in on MedTech night.',
    heardAbout: 'Campus',
    notes: 'Test data from the demo desk. Safe to delete.',
  },
  channels: ['Campus', 'Meetup / group', 'Instagram'],
}

export const DEMO_VOLUNTEER = {
  name: 'Test Sam Rivera',
  email: 'test.volunteer@bmoretechweek.com',
  phone: '410-555-0160',
  roles: ['check-in', 'set-up'],
  availableDates: [EVENT.startDate, '2027-04-30'],
  preferredNeighborhood: 'Inner Harbor',
  notes: 'Test data from the demo desk. First time volunteering. Safe to delete.',
}

export const DEMO_VENUE = {
  name: 'Test Harbor Room',
  neighborhood: 'Inner Harbor',
  address: '301 Light St, Baltimore, MD 21202',
  capacity: 80,
  availableDates: [EVENT.startDate, EVENT.endDate],
  venueType: 'hybrid',
  costType: 'Free' as const,
  costAmount: '',
  amenities: ['AV', 'Seating', 'WiFi', 'Accessible'],
  contactName: 'Test Harbor Host',
  contactEmail: 'test.venue@bmoretechweek.com',
}

export const DEMO_TICKET = {
  email: 'test.ticket@bmoretechweek.com',
  pass: 'General Admission week pass',
  name: 'Test Alex Kim',
  organization: 'Harbor Labs',
  role: 'Designer',
  notes: 'Test data from the demo desk. Safe to delete.',
}

export function speakerPayload() {
  return {
    name: DEMO_SPEAK.form.name,
    email: DEMO_SPEAK.form.email,
    phone: DEMO_SPEAK.form.phone,
    company: DEMO_SPEAK.form.company,
    title: DEMO_SPEAK.form.title,
    cityState: DEMO_SPEAK.form.cityState,
    talkTitle: DEMO_SPEAK.form.talkTitle,
    talkDescription: DEMO_SPEAK.form.description,
    takeaways: DEMO_SPEAK.form.takeaways,
    format: DEMO_SPEAK.form.format,
    preferredNights: DEMO_SPEAK.nights,
    preferredNeighborhood: DEMO_SPEAK.form.neighborhood,
    topics: DEMO_SPEAK.topics,
    audienceLevel: DEMO_SPEAK.form.audience,
    spokenBefore: DEMO_SPEAK.form.spokenBefore,
    previousTalks: DEMO_SPEAK.links
      .filter((item) => item.url.trim() || item.note.trim())
      .map((item) => [item.kind, item.url.trim(), item.note.trim()].filter(Boolean).join(' · '))
      .join('\n'),
    accessibility: DEMO_SPEAK.form.accessibility,
    panelistFallback: DEMO_SPEAK.form.panelist,
    notes: DEMO_SPEAK.form.notes,
    linkedinUrl: DEMO_SPEAK.form.linkedinUrl,
    websiteUrl: DEMO_SPEAK.form.websiteUrl,
  }
}

export function partnerPayload() {
  const { form, channels, help, nights } = DEMO_PARTNER
  return {
    kind: 'partner',
    name: form.name,
    email: form.email,
    organization: form.organization,
    role: form.title,
    website: form.website,
    notes: [
      `Type: ${form.type}`,
      `Size: ${form.size}`,
      `Neighborhood: ${form.neighborhood}`,
      `Instagram: ${form.instagram}`,
      `Audience: ${form.audience}`,
      `Channels: ${channels.join(', ')}`,
      `Help: ${help.join(', ')}`,
      `Nights they can show: ${nights.join(', ')}`,
      form.phone && `Phone: ${form.phone}`,
      form.notes,
    ].join('\n'),
  }
}

export function sponsorPayload() {
  const { form, goals } = DEMO_SPONSOR
  return {
    kind: 'sponsor',
    name: form.name,
    email: form.email,
    organization: form.organization,
    role: form.title,
    website: form.website,
    pass: 'Sponsor · Innovation',
    notes: [
      'Tier: Innovation ($2,500)',
      `Company size: ${form.size}`,
      `Goals: ${goals.join(', ')}`,
      `Decision: ${form.decision}`,
      'Call booked: Yes, booked on TidyCal',
      'Call link: https://tidycal.com/bmore-tech-week/30-minute-meeting',
      `Phone: ${form.phone}`,
      form.notes,
    ].join('\n'),
  }
}

export function ambassadorPayload() {
  const { form, channels } = DEMO_AMBASSADOR
  return {
    kind: 'ambassador',
    name: form.name,
    email: form.email,
    organization: form.organization,
    role: form.title,
    notes: [
      `Channels: ${channels.join(', ')}`,
      `Reach: ${form.reach}`,
      `Neighborhood: ${form.neighborhood}`,
      `City: ${form.city}`,
      `How they’ll spread the word: ${form.why}`,
      `Phone: ${form.phone}`,
      form.notes,
    ].join('\n'),
  }
}
