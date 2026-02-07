import { TechEvent } from "./types";

export const COLORS = {
  onyx: "#0A0A0A",        // primary background
  black: "#0A0A0A",
  amberFlame: "#FFB404",   // primary accent
  gold: "#FFB404",
  royalBlue: "#0050FF",    // secondary accent
  silver: "#B5B6B8",       // tertiary / muted text
  white: "#FBFBFB",        // text / light backgrounds
};

export const EVENTS: TechEvent[] = [
  {
    id: "7",
    date: "February 23",
    time: "6:30pm–8:30pm",
    location: "The Harbor Bank of Maryland",
    title: "Baltimore Tech Week Presents: Tech at the Harbor",
    category: "NETWORKING",
    description:
      "The official kickoff event for Baltimore Tech Week, bringing together the city's tech community to celebrate the start of an exciting week of innovation and connection.",
    link: "https://luma.com/g74prkcu",
  },
  {
    id: "1",
    date: "February 24",
    time: "6:00pm–8:30pm",
    location: "Unity Bar and Restaurant",
    title: "BLK Tech Connect: Bots & Bourbon",
    category: "NETWORKING",
    description:
      "A social-tech mixer bringing together Black technologists, founders, and creatives. Expect AI conversations, networking, and a smooth bourbon vibe.",
    link: "https://luma.com/xm5xmhma",
  },
  {
    id: "2",
    date: "February 25",
    time: "6:30pm–8:30pm",
    location: "Nola Seafood",
    title: "Palava Night #2: Grassroot to Groundbreaker",
    category: "FIRESIDE CHAT",
    description:
      "A fireside-style gathering exploring how grassroots builders become ecosystem leaders.",
    link: "https://luma.com/fhaiqk41",
  },
  {
    id: "3",
    date: "February 26",
    time: "5:30pm–7pm",
    location: "Spark Coworking - Baltimore",
    title: "Built With Charm (Hosted by Baltimore Tech)",
    category: "SIGNATURE MEETUP",
    isHostedByUs: true,
    description:
      "Built With Charm is a signature meetup run by Baltimore Tech, bringing together founders, builders, and creatives shaping the city's innovation culture.",
    link: "https://luma.com/ueap4iyk",
  },
  {
    id: "4",
    date: "February 27",
    time: "10:00am–5:30pm",
    location: "Rita Rossi Colwell Center",
    title: "CIAA Tech Summit",
    category: "CONFERENCE",
    description:
      "A major anchor event during CIAA Week featuring panels, workshops, and networking with HBCU talent and tech leaders.",
    link: "https://baltimore.org/event/ciaa-tech-summit/",
  },
];
