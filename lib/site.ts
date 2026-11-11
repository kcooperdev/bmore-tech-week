import type { Metadata } from "next";

/**
 * Editable content for Bmore Tech Fest 2027.
 * Add confirmed sessions, exhibitors, sponsors, and partner events here.
 * Do not add a partner event until the partnership, time, and capacity are confirmed.
 * The week is Monday, April 26 through Wednesday, April 28, 2027.
 * Set phase to "live" during the week to turn the homepage into the attendee view.
 */

export const site = {
  name: "Bmore Tech Fest",
  year: 2027,
  url: "https://bmoretechweek.com",
  email: "team@bmoretechweek.com",
  instagram: "https://www.instagram.com/bmoretechfest",
  linkedin: "https://www.linkedin.com/company/bmore-tech-fest",
  phase: "preview" as "preview" | "live",
  liveDay: "monday" as DayId,
  dates: "April 26–28, 2027",
  when: "Monday–Wednesday",
  where: "Baltimore, Maryland",
  tagline: "Three days at 4MLK.",
  promise: "Be in the room.",
  sell: "Three days with the people you keep meaning to meet. Leave with a collaboration, a hire, or a next step.",
  ticketLine: "$99 conference pass · April 26–28, 2027 · 4MLK, Baltimore",
  idea: "Three days at 4MLK.",
  positioning: "Three days at 4MLK.",
  room: "Founders, engineers, designers, researchers, students, and tech leaders from Baltimore and across the DMV.",
  passes: "Join the list",
  foundingYear:
    "2027 is year one. If you’re here now, you’re helping shape what Bmore Tech Fest becomes.",
  whyHeadline: "Baltimore has the talent. This is the gathering.",
  whyLede:
    "Baltimore is home to founders, engineers, researchers, designers, creators, students, and entrepreneurs building every day. Bmore Tech Fest brings those communities together for three days of learning, collaboration, and opportunity.",
  heroLine: "Talks. Workshops. Community. Opportunity.",
};

/** Founder story. Lives on About. Keep the homepage short. */
export const founderStory = [
  "Khalif Cooper is the founder of Bmore Tech Fest. Originally from Philadelphia, he has been coming to Baltimore since childhood. It became a second home, and the city where he built his career and community.",
  "He didn’t study computer science. He graduated with a theatre degree. His introduction to technology came while working as a food server at a tech conference. Watching founders, engineers, and entrepreneurs discuss what they were building sparked something in him.",
  "He bought a used laptop on eBay and started teaching himself.",
  "Over the next decade, curiosity became a career. He worked as a software engineer, helped people break into tech, spoke at events, built communities, and grew a technology network from zero to more than 1,200 people, rooted in Baltimore.",
  "Along the way, one thing became clear. Baltimore already has builders: engineers, founders, designers, researchers, students, creators. They are not always in the same room.",
  "Bmore Tech Fest exists to bring those communities together. More engineers. More founders. More companies. More builders. More opportunities. More technology in Baltimore.",
  "Khalif believes Baltimore will be the next major tech hub in the United States because of the people already here, not because someone imported the idea.",
  "Technology changed his life. Bmore Tech Fest exists because he believes it can change someone else’s too.",
];

export const festTargets = [
  "300+ attendees",
  "30 sessions",
  "3 days",
  "Multiple tracks",
  "Networking events after 5:30",
  "Hands-on workshops",
];

export const speakExamples = [
  "How we built our first AI product",
  "Lessons from scaling engineering teams",
  "Building a startup in Baltimore",
  "Breaking into tech without a CS degree",
  "Cybersecurity challenges every company faces",
  "Product design lessons from real products",
  "Growing a technical creator brand",
  "Startup funding mistakes to avoid",
];

export type DayId = "monday" | "tuesday" | "wednesday";
export type DayPart = "morning" | "afternoon" | "evening";
export type Place = "hq" | "partner";

