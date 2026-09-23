import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Space_Grotesk } from 'next/font/google'
import { EVENT, SITE_URL } from '@/lib/data'
import { SkipLink } from '@/components/skip-link'
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

const title = 'Baltimore Tech Week'
const description = 'Baltimore Tech Week Night Edition. April 26–30, 2027. Nights, 5:30–10pm.'

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
    'Baltimore Tech Week Night Edition',
    'Baltimore Tech Week 2027',
    'Baltimore technology events',
    'Charm City tech',
    'Baltimore startup week',
    'submit a venue Baltimore',
    'submit a talk Baltimore',
    'Baltimore Tech Week call for speakers',
    'speak at Baltimore Tech Week',
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
        url: '/images/harbor-sunset.png',
        width: 1376,
        height: 768,
        alt: 'Painted Baltimore harbor at sunset for Tech Week Night Edition',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/harbor-sunset.png'],
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
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  other: {
    'event:start_time': EVENT.startDate,
    'event:end_time': EVENT.endDate,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2f7fa8' },
    { media: '(prefers-color-scheme: dark)', color: '#070b16' },
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
      className={`${anton.variable} ${spaceGrotesk.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <SkipLink />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
