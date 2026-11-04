import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./harbor.css";
import "./cyber.css";
import "./apply.css";
import { CookieNotice } from "@/components/CookieNotice";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";
import { homeDescription, hq, site } from "@/lib/site";

const figtree = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const viewport: Viewport = {
  themeColor: "#2f7fa8",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Baltimore Tech Week 2027",
    template: "%s · Baltimore Tech Week 2027",
  },
  description: homeDescription,
  applicationName: "Baltimore Tech Week",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: "Baltimore Tech Week",
    title: "Baltimore Tech Week 2027",
    description: homeDescription,
    images: [{ url: "/images/harbor-sunset.jpg", alt: "Painted Baltimore harbor at sunset" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baltimore Tech Week 2027",
    description: homeDescription,
    images: ["/images/harbor-sunset.jpg"],
  },
  icons: {
    icon: "/images/mark-icon.png",
    apple: "/images/apple-touch.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Baltimore Tech Week 2027",
  description: homeDescription,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  startDate: "2027-04-28",
  endDate: "2027-04-30",
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
    name: "Baltimore Tech Week",
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
    <html lang="en" className={`${figtree.variable} ${mono.variable}`}>
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
