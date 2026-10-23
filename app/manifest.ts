import type { MetadataRoute } from 'next'
import { EVENT } from '@/lib/data'
import { SITE_DESCRIPTION } from '@/lib/seo'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${EVENT.name} ${EVENT.year}`,
    short_name: 'BTW 2027',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1208',
    theme_color: '#f2b03a',
    lang: 'en-US',
    categories: ['business', 'education', 'entertainment'],
    icons: [
      {
        src: '/favicon-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