export type DayStopKind = "hq" | "pause" | "city";

export type DayPlace = {
  name: string;
  line: string;
  href?: string;
};

export type DayStop = {
  id: string;
  when: string;
  where: string;
  title: string;
  text: string;
  kind: DayStopKind;
  pair?: string;
  places?: DayPlace[];
};

export type Pillar = {
  id: DayId;
  day: string;
  date: string;
  name: string;
  night: string;
  question: string;
  tagline: string;
  summary: string;
  purpose: string;
  stops: DayStop[];
};

function dayStops(prefix: string, mixer: DayStop): DayStop[] {
  return [
    {
      id: `${prefix}-doors`,
      when: "8–9am",
      where: "4MLK",
      title: "Check-in and breakfast",
      pair: "",
      text: "",
      kind: "hq",
    },
    {
      id: `${prefix}-am1`,
      when: "9–9:50am",
      where: "4MLK",
      title: "Tech talk",
      pair: "Workshop",
      text: "",
      kind: "hq",
    },
    {
      id: `${prefix}-am2`,
      when: "9:50–10:40am",
      where: "4MLK",
      title: "Panel",
      pair: "Workshop",
      text: "",
      kind: "hq",
    },
    {
      id: `${prefix}-am-break`,
      when: "10:40–11am",
      where: "4MLK",
      title: "Break",
      pair: "Break",
      text: "",
      kind: "pause",
    },
    {
      id: `${prefix}-am3`,
      when: "11–11:50am",
      where: "4MLK",
      title: "Panel",
      pair: "Workshop",
      text: "",
      kind: "hq",
    },
    {
      id: `${prefix}-lunch-go`,
      when: "11:50am–12pm",
      where: "4MLK",
      title: "Lunch transition",
      pair: "Lunch transition",
      text: "",
      kind: "pause",
    },
    {
      id: `${prefix}-lunch`,
      when: "12–1pm",
      where: "4MLK",
      title: "Lunch",
      pair: "Lunch",
      text: "Vendors on site.",
      kind: "pause",
    },
    {
      id: `${prefix}-pm1`,
      when: "1–1:50pm",
      where: "4MLK",
      title: "Tech talk",
      pair: "Workshop",
      text: "",
      kind: "hq",
    },
    {
      id: `${prefix}-pm2`,
      when: "1:50–2:40pm",
      where: "4MLK",
      title: "Panel",
      pair: "Workshop",
      text: "",
      kind: "hq",
    },
    {
      id: `${prefix}-pm-break`,
      when: "2:40–3pm",
      where: "4MLK",
      title: "Break",
      pair: "Break",
      text: "",
      kind: "pause",
    },
    {
      id: `${prefix}-pm3`,
      when: "3–3:50pm",
      where: "4MLK",
      title: "Panel",
      pair: "Workshop",
      text: "",
      kind: "hq",
    },
    {
      id: `${prefix}-wrap`,
      when: "3:50–4pm",
      where: "4MLK",
      title: "Daily wrap-up",
      pair: "Daily wrap-up",
      text: "",
      kind: "hq",
    },
    mixer,
  ];
}

export const pillars: Pillar[] = [
  {
    id: "monday",
    day: "Monday",
    date: "April 26",
    name: "Monday",
    night: "Networking",
    question: "Who should I meet?",
    tagline: "Meet the people building Baltimore.",
    summary: "Meet the people building Baltimore.",
    purpose: "Put a name to the work happening here.",
    stops: dayStops("mon", {
      id: "mon-mixer",
      when: "After 5:30",
      where: "",
      title: "Networking event",
      text: "",
      kind: "city",
    }),
  },
  {
    id: "tuesday",
    day: "Tuesday",
    date: "April 27",
    name: "Tuesday",
    night: "Networking",
    question: "What can I create?",
    tagline: "Workshops, demos, and startups.",
    summary: "Workshops, demos, and startups.",
    purpose: "Leave with something you made.",
    stops: dayStops("tue", {
      id: "tue-mixer",
      when: "After 5:30",
      where: "",
      title: "Networking event",
      text: "",
      kind: "city",
    }),
  },
  {
    id: "wednesday",
    day: "Wednesday",
    date: "April 28",
    name: "Wednesday",
    night: "Closing Celebration",
    question: "Where can this take me?",
    tagline: "Jobs, funding, and a next step.",
    summary: "Jobs, funding, and a next step.",
    purpose: "A job, a cofounder, a room you go back to.",
    stops: dayStops("wed", {
      id: "wed-mixer",
      when: "After 5:30",
      where: "",
      title: "Closing Celebration",
      text: "",
      kind: "city",
    }),
  },
];

