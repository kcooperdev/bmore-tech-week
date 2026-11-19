import path from "node:path";
import { fileURLToPath } from "node:url";
import PptxGenJS from "pptxgenjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const assets = path.join(root, "assets");
const harborSunset = path.join(root, "public/images/harbor-sunset.jpg");
const harborNight = path.join(root, "public/images/harbor-night.jpg");

const C = {
  navy: "0B1426",
  navy2: "111C33",
  card: "152238",
  orange: "F0A020",
  orangeDeep: "E8940F",
  blue: "1F4FE0",
  blueSoft: "2A5CF0",
  teal: "0FA3A0",
  green: "1A6B45",
  greenDeep: "145238",
  white: "FFFFFF",
  muted: "A8B3C7",
  line: "2A3650",
};

const badgePerks = [
  "Logo on attendee badges",
  "Logo on the sponsor page",
  "1 full conference pass",
];

const communityPerks = [
  "Logo on attendee badges",
  "Logo on the sponsor page",
  "Logo on shared summit signage",
  "Recognition in an attendee email",
  "2 full conference passes",
];

const dayPerks = [
  "Logo on attendee badges",
  "Logo on the sponsor page",
  "Logo on shared summit signage",
  "Recognition in an attendee email",
  "Featured logo on the selected day’s agenda and signage",
  "Recognition during opening remarks",
  "Dedicated table that day",
  "4 full conference passes",
];

function footer(slide, pptx) {
  slide.addText("BMORE TECH WEEK", {
    x: 0.5,
    y: 7.05,
    w: 4,
    h: 0.28,
    fontSize: 10,
    fontFace: "Arial",
    color: C.muted,
    margin: 0,
  });
}

function eyebrow(slide, text, y = 0.4) {
  slide.addText(text, {
    x: 0.55,
    y,
    w: 12,
    h: 0.28,
    fontSize: 12,
    fontFace: "Arial",
    color: C.orange,
    bold: true,
    margin: 0,
  });
}

function title(slide, text, y = 0.7) {
  slide.addText(text, {
    x: 0.55,
    y,
    w: 12,
    h: 0.7,
    fontSize: 34,
    fontFace: "Arial",
    color: C.white,
    bold: true,
    margin: 0,
  });
}

function bullets(slide, items, opts) {
  slide.addText(
    items.map((t) => ({
      text: t,
      options: { bullet: true, breakLine: true, color: opts.color || C.white, fontSize: opts.fontSize || 15 },
    })),
    {
      x: opts.x,
      y: opts.y,
      w: opts.w,
      h: opts.h,
      fontFace: "Arial",
      paraSpacing: 8,
      margin: 0,
    },
  );
}

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
pptx.layout = "WIDE";
pptx.author = "Bmore Tech Week";
pptx.title = "Bmore Tech Week 2027 — Sponsorship Deck";

// 1. Cover
{
  const s = pptx.addSlide();
  s.addImage({ path: harborNight, x: 0, y: 0, w: 13.333, h: 7.5 });
  s.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 7.5,
    fill: { color: C.navy, transparency: 45 },
  });
  s.addText("BALTIMORE, MD  •  APRIL 26–28, 2027", {
    x: 0.7,
    y: 2.1,
    w: 10,
    h: 0.35,
    fontSize: 14,
    fontFace: "Arial",
    color: C.orange,
    bold: true,
    margin: 0,
  });
  s.addText("Bmore Tech Week", {
    x: 0.7,
    y: 2.5,
    w: 11,
    h: 0.9,
    fontSize: 52,
    fontFace: "Arial",
    color: C.white,
    bold: true,
    margin: 0,
  });
  s.addText("Three days of tech, founders, and community in one place.", {
    x: 0.7,
    y: 3.4,
    w: 10,
    h: 0.4,
    fontSize: 18,
    fontFace: "Arial",
    color: C.white,
    margin: 0,
  });
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.7,
    y: 5.8,
    w: 1.1,
    h: 0.42,
    fill: { color: C.orange },
    rectRadius: 0.08,
  });
  s.addText("4MLK", {
    x: 0.7,
    y: 5.8,
    w: 1.1,
    h: 0.42,
    fontSize: 12,
    fontFace: "Arial",
    color: C.navy,
    bold: true,
    align: "center",
    valign: "middle",
    margin: 0,
  });
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 2.0,
    y: 5.8,
    w: 2.5,
    h: 0.42,
    fill: { color: C.teal },
    rectRadius: 0.08,
  });
  s.addText("SPONSORSHIP DECK", {
    x: 2.0,
    y: 5.8,
    w: 2.5,
    h: 0.42,
    fontSize: 12,
    fontFace: "Arial",
    color: C.navy,
    bold: true,
    align: "center",
    valign: "middle",
    margin: 0,
  });
}

