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
      'Baltimore Tech Week is five nights and five industries of conference programming across Baltimore. April 26–30.',
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
      'Baltimore Tech Week, April 26 to 30. Five nights, five industries, across the city.',
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
      'Baltimore tech conference',
      'Baltimore tech events',
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