export const tracks = [
  {
    name: "AI, software, and security",
    text: "How teams build, ship, and secure the tools people use.",
  },
  {
    name: "Product, design, and creative tech",
    text: "How ideas become products and experiences people want to use.",
  },
  {
    name: "Startups and business growth",
    text: "What founders learn from finding customers, building teams, and growing a business.",
  },
  {
    name: "Life sciences and climate tech",
    text: "How researchers and founders turn discoveries into practical solutions.",
  },
  {
    name: "Careers and leadership",
    text: "How people get into tech, change direction, and learn to lead teams.",
  },
];

export const aboutSections = [
  {
    id: "baltimore",
    title: "Built in Baltimore",
    text: "From cybersecurity and healthcare innovation to AI, research, startups, and creative technology, Baltimore is home to builders solving real problems. Bmore Tech Fest is where those communities meet.",
  },
  {
    id: "people",
    title: "Find your people",
    text: "Meet founders building in Baltimore, engineers working on problems you care about, and people who can tell you what it’s actually like to move into a new role. Come with a question, an idea, or a project you want to talk through.",
  },
  {
    id: "venue",
    title: "In the heart of downtown",
    text: "We take over 4MLK, a downtown hub for innovation and entrepreneurship. Catch a talk, try something hands-on in a workshop, then keep the conversation going between sessions, with the city right outside the door.",
  },
  {
    id: "founding",
    title: "Founding year",
    text: "Bmore Tech Fest launches April 26–28, 2027. We’re bringing builders, founders, engineers, creators, researchers, and future leaders together for three days downtown. If you’re here now, you’re helping shape what this becomes.",
  },
];

export const passIncludes = [
  "Meet future collaborators and people you keep meaning to know",
  "Discover startup, hiring, and partnership opportunities",
  "Learn practical skills in talks, panels, and hands-on workshops",
  "Breakfast, coffee, and refreshments",
];

export const sponsorAudience = [
  "Founders",
  "Software engineers",
  "Product managers",
  "Designers",
  "Students",
  "Career changers",
  "Startup operators",
  "AI builders",
  "Technology leaders",
  "Cybersecurity professionals",
];

/** Confirmed founding supporters only. Add a name when the partnership is real. */
export const foundingSupporters: { name: string; role: string }[] = [
  { name: "4MLK", role: "Venue partner" },
];

export const scheduleExperiences =
  "Talks, hands-on workshops, founder conversations, career sessions, and networking events after 5:30, with room between blocks to meet someone new.";

export const hq = {
  name: "Bmore Tech Fest HQ",
  venue: "4MLK",
  street: "4 N. Martin Luther King Jr. Blvd.",
  cityLine: "Baltimore, MD 21201",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=4+N+Martin+Luther+King+Jr+Blvd+Baltimore+MD+21201",
  holds: [
    "Registration and check-in",
    "Coworking",
    "Main programming",
    "Workshops",
    "Talks",
    "Networking",
    "Sponsor experiences",
    "Selected evening programming",
  ],
};

export const waysIn: { href: string; title: string; text: string }[] = [
  { href: "/speak", title: "Give a Talk", text: "Apply by February 1, 2027. First-time speakers welcome." },
  { href: "/sponsors", title: "Sponsor", text: "Apply by February 15." },
];