// 2. Mission
{
  const s = pptx.addSlide();
  s.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.navy } });
  eyebrow(s, "OUR MISSION");
  title(s, "Tech, founders, and community in one place");

  const cards = [
    { x: 0.55, fill: C.blue, label: "SKILLS", head: "Build real capability", body: "Help Baltimore-area technologists build skills they can use at work." },
    { x: 4.7, fill: C.teal, label: "FOUNDERS", head: "Elevate local startups", body: "Give local founders a stage." },
    { x: 8.85, fill: C.green, label: "COMMUNITY", head: "Unite the ecosystem", body: "Connect people across the region’s tech community." },
  ];
  for (const c of cards) {
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: c.x,
      y: 2.0,
      w: 3.85,
      h: 3.5,
      fill: { color: c.fill },
      rectRadius: 0.15,
    });
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: c.x + 0.25,
      y: 2.35,
      w: 1.5,
      h: 0.34,
      fill: { color: C.orange },
      rectRadius: 0.08,
    });
    s.addText(c.label, {
      x: c.x + 0.25,
      y: 2.35,
      w: 1.5,
      h: 0.34,
      fontSize: 11,
      fontFace: "Arial",
      color: C.navy,
      bold: true,
      align: "center",
      valign: "middle",
      margin: 0,
    });
    s.addText(c.head, {
      x: c.x + 0.25,
      y: 3.1,
      w: 3.3,
      h: 0.9,
      fontSize: 24,
      fontFace: "Arial",
      color: C.white,
      bold: true,
      margin: 0,
    });
    s.addText(c.body, {
      x: c.x + 0.25,
      y: 4.15,
      w: 3.3,
      h: 1.0,
      fontSize: 14,
      fontFace: "Arial",
      color: C.white,
      margin: 0,
    });
  }
  s.addShape(pptx.shapes.RECTANGLE, {
    x: 0.55,
    y: 5.9,
    w: 12.2,
    h: 0.015,
    fill: { color: C.line },
  });
  s.addText("April 26–28, 2027  •  Baltimore, MD  •  Hosted at 4MLK", {
    x: 0.55,
    y: 6.15,
    w: 12,
    h: 0.3,
    fontSize: 13,
    fontFace: "Arial",
    color: C.orange,
    margin: 0,
  });
  footer(s);
}

