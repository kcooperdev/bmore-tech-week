import { EVENT, isApplyOpenNow, type ApplyKind } from '@/lib/data'

function applyClose(open: string, waiting: string) {
  return isApplyOpenNow() ? open : waiting
}

export type InvolvePitchCopy = {
  kind: ApplyKind
  kicker: string
  title: string
  highlight: string
  lead: string
  why: { label: string; title: string; body: string }[]
  close: string
  cta: string
}

export const SPEAK_PITCH: InvolvePitchCopy = {
  kind: 'speak',
  kicker: isApplyOpenNow()
    ? `Deadline ${EVENT.speakerDeadline} · Decisions ${EVENT.speakerDecision}`
    : `Opens ${EVENT.opensOn} · Deadline ${EVENT.speakerDeadline}`,
  title: 'If you have something to share, we want you in a',
  highlight: 'Baltimore room',
  lead: 'Workshops, panels, and tech talks from people who do the work here. First-time speakers are welcome. You do not need a touring deck.',
  why: [
    {
      label: 'Why you',
      title: 'You already have the story',
      body: 'If you built it, taught it, or learned it the hard way, that is enough. A workshop, a panel, or a short tech talk. Whatever fits how you talk.',
    },
    {
      label: 'What it does',
      title: 'Someone in the room uses it',
      body: 'A student leaves with a skill they can try the next day. A founder hears a sentence they needed. That is the whole point of a local room.',
    },
    {
      label: 'Why year one',
      title: 'The city should hear itself first',
      body: 'If Baltimore builders do not take the mic, someone from elsewhere will. We would rather the week sound like the people who live here.',
    },
  ],
  close: applyClose(
    'Tell us what you want to share. We read every application. The form opens in a new tab.',
    `Tell us what you want to share. We read every application. Applications open ${EVENT.opensOn}.`,
  ),
  cta: 'Submit your session',
}

export const PARTNER_PITCH: InvolvePitchCopy = {
  kind: 'partner',
  kicker: isApplyOpenNow() ? 'Community partner · Free' : `Opens ${EVENT.opensOn} · Community partner · Free`,
  title: 'If you already gather people, bring them into the',
  highlight: 'week',
  lead: 'Partnership is free for meetups, schools, accelerators, nonprofits, and student groups. You already have a circle. We just want them in the rooms.',
  why: [
    {
      label: 'Why you',
      title: 'Your people already listen',
      body: 'A Slack, a classroom, a Tuesday meetup. Those folks trust you more than they trust a poster. That is why we ask groups like yours.',
    },
    {
      label: 'What it does',
      title: 'Your members find the door',
      body: 'We list you, thank you in the rooms, and send a link so you can see who came because of you. Simple, and free.',
    },
    {
      label: 'Why it matters',
      title: 'The week should look like Baltimore',
      body: 'It only does if the groups that already live here stand next to it. That is what a community partner is for.',
    },
  ],
  close: applyClose(
    'A short application. If the fit is right, we will write you. The form opens in a new tab.',
    `A short application. If the fit is right, we will write you. Applications open ${EVENT.opensOn}.`,
  ),
  cta: 'Apply to partner',
}

export const SPONSOR_PITCH: InvolvePitchCopy = {
  kind: 'sponsor',
  kicker: isApplyOpenNow() ? '$500 to $10,000 · Limited spots' : `Opens ${EVENT.opensOn} · $500 to $10,000`,
  title: 'This is year one. Your name can be part of how it',
  highlight: 'starts',
  lead: 'Five nights, after 5:30, in rooms around the city. Sponsors get a table people can walk up to, not a logo buried on a wall. Tiers run from $500 to $10,000.',
  why: [
    {
      label: 'Why this',
      title: 'You meet people in the room',
      body: 'Talent, founders, and operators show up for the talks and stay to talk. Your table is a place they can come say hello.',
    },
    {
      label: 'What you get',
      title: 'A night, a welcome, and a clear place',
      body: 'Depending on the tier: logo, a mention, a table, a short welcome, or your name on a night. We will walk through it on a 20-minute call.',
    },
    {
      label: 'Why now',
      title: 'Year one is small on purpose',
      body: 'There are only so many tables. The companies here now are the ones people will remember when this week is bigger.',
    },
  ],
  close: applyClose(
    'Book a 20-minute intro, then send a short application. Nothing to pay today. The form opens in a new tab.',
    `Book a 20-minute intro, then send a short application. Nothing to pay today. Applications open ${EVENT.opensOn}.`,
  ),
  cta: 'Book a call and apply',
}

export const AMBASSADOR_PITCH: InvolvePitchCopy = {
  kind: 'ambassador',
  kicker: isApplyOpenNow() ? 'Get the word out' : `Opens ${EVENT.opensOn} · Get the word out`,
  title: 'Baltimore hears this week from',
  highlight: 'someone they trust',
  lead: 'Help bring people out. Share events with your network and introduce more people to the community.',
  why: [
    {
      label: 'Why you',
      title: 'People already listen to you',
      body: 'You do not need a big following. A class, a roommate, a Slack that actually answers. One honest note from you beats a flyer.',
    },
    {
      label: 'What it does',
      title: 'Rooms fill that way',
      body: 'Someone buys a ticket because you mentioned MedTech night. A meetup shows up on Wednesday. That is how a city week starts.',
    },
    {
      label: 'What we ask',
      title: 'Share the five nights, not a dump of graphics',
      body: 'Who the night is for. When it is. The ticket link. That is enough.',
    },
  ],
  close: applyClose(
    'Tell us where you will share, then start telling people. The form opens in a new tab.',
    `Tell us where you will share, then start telling people. Applications open ${EVENT.opensOn}.`,
  ),
  cta: 'Be an ambassador',
}

export const AMBASSADOR_MOVES = [
  {
    title: 'Start with the circle you already have',
    body: 'Campus Slack, a Sunday dinner, the group chat that actually answers.',
  },
  {
    title: 'Share the night, not a pile of graphics',
    body: 'Who it is for, when it is, and the ticket link. One sentence is enough.',
  },
  {
    title: 'Bring one person with you',
    body: 'A roommate, a classmate, someone from work. Rooms fill that way.',
  },
] as const
