import type { Metadata } from "next";

/**
 * Editable content for Bmore Tech Week 2027.
 * Add confirmed sessions, exhibitors, sponsors, and partner events here.
 * Do not add a partner event until the partnership, time, and capacity are confirmed.
 * The week is Monday, April 26 through Wednesday, April 28, 2027.
 * Set phase to "live" during the week to turn the homepage into the attendee view.
 */

export const sponsorCallUrl = "https://calendar.app.google/C69vNmaccTAaAgbf7";

/** All-access pass checkout. Set NEXT_PUBLIC_TICKET_URL (Luma / Eventbrite / Stripe) before launch. */
export const ticketUrl = process.env.NEXT_PUBLIC_TICKET_URL?.trim() || "";

/** Primary nav CTA while checkout is closed (disabled). */
export const ticketsSoonLabel = "Tickets on sale soon";
export const ticketsSoonHint = "All-access pass · $75 when tickets open";
export const speakersAnnounce = "Speakers announced February 2027";

/** Flip on when community “Fund a seat” should show again. */
export const communitySponsorLive = false;

/** Grassroots community sponsor amounts. Every $50 funds one student or laid-off pass. */
export const communitySponsorAmounts = [25, 50, 75, 100, 150, 200, 250] as const;
export const communitySponsorSeatCost = 50;

export const communitySponsorCopy = {
  kicker: "Community Sponsor",
  title: "Fund a seat",
  lede: "Every $50 puts a student or a laid-off neighbor in the room at Bmore Tech Week.",
  belief:
    "Not everyone has $500, $1,000, or $5,000+ to give a conference. We’re building this for Baltimore, so give what you can, from $25 up. The community starts with us first. Opportunities get made when we pull resources together, little by little.",
  cta: "Become a community sponsor",
  note: "We’ll send you how to give. No checkout on this page yet.",
};

export const sponsorPaths = [
  {
    href: "/community",
    title: "Join the movement",
    text: "Community sponsor. Give $25–$250 and fund a seat for someone who needs it.",
    tone: "community" as const,
  },
  {
    href: "/corporate",
    title: "Sponsor as a company",
    text: "Corporate packages from $500. Logos, tables, and brand in the room.",
    tone: "corporate" as const,
  },
] as const;

export const site = {
  name: "Bmore Tech Week",
  year: 2027,
  url: "https://bmoretechweek.com",
  email: "team@bmoretechweek.com",
  instagram: "https://www.instagram.com/bmoretechfest",
  linkedin: "https://www.linkedin.com/company/bmore-tech-fest",
  phase: "preview" as "preview" | "live",
  liveDay: "monday" as DayId,
  dates: "April 26–28, 2027",
  when: "",
  where: "Baltimore, Maryland",
  tagline: "Baltimore’s builders, in one room.",
  promise: "Baltimore’s builders, in one room.",
  sell: "Three days. $75. Monday night kickoff, then two days at the Bmore Build Summit. Leave with a hire, a collaborator, or a next step.",
  ticketLine: "All-access pass · $75 · April 26–28, 2027 · Baltimore, MD",
  idea: "Baltimore already has the builders. This is the gathering.",
  positioning: "Baltimore’s builders, in one room.",
  room: "Founders, engineers, designers, researchers, students, and tech leaders from Baltimore and across the DMV.",
  passes: "Get the pass",
  whyHeadline: "Baltimore has the talent. This is the gathering.",
  whyLede:
    "Baltimore is home to founders, engineers, researchers, designers, creators, students, and entrepreneurs building every day. Bmore Tech Week brings those communities together for three days of learning, collaboration, and opportunity.",
  founderBeat:
    "He learned tech waiting tables at a conference. This week exists so the next person doesn’t wait for permission.",
};
/** Founder story. Lives on About. Keep the homepage short. */
export const founderStory = {
  title: "Why Bmore Tech Week exists",
  paragraphs: [
    "Khalif Cooper is the founder of Bmore Tech Week. Originally from Philadelphia, he has been coming to Baltimore since childhood.",
    "He didn’t study computer science. He graduated with a theatre degree. His introduction to technology came while working as a food server at a tech conference. Watching founders, engineers, and entrepreneurs discuss what they were building sparked something in him.",
    "He bought a used laptop on eBay and started teaching himself.",
    "Over the next decade, curiosity became a career. He worked as a software engineer, helped people break into tech, spoke at events, built communities, and grew a technology network from zero to more than 1,200 people, rooted in Baltimore.",
    "Along the way, one thing became clear. Baltimore already has builders: engineers, founders, designers, researchers, students, creators.",
    "Bmore Tech Week exists to bring those communities together. More engineers. More founders. More companies. More builders. More opportunities. More technology in Baltimore.",
    "Khalif believes Baltimore will be the next major tech hub in the United States because of the people already here, not because someone imported the idea.",
    "Technology changed his life. Bmore Tech Week exists because he believes it can change someone else’s too.",
  ],
};

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

function dayStops(prefix: string, mixer?: DayStop): DayStop[] {
  const stops: DayStop[] = [
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
      id: `${prefix}-pm4`,
      when: "3:50–4:40pm",
      where: "4MLK",
      title: "Tech talk",
      pair: "Workshop",
      text: "",
      kind: "hq",
    },
    {
      id: `${prefix}-wrap`,
      when: "4:40–5pm",
      where: "4MLK",
      title: "Daily wrap-up",
      pair: "Daily wrap-up",
      text: "",
      kind: "hq",
    },
  ];
  if (mixer) stops.push(mixer);
  return stops;
}

