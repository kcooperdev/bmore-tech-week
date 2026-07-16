import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/data'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Baltimore Tech Week 2027',
    short_name: 'BTW 2027',
    description:
      'Baltimore Tech Week — April 27 to May 1, 2027. Where tech meets culture in Charm City.',
    start_url: '/',
    display: 'standalone',
    background_color: '#17171a',
    theme_color: '#17171a',
    lang: 'en-US',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
