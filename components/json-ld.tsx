import { EVENT, SITE_URL } from '@/lib/data'

export function JsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: EVENT.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    email: EVENT.contactEmail,
    description:
      'Baltimore Tech Week is five nights of talks, rooms, and people across Charm City.',
    areaServed: {
      '@type': 'City',
      name: 'Baltimore',
      containedInPlace: {
        '@type': 'State',
        name: 'Maryland',
      },
    },
    sameAs: [EVENT.instagramUrl, EVENT.linkedinUrl],
  }

  const event = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${EVENT.name} ${EVENT.edition} ${EVENT.year}`,
    description:
      'Five nights of tech talks and gatherings across Baltimore, April 26 to 30, 6PM to 10PM.',
    startDate: EVENT.startDate,
    endDate: EVENT.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: [`${SITE_URL}/images/hero-inner-harbor.jpg`],
    url: SITE_URL,
    organizer: {
      '@type': 'Organization',
      name: EVENT.name,
      url: SITE_URL,
    },
    location: {
      '@type': 'Place',
      name: 'Baltimore',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Baltimore',
        addressRegion: 'MD',
        addressCountry: 'US',
      },
    },
    keywords: [
      'Baltimore Tech Week',
      'Night Edition',
      'Baltimore tech events',
      'Charm City',
      'venues',
      'speakers',
    ],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: EVENT.name,
    url: SITE_URL,
    description: EVENT.tagline,
    publisher: {
      '@type': 'Organization',
      name: EVENT.name,
    },
    inLanguage: 'en-US',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(event) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
