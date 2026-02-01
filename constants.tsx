import { TechEvent } from "./types";

export const COLORS = {
  black: "#000000",
  gold: "#FFB400",
  white: "#FFFFFF",
  royalBlue: "#0050FF",
};

export const EVENTS: TechEvent[] = [
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
    time: "6:00pm–8:30pm",
    location: "Nola Seafood",
    title: "Palava Night #2: Grassroots to Groundbreakers",
    category: "FIRESIDE CHAT",
    description:
      "A fireside-style gathering exploring how grassroots builders become ecosystem leaders.",
    link: "https://lu.ma/4m9u2z4n",
  },
  {
    id: "5",
    date: "February 25",
    time: "6:00pm–8:00pm",
    location: "Union Craft Brewing",
    title: "Baltimore Climate Tech Meetup",
    category: "NETWORKING",
    description:
      "Baltimore's climate tech community gets together every month. Founders, funders, engineers, career transitioners, and the climate curious all hang out. No agenda. No presentations. Just good people, good drinks, and real conversations about building a climate positive future.",
    link: "https://luma.com/u95k4bjl",
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