export const nav = {
  primary: [
    { href: "/schedule", label: "Schedule" },
    { href: "/tickets", label: "Tickets" },
  ],
  involved: [
    { href: "/speak", label: "Give a Talk" },
    { href: "/sponsors", label: "Sponsor" },
  ],
};

export type ScheduleItem = {
  id: string;
  day: DayId;
  time: string;
  title: string;
  description: string;
  speakers: string[];
  venue: string;
  category: string;
  registration: string;
  place: Place;
  part: DayPart;
};

/** Confirmed sessions only. Leave empty until programming is set. */
export const schedule: ScheduleItem[] = [];

export type Exhibitor = {
  name: string;
  url?: string;
};

/** Confirmed exhibitors only. */
export const exhibitors: Exhibitor[] = [];

export type SponsorPackage = {
  id: string;
  name: string;
  price?: string;
  summary: string;
  includes: string[];
};

/**
 * Approved sponsorship packages.
 * Add a package only after the price and benefits are signed off.
 */
export const sponsorPackages: SponsorPackage[] = [];

export const generalAdmission = {
  name: "General Admission",
  price: 99,
};

export const partnerFilters = [
  "All",
  "Networking",
  "Startups",
  "Creative Tech",
  "Careers",
  "Community",
] as const;

export type PartnerFilter = (typeof partnerFilters)[number];

export type PartnerEvent = {
  id: string;
  name: string;
  host: string;
  venue: string;
  neighborhood: string;
  date: string;
  time: string;
  description: string;
  category: Exclude<PartnerFilter, "All">;
  capacity: string;
  ticket: string;
  rsvpUrl?: string;
  day?: DayId;
};

/** Confirmed partner events only. */
export const partnerEvents: PartnerEvent[] = [];

export type ExploringVenue = {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  focus: string;
  categories: Exclude<PartnerFilter, "All">[];
  possible: string[];
};

/**
 * Venues in conversation. These are not confirmed Tech Fest events.
 * Move a venue into `partnerEvents` only after details are confirmed.
 */
export const exploringVenues: ExploringVenue[] = [
  {
    id: "spark",
    name: "Spark Baltimore",
    neighborhood: "Downtown",
    address: "8 Market Place, Baltimore, MD 21202",
    focus: "Founders",
    categories: ["Startups", "Networking"],
    possible: [
      "Founders",
      "Entrepreneurship",
      "Startups",
      "Founder networking",
      "Startup ecosystem conversations",
    ],
  },
  {
    id: "gallery",
    name: "1023 W Baltimore St Art Gallery",
    neighborhood: "Poppleton",
    address: "1023 W Baltimore St, Baltimore, MD 21223",
    focus: "Creative tech",
    categories: ["Creative Tech", "Community"],
    possible: [
      "Art and technology",
      "Design",
      "Creative technology",
      "Digital experiences",
      "Creator technology",
      "Interactive showcases",
    ],
  },
  {
    id: "jerk-at-nite",
    name: "Jerk At Nite",
    neighborhood: "Downtown",
    address: "21 N Eutaw St, Baltimore, MD 21201",
    focus: "Social",
    categories: ["Networking", "Community"],
    possible: [
      "Networking",
      "Social gathering",
      "Food",
      "Community",
      "After-hours programming",
      "Closing celebration",
    ],
  },
];

export function formatPrice(amount: number) {
  return `$${amount}`;
}

export function pageMeta(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} · ${site.name} ${site.year}`,
      description,
    },
    twitter: {
      title: `${title} · ${site.name} ${site.year}`,
      description,
    },
  };
}

export const homeDescription =
  "Be in the room. Three days with the people you keep meaning to meet: founders, engineers, designers, researchers, students, and tech leaders from Baltimore and across the DMV. Leave with a collaboration, a hire, or a next step. Be part of year one.";
