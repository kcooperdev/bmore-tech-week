import type { Metadata } from 'next'
import { EVENT } from '@/lib/data'
import { PARTNER_PITCH } from '@/lib/involve'
import { HarborTopbar } from '@/components/harbor-topbar'
import { HarborFooter } from '@/components/harbor-footer'
import { PageBanner } from '@/components/page-banner'
import { InvolveClose, InvolvePitch } from '@/components/involve-pitch'
import { OfferBoard, type Offer } from '@/components/offer-board'
import '../../styles.css'

const title = 'Community Partners'
const description =
  'Your people already trust you. Partner with Baltimore Tech Week. Free for the groups that already gather the city. April 26–30.'

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
      <PageBanner title="Community Partners" kicker="Get Involved" />

      <main id="main" tabIndex={-1}>
        <InvolvePitch copy={PARTNER_PITCH} />
        <OfferBoard
          railLabel="Community partner"
          lead="Free, if you already bring people together in Baltimore."
          applyKind="partner"
          sibling={{ kind: 'sponsor', label: 'Sponsor' }}
          offers={offers}
        />
        <InvolveClose title="If you already gather people, we would like to work with you." kind="partner" cta={PARTNER_PITCH.cta} />
      </main>

      <HarborFooter />
    </div>
  )
}
