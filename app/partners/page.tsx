import type { Metadata } from 'next'
import Image from 'next/image'
import { EVENT } from '@/lib/data'
import { HarborTopbar } from '@/components/harbor-topbar'
import { OfferBoard, type Offer } from '@/components/offer-board'
import '../../styles.css'

const title = 'Community Partners'
const description =
  'Partner with Baltimore Tech Week 2027. Free for universities, meetups, nonprofits, and the groups that already gather the city. April 26–30.'

const offers: Offer[] = [
  {
    id: 'community',
    name: 'Community Partner',
    price: 'Free',
    spots: 'Open',
    fit: 'Universities, meetups, nonprofits, workforce groups, startup communities, and accelerators.',
    gets: [
      'Logo and a listing on this page',
      'Your name when the week opens and closes',
      'A thank-you with the other community partners',
      'A link that counts the people you send',
    ],
    shares: [
      'Share the week at least once',
      'Include it in your newsletter, if you send one',
      'Point your people here',
    ],
  },
]

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.partnersPath },
  openGraph: {
    title: `${title} | Baltimore Tech Week`,
    description,
    url: EVENT.partnersPath,
  },
}

export default function PartnersPage() {
  return (
    <div className="bmore bmore-page">
      <HarborTopbar current="partners" />

      <section className="cfp-hero cfp-hero-offer" aria-label="Community partners">
        <Image
          className="cfp-hero-plate"
          src="/images/harbor-night.png"
          alt=""
          fill
          sizes="100vw"
          priority
          quality={78}
        />
        <div className="cfp-hero-veil" />
        <div className="cfp-hero-copy">
          <div className="night-title">
            <h1>
              <span>Community</span>
              <span>Partners</span>
            </h1>
          </div>
        </div>
      </section>

      <main className="cfp-main" id="main" tabIndex={-1}>
        <OfferBoard
          railLabel="Community partner"
          lead="Free, if you already gather people in Baltimore."
          sibling={{ href: EVENT.sponsorsPath, label: 'Sponsor the week' }}
          offers={offers}
        />
      </main>
    </div>
  )
}
