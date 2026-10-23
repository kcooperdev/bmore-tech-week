import type { Metadata } from 'next'
import { EVENT } from '@/lib/data'
import { SPONSOR_PITCH } from '@/lib/involve'
import { HarborTopbar } from '@/components/harbor-topbar'
import { HarborFooter } from '@/components/harbor-footer'
import { PageBanner } from '@/components/page-banner'
import { InvolveClose, InvolvePitch } from '@/components/involve-pitch'
import { OfferBoard, type Offer } from '@/components/offer-board'
import '../../styles.css'

const title = 'Sponsors'
const description =
  'Year one is when your name becomes part of the story. Sponsor Baltimore Tech Week. Five nights, April 26–30.'

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
      '2 Week passes',
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
      '4 Week passes',
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
      '6 Week passes',
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
      '8 Week passes',
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
      '10 Week passes',
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
      <PageBanner title="Sponsors" kicker="Get Involved" />

      <main id="main" tabIndex={-1}>
        <InvolvePitch copy={SPONSOR_PITCH} />
        <OfferBoard
          railLabel="Sponsor tiers"
          lead="Five ways to back the week. Each price includes the one under it."
          applyKind="sponsor"
          sibling={{ kind: 'partner', label: 'Partner' }}
          offers={offers}
        />
        <InvolveClose title="If you want a table at year one, let’s talk." kind="sponsor" cta={SPONSOR_PITCH.cta} />
      </main>

      <HarborFooter />
    </div>
  )
}
