import type { TalkFormat, Topic, WeekDate } from '@/lib/models'

export const SESSION_TYPES = [
  {
    id: 'workshop',
    label: 'Workshop',
    length: '45–60 minutes',
    body: 'Interactive sessions that teach a practical skill.',
    examples: [
      'Building AI agents',
      'Personal branding for technologists',
      'Product management fundamentals',
      'Intro to cybersecurity',
      'Startup fundraising',
    ],
  },
  {
    id: 'panel',
    label: 'Panel Discussion',
    length: '45–60 minutes',
    body: 'Several voices on one question, not a row of recaps.',
    examples: [
      'Building startups in Baltimore',
      'The future of AI',
      'Lessons from local founders',
      'Career growth in tech',
    ],
  },
  {
    id: 'fireside',
    label: 'Fireside Chat',
    length: '30–45 minutes',
    body: 'A one-on-one conversation with a founder, executive, creator, or community leader.',
    examples: [],
  },
  {
    id: 'lightning',
    label: 'Lightning Talk',
    length: '10–20 minutes',
    body: 'A short talk meant to inspire, teach, or start an argument worth having.',
    examples: [],
  },
] as const

export const PROGRAM_NIGHTS = [
  {
    iso: '2027-04-26' as WeekDate,
    name: 'Launch Night',
    weekday: 'Monday',
    date: 'April 26',
    body: 'Kick off the week with the state of the ecosystem, innovation, and room to grow.',
  },
  {
    iso: '2027-04-27' as WeekDate,
    name: 'Future of Tech Night',
    weekday: 'Tuesday',
    date: 'April 27',
    body: 'AI, cybersecurity, GovTech, robotics, emerging tech, and the jobs coming next.',
  },
  {
    iso: '2027-04-28' as WeekDate,
    name: 'Builder Night',
    weekday: 'Wednesday',
    date: 'April 28',
    body: 'Engineering, AI, product, UX, data, cloud, developer tools, and hands-on workshops.',
  },
  {
    iso: '2027-04-29' as WeekDate,
    name: 'Founder Night',
    weekday: 'Thursday',
    date: 'April 29',
    body: 'Startups, fundraising, sales, marketing, growth, and the lessons founders actually keep.',
  },
  {
    iso: '2027-04-30' as WeekDate,
    name: 'Community Night',
    weekday: 'Friday',
    date: 'April 30',
    body: 'Careers, personal branding, networking, workforce, and what it takes to build here.',
  },
] as const

export const SPEAKER_TOPICS = [
  { id: 'Artificial Intelligence', match: 'AI', group: 'Build' },
  { id: 'Cybersecurity', match: 'Cyber', group: 'Build' },
  { id: 'Software Engineering', match: 'Engineering', group: 'Build' },
  { id: 'Product Management', match: 'Product', group: 'Build' },
  { id: 'UX / Design', match: 'Design', group: 'Build' },
  { id: 'Data & Analytics', match: 'Data', group: 'Build' },
  { id: 'GovTech', match: 'Cyber', group: 'Build' },
  { id: 'Emerging Technology', match: 'AI', group: 'Build' },
  { id: 'Startups', match: 'Startup', group: 'Founder' },
  { id: 'Entrepreneurship', match: 'Startup', group: 'Founder' },
  { id: 'Marketing', match: 'Community', group: 'Founder' },
  { id: 'Sales', match: 'Community', group: 'Founder' },
  { id: 'Personal Branding', match: 'Community', group: 'Community' },
  { id: 'Careers', match: 'Community', group: 'Community' },
  { id: 'Community Building', match: 'Community', group: 'Community' },
  { id: 'Other', match: 'Community', group: 'Community' },
] as const

export const TOPIC_GROUPS = ['Build', 'Founder', 'Community'] as const

export const AUDIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'General Audience'] as const

export const CFP_VALUES = [
  'Practical insights',
  'Real-world experience',
  'Actionable takeaways',
  'Diverse perspectives',
  'Community impact',
  'A room that actually talks back',
] as const

export const CFP_NOT_LOOKING = [
  'Product demos dressed up as talks',
  'Sales presentations',
  'Recruitment pitches',
  'Vendor marketing sessions',
  'Anything that exists to promote a company',
] as const

export const CFP_BENEFITS = [
  'A room in Baltimore’s growing technology ecosystem',
  'Time with founders, builders, and community leaders',
  'Promotion across Baltimore Tech Week channels',
  'A chance to put knowledge back into the city',
] as const

export const CFP_WHY = [
  'Strengthen Baltimore’s technology ecosystem',
  'Create opportunities for local talent',
  'Support Baltimore restaurants, coworking spaces, and neighborhood rooms',
  'Share knowledge with the next generation of builders',
  'Connect founders, technologists, investors, and community leaders',
  'Show Baltimore as a place where the work happens',
] as const

export type SessionTypeId = (typeof SESSION_TYPES)[number]['id']
export type SpeakerTopicId = (typeof SPEAKER_TOPICS)[number]['id']
export type AudienceLevel = (typeof AUDIENCE_LEVELS)[number]

export function topicToMatch(topic: string): Topic {
  const found = SPEAKER_TOPICS.find((item) => item.id === topic)
  return (found?.match ?? 'Community') as Topic
}

export function sessionToFormat(session: string): TalkFormat {
  if (session === 'workshop' || session === 'panel' || session === 'fireside' || session === 'lightning') {
    return session
  }
  return 'lightning'
}