export const pillars: Pillar[] = [
  {
    id: "monday",
    day: "Monday",
    date: "April 26",
    name: "Monday",
    night: "Kickoff Party",
    question: "Who should I meet?",
    tagline: "Bmore Tech Week Kickoff Party.",
    summary: "Meet fellow attendees, speakers, and people from Baltimore’s tech community.",
    purpose: "Kick off the week with Baltimore’s tech community.",
    stops: [
      {
        id: "mon-kickoff",
        when: "Evening",
        where: "",
        title: "Bmore Tech Week Kickoff Party",
        text: "Meet fellow attendees, speakers, and people from Baltimore’s tech community.",
        kind: "city",
      },
    ],
  },
  {
    id: "tuesday",
    day: "Tuesday",
    date: "April 27",
    name: "Tuesday",
    night: "",
    question: "What can I create?",
    tagline: "Bmore Build Summit · AI & Building Tech.",
    summary: "Hands-on workshops and talks on applied AI, software engineering, cybersecurity, creative tech, and product management.",
    purpose: "Learn how teams build, secure, and launch products.",
    stops: dayStops("tue"),
  },
  {
    id: "wednesday",
    day: "Wednesday",
    date: "April 28",
    name: "Wednesday",
    night: "",
    question: "Where can this take me?",
    tagline: "Bmore Build Summit · Careers & Startups.",
    summary: "Sessions on career growth, hiring, leadership, startup funding, and turning an idea into a business.",
    purpose: "Leave with a next step for your career or company.",
    stops: dayStops("wed"),
  },
];

/** Speaker application topic choices. Not the public homepage story. */
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

export const buildSummit = {
  name: "Bmore Build Summit",
  kicker: "Inside Bmore Tech Week",
  promise: "Two days to build, learn, and leave with a next step.",
  lede: "Two full days of hands-on workshops, tech talks, and conversations that move from building products to building careers and companies.",
  venue: "4MLK · Baltimore, MD",
  dates: "April 27–28, 2027",
  price: "$75 all-access pass",
  included: "Included with your Bmore Tech Week pass",
  taglinePair: ["Build fast", "Stay human"],
  days: [
    {
      id: "build",
      when: "Tuesday · April 27",
      hours: "9 a.m.–5 p.m.",
      name: "AI & Building Tech",
      text: "Applied AI, software engineering, cybersecurity, creative tech, and product management. Learn how teams build, secure, and launch products.",
      focus: ["Applied AI", "Engineering", "Security", "Product"],
    },
    {
      id: "grow",
      when: "Wednesday · April 28",
      hours: "9 a.m.–5 p.m.",
      name: "Careers & Startups",
      text: "Career growth, hiring, leadership, startup funding, and turning an idea into a business.",
      focus: ["Careers", "Hiring", "Founders", "Funding"],
    },
  ],
  outcomes: [
    "Leave with a collaborator, a hire lead, or a clearer next step",
    "Hands-on workshops and practical tech talks — not TED cosplay",
    "Breakfast both days, résumé clinics, and a professional headshot",
  ],
};

export const aboutSections = [
  {
    id: "baltimore",
    title: "Built in Baltimore",
    text: "From cybersecurity and healthcare innovation to AI, research, startups, and creative technology, Baltimore is home to builders solving real problems. Bmore Tech Week is where those communities meet.",
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
    text: "Bmore Tech Week launches April 26–28, 2027. We’re bringing builders, founders, engineers, creators, researchers, and future leaders together for three days downtown. If you’re here now, you’re helping shape what this becomes.",
  },
];

export const passIncludes = [
  "Entry to the Monday night kickoff party",
  "Both full days of the Bmore Build Summit",
  "Access to all summit talks and workshops",
  "Breakfast both summit days with coffee, donuts, and fruit",
  "A professional headshot",
  "Access to résumé review clinics",
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
  "Kickoff Monday night, then two summit days of workshops and talks.";

export const hq = {
  name: "Bmore Tech Week HQ",
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
  {
    href: "/sponsors",
    title: "Sponsor",
    text: communitySponsorLive
      ? "Community gifts from $25, or company packages from $500."
      : "Company packages from $500. Logos, tables, and brand in the room.",
  },
];

export const nav = {
  primary: [
    { href: "/schedule", label: "Schedule" },
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
export const sponsorPackages: SponsorPackage[] = [
  {
    id: "badge",
    name: "Attendee Badge Sponsor",
    price: "$500",
    summary: "Put your company in front of every attendee for the week.",
    includes: [
      "Logo on attendee badges",
      "Logo on the sponsor page",
      "1 full conference pass",
    ],
  },
  {
    id: "supporting",
    name: "Supporting Sponsor",
    price: "$1,000",
    summary: "Shared recognition across the summit and the week.",
    includes: [
      "Logo on attendee badges",
      "Logo on the sponsor page",
      "Logo on shared summit signage",
      "Recognition in an attendee email",
      "2 full conference passes",
    ],
  },
  {
    id: "day",
    name: "Summit Day Sponsor",
    price: "$2,500 per day",
    summary: "Featured day placement, opening remarks, and a dedicated table.",
    includes: [
      "Logo on attendee badges",
      "Logo on the sponsor page",
      "Logo on shared summit signage",
      "Recognition in an attendee email",
      "Featured logo on the selected day’s agenda and signage",
      "Recognition during opening remarks",
      "Dedicated table that day",
      "4 full conference passes",
    ],
  },
];

export const generalAdmission = {
  name: "All-access pass",
  price: 75,
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
 * Venues in conversation. These are not confirmed Tech Week events.
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
  "Bmore Tech Week 2027. Baltimore’s builders, in one room. Three days · $75 · April 26–28 in Baltimore. Speakers announced February 2027.";
