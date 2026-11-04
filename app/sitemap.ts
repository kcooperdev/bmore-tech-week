import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const paths = [
  "",
  "/schedule",
  "/expo",
  "/around-baltimore",
  "/tickets",
  "/speak",
  "/partners",
  "/sponsors",
  "/host",
  "/ambassadors",
  "/get-involved",
  "/conduct",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date("2026-11-03"),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
