import type { ApplyField } from "@/lib/apply-fields";
import { tracks } from "@/lib/site";

export const pronouns = ["she / her", "he / him", "they / them", "Prefer not to say", "Something else"];

export const yearsAround = ["I live here now", "A few years", "Most of my life", "Visiting / elsewhere"];

export const heardAbout = [
  "Instagram",
  "LinkedIn",
  "A friend",
  "A meetup or group",
  "Campus",
  "Work",
  "Google",
  "Other",
];

export const neighborhoods = [
  "BioPark",
  "Station North",
  "Hampden",
  "Inner Harbor",
  "Harbor East",
  "Downtown",
  "4MLK / Westside",
  "Fells Point",
  "Federal Hill",
  "Mount Vernon",
  "Canton",
  "Remington",
  "Other",
];

export const sessionTypes = [
  { value: "workshop", label: "Workshop · 45–60 minutes" },
  { value: "panel", label: "Panel Discussion · 45–60 minutes" },
  { value: "techtalk", label: "Tech Talk · 20–30 minutes" },
];

export const audienceLevels = ["Beginner", "Intermediate", "Advanced", "General Audience"];

export const programNights = [
  { value: "2027-04-27", label: "April 27 · Tuesday" },
  { value: "2027-04-28", label: "April 28 · Wednesday" },
  { value: "2027-04-29", label: "April 29 · Thursday" },
  { value: "Any", label: "No preference" },
];

export const partnerNights = ["Bmore Connected · Tuesday", "Bmore Built · Wednesday", "Bmore Next · Thursday"];

export const speakerTopics = [...tracks.map((track) => track.name), "Other"];

export const partnerTypes = [
  "Meetup",
  "University / school",
  "Accelerator",
  "Nonprofit",
  "Coworking space",
  "Student organization",
  "Workforce / talent program",
  "Media / newsletter",
  "Other",
];

export const partnerSizes = ["Under 50 people", "50–200 people", "200–1,000 people", "1,000+ people"];

export const partnerChannels = [
  "Newsletter",
  "Instagram",
  "LinkedIn",
  "Slack / Discord",
  "In-person meetup",
  "Campus / classroom",
  "Website",
];

export const partnerHelp = [
  "Share Bmore Tech Fest with our people",
  "Bring a group",
  "Bring volunteers",
  "Help with student tickets",
  "Introduce sponsors or speakers",
];

export const sponsorTiers = [
  { value: "community", label: "Community · $2,500" },
  { value: "lead", label: "Lead · $5,000" },
  { value: "presenting", label: "Presenting · $10,000" },
];

export const sponsorTierCopy = [
  {
    id: "community",
    name: "Community",
    price: "$2,500",
    spots: "Eight companies",
    text: "Your logo on Bmore Tech Fest.",
    perks: ["Logo on the site and in the program", "One mention in the attendee email", "Four passes"],
    pick: false,
    top: false,
  },
  {
    id: "lead",
    name: "Lead",
    price: "$5,000",
    spots: "One company each day",
    text: "Your name on Bmore Connected, Bmore Built, or Bmore Next.",
    perks: ["Everything in Community", "One company on that day", "A two-minute welcome that day", "Eight passes"],
    pick: true,
    top: false,
  },
  {
    id: "presenting",
    name: "Presenting",
    price: "$10,000",
    spots: "One company",
    text: "Bmore Tech Fest, presented by you.",
    perks: [
      "Bmore Tech Fest 2027, presented by your company",
      "Logo on the homepage",
      "A mention in the room each day",
      "Twelve passes",
    ],
    pick: false,
    top: true,
  },
];

export const roles = [
  "Founder",
  "Engineer",
  "Designer",
  "Product",
  "Organizer",
  "Student",
  "Teacher",
  "Marketing",
  "Partnerships",
  "Recruiter",
  "Operator",
  "Other",
];

export const cities = [
  "Baltimore, MD",
  "Towson, MD",
  "Columbia, MD",
  "Annapolis, MD",
  "Washington, DC",
  "Elsewhere in Maryland",
  "Somewhere else",
];

export const cityFollowUps = ["Elsewhere in Maryland", "Somewhere else"];

function cityDetail(parent: string, step: string): ApplyField {
  return {
    name: "cityDetail",
    label: "City and state",
    required: true,
    placeholder: "Frederick, MD",
    when: { field: parent, is: cityFollowUps },
    step,
    wide: true,
  };
}

