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
export const speakDeadlineLabel = "Deadline February 1, 2027";

/** Flip on when community “Fund a seat” should show again. */
export const communitySponsorLive = true;

/** Grassroots community sponsor amounts. Every $50 funds one student or laid-off pass. */
export const communitySponsorAmounts = [25, 50, 75, 100, 150, 200, 250] as const;
export const communitySponsorSeatCost = 50;

export const communitySponsorCopy = {
  kicker: "Community Sponsor",
  title: "Fund a seat",
  lede: "Every $50 puts a student or a laid-off neighbor in the room at Bmore Tech Week.",
  belief:
    "Not everyone has $500, $1,000, or $5,000+ to give a conference. We’re building this for Baltimore, so give what you can, from $25 up. The community starts with us first. Opportunities get made when we pull resources together, little by little.",
  cta: "Checkout coming soon",
  note: "Checkout will be added soon. You can still pick an amount to see how many seats it funds.",
};

export const sponsorPaths = [
  {
    href: "/community",
    title: "Fund a Seat",
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
  tagline: "Where technology’s next chapter gets built.",
  promise: "Where technology’s next chapter gets built.",
  headline: "Where Technology’s Next Chapter Gets Built.",
  sell: "Three days bringing together the people building, securing, and transforming the future of technology.",
  ticketLine: "All-access pass · $75 · April 26–28, 2027 · Baltimore, MD",
  idea: "More than a conference. A gathering of builders.",
  positioning: "A regional technology conference for GovTech, AI, and cybersecurity.",
  room: "Bring together the people shaping what’s next across government technology, artificial intelligence, and cybersecurity.",
  roomHeadline: "The people shaping what’s next.",
  roomKicker: "Who you’ll meet",
  identityTitle: "More than a conference. A gathering of builders.",
  identityLede:
    "Bmore Tech Week brings together the people, ideas, and companies shaping the future of technology. Through technical talks, panels, hands-on workshops, and meaningful connections, we’re creating a space for the region’s technology community to learn, collaborate, and build.",
  passes: "Get the pass",
  whyHeadline: "A serious regional technology conference.",
  whyLede:
    "Bmore Tech Week is built for the people building, securing, and transforming technology, with the energy of a culture-forward gathering and the technical depth of a developer conference.",
  venueShort: "4MLK, Baltimore",
};
/** Founder story. Lives on About. Keep the homepage short. */
export const founderStory = {
  title: "Why Bmore Tech Week Exists",
  name: "Khalif Cooper",
  linkedin: "https://www.linkedin.com/in/kcooperdev/",
  paragraphs: [
    "Khalif Cooper founded Bmore Tech Week after growing up in Philadelphia and living in Atlanta, where he watched the city transform into a tech powerhouse over more than fifteen years.",
    "He discovered technology as a career while working as a food server at a tech conference. A theater grad with no formal background in the field, he taught himself from a laptop, showed up at events, and put his work in front of people. When there wasn’t a path, he built one.",
    "Having spent nearly every summer in Baltimore growing up, he had long been drawn to the city’s culture. More than five years ago, a job brought him here for good. While living and building locally, he recognized the same potential he had seen in Atlanta: the builders are already here.",
    "That belief shaped everything that followed: helping people break into tech, building community, and growing a Baltimore-rooted network past 1,200 people. Now, that work culminates in gathering the ecosystem for three days each spring.",
    "His motto is simple: It’s never too late to start, and you’re never too old to build. The key is to keep showing up.",
    "Bmore Tech Week exists so the people building GovTech, AI, and cybersecurity can meet, collaborate, and push the work forward in Baltimore, for the region.",
  ],
};

export const festTargets = [
  "300+ attendees",
  "30 sessions",
  "3 days",
  "Three technology pillars",
  "Bmore Build Summit",
  "Hands-on workshops",
];

export const speakExamples = [
  "Modernizing legacy systems in government",
  "Shipping generative AI into production",
  "Threat intelligence for critical infrastructure",
  "Cloud security patterns that actually hold",
  "Building a GovTech company that sells",
  "AI engineering beyond the demo",
  "Zero-trust architecture for public systems",
  "What VCs look for in AI and cyber founders",
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

/** Shared Tue/Wed outline. Full session lineup coming soon. */
function summitDayStops(prefix: string): DayStop[] {
  return [
    {
      id: `${prefix}-morning`,
      when: "9am–12pm",
      where: "4MLK",
      title: "Sessions",
      text: "",
      kind: "hq",
    },
    {
      id: `${prefix}-lunch`,
      when: "12–1pm",
      where: "4MLK",
      title: "Lunch break",
      text: "",
      kind: "pause",
    },
    {
      id: `${prefix}-afternoon`,
      when: "1–5pm",
      where: "4MLK",
      title: "Sessions",
      text: "",
      kind: "hq",
    },
  ];
}

export const pillars: Pillar[] = [
  {
    id: "monday",
    day: "Monday",
    date: "April 26",
    name: "Monday",
    night: "Kickoff Night",
    question: "Who should I meet?",
    tagline: "Kickoff Night.",
    summary: "Open the week with attendees, speakers, and the region’s technology community.",
    purpose: "Kick off Bmore Tech Week.",
    stops: [
      {
        id: "mon-kickoff",
        when: "Evening",
        where: "",
        title: "Kickoff Night",
        text: "Open the week with attendees, speakers, and the region’s technology community.",
        kind: "city",
      },
    ],
  },
  {
    id: "tuesday",
    day: "Tuesday",
    date: "April 27",
    name: "Tuesday",
    night: "Partner evenings",
    question: "What can we build?",
    tagline: "Bmore Build Summit · 9am–5pm",
    summary: "GovTech, AI, and cybersecurity by day. Optional partner-hosted evenings after 5:30.",
    purpose: "Technical talks, panels, and workshops across three pillars.",
    stops: [
      ...summitDayStops("tue"),
      {
        id: "tue-evening",
        when: "Evening",
        where: "",
        title: "Partner evenings",
        text: "Optional partner-hosted networking around the city.",
        kind: "city",
      },
    ],
  },
  {
    id: "wednesday",
    day: "Wednesday",
    date: "April 28",
    name: "Wednesday",
    night: "Closing Night",
    question: "What comes next?",
    tagline: "Bmore Build Summit · 9am–5pm",
    summary: "GovTech, AI, and cybersecurity continue, then Closing Night.",
    purpose: "Finish the summit, then close the week together.",
    stops: [
      ...summitDayStops("wed"),
      {
        id: "wed-closing",
        when: "Evening",
        where: "",
        title: "Closing Night",
        text: "Close the week with attendees, speakers, and the region’s technology community.",
        kind: "city",
      },
    ],
  },
];

/** Three technology pillars that run through the Bmore Build Summit. */
export const techPillars = [
  {
    id: "govtech",
    label: "GovTech",
    name: "GovTech",
    text: "The future of government technology, public-sector innovation, civic technology, federal systems, and digital transformation.",
    focus: [
      "Public-sector innovation",
      "Civic technology",
      "Federal systems",
      "Digital transformation",
    ],
  },
  {
    id: "ai",
    label: "Artificial Intelligence",
    name: "Artificial Intelligence",
    text: "AI engineering, generative AI, intelligent automation, AI applications, and the future of building with AI.",
    focus: [
      "AI engineering",
      "Generative AI",
      "Intelligent automation",
      "Building with AI",
    ],
  },
  {
    id: "cyber",
    label: "Cybersecurity",
    name: "Cybersecurity",
    text: "Cyber defense, threat intelligence, security engineering, cloud security, and protecting critical infrastructure.",
    focus: [
      "Cyber defense",
      "Threat intelligence",
      "Security engineering",
      "Cloud security",
    ],
  },
] as const;

/** @deprecated Use techPillars. Kept for any leftover imports. */
export const tracks = techPillars.map((pillar) => ({
  name: pillar.name,
  text: pillar.text,
}));

export const buildSummit = {
  name: "Bmore Build Summit",
  kicker: "The main conference · Included with your pass",
  promise: "Two days. Three pillars. One summit.",
  lede: "April 27–28 at 4MLK. The main two-day conference inside Bmore Tech Week: technical talks, panels, and workshops across GovTech, artificial intelligence, and cybersecurity. Including founders and investors building across those pillars.",
  venue: "4MLK · Baltimore, MD",
  dates: "April 27–28, 2027",
  price: "$75 all-access pass",
  included: "Included with your Bmore Tech Week pass",
  taglinePair: ["Build", "Secure", "Transform"],
  /** Alias so existing maps keep working; these are pillars, not parallel tracks. */
  tracks: techPillars.map((pillar) => ({
    id: pillar.id,
    label: pillar.label,
    name: pillar.name,
    text: pillar.text,
    focus: [...pillar.focus],
  })),
};

export const passIncludes = [
  "Entry to Monday Kickoff Night",
  "Both full days of the Bmore Build Summit",
  "Access to all summit talks and workshops across three pillars",
  "Breakfast both summit days with coffee, donuts, and fruit",
  "Entry to Wednesday Closing Night",
  "A professional headshot",
];

export const sponsorAudience = [
  "Government technology leaders",
  "AI engineers and practitioners",
  "Cybersecurity professionals",
  "Software engineers and technical architects",
  "Founders building GovTech, AI, and cybersecurity companies",
  "Investors and technology executives",
];

/** Confirmed founding supporters only. Add a name when the partnership is real. */
export const foundingSupporters: { name: string; role: string }[] = [
  { name: "4MLK", role: "Venue partner" },
];

export const scheduleExperiences =
  "Kickoff Night on Monday, Bmore Build Summit Tuesday–Wednesday across GovTech, AI, and cybersecurity, partner evenings on Tuesday, and Closing Night on Wednesday.";

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
  { href: "/speak", title: "Give a Talk", text: "Apply by February 1, 2027. Sessions across GovTech, AI, and cybersecurity." },
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
    { href: "/speak", label: "Speak" },
    { href: "/sponsors", label: "Sponsor" },
    { href: "/host", label: "Host an Event" },
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
      "Dedicated callout & link in 1 organizer-sent attendee email",
      "2 full conference passes",
    ],
  },
  {
    id: "day",
    name: "Presenting Sponsor",
    price: "$2,500",
    summary: "Featured across both summit days, a dedicated table, and the opt-in attendee lead list.",
    includes: [
      "Logo on attendee badges",
      "Logo on the sponsor page",
      "Logo on shared summit signage",
      "Dedicated callout & link in 1 organizer-sent attendee email",
      "Featured logo on both days’ agenda and signage",
      "Recognition during opening remarks",
      "Dedicated table both summit days",
      "Opt-in attendee lead list (names and emails of attendees who consent)",
      "On-site lead capture at your table via QR check-in",
      "4 full conference passes",
    ],
  },
];

export const sponsorLeadPrivacyNote =
  "To protect attendee privacy, we never distribute unconsented email lists. Sponsor lead sharing is limited to attendees who explicitly opt in during registration or voluntarily check in at a sponsor table.";

export const generalAdmission = {
  name: "All-access pass",
  price: 75,
};

export const partnerFilters = [
  "All",
  "Networking",
  "GovTech",
  "AI",
  "Cybersecurity",
  "Startups",
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
    focus: "Community gathering",
    categories: ["Community", "Networking"],
    possible: [
      "Community gathering",
      "Networking",
      "Creative showcases",
      "After-hours programming",
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
  "Bmore Tech Week 2027: a regional technology conference for GovTech, AI, and cybersecurity. Three days · $75 all-access pass · April 26–28 in Baltimore. Speakers announced February 2027.";
