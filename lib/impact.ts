export const UPSURGE_2026 = {
  title: 'UpSurge Baltimore, 2026 Greater Baltimore Ecosystem Report',
  href: 'https://upsurgebaltimore.com/wp-content/uploads/2026/05/2026-Greater-Baltimore-Ecosystem-Report.pdf',
} as const

export const ECOSYSTEM_STATS = [
  {
    value: '536',
    label: 'Active companies in the region',
    note: 'Up from 486 in the prior report. Baltimore City holds 57.5% of the identified companies.',
  },
  {
    value: '$560M',
    label: 'Raised across 77 deals in 2025',
    note: '$559.8 million, above the eight-year average. Deal count rose 28% from 2024.',
  },
  {
    value: '14',
    label: 'Exits in 2025, all acquisitions',
    note: 'A 40% increase from 10 in 2024. Disclosed value on three deals: $637.6 million.',
  },
] as const

export const CAPITAL_SLICES = [
  { label: 'Life sciences', share: 55, color: '#e2b13c', note: 'Therapeutics, devices, digital health, care.' },
  { label: 'Everything else', share: 45, color: '#2f7fa8', note: 'Cyber, climate, aerospace and defense, enterprise.' },
] as const

export const CITY_SLICES = [
  { label: 'Baltimore City', share: 57.5, color: '#e2b13c' },
  { label: 'The rest of the region', share: 42.5, color: '#2f7fa8' },
] as const

export const EVIDENCE_CARDS = [
  {
    value: '1 of 31',
    label: 'Inaugural federal Tech Hub designations',
    note: 'Awarded to the Baltimore regional consortium in 2023, focused on applying AI and biotechnology to predictive healthcare.',
    source: 'U.S. Economic Development Administration, Oct 2023',
    href: 'https://www.eda.gov/news/press-release/2023/10/23/Baltimore-Tech-Hub',
  },
  {
    value: '55%',
    label: 'Of 2025 regional venture capital went to life sciences',
    note: 'Grounded in NIH, FDA, BARDA, and Johns Hopkins infrastructure most regions cannot copy.',
    source: UPSURGE_2026.title,
    href: UPSURGE_2026.href,
  },
  {
    value: '0',
    label: 'Identified AI-native deals in Baltimore in 2025',
    note: 'Nationally, AI took 65% of venture capital. The gap is real. So is the chance to close it from this city.',
    source: UPSURGE_2026.title,
    href: UPSURGE_2026.href,
  },
] as const

export const HISTORY_CHAPTERS = [
  {
    id: 'built',
    title: 'Built here',
    image: '/images/hero-inner-harbor.jpg',
    alt: 'Inner Harbor waterfront in Baltimore',
    body: 'The port and shipyards helped shape a city of craftsmanship, commerce, and hard work. That history is still the starting point.',
  },
  {
    id: 'created',
    title: 'Created here',
    image: '/images/sessions/workshop.jpg',
    alt: 'People working together in a Baltimore room',
    body: 'MICA, the arts districts, the Reginald F. Lewis Museum, Artscape, the food, and the rooms people already gather in.',
  },
  {
    id: 'next',
    title: 'What comes next',
    image: '/images/sessions/tech-talk-room.jpg',
    alt: 'A talk in a Baltimore room',
    body: 'A night conference, built by Baltimore for Baltimore. The next major tech hub in the US starts in rooms people can actually enter.',
  },
] as const

