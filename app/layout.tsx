import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Space_Grotesk } from 'next/font/google'
import { EVENT, SITE_URL } from '@/lib/data'
import './globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const title = 'Baltimore Tech Week 2027 | April 27–May 1 | Charm City'
const description =
  'Baltimore Tech Week is Charm City’s week of technology, creativity, and community — April 27 to May 1, 2027. Talks, workshops, murals, and mixers across Baltimore, MD. RSVP for the free launch info session.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: '%s | Baltimore Tech Week',
  },
  description,
  applicationName: 'Baltimore Tech Week',
  authors: [{ name: 'Baltimore Tech Week' }],
  creator: 'Baltimore Tech Week',
  publisher: 'Baltimore Tech Week',
  category: 'technology',
  keywords: [
    'Baltimore Tech Week',
    'Baltimore Tech Week 2027',
    'Baltimore technology events',
    'Charm City tech',
    'Baltimore startup week',
    'Baltimore tech conference',
    'Baltimore murals tech',
    'Station North',
    'tech meets culture',
    'Baltimore MD events April 2027',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Baltimore Tech Week',
    title,
    description,
    images: [
      {
        url: '/images/hero-mural.png',
        width: 1200,
        height: 630,
        alt: 'Baltimore Tech Week mural — tech meets culture in Charm City',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/hero-mural.png'],
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
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  other: {
    'event:start_time': EVENT.startDate,
    'event:end_time': EVENT.endDate,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#17171a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${spaceGrotesk.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