export const gathered = ["Students", "Founders", "Engineers", "Operators", "Designers", "Neighbors", "Employers"];

export const spreadHow = ["A post", "A meetup", "A class", "A newsletter", "At work", "A group chat"];

export const companySizes = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"];

export const sponsorDecisions = ["I can decide", "I recommend, someone else signs", "Exploring for later"];

export const sponsorGoals = [
  "Brand in Baltimore",
  "Recruiting / talent",
  "Customers / pipeline",
  "Community support",
  "Product in front of builders",
];

export const ambassadorChannels = [
  "Instagram",
  "LinkedIn",
  "TikTok",
  "Newsletter",
  "Campus",
  "Meetup / group",
  "Word of mouth",
  "Workplace",
];

export const ambassadorReach = [
  "A tight circle (under 50)",
  "A regular group (50–200)",
  "A wider network (200–1,000)",
  "A large audience (1,000+)",
];

const you = "You";

export const speakFields: ApplyField[] = [
  { name: "name", label: "Full name", required: true, autoComplete: "name", placeholder: "Your name", step: you },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", placeholder: "you@studio.com", step: you },
  { name: "company", label: "Company / organization", autoComplete: "organization", placeholder: "Studio, company, or independent", step: you },
  { name: "linkedinUrl", label: "LinkedIn", type: "url", placeholder: "https://linkedin.com/in/", step: you },
  { name: "format", label: "Session type", type: "select", required: true, choices: sessionTypes, placeholder: "Choose a format", step: "The session", wide: true },
  { name: "nights", label: "Preferred day", type: "radio", required: true, choices: programNights, hint: "Pick the day this could live.", step: "The session" },
  { name: "topics", label: "Track", type: "radio", required: true, options: speakerTopics, step: "The session" },
  { name: "talkTitle", label: "Session title", required: true, placeholder: "What the room is actually about", step: "About the talk", wide: true },
  {
    name: "description",
    label: "Session description",
    type: "textarea",
    required: true,
    placeholder: "The conversation, the exercise, or the story.",
    hint: "What happens in the room, not a bio.",
    step: "About the talk",
  },
  { name: "notes", label: "Anything else we should know?", type: "textarea", hint: "Access needs, first-time speaker, or anything that helps us host you.", step: "About the talk" },
];

export const partnerFields: ApplyField[] = [
  { name: "name", label: "Your name", required: true, autoComplete: "name", step: you },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", placeholder: "you@group.org", step: you },
  { name: "title", label: "Your role", type: "select", required: true, options: roles, placeholder: "Choose one", step: you },
  { name: "phone", label: "Phone", type: "tel", step: you },
  { name: "pronouns", label: "Pronouns", type: "select", options: pronouns, placeholder: "Choose pronouns", step: you },
  { name: "heardAbout", label: "How did you hear about Bmore Tech Fest?", type: "select", options: heardAbout, placeholder: "Choose one", step: you, wide: true },
  { name: "organization", label: "Organization", required: true, autoComplete: "organization", step: "Your group" },
  { name: "type", label: "What kind of group?", type: "select", required: true, options: partnerTypes, placeholder: "Choose one", step: "Your group" },
  { name: "size", label: "About how many people?", type: "select", required: true, options: partnerSizes, placeholder: "Choose one", step: "Your group" },
  { name: "neighborhood", label: "Home neighborhood", type: "select", options: neighborhoods, placeholder: "Choose one", step: "Your group" },
  { name: "website", label: "Website", type: "url", placeholder: "https://", step: "Your group" },
  { name: "instagram", label: "Instagram", placeholder: "@yourgroup", step: "Your group" },
  { name: "audience", label: "Who do you gather?", type: "checks", options: gathered, step: "Your group" },
  { name: "channels", label: "Where can you share Bmore Tech Fest?", type: "checks", required: true, options: partnerChannels, step: "How you’ll help" },
  { name: "help", label: "How do you want to help?", type: "checks", required: true, options: partnerHelp, step: "How you’ll help" },
  { name: "nights", label: "Days you could show up", type: "checks", options: partnerNights, hint: "Optional. Helps us plan shout-outs and rooms.", step: "How you’ll help" },
  { name: "notes", label: "Anything else we should know?", type: "textarea", step: "How you’ll help" },
];