export const CULTURE_MAP = [
  { kind: 'explore', name: 'Maryland Institute College of Art', place: 'Station North' },
  { kind: 'explore', name: 'Morgan State University', place: 'Northeast Baltimore' },
  { kind: 'explore', name: 'University of Baltimore', place: 'Mount Vernon' },
  { kind: 'explore', name: 'Johns Hopkins University', place: 'Homewood & East Baltimore' },
  { kind: 'explore', name: 'Reginald F. Lewis Museum', place: 'Inner Harbor East' },
  { kind: 'explore', name: 'Artscape', place: 'Citywide festival' },
  { kind: 'district', name: 'Station North Arts District', place: 'Creative Tech Night' },
  { kind: 'district', name: 'Black Arts District', place: 'Pennsylvania Avenue' },
  { kind: 'district', name: 'Bromo Arts District', place: 'Downtown' },
  { kind: 'district', name: 'Highlandtown Arts District', place: 'Southeast' },
  { kind: 'night', name: 'Deep & MedTech Night', place: 'BioPark · Monday' },
  { kind: 'night', name: 'Creative Tech Night', place: 'Station North · Tuesday' },
  { kind: 'night', name: 'Hardware & Makerspace Night', place: 'Hampden · Wednesday' },
  { kind: 'night', name: 'Founders & Startups Night', place: 'Inner Harbor · Thursday' },
  { kind: 'night', name: 'Community Night & Expo', place: 'Citywide · Friday' },
] as const

export const WEEK_PILLARS = [
  {
    title: 'A hybrid conference at night',
    body: 'Five nights, 5:30 to 10PM. Official rooms across neighborhoods, plus partner-hosted events around the city. Come for one night or stay the week.',
  },
  {
    title: 'Community partners host their own events',
    body: 'Meetups, schools, and groups already gather people here. They can bring that circle into the week and host under their own name.',
  },
  {
    title: 'A platform for people who want to give',
    body: 'If you have something to share, or you want to invest time in this city, the stage is open. First-time speakers are welcome.',
  },
] as const

export const PATHWAY = [
  'Free access and a night you can actually attend',
  'Talks, partner events, and useful introductions',
  'Follow-up meetings, demonstrations, and referrals',
  'Interviews, contracts, collaborations, and new work',
] as const

export const SPONSOR_PAYS_FOR = [
  'Free community admission',
  'Confirmed workshops and demonstrations',
  'Venue and production needs',
  'Local creative and operational suppliers',
  'Outreach to communities we want in the room',
  'Post-event follow-up and impact reporting',
] as const

export const SCORECARD = [
  {
    area: 'Participation',
    measure: 'Unique attendees and total check-ins, reported separately',
  },
  {
    area: 'Local business support',
    measure: 'Actual organizer spending with Baltimore suppliers',
  },
  {
    area: 'Partner events',
    measure: 'Community-hosted nights that ran under the week',
  },
  {
    area: 'Sponsor delivery',
    measure: 'Contracted benefits delivered and measured engagement',
  },
  {
    area: 'Longer-term opportunity',
    measure: 'Follow-up meetings, interviews, collaborations, and contracts reported after the event',
  },
] as const

export const ROADMAP = [
  {
    period: 'Years 1 to 2',
    years: '2027 to 2028',
    priority: 'Establish a reliable event and trusted partnerships',
    evidence: ['Unique attendees', 'Repeat visits', 'Partner-hosted events', 'Local supplier spending'],
  },
  {
    period: 'Years 3 to 5',
    years: '2029 to 2031',
    priority: 'Strengthen follow-through beyond the week',
    evidence: ['Reported introductions', 'Interviews', 'Collaborations', 'Customer meetings'],
  },
  {
    period: 'Years 6 to 10',
    years: '2032 to 2036',
    priority: 'Evaluate and expand what produces value',
    evidence: [
      'Verified opportunities linked to participation',
      'Repeat partnerships',
      'Business outcomes we can check',
    ],
  },
] as const

export const SPONSOR_RETURNS = [
  'Meet the people already building here, after work, in rooms they will actually enter.',
  'Show what your organization does, not simply display its name.',
  'Stand next to a week built by Baltimore for Baltimore, before the rest of the country notices.',
  'Support free community access, partner-hosted events, and a stage for first-time speakers.',
  'Help fund local venues, creatives, vendors, and event suppliers.',
] as const
