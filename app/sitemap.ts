import type { MetadataRoute } from 'next'
import { EVENT, SITE_URL } from '@/lib/data'
import { listPublishedEvents } from '@/lib/store'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await listPublishedEvents()

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}${EVENT.eventsPath}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}${EVENT.venueSubmitPath}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}${EVENT.weekPath}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}${EVENT.speakersPath}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}${EVENT.volunteerSubmitPath}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...events.map((event) => ({
      url: `${SITE_URL}/events/${event.slug}`,
      lastModified: new Date(event.publishedAt || event.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]
}