// 3. Audience
{
  const s = pptx.addSlide();
  s.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.navy } });
  s.addImage({ path: harborSunset, x: 0.4, y: 0.45, w: 4.4, h: 6.5 });
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4,
    y: 0.45,
    w: 4.4,
    h: 6.5,
    fill: { type: "none" },
    line: { color: C.navy, width: 0 },
    rectRadius: 0.12,
  });
  eyebrow(s, "THE AUDIENCE", 0.45);
  s.addText("Meet Baltimore’s tech community", {
    x: 5.2,
    y: 0.75,
    w: 7.5,
    h: 0.8,
    fontSize: 30,
    fontFace: "Arial",
    color: C.white,
    bold: true,
    margin: 0,
  });
  s.addText("Partners looking to meet local talent or support founders can connect with this community across three days.", {
    x: 5.2,
    y: 1.55,
    w: 7.3,
    h: 0.55,
    fontSize: 14,
    fontFace: "Arial",
    color: C.muted,
    margin: 0,
  });
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.2,
    y: 2.25,
    w: 7.4,
    h: 1.35,
    fill: { color: C.blue },
    rectRadius: 0.12,
  });
  s.addText("YEAR 1 ATTENDEE GOAL", {
    x: 5.45,
    y: 2.4,
    w: 6.8,
    h: 0.25,
    fontSize: 11,
    fontFace: "Arial",
    color: C.orange,
    bold: true,
    margin: 0,
  });
  s.addText("300+ Attendees", {
    x: 5.45,
    y: 2.7,
    w: 6.8,
    h: 0.4,
    fontSize: 28,
    fontFace: "Arial",
    color: C.white,
    bold: true,
    margin: 0,
  });
  s.addText("An intentional, high-density gathering across three focused conference days.", {
    x: 5.45,
    y: 3.15,
    w: 6.8,
    h: 0.3,
    fontSize: 12,
    fontFace: "Arial",
    color: C.white,
    margin: 0,
  });

  const segs = [
    { x: 5.2, y: 3.9, t: "Engineers", d: "Full-stack developers, cybersecurity, AI practitioners, and systems engineers." },
    { x: 9.0, y: 3.9, t: "Product & Design", d: "Product managers, UX researchers, and designers shaping modern experiences." },
    { x: 5.2, y: 5.35, t: "Startup Founders", d: "Early-stage and scaling entrepreneurs building in the Baltimore metro area." },
    { x: 9.0, y: 5.35, t: "Students", d: "Emerging technical talent from regional universities and CS programs." },
  ];
  for (const seg of segs) {
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: seg.x,
      y: seg.y,
      w: 3.55,
      h: 1.25,
      fill: { color: C.card },
      rectRadius: 0.1,
    });
    s.addText(seg.t, {
      x: seg.x + 0.2,
      y: seg.y + 0.18,
      w: 3.1,
      h: 0.3,
      fontSize: 15,
      fontFace: "Arial",
      color: C.white,
      bold: true,
      margin: 0,
    });
    s.addText(seg.d, {
      x: seg.x + 0.2,
      y: seg.y + 0.5,
      w: 3.1,
      h: 0.6,
      fontSize: 12,
      fontFace: "Arial",
      color: C.muted,
      margin: 0,
    });
  }
  footer(s);
}

// 4. Agenda
{
  const s = pptx.addSlide();
  s.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.navy } });
  eyebrow(s, "AGENDA OVERVIEW");
  title(s, "Three days of connection and hands-on learning");

  const days = [
    { x: 0.55, tag: "MON · APR 26 · EVENING", tagColor: C.teal, head: "Kickoff Party", sub: "Kickoff", body: "Monday evening kickoff to open the week." },
    { x: 4.7, tag: "TUE · APR 27 · 9 AM–5 PM", tagColor: C.orange, head: "Baltimore Build Summit", sub: "AI & Building Tech", body: "Talks, workshops, and panels for attendees." },
    { x: 8.85, tag: "WED · APR 28 · 9 AM–5 PM", tagColor: C.blue, head: "Baltimore Build Summit", sub: "Careers & Startups", body: "Talks, workshops, and panels, followed by the Closing Celebration that evening." },
  ];
  for (const d of days) {
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: d.x,
      y: 1.9,
      w: 3.85,
      h: 3.7,
      fill: { color: C.card },
      rectRadius: 0.14,
    });
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: d.x + 0.25,
      y: 2.2,
      w: 3.2,
      h: 0.36,
      fill: { color: d.tagColor },
      rectRadius: 0.08,
    });
    s.addText(d.tag, {
      x: d.x + 0.25,
      y: 2.2,
      w: 3.2,
      h: 0.36,
      fontSize: 11,
      fontFace: "Arial",
      color: C.navy,
      bold: true,
      align: "center",
      valign: "middle",
      margin: 0,
    });
    s.addText(d.head, {
      x: d.x + 0.25,
      y: 2.85,
      w: 3.3,
      h: 0.85,
      fontSize: 24,
      fontFace: "Arial",
      color: C.white,
      bold: true,
      margin: 0,
    });
    s.addText(d.sub, {
      x: d.x + 0.25,
      y: 3.75,
      w: 3.3,
      h: 0.35,
      fontSize: 14,
      fontFace: "Arial",
      color: C.orange,
      bold: true,
      margin: 0,
    });
    s.addText(d.body, {
      x: d.x + 0.25,
      y: 4.25,
      w: 3.3,
      h: 1.0,
      fontSize: 14,
      fontFace: "Arial",
      color: C.muted,
      margin: 0,
    });
  }
  s.addText("Summit at 4MLK + curated off-site venues. Evenings bring partner-hosted community events.", {
    x: 0.55,
    y: 6.0,
    w: 12.2,
    h: 0.35,
    fontSize: 13,
    fontFace: "Arial",
    color: C.muted,
    margin: 0,
  });
  footer(s);
}

