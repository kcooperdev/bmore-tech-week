import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/data'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Baltimore Tech Week Night Edition',
    short_name: 'BTW Night',
    description:
      'Five nights of talks across Baltimore, April 26–30, 6PM–10PM.',
    start_url: '/',
    display: 'standalone',
    background_color: '#080512',
    theme_color: '#241773',
    lang: 'en-US',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
