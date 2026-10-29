import { EVENT, SITE_URL } from '@/lib/data'
import { absoluteUrl, OG_IMAGE, SITE_DESCRIPTION } from '@/lib/seo'

export function JsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: EVENT.name,
    url: SITE_URL,
    logo: absoluteUrl('/icon.png'),
    image: absoluteUrl(OG_IMAGE.url),
    email: EVENT.contactEmail,
    description: SITE_DESCRIPTION,
    areaServed: {
      '@type': 'City',
      name: 'Baltimore',
      containedInPlace: {
        '@type': 'State',
        name: 'Maryland',
      },
    },
    sameAs: [EVENT.instagramUrl, EVENT.linkedinUrl],
    contactPoint: {
      '@type': 'ContactPoint',
      email: EVENT.contactEmail,
      contactType: 'customer support',
    },
  }

  const event = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${EVENT.name} ${EVENT.year}`,
    description: SITE_DESCRIPTION,
    startDate: `${EVENT.startDate}T17:30:00-04:00`,
    endDate: `${EVENT.endDate}T22:00:00-04:00`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: false,
    image: [absoluteUrl(OG_IMAGE.url), absoluteUrl('/images/btw-sunset.png')],
    url: SITE_URL,
    organizer: {
      '@type': 'Organization',
      name: EVENT.name,
      url: SITE_URL,
      email: EVENT.contactEmail,
    },
    location: {
      '@type': 'Place',
      name: EVENT.city,
      address: {
        '@type': 'PostalAddress',
        addressLocality: EVENT.locationName,
        addressRegion: EVENT.region,
        addressCountry: EVENT.country,
      },
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'General Admission week pass',
        price: '40',
        priceCurrency: 'USD',
        url: absoluteUrl(EVENT.ticketsPath),
        availability: 'https://schema.org/PreOrder',
        validFrom: `${EVENT.opensOnIso}T00:00:00-04:00`,
      },
      {
        '@type': 'Offer',
        name: 'Sponsor a week',
        price: '40',
        priceCurrency: 'USD',
        url: absoluteUrl(EVENT.ticketsPath),
        availability: 'https://schema.org/PreOrder',
        validFrom: `${EVENT.opensOnIso}T00:00:00-04:00`,
      },
      {
        '@type': 'Offer',
        name: 'Week VIP pass',
        price: '125',
        priceCurrency: 'USD',
        url: absoluteUrl(EVENT.ticketsPath),
        availability: 'https://schema.org/PreOrder',
        validFrom: `${EVENT.opensOnIso}T00:00:00-04:00`,
      },
    ],
    keywords: [
      'Baltimore Tech Week',
      'Baltimore tech conference',
      'Baltimore tech events',
      'night conference',
    ],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: EVENT.name,
    url: SITE_URL,
    description: EVENT.tagline,
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      name: EVENT.name,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/icon.png'),
      },
    },
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