// 5. Proven demand
{
  const s = pptx.addSlide();
  s.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.navy } });
  eyebrow(s, "PROVEN DEMAND");
  title(s, "A response that sparked Bmore Tech Week");

  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.55,
    y: 1.9,
    w: 5.8,
    h: 4.2,
    fill: { color: C.blue },
    rectRadius: 0.16,
  });
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.85,
    y: 2.25,
    w: 2.7,
    h: 0.36,
    fill: { color: C.orange },
    rectRadius: 0.08,
  });
  s.addText("FEBRUARY 2026 PRECEDENT", {
    x: 0.85,
    y: 2.25,
    w: 2.7,
    h: 0.36,
    fontSize: 11,
    fontFace: "Arial",
    color: C.navy,
    bold: true,
    align: "center",
    valign: "middle",
    margin: 0,
  });
  s.addText("754+", {
    x: 0.85,
    y: 3.0,
    w: 5.1,
    h: 1.1,
    fontSize: 72,
    fontFace: "Arial",
    color: C.white,
    bold: true,
    margin: 0,
  });
  s.addText("Registrations across 7 events", {
    x: 0.85,
    y: 4.2,
    w: 5.1,
    h: 0.4,
    fontSize: 18,
    fontFace: "Arial",
    color: C.orange,
    bold: true,
    margin: 0,
  });
  s.addText("Historical registrations from the sprint event that demonstrated regional demand.", {
    x: 0.85,
    y: 4.8,
    w: 5.1,
    h: 0.7,
    fontSize: 13,
    fontFace: "Arial",
    color: C.white,
    margin: 0,
  });

  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.8,
    y: 1.9,
    w: 2.4,
    h: 0.36,
    fill: { color: C.teal },
    rectRadius: 0.08,
  });
  s.addText("ORGANIZED IN 21 DAYS", {
    x: 6.8,
    y: 1.9,
    w: 2.4,
    h: 0.36,
    fontSize: 11,
    fontFace: "Arial",
    color: C.navy,
    bold: true,
    align: "center",
    valign: "middle",
    margin: 0,
  });
  s.addText("Organized by Khalif Cooper", {
    x: 6.8,
    y: 2.5,
    w: 5.8,
    h: 0.55,
    fontSize: 26,
    fontFace: "Arial",
    color: C.white,
    bold: true,
    margin: 0,
  });
  s.addText(
    "In February 2026, Khalif Cooper organized an entire Baltimore tech week in just 21 days.\n\nThe overwhelming response—754+ registrations across seven events—revealed intense community hunger for connection and led directly to the launch of Bmore Tech Week.",
    {
      x: 6.8,
      y: 3.25,
      w: 5.8,
      h: 2.4,
      fontSize: 15,
      fontFace: "Arial",
      color: C.white,
      margin: 0,
    },
  );
  s.addShape(pptx.shapes.RECTANGLE, {
    x: 6.8,
    y: 5.85,
    w: 1.1,
    h: 0.06,
    fill: { color: C.orange },
  });
  footer(s);
}

function packageSlide({ tag, tagBg, name, price, blurb, perks, cardFill, textColor = C.white, priceColor = C.white }) {
  const s = pptx.addSlide();
  s.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.navy } });
  eyebrow(s, "SPONSORSHIP PACKAGES");
  title(s, "Choose your sponsorship");
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.55,
    y: 1.7,
    w: 8.6,
    h: 4.8,
    fill: { color: cardFill },
    rectRadius: 0.16,
  });
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.85,
    y: 2.0,
    w: 1.9,
    h: 0.34,
    fill: { color: tagBg },
    rectRadius: 0.08,
  });
  s.addText(tag, {
    x: 0.85,
    y: 2.0,
    w: 1.9,
    h: 0.34,
    fontSize: 11,
    fontFace: "Arial",
    color: tagBg === C.orange ? C.navy : C.white,
    bold: true,
    align: "center",
    valign: "middle",
    margin: 0,
  });
  s.addText(name, {
    x: 0.85,
    y: 2.5,
    w: 7.8,
    h: 0.4,
    fontSize: 26,
    fontFace: "Arial",
    color: textColor,
    bold: true,
    margin: 0,
  });
  s.addText(price, {
    x: 0.85,
    y: 3.0,
    w: 7.8,
    h: 0.7,
    fontSize: 48,
    fontFace: "Arial",
    color: priceColor,
    bold: true,
    margin: 0,
  });
  s.addText(blurb, {
    x: 0.85,
    y: 3.7,
    w: 7.8,
    h: 0.4,
    fontSize: 14,
    fontFace: "Arial",
    color: textColor === C.white ? "E8EEF8" : "1A2332",
    margin: 0,
  });
  bullets(s, perks, {
    x: 0.85,
    y: 4.2,
    w: 7.8,
    h: 2.1,
    fontSize: 14,
    color: textColor,
  });
  footer(s);
}

