import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/500.css";
import "@fontsource/figtree/600.css";
import "@fontsource/figtree/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import "./harbor.css";
import "./cyber.css";
import "./apply.css";
import { CookieNotice } from "@/components/CookieNotice";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";
import { homeDescription, hq, site } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#2f7fa8",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} ${site.year}`,
    template: `%s · ${site.name} ${site.year}`,
  },
  description: homeDescription,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} ${site.year}`,
    description: homeDescription,
    images: [{ url: "/images/harbor-sunset.jpg", alt: "Painted Baltimore harbor at sunset" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} ${site.year}`,
    description: homeDescription,
    images: ["/images/harbor-sunset.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/mark-icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/images/apple-touch.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${site.name} ${site.year}`,
  description: homeDescription,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  startDate: "2027-04-26",
  endDate: "2027-04-28",
  url: site.url,
  image: `${site.url}/images/harbor-sunset.jpg`,
  location: {
    "@type": "Place",
    name: `${hq.name} at ${hq.venue}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: hq.street,
      addressLocality: "Baltimore",
      addressRegion: "MD",
      postalCode: "21201",
      addressCountry: "US",
    },
  },
  organizer: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="bmore flex min-h-screen flex-col">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-foreground"
          >
            Skip to content
          </a>
          <Topbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <CookieNotice />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
