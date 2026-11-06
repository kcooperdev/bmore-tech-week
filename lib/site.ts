import type { Metadata } from "next";

/**
 * Editable content for Bmore Tech Fest 2027.
 * Add confirmed sessions, exhibitors, sponsors, and partner events here.
 * Do not add a partner event until the partnership, time, and capacity are confirmed.
 * The week is Tuesday, April 27 through Thursday, April 29, 2027.
 * Set phase to "live" during the week to turn the homepage into the attendee view.
 */

export const site = {
  name: "Bmore Tech Fest",
  year: 2027,
  url: "https://bmoretechweek.com",
  email: "team@bmoretechweek.com",
  phase: "preview" as "preview" | "live",
  liveDay: "tuesday" as DayId,
  dates: "April 27–29, 2027",
  when: "Tuesday–Thursday",
  where: "Baltimore, Maryland",
  tagline: "Bmore Connected. Bmore Built. Bmore Next.",
  promise: "Be in the room.",
  sell: "Three days in one building with the people you keep meaning to meet. $79.",
  ticketLine: "Three days, or one night.",
  idea: "4MLK is the HQ.",
  positioning: "Three days at 4MLK.",
  room: "Founders, operators, students, and people hiring in Baltimore.",
  passes: "On sale later.",
};

export type DayId = "tuesday" | "wednesday" | "thursday";
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
  night: string;
  question: string;
  tagline: string;
  summary: string;
  purpose: string;
  stops: DayStop[];
};

export const pillars: Pillar[] = [
  {
    id: "tuesday",
    day: "Tuesday",
    date: "April 27",
    name: "Bmore Connected",
    night: "Connected Night",
    question: "Who should I meet?",
    tagline: "Meet the people building Baltimore.",
    summary: "Meet the people building Baltimore.",
    purpose: "Put a name to the work happening here.",
    stops: [
      {
        id: "tue-doors",
        when: "8–9:30am",
        where: "4MLK",
        title: "Doors and breakfast",
        text: "",
        kind: "hq",
      },
      {
        id: "tue-am",
        when: "9:30am–12pm",
        where: "4MLK",
        title: "Sessions",
        text: "",
        kind: "hq",
      },
      {
        id: "tue-lunch",
        when: "12–1pm",
        where: "4MLK",
        title: "Lunch",
        text: "Vendors on site.",
        kind: "pause",
      },
      {
        id: "tue-pm",
        when: "1–4pm",
        where: "4MLK",
        title: "Sessions",
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
        id: "tue-mixer",
        when: "5:30pm",
        where: "",
        title: "Connected Night",
        text: "",
        kind: "city",
      },
    ],
  },
  {
    id: "wednesday",
    day: "Wednesday",
    date: "April 28",
    name: "Bmore Built",
    night: "Built Night",
    question: "What can I create?",
    tagline: "Workshops, demos, and startups.",
    summary: "Workshops, demos, and startups.",
    purpose: "Leave with something you made.",
    stops: [
      {
        id: "wed-doors",
        when: "8–9:30am",
        where: "4MLK",
        title: "Doors and breakfast",
        text: "",
        kind: "hq",
      },
      {
        id: "wed-am",
        when: "9:30am–12pm",
        where: "4MLK",
        title: "Sessions",
        text: "",
        kind: "hq",
      },
      {
        id: "wed-lunch",
        when: "12–1pm",
        where: "4MLK",
        title: "Lunch",
        text: "Vendors on site.",
        kind: "pause",
      },
      {
        id: "wed-pm",
        when: "1–4pm",
        where: "4MLK",
        title: "Sessions",
        text: "",
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
        id: "wed-mixer",
        when: "5:30pm",
        where: "",
        title: "Built Night",
        text: "",
        kind: "city",
      },
    ],
  },
  {
    id: "thursday",
    day: "Thursday",
    date: "April 29",
    name: "Bmore Next",
    night: "Bmore Tech Night",
    question: "Where can this take me?",
    tagline: "Jobs, funding, and a next step.",
    summary: "Jobs, funding, and a next step.",
    purpose: "A job, a cofounder, a room you go back to.",
    stops: [
      {
        id: "thu-doors",
        when: "8–9:30am",
        where: "4MLK",
        title: "Doors and breakfast",
        text: "",
        kind: "hq",
      },
      {
        id: "thu-am",
        when: "9:30am–12pm",
        where: "4MLK",
        title: "Sessions",
        text: "",
        kind: "hq",
      },
      {
        id: "thu-lunch",
        when: "12–1pm",
        where: "4MLK",
        title: "Lunch",
        text: "Vendors on site.",
        kind: "pause",
      },
      {
        id: "thu-pm",
        when: "1–4pm",
        where: "4MLK",
        title: "Sessions",
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
        id: "thu-mixer",
        when: "5:30pm",
        where: "",
        title: "Bmore Tech Night",
        text: "",
        kind: "city",
      },
    ],
  },
];

export const hq = {
  name: "Bmore Tech Fest HQ",
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
  { href: "/ambassadors", title: "Ambassador", text: "Share the fest with people who already listen to you." },
];

export const nav = {
  primary: [
    { href: "/schedule", label: "Schedule" },
    { href: "/tickets", label: "Tickets" },
  ],
  involved: [
    { href: "/speak", label: "Give a Talk" },
    { href: "/partners", label: "Partner" },
    { href: "/sponsors", label: "Sponsor" },
    { href: "/ambassadors", label: "Ambassador" },
    { href: "/expo", label: "Ask for a table" },
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
  price: 79,
};

export const eveningPass = {
  name: "Evening Pass",
  price: 45,
};

export const partnerFilters = [
  "All",
  "Bmore Connected",
  "Bmore Built",
  "Bmore Next",
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
    categories: ["Startups", "Bmore Connected"],
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
    categories: ["Creative Tech", "Bmore Built", "Community"],
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
  "Be in the room. Three days in one building with the people you keep meaning to meet. Bmore Tech Fest is April 27–29, 2027 at 4MLK. $79 for the whole fest. $45 for one night.";