// 6. Attendee Badge
packageSlide({
  tag: "ENTRY LEVEL",
  tagBg: C.orange,
  name: "Attendee Badge Sponsor",
  price: "$500",
  blurb: "Put your company in front of every attendee for the week.",
  perks: badgePerks,
  cardFill: C.card,
});

// 7. Community
packageSlide({
  tag: "MOST SPONSORS",
  tagBg: C.blue,
  name: "Community Sponsor",
  price: "$1,000",
  blurb: "Shared recognition across the summit and the week.",
  perks: communityPerks,
  cardFill: C.green,
});

// 8. Summit Day
packageSlide({
  tag: "FEATURED DAY",
  tagBg: "111111",
  name: "Summit Day Sponsor",
  price: "$2,500 per day",
  blurb: "Be the featured sponsor for one day of the Baltimore Build Summit.",
  perks: dayPerks,
  cardFill: C.orange,
  textColor: C.navy,
  priceColor: C.navy,
});

// 9. Compare table
{
  const s = pptx.addSlide();
  s.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.navy } });
  eyebrow(s, "SPONSOR PACKAGES");
  title(s, "Compare the three sponsor packages");

  const rows = [
    ["Benefit", "Attendee Badge\n$500", "Community\n$1,000", "Summit Day\n$2,500/day"],
    [
      "Logo & recognition",
      "Logo on badges\nLogo on sponsor page",
      "Logo on badges\nLogo on sponsor page\nShared summit signage\nEmail recognition",
      "Logo on badges\nLogo on sponsor page\nShared summit signage\nEmail recognition\nFeatured day logo",
    ],
    ["Speaking", "—", "—", "Opening remarks"],
    ["Exhibitor table", "—", "—", "Dedicated table"],
    ["Passes", "1 pass", "2 passes", "4 passes"],
  ];
  const fills = [C.blue, C.orange, C.green, C.greenDeep];
  const textColors = [C.white, C.navy, C.white, C.white];
  const colW = [2.6, 3.0, 3.3, 3.4];
  let x = 0.55;
  const y = 1.7;
  const rowH = [0.85, 1.85, 0.7, 0.7, 0.7];

  for (let r = 0; r < rows.length; r++) {
    let cx = x;
    let ry = y + rowH.slice(0, r).reduce((a, b) => a + b, 0);
    for (let c = 0; c < 4; c++) {
      const isHeader = r === 0;
      const fill = isHeader ? fills[c] : C.card;
      const color = isHeader ? textColors[c] : C.white;
      s.addShape(pptx.shapes.RECTANGLE, {
        x: cx,
        y: ry,
        w: colW[c],
        h: rowH[r],
        fill: { color: fill },
        line: { color: C.line, width: 1 },
      });
      s.addText(rows[r][c], {
        x: cx + 0.12,
        y: ry + 0.1,
        w: colW[c] - 0.24,
        h: rowH[r] - 0.16,
        fontSize: isHeader ? 13 : 12,
        fontFace: "Arial",
        color,
        bold: isHeader || c === 0,
        valign: "middle",
        margin: 0,
      });
      cx += colW[c];
    }
  }
  footer(s);
}

// 10. Current sponsors/partners
{
  const s = pptx.addSlide();
  s.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.navy } });
  eyebrow(s, "SPONSORS AND PARTNERS");
  title(s, "Sponsors and partners");
  const partners = [
    { name: "Just Ice Tea", fill: C.blue, color: C.white },
    { name: "Redbull", fill: C.orange, color: C.navy },
    { name: "Wexford Science & Technology", fill: C.greenDeep, color: C.white },
  ];
  partners.forEach((p, i) => {
    const x = 0.55 + i * 4.15;
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x,
      y: 2.1,
      w: 3.9,
      h: 3.5,
      fill: { color: p.fill },
      rectRadius: 0.16,
    });
    s.addText(p.name, {
      x: x + 0.25,
      y: 3.3,
      w: 3.4,
      h: 1.2,
      fontSize: 26,
      fontFace: "Arial",
      color: p.color,
      bold: true,
      align: "center",
      valign: "middle",
      margin: 0,
    });
  });
  footer(s);
}

