import { EVENT, SITE_URL } from '@/lib/data'

export function JsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: EVENT.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description:
      'Baltimore Tech Week is a community-led celebration of technology, creativity, and culture across Charm City.',
    areaServed: {
      '@type': 'City',
      name: 'Baltimore',
      containedInPlace: {
        '@type': 'State',
        name: 'Maryland',
      },
    },
    sameAs: [EVENT.instagramUrl, EVENT.linkedinUrl, EVENT.infoSessionUrl],
  }

  const event = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${EVENT.name} ${EVENT.year}`,
    description:
      'A five day celebration of technology, creativity, and community across Baltimore, Maryland where tech meets culture.',
    startDate: EVENT.startDate,
    endDate: EVENT.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: [`${SITE_URL}/images/hero-mural.png`],
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
    offers: {
      '@type': 'Offer',
      url: EVENT.infoSessionUrl,
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().slice(0, 10),
      name: 'Baltimore Tech Week Launch Party / Info Session',
    },
    keywords: [
      'Baltimore Tech Week',
      'Baltimore tech events',
      'Charm City',
      'technology',
      'community',
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
