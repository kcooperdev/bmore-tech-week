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
    id: 'techtalk',
    label: 'Tech Talk',
    length: '20–30 minutes',
    body: 'A focused talk on something you built, learned, or are arguing for.',
    examples: [
      'How we shipped a product from Baltimore',
      'A security lesson from the night shift',
      'What broke, and what we changed',
    ],
  },
] as const

export const PROGRAM_NIGHTS = [
  {
    iso: '2027-04-26' as WeekDate,
    name: 'Deep & MedTech Night',
    short: 'Deep & MedTech',
    weekday: 'Monday',
    date: 'April 26',
    neighborhood: 'BioPark',
    body: 'Healthcare, biotech, medical devices, life sciences, and deep tech, right next to the BioPark.',
    activities: ['Keynotes and presentations', 'Healthcare and life-science panels', 'Check-in and networking'],
  },
  {
    iso: '2027-04-27' as WeekDate,
    name: 'Creative Tech Night',
    short: 'Creative Tech',
    weekday: 'Tuesday',
    date: 'April 27',
    neighborhood: 'Station North',
    body: 'AI tools, digital art, media tech, and creative technology in Station North.',
    activities: ['Keynotes and panels', 'Evening lounges', 'Cocktails'],
  },
  {
    iso: '2027-04-28' as WeekDate,
    name: 'Hardware & Makerspace Night',
    short: 'Hardware & Makerspace',
    weekday: 'Wednesday',
    date: 'April 28',
    neighborhood: 'Hampden',
    body: 'Hardware, aerospace, manufacturing, and physical makerspaces on The Avenue in Hampden.',
    activities: ['Workshops and prototyping demos', 'Open-air hangouts', 'Craft cocktails, bites, and networking'],
  },
  {
    iso: '2027-04-29' as WeekDate,
    name: 'Founders & Startups Night',
    short: 'Founders & Startups',
    weekday: 'Thursday',
    date: 'April 29',
    neighborhood: 'Inner Harbor',
    body: 'Startup growth, pitches, venture, and climate tech overlooking the Inner Harbor.',
    activities: ['Main-stage pitches', 'Investor panels', 'After-hours founder mixers'],
  },
  {
    iso: '2027-04-30' as WeekDate,
    name: 'Community Night & Expo',
    short: 'Community & Expo',
    weekday: 'Friday',
    date: 'April 30',
    neighborhood: 'Citywide finale',
    body: 'Grand finale. Multi-floor expo, live tech, AI, and MedTech demos, community showcases, and closing remarks.',
    activities: ['Vendor expo and booths', 'Live tech, AI, and MedTech demos', 'Ambient networking and closing remarks'],
  },
] as const

export const SPEAKER_TOPICS = [
  { id: 'MedTech / Biotech', match: 'Engineering', group: 'MedTech' },
  { id: 'Life Sciences', match: 'Engineering', group: 'MedTech' },
  { id: 'Deep Tech', match: 'Engineering', group: 'MedTech' },
  { id: 'Artificial Intelligence', match: 'AI', group: 'Creative' },
  { id: 'Creative Technology', match: 'Design', group: 'Creative' },
  { id: 'Digital Art / Media', match: 'Design', group: 'Creative' },
  { id: 'UX / Design', match: 'Design', group: 'Creative' },
  { id: 'Hardware / Manufacturing', match: 'Engineering', group: 'Maker' },
  { id: 'Aerospace', match: 'Engineering', group: 'Maker' },
  { id: 'Software Engineering', match: 'Engineering', group: 'Maker' },
  { id: 'Cybersecurity', match: 'Cyber', group: 'Maker' },
  { id: 'Product Management', match: 'Product', group: 'Founder' },
  { id: 'Startups', match: 'Startup', group: 'Founder' },
  { id: 'Entrepreneurship', match: 'Startup', group: 'Founder' },
  { id: 'Venture / Funding', match: 'Startup', group: 'Founder' },
  { id: 'Climate / Sustainability', match: 'Startup', group: 'Founder' },
  { id: 'Careers', match: 'Community', group: 'Community' },
  { id: 'Community Building', match: 'Community', group: 'Community' },
  { id: 'Other', match: 'Community', group: 'Community' },
] as const

export const TOPIC_GROUPS = ['MedTech', 'Creative', 'Maker', 'Founder', 'Community'] as const

export const AUDIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'General Audience'] as const

export const CFP_VALUES = [
  'Something you actually know',
  'A story from the work',
  'A thing people can use',
  'A point of view',
  'Care for this city',
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
  'Support Baltimore restaurants, venues, and neighborhood rooms',
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
  if (session === 'techtalk' || session === 'tech talk') return 'tech talk'
  if (session === 'workshop' || session === 'panel' || session === 'fireside' || session === 'lightning') {
    return session
  }
  return 'tech talk'
}