// 11. Join us / CTA
{
  const s = pptx.addSlide();
  s.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.navy } });
  eyebrow(s, "JOIN US");
  title(s, "Help build the first Bmore Tech Week");

  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.55,
    y: 1.8,
    w: 5.9,
    h: 3.5,
    fill: { color: C.card },
    rectRadius: 0.14,
  });
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.85,
    y: 2.1,
    w: 2.4,
    h: 0.34,
    fill: { color: C.orange },
    rectRadius: 0.08,
  });
  s.addText("COMMUNITY SPONSORS", {
    x: 0.85,
    y: 2.1,
    w: 2.4,
    h: 0.34,
    fontSize: 11,
    fontFace: "Arial",
    color: C.navy,
    bold: true,
    align: "center",
    valign: "middle",
    margin: 0,
  });
  s.addText("Community Sponsor — $1,000", {
    x: 0.85,
    y: 2.6,
    w: 5.3,
    h: 0.4,
    fontSize: 20,
    fontFace: "Arial",
    color: C.white,
    bold: true,
    margin: 0,
  });
  bullets(s, communityPerks, { x: 0.85, y: 3.15, w: 5.3, h: 1.9, fontSize: 13, color: C.white });

  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.8,
    y: 1.8,
    w: 5.9,
    h: 3.5,
    fill: { color: C.blue },
    rectRadius: 0.14,
  });
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 7.1,
    y: 2.1,
    w: 2.5,
    h: 0.34,
    fill: { color: C.orange },
    rectRadius: 0.08,
  });
  s.addText("IN-KIND PARTNERSHIPS", {
    x: 7.1,
    y: 2.1,
    w: 2.5,
    h: 0.34,
    fontSize: 11,
    fontFace: "Arial",
    color: C.navy,
    bold: true,
    align: "center",
    valign: "middle",
    margin: 0,
  });
  s.addText("Provide Essential Services", {
    x: 7.1,
    y: 2.6,
    w: 5.3,
    h: 0.4,
    fontSize: 20,
    fontFace: "Arial",
    color: C.white,
    bold: true,
    margin: 0,
  });
  s.addText("We welcome organizations ready to power the week on the ground.", {
    x: 7.1,
    y: 3.1,
    w: 5.3,
    h: 0.4,
    fontSize: 13,
    fontFace: "Arial",
    color: C.white,
    margin: 0,
  });
  bullets(
    s,
    ["Kickoff space for Monday evening", "Coffee for attendees", "Signage, badge, and program printing"],
    { x: 7.1, y: 3.6, w: 5.3, h: 1.4, fontSize: 14, color: C.white },
  );

  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.55,
    y: 5.55,
    w: 12.2,
    h: 1.1,
    fill: { color: C.orange },
    rectRadius: 0.12,
  });
  s.addText("Partner with us for April 2027", {
    x: 0.85,
    y: 5.7,
    w: 8,
    h: 0.35,
    fontSize: 20,
    fontFace: "Arial",
    color: C.navy,
    bold: true,
    margin: 0,
  });
  s.addText("Let’s discuss how your organization can help lead Baltimore’s tech gathering.", {
    x: 0.85,
    y: 6.1,
    w: 8,
    h: 0.3,
    fontSize: 13,
    fontFace: "Arial",
    color: C.navy,
    margin: 0,
  });
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 9.5,
    y: 5.8,
    w: 2.8,
    h: 0.55,
    fill: { color: C.navy },
    rectRadius: 0.1,
  });
  s.addText("Book a call → calendar.app.google/C69vNmaccTAaAgbf7", {
    x: 9.2,
    y: 5.72,
    w: 3.3,
    h: 0.7,
    fontSize: 11,
    fontFace: "Arial",
    color: C.white,
    bold: true,
    align: "center",
    valign: "middle",
    margin: 0,
  });
}

const pptxPath = path.join(assets, "bmore-tech-week-2027-sponsorship-deck.pptx");
await pptx.writeFile({ fileName: pptxPath });
console.log("Wrote", pptxPath);
