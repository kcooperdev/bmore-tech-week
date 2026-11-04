const LIVE = "https://www.bmoretechweek.com";

export class SubmitError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "SubmitError";
    this.status = status;
  }
}

function text(value: unknown, label: string, max = 500, required = true) {
  const next = String(value ?? "").trim();
  if (!next) {
    if (required) throw new SubmitError(`${label} is required`);
    return "";
  }
  if (next.length > max) throw new SubmitError(`${label} is too long`);
  return next;
}

function email(value: unknown) {
  const next = text(value, "Email", 200).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next)) throw new SubmitError("Valid email is required");
  return next;
}

function list(value: unknown) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  const one = String(value ?? "").trim();
  return one ? [one] : [];
}

/** The live database accepts the April 2027 week. The public days are April 28–30. */
function datesFor(value: unknown) {
  const map: Record<string, string> = {
    wednesday: "2027-04-28",
    thursday: "2027-04-29",
    friday: "2027-04-30",
    connect: "2027-04-28",
    build: "2027-04-29",
    opportunity: "2027-04-30",
  };
  const dates = list(value)
    .map((item) => {
      const key = item.toLowerCase();
      return Object.entries(map).find(([day]) => key.startsWith(day))?.[1] ?? "";
    })
    .filter(Boolean);
  return dates.length ? dates : ["2027-04-28", "2027-04-29", "2027-04-30"];
}

function optional(value: unknown, label: string, max = 500) {
  return text(value, label, max, false);
}

function phone(value: unknown) {
  const next = optional(value, "Phone", 40);
  if (!next) return "";
  if (next.replace(/\D/g, "").length < 10) throw new SubmitError("Enter a 10-digit phone number");
  return next;
}

