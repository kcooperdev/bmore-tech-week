import { EVENT, SITE_URL } from '@/lib/data'

export const SITE_TITLE = `${EVENT.name} ${EVENT.year}`

export const SITE_DESCRIPTION =
  'Baltimore’s first official tech conference week. Five nights, five industries, 5:30 to 10PM across the city. April 26 to 30, 2027. Tickets and applications open Nov 1st, 2026.'

export const SITE_KEYWORDS = [
  'Baltimore Tech Week',
  'Baltimore Tech Week 2027',
  'Baltimore tech conference',
  'Baltimore night conference',
  'Baltimore startup week',
  'MedTech Baltimore',
  'Hardware and Makerspace Baltimore',
  'Baltimore Tech Week tickets',
  'speak at Baltimore Tech Week',
  'Baltimore MD events April 2027',
]

export const OG_IMAGE = {
  url: '/images/btw-sunset-og.png',
  width: 1200,
  height: 630,
  alt: 'Baltimore skyline at sunset for Baltimore Tech Week',
} as const

export const BRAND_ICON = '/icon.png'
export const BRAND_IMAGE = '/images/btw-sunset.png'

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function pageSocial({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  const ogTitle = title.includes('Baltimore Tech Week') ? title : `${title} | Baltimore Tech Week`
  return {
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: ogTitle,
      description,
      images: [OG_IMAGE.url],
    },
  }
}
