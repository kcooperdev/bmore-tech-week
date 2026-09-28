import type { Metadata } from 'next'
import Image from 'next/image'
import { EVENT } from '@/lib/data'
import { HarborTopbar } from '@/components/harbor-topbar'
import { OfferBoard, type Offer } from '@/components/offer-board'
import '../../styles.css'

const title = 'Sponsors'
const description =
  'Sponsor Baltimore Tech Week 2027. Five tiers, from $500 to a single presenting sponsorship. April 26–30 in Baltimore.'

const offers: Offer[] = [
  {
    id: 'supporting',
    name: 'Supporting Sponsor',
    price: '$500',
    spots: '8 spots',
    fit: 'Local agencies, small businesses, and service providers.',
    gets: [
      'Small logo on the site and the nightly slides',
      'One mention, on one night',
      'One social post',
      '2 VIP passes',
    ],
  },
  {
    id: 'community',
    name: 'Community Sponsor',
    price: '$1,000',
    spots: '5 spots',
    fit: 'Growing companies, consulting firms, and coworking spaces.',
    gets: [
      'Everything in Supporting',
      'A table on one night',
      'Medium logo on the site',
      '4 VIP passes',
      'Your own social post',
    ],
  },
  {
    id: 'innovation',
    name: 'Innovation Sponsor',
    price: '$2,500',
    spots: '3 spots',
    fit: 'Established startups and mid-size companies.',
    gets: [
      'Everything in Community',
      'A table on two nights',
      'A 2-minute welcome for one session',
      '6 VIP passes',
      'Your name on one nightly giveaway',
    ],
  },
  {
    id: 'ecosystem',
    name: 'Ecosystem Sponsor',
    price: '$5,000',
    spots: '2 spots',
    fit: 'Employers, universities, and regional companies.',
    gets: [
      'Everything in Innovation',
      'Your name on one full night',
      'Five minutes on that night',
      'A space all five nights',
      '8 VIP passes',
      'Opted-in leads from people who visit your space',
    ],
  },
  {
    id: 'presenting',
    name: 'Presenting Sponsor',
    price: '$10,000',
    spots: '1 spot',
    fit: 'Baltimore Tech Week 2027, presented by your company.',
    gets: [
      'The title, and the largest logo on the home page',
      'Ten minutes on opening night',
      '10 VIP passes',
      'The closing-night grand prize',
      'First look at presenting in 2028',
    ],
  },
]

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.sponsorsPath },
  openGraph: {
    title: `${title} | Baltimore Tech Week`,
    description,
    url: EVENT.sponsorsPath,
  },
}

export default function SponsorsPage() {
  return (
    <div className="bmore bmore-page">
      <HarborTopbar current="sponsors" />

      <section className="cfp-hero cfp-hero-offer" aria-label="Sponsors">
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
              <span>Sponsors</span>
            </h1>
          </div>
        </div>
      </section>

      <main className="cfp-main" id="main" tabIndex={-1}>
        <OfferBoard
          railLabel="Sponsor tiers"
          lead="Five caps. Each price includes the tier under it."
          sibling={{ href: EVENT.partnersPath, label: 'Partner with the week' }}
          offers={offers}
        />
      </main>
    </div>
  )
}