function siteUrl(value: unknown, label: string) {
  let next = optional(value, label, 300);
  if (!next || /^https?:\/\/(www\.)?$/i.test(next) || /^https?:\/\/(www\.)?linkedin\.com\/in\/?$/i.test(next)) return "";
  if (!/^https?:\/\//i.test(next)) next = `https://www.${next.replace(/^(www\.)/i, "")}`;
  if (!/^https?:\/\/\S+$/i.test(next)) throw new SubmitError(`${label} must start with http:// or https://`);
  let host = "";
  try {
    host = new URL(next).hostname;
  } catch {
    throw new SubmitError(`${label} must start with http:// or https://`);
  }
  if (!host.includes(".") || host === "www") throw new SubmitError(`${label} needs a full address`);
  return next;
}

function words(value: unknown, label: string, min: number, max = 2500) {
  const next = text(value, label, max);
  if (next.split(/\s+/).length < min) throw new SubmitError(`${label} needs at least ${min} words`);
  return next;
}

function oneOf(value: unknown, label: string, allowed: string[]) {
  const next = text(value, label, 160);
  if (!allowed.includes(next)) throw new SubmitError(`${label} is invalid`);
  return next;
}

function sessionFormat(value: string) {
  const next = value.toLowerCase();
  if (next === "panel" || next.startsWith("panel")) return "panel";
  if (next === "workshop" || next.startsWith("workshop")) return "workshop";
  if (next === "fireside" || next.startsWith("fireside")) return "fireside";
  if (next === "techtalk" || next.startsWith("tech")) return "techtalk";
  throw new SubmitError("Session type is invalid");
}

const SPONSOR_CALL = "https://tidycal.com/bmore-tech-week/30-minute-meeting";

const TIER_LABEL: Record<string, string> = {
  community: "Community ($2,500)",
  lead: "Lead ($5,000)",
  presenting: "Presenting ($10,000)",
};

const LEAD_DAY: Record<string, string> = {
  connect: "Connect (Wednesday, April 28)",
  build: "Build (Thursday, April 29)",
  opportunity: "Opportunity (Friday, April 30)",
};

async function forward(path: string, body: Record<string, unknown>) {
  const response = await fetch(`${LIVE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = (await response.json().catch(() => ({}))) as { error?: string; id?: string };
  if (!response.ok) throw new SubmitError(payload.error || "Could not save that.", response.status);
  return payload;
}

export async function saveSpeaker(body: Record<string, unknown>) {
  const description = words(body.description, "Session description", 40);
  const takeawayText = text(body.takeaways, "Takeaways", 2500);
  const takeawayLines = takeawayText
    .split("\n")
    .map((line) => line.replace(/^\s*\d+[.)]\s*/, "").trim())
    .filter(Boolean);
  if (takeawayLines.length < 3) throw new SubmitError("Add three takeaways, one per line");
  const nights = list(body.nights);
  const preferredNights = nights.includes("Any") ? ["Any"] : nights.filter((item) => /^\d{4}-\d{2}-\d{2}$/.test(item));
  if (!preferredNights.length) throw new SubmitError("Select at least one night");
  const topics = list(body.topics);
  if (!topics.length) throw new SubmitError("Select at least one topic");
  const notes = [
    optional(body.pronouns, "Pronouns", 80) && `Pronouns: ${optional(body.pronouns, "Pronouns", 80)}`,
    optional(body.yearsAround, "Tie to the city", 80) && `Around Baltimore: ${optional(body.yearsAround, "Tie to the city", 80)}`,
    optional(body.heardAbout, "How you heard", 80) && `Heard about us: ${optional(body.heardAbout, "How you heard", 80)}`,
    optional(body.notes, "Notes", 2000),
  ]
    .filter(Boolean)
    .join("\n\n");
  const payload = {
    name: text(body.name, "Full name", 120),
    email: email(body.email),
    phone: phone(body.phone),
    company: optional(body.company, "Company", 140),
    title: text(body.title, "Professional title", 140),
    cityState: text(body.cityState, "City and state", 80),
    talkTitle: text(body.talkTitle, "Session title", 140),
    talkDescription: description,
    takeaways: takeawayText,
    format: sessionFormat(text(body.format, "Session type", 40)),
    preferredNights,
    preferredNeighborhood: optional(body.neighborhood, "Neighborhood", 80) || "Any",
    topics,
    audienceLevel: oneOf(body.audience, "Audience level", ["Beginner", "Intermediate", "Advanced", "General Audience"]),
    spokenBefore: oneOf(body.spokenBefore, "Spoken before", ["yes", "no"]),
    previousTalks: optional(body.previousTalks, "Links", 2000),
    accessibility: optional(body.accessibility, "Accessibility", 1000),
    panelistFallback: oneOf(body.panelist, "Panelist", ["yes", "no"]),
    notes,
    linkedinUrl: siteUrl(body.linkedinUrl, "LinkedIn"),
    websiteUrl: siteUrl(body.websiteUrl, "Website"),
  };
  return forward("/api/speakers", payload);
}

export async function saveVenue(body: Record<string, unknown>) {
  const cost = text(body.cost, "Cost", 40);
  const costType = cost === "Paid" ? "Standard" : cost === "Not sure" ? "Low-Cost" : "Free";
  const capacity = Number(String(body.capacity ?? "").replace(/[^\d]/g, ""));
  if (!Number.isFinite(capacity) || capacity < 1 || capacity > 5000) {
    throw new SubmitError("Capacity must be between 1 and 5000");
  }
  const concept = text(body.concept, "Event", 180);
  const street = text(body.address, "Address", 160);
  const when = text(body.time, "Time", 40, false);
  const organization = text(body.organization, "Organization", 80, false);
  const contact = text(body.contact, "Contact name", 80);
  const payload = {
    name: text(body.venue, "Venue", 120),
    neighborhood: "Downtown",
    address: `${street} — ${when} — ${concept}`.slice(0, 200),
    capacity,
    availableDates: datesFor(body.day),
    venueType: "hybrid",
    costType,
    costAmount: costType === "Free" ? "" : "1",
    amenities: [],
    contactName: `${contact}${organization ? `, ${organization}` : ""}`.slice(0, 120),
    contactEmail: email(body.email),
  };
  return forward("/api/venues", payload);
}

export async function saveTicket(body: Record<string, unknown>) {
  const payload = {
    email: email(body.email),
    pass: text(body.pass, "Pass", 120, false) || "Updates list",
    name: text(body.name, "Name", 120, false),
  };
  return forward("/api/tickets", payload);
}

export async function saveApplication(body: Record<string, unknown>) {
  const kind = text(body.kind, "Application type", 40);
  if (kind === "exhibitor") {
    const name = text(body.name, "Name", 120);
    const organization = text(body.organization, "Organization", 160);
    const note = text(body.showing, "Details", 2000);
    return forward("/api/apply", {
      kind: "partner",
      name,
      email: email(body.email),
      organization,
      role: "Partner",
      website: siteUrl(body.website, "Website"),
      pass: "Partner",
      notes: [`Kind: exhibitor`, `Organization: ${organization}`, note].join("\n"),
    });
  }
  if (kind === "partner") {
    const channels = list(body.channels);
    const help = list(body.help);
    if (!channels.length) throw new SubmitError("Pick at least one channel");
    if (!help.length) throw new SubmitError("How can you help?");
    const notes = [
      `Type: ${text(body.type, "Group type", 80)}`,
      `Size: ${text(body.size, "Group size", 80)}`,
      optional(body.neighborhood, "Neighborhood", 80) && `Neighborhood: ${optional(body.neighborhood, "Neighborhood", 80)}`,
      optional(body.instagram, "Instagram", 80) && `Instagram: ${optional(body.instagram, "Instagram", 80)}`,
      list(body.audience).length ? `Audience: ${list(body.audience).join(", ")}` : "",
      `Channels: ${channels.join(", ")}`,
      `Help: ${help.join(", ")}`,
      list(body.nights).length ? `Nights they can show: ${list(body.nights).join(", ")}` : "",
      optional(body.heardAbout, "How you heard", 80) && `Heard about us: ${optional(body.heardAbout, "How you heard", 80)}`,
      optional(body.pronouns, "Pronouns", 80) && `Pronouns: ${optional(body.pronouns, "Pronouns", 80)}`,
      phone(body.phone) && `Phone: ${phone(body.phone)}`,
      optional(body.notes, "Notes", 2000) && `Notes: ${optional(body.notes, "Notes", 2000)}`,
    ]
      .filter(Boolean)
      .join("\n");
    return forward("/api/apply", {
      kind: "partner",
      name: text(body.name, "Name", 120),
      email: email(body.email),
      organization: text(body.organization, "Organization", 160),
      role: text(body.title, "Role", 120),
      website: siteUrl(body.website, "Website"),
      notes,
    });
  }
  if (kind === "sponsor") {
    const tier = text(body.tier, "Tier", 40);
    if (!TIER_LABEL[tier]) throw new SubmitError("Choose a tier, or say you want to talk first");
    const goals = list(body.goals);
    if (!goals.length) throw new SubmitError("Pick at least one goal");
    const booked = oneOf(body.booked, "Call", ["yes", "no"]);
    const note = optional(body.notes, "Notes", 2000);
    if (booked === "no" && !note) throw new SubmitError("Tell us a week that works");
    const label = TIER_LABEL[tier];
    const day = optional(body.day, "Day", 40);
    if (tier === "lead" && !LEAD_DAY[day]) throw new SubmitError("Choose Connect, Build, or Opportunity");
    const dayLabel = day && LEAD_DAY[day] ? LEAD_DAY[day] : "";
    const notes = [
      `Tier: ${label}`,
      dayLabel && `Day: ${dayLabel}`,
      optional(body.size, "Company size", 40) && `Company size: ${optional(body.size, "Company size", 40)}`,
      `Goals: ${goals.join(", ")}`,
      `Decision: ${text(body.decision, "Decision", 80)}`,
      `Call booked: ${booked === "yes" ? "Yes, booked on TidyCal" : "Needs another time"}`,
      `Call link: ${SPONSOR_CALL}`,
      optional(body.heardAbout, "How you heard", 80) && `Heard about us: ${optional(body.heardAbout, "How you heard", 80)}`,
      phone(body.phone) && `Phone: ${phone(body.phone)}`,
      note && `Notes: ${note}`,
    ]
      .filter(Boolean)
      .join("\n");
    return forward("/api/apply", {
      kind: "sponsor",
      name: text(body.name, "Name", 120),
      email: email(body.email),
      organization: text(body.organization, "Company", 160),
      role: text(body.title, "Role", 120),
      website: siteUrl(body.website, "Website"),
      pass: `Sponsor · ${label.split(" (")[0]}${dayLabel ? ` · ${dayLabel.split(" (")[0]}` : ""}`,
      notes,
    });
  }
  if (kind === "ambassador") {
    const channels = list(body.channels);
    if (!channels.length) throw new SubmitError("Where will you share?");
    const notes = [
      `Channels: ${channels.join(", ")}`,
      `Reach: ${text(body.reach, "Reach", 80)}`,
      optional(body.neighborhood, "Neighborhood", 80) && `Neighborhood: ${optional(body.neighborhood, "Neighborhood", 80)}`,
      optional(body.city, "City", 80) && `City: ${optional(body.city, "City", 80)}`,
      optional(body.yearsAround, "Tie to the city", 80) && `Around Baltimore: ${optional(body.yearsAround, "Tie to the city", 80)}`,
      `How they’ll spread the word: ${text(body.why, "How you’ll get the word out", 80)}`,
      optional(body.heardAbout, "How you heard", 80) && `Heard about us: ${optional(body.heardAbout, "How you heard", 80)}`,
      optional(body.pronouns, "Pronouns", 80) && `Pronouns: ${optional(body.pronouns, "Pronouns", 80)}`,
      phone(body.phone) && `Phone: ${phone(body.phone)}`,
      optional(body.notes, "Notes", 2000) && `Notes: ${optional(body.notes, "Notes", 2000)}`,
    ]
      .filter(Boolean)
      .join("\n");
    return forward("/api/apply", {
      kind: "ambassador",
      name: text(body.name, "Name", 120),
      email: email(body.email),
      organization: optional(body.organization, "Organization", 160),
      role: optional(body.title, "Role", 120) || "Ambassador",
      notes,
    });
  }
  throw new SubmitError("Application type is invalid");
}