export const sponsorFields: ApplyField[] = [
  { name: "name", label: "Your name", required: true, autoComplete: "name", step: you },
  { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email", placeholder: "you@company.com", step: you },
  { name: "title", label: "Your role", type: "select", required: true, options: roles, placeholder: "Choose one", step: you },
  { name: "phone", label: "Phone", type: "tel", hint: "We’ll use this only if the calendar invite bounces.", step: you },
  { name: "heardAbout", label: "How did you hear about Bmore Tech Fest?", type: "select", options: heardAbout, placeholder: "Choose one", step: you, wide: true },
  { name: "organization", label: "Company", required: true, autoComplete: "organization", step: "Company & tier" },
  { name: "website", label: "Website", type: "url", placeholder: "https://", step: "Company & tier" },
  { name: "size", label: "Company size", type: "select", options: companySizes, placeholder: "Choose one", step: "Company & tier" },
  { name: "decision", label: "Who decides?", type: "select", required: true, options: sponsorDecisions, placeholder: "Choose one", step: "Company & tier" },
  { name: "tier", label: "Which tier are you looking at?", type: "select", required: true, choices: sponsorTiers, placeholder: "Choose a tier", hint: "You can change this on the call.", step: "Company & tier", wide: true },
  { name: "goals", label: "What do you want out of Bmore Tech Fest?", type: "checks", required: true, options: sponsorGoals, step: "Company & tier" },
  {
    name: "booked",
    label: "Did you book a time?",
    type: "radio",
    required: true,
    choices: [
      { value: "yes", label: "Yes, I booked a time" },
      { value: "no", label: "I need help finding a time" },
    ],
    step: "Book a call",
  },
  { name: "notes", label: "Anything the call should cover?", type: "textarea", placeholder: "If you still need a time, say which week works.", step: "Book a call" },
];

export const leadDays = [
  { value: "connect", label: "Bmore Connected · Tuesday · April 27", short: "Bmore Connected · April 27" },
  { value: "build", label: "Bmore Built · Wednesday · April 28", short: "Bmore Built · April 28" },
  { value: "opportunity", label: "Bmore Next · Thursday · April 29", short: "Bmore Next · April 29" },
];

export function sponsorFieldsFor(tier: string): ApplyField[] {
  if (tier !== "lead") return sponsorFields;
  const dayField: ApplyField = {
    name: "day",
    label: "Which day?",
    type: "select",
    required: true,
    choices: leadDays.map(({ value, label }) => ({ value, label })),
    step: "Company & tier",
    wide: true,
  };
  const tierIndex = sponsorFields.findIndex((field) => field.name === "tier");
  return [...sponsorFields.slice(0, tierIndex + 1), dayField, ...sponsorFields.slice(tierIndex + 1)];
}

export const ambassadorFields: ApplyField[] = [
  { name: "name", label: "Your name", required: true, autoComplete: "name", step: you },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", step: you },
  { name: "city", label: "City", type: "select", required: true, options: cities, placeholder: "Choose a city", step: you },
  cityDetail("city", you),
  { name: "pronouns", label: "Pronouns", type: "select", options: pronouns, placeholder: "Choose pronouns", step: you },
  { name: "yearsAround", label: "Your tie to the city", type: "select", options: yearsAround, placeholder: "How you know Baltimore", step: you },
  { name: "neighborhood", label: "Neighborhood you move through", type: "select", options: neighborhoods, placeholder: "Choose one", step: you },
  { name: "organization", label: "School, workplace, or group", placeholder: "Optional", step: you },
  { name: "title", label: "What you do there", type: "select", options: roles, placeholder: "Choose one", step: you },
  { name: "phone", label: "Phone", type: "tel", step: you },
  { name: "heardAbout", label: "How did you hear about Bmore Tech Fest?", type: "select", options: heardAbout, placeholder: "Choose one", step: you, wide: true },
  { name: "channels", label: "Where will you share?", type: "checks", required: true, options: ambassadorChannels, step: "Get the word out" },
  { name: "reach", label: "About how many people can you reach?", type: "select", required: true, options: ambassadorReach, placeholder: "Choose one", step: "Get the word out", wide: true },
  { name: "why", label: "How will you get the word out?", type: "select", required: true, options: spreadHow, placeholder: "Choose one", step: "Get the word out", wide: true },
  { name: "notes", label: "Anything else?", type: "textarea", step: "Get the word out" },
];
