import type { Metadata } from "next";

/**
 * Editable content for Baltimore Tech Week 2027.
 * Add confirmed sessions, exhibitors, sponsors, and partner events here.
 * Do not add a partner event until the partnership, time, and capacity are confirmed.
 * The week is Wednesday, April 28 through Friday, April 30, 2027.
 * Set phase to "live" during the week to turn the homepage into the attendee view.
 */

export const site = {
  name: "Baltimore Tech Week",
  year: 2027,
  url: "https://bmoretechweek.com",
  email: "team@bmoretechweek.com",
  phase: "preview" as "preview" | "live",
  liveDay: "wednesday" as DayId,
  dates: "April 28–30, 2027",
  when: "Wednesday–Friday",
  where: "Baltimore, Maryland",
  tagline: "CONNECT. BUILD. OPPORTUNITY.",
  promise: "Be in the room.",
  idea: "4MLK is the HQ.",
  positioning: "Three days at 4MLK.",
  room: "Founders, operators, students, and people hiring in Baltimore.",
  passes: "Passes are $49, on sale later.",
};

export type DayId = "wednesday" | "thursday" | "friday";
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
  places?: DayPlace[];
};

export type Pillar = {
  id: DayId;
  day: string;
  date: string;
  name: string;
  question: string;
  tagline: string;
  summary: string;
  purpose: string;
  stops: DayStop[];
};

export const pillars: Pillar[] = [
  {
    id: "wednesday",
    day: "Wednesday",
    date: "April 28",
    name: "Connect",
    question: "Who should I meet?",
    tagline: "Meet the people building Baltimore.",
    summary: "Meet the people building Baltimore.",
    purpose: "Put a name to the work happening here.",
    stops: [
      {
        id: "tue-open",
        when: "10am–12pm",
        where: "4MLK",
        title: "Check-in and expo",
        text: "",
        kind: "hq",
      },
      {
        id: "tue-floor",
        when: "12–4pm",
        where: "4MLK",
        title: "Community and talks",
        text: "",
        kind: "hq",
      },
      {
        id: "tue-break",
        when: "4–5pm",
        where: "",
        title: "Break",
        text: "",
        kind: "pause",
      },
      {
        id: "tue-city",
        when: "Evening",
        where: "",
        title: "Partner events",
        text: "",
        kind: "city",
        places: [
          {
            name: "Partner events",
            line: "",
            href: "/around-baltimore",
          },
        ],
      },
    ],
  },
  {
    id: "thursday",
    day: "Thursday",
    date: "April 29",
    name: "Build",
    question: "What can I create?",
    tagline: "Workshops, demos, and startups.",
    summary: "Workshops, demos, and startups.",
    purpose: "Leave with something you made.",
    stops: [
      {
        id: "wed-open",
        when: "10am–12pm",
        where: "4MLK",
        title: "Coworking and expo",
        text: "",
        kind: "hq",
      },
      {
        id: "wed-floor",
        when: "12–4pm",
        where: "4MLK",
        title: "Workshops and demos",
        text: "AI, product, data, creative tech",
        kind: "hq",
      },
      {
        id: "wed-break",
        when: "4–5pm",
        where: "",
        title: "Break",
        text: "",
        kind: "pause",
      },
      {
        id: "wed-city",
        when: "Evening",
        where: "",
        title: "Partner events",
        text: "",
        kind: "city",
        places: [
          {
            name: "Partner events",
            line: "",
            href: "/around-baltimore",
          },
        ],
      },
    ],
  },
  {
    id: "friday",
    day: "Friday",
    date: "April 30",
    name: "Opportunity",
    question: "Where can this take me?",
    tagline: "Jobs, funding, and a next step.",
    summary: "Jobs, funding, and a next step.",
    purpose: "A job, a cofounder, a room you go back to.",
    stops: [
      {
        id: "thu-open",
        when: "10am–12pm",
        where: "4MLK",
        title: "Coworking and employers",
        text: "",
        kind: "hq",
      },
      {
        id: "thu-floor",
        when: "12–4pm",
        where: "4MLK",
        title: "Jobs, classes, and funding",
        text: "",
        kind: "hq",
      },
      {
        id: "thu-close",
        when: "4–5pm",
        where: "4MLK",
        title: "Closing",
        text: "",
        kind: "hq",
      },
      {
        id: "thu-city",
        when: "Evening",
        where: "",
        title: "Partner events",
        text: "",
        kind: "city",
        places: [
          {
            name: "Partner events",
            line: "",
            href: "/around-baltimore",
          },
        ],
      },
    ],
  },
];

export const hq = {
  name: "Baltimore Tech Week HQ",
  venue: "4MLK",
  street: "4 N. Martin Luther King Jr. Blvd.",
  cityLine: "Baltimore, MD 21201",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=4+N+Martin+Luther+King+Jr+Blvd+Baltimore+MD+21201",
  holds: [
    "Registration and check-in",
    "Expo",
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
  { href: "/partners", title: "Partner", text: "Free if you already gather people in Baltimore." },
  { href: "/sponsors", title: "Sponsor", text: "Apply by February 15. The name is confirmed March 1." },
  { href: "/ambassadors", title: "Ambassador", text: "Share the nights with people who already listen to you." },
];

export const nav = {
  primary: [
    { href: "/schedule", label: "Schedule" },
    { href: "/expo", label: "Expo" },
  ],
  involved: [
    { href: "/speak", label: "Give a Talk" },
    { href: "/partners", label: "Partner" },
    { href: "/sponsors", label: "Sponsor" },
    { href: "/ambassadors", label: "Ambassador" },
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
  price: 49,
};

export const partnerFilters = [
  "All",
  "Connect",
  "Build",
  "Opportunity",
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
    categories: ["Startups", "Connect"],
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
    categories: ["Creative Tech", "Build", "Community"],
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
      title: `${title} · Baltimore Tech Week 2027`,
      description,
    },
    twitter: {
      title: `${title} · Baltimore Tech Week 2027`,
      description,
    },
  };
}

export const homeDescription =
  "Be in the room. Baltimore Tech Week is April 28–30, 2027, Wednesday through Friday, at 4MLK. For founders, operators, students, and people hiring in Baltimore. Passes are $49, on sale later.";
