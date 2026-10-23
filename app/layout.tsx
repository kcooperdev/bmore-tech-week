import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Figtree } from 'next/font/google'
import { EVENT, SITE_URL } from '@/lib/data'
import { OG_IMAGE, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_TITLE } from '@/lib/seo'
import { JsonLd } from '@/components/json-ld'
import { SkipLink } from '@/components/skip-link'
import './globals.css'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Baltimore Tech Week',
  },
  description: SITE_DESCRIPTION,
  applicationName: EVENT.name,
  authors: [{ name: EVENT.name, url: SITE_URL }],
  creator: EVENT.name,
  publisher: EVENT.name,
  category: 'technology',
  keywords: SITE_KEYWORDS,
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: EVENT.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  other: {
    'event:start_time': `${EVENT.startDate}T17:30:00-04:00`,
    'event:end_time': `${EVENT.endDate}T22:00:00-04:00`,
    'geo.region': 'US-MD',
    'geo.placename': 'Baltimore',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2b03a' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1208' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} bg-background`}
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <SkipLink />
        <JsonLd />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
