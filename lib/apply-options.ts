export const PRONOUNS = ['she / her', 'he / him', 'they / them', 'Prefer not to say', 'Something else'] as const

export const HEARD_ABOUT = [
  'Instagram',
  'LinkedIn',
  'A friend',
  'A meetup or group',
  'Campus',
  'Work',
  'Google',
  'Other',
] as const

export const YEARS_AROUND = ['I live here now', 'A few years', 'Most of my life', 'Visiting / elsewhere'] as const

export const PARTNER_TYPES = [
  'Meetup',
  'University / school',
  'Accelerator',
  'Nonprofit',
  'Coworking space',
  'Student organization',
  'Workforce / talent program',
  'Media / newsletter',
  'Other',
] as const

export const PARTNER_SIZES = [
  'Under 50 people',
  '50–200 people',
  '200–1,000 people',
  '1,000+ people',
] as const

export const PARTNER_CHANNELS = [
  'Newsletter',
  'Instagram',
  'LinkedIn',
  'Slack / Discord',
  'In-person meetup',
  'Campus / classroom',
  'Website',
] as const

export const PARTNER_HELP = [
  'Share the week with our people',
  'Host a room or satellite hang',
  'Bring volunteers',
  'Help with student tickets',
  'Introduce sponsors or speakers',
] as const

export const SPONSOR_TIERS = [
  { id: 'supporting', label: 'Supporting', price: '$500' },
  { id: 'community', label: 'Community', price: '$1,000' },
  { id: 'innovation', label: 'Innovation', price: '$2,500' },
  { id: 'ecosystem', label: 'Ecosystem', price: '$5,000' },
  { id: 'presenting', label: 'Presenting', price: '$10,000' },
  { id: 'table-night', label: 'Night table only', price: '$500' },
  { id: 'table-two', label: 'Two-night table only', price: '$900' },
  { id: 'table-week', label: 'Week table only', price: '$2,000' },
  { id: 'unsure', label: 'Not sure yet', price: 'Talk first' },
] as const

export const COMPANY_SIZES = ['1–10', '11–50', '51–200', '201–1,000', '1,000+'] as const

export const SPONSOR_GOALS = [
  'Brand in Baltimore',
  'Recruiting / talent',
  'Customers / pipeline',
  'Community support',
  'Product in front of builders',
  'A table in the room',
] as const

export const SPONSOR_DECISIONS = [
  'I can decide',
  'I recommend, someone else signs',
  'Exploring for later',
] as const

export const AMBASSADOR_CHANNELS = [
  'Instagram',
  'LinkedIn',
  'TikTok',
  'Newsletter',
  'Campus',
  'Meetup / group',
  'Word of mouth',
  'Workplace',
] as const

export const AMBASSADOR_REACH = [
  'A tight circle (under 50)',
  'A regular group (50–200)',
  'A wider network (200–1,000)',
  'A large audience (1,000+)',
] as const
