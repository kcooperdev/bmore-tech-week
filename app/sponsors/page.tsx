import type { Metadata } from 'next'
import { EVENT } from '@/lib/data'
import { pageSocial } from '@/lib/seo'
import { SPONSOR_PITCH } from '@/lib/involve'
import { HarborTopbar } from '@/components/harbor-topbar'
import { HarborFooter } from '@/components/harbor-footer'
import { PageBanner } from '@/components/page-banner'
import Link from 'next/link'
import { InvolveClose, InvolvePitch } from '@/components/involve-pitch'
import { OfferBoard, type Offer } from '@/components/offer-board'
import '../../styles.css'

const title = 'Sponsors'
const description =
  'Sponsor Baltimore Tech Week, or take a table in the room. Tables are included from $1,000, or $500 on their own. Five nights, April 26 to 30.'

const offers: Offer[] = [
  {
    id: 'supporting',
    name: 'Supporting Sponsor',
    price: '$500',
    spots: '8 spots',
    fit: 'Logo and a mention. No table. Add a night table for $500 if you want the floor.',
    gets: [
      'Small logo on the site and the nightly slides',
      'One mention, on one night',
      'One social post',
      '2 general admission week passes',
      'No table included',
    ],
  },
  {
    id: 'community',
    name: 'Community Sponsor',
    price: '$1,000',
    spots: '5 spots',
    fit: 'The first tier that includes a table. Growing companies, consulting firms, and coworking spaces.',
    gets: [
      'Everything in Supporting',
      'A table on one night',
      'Medium logo on the site',
      '2 VIP week passes ($125 each) instead of general admission',
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
      '2 VIP week passes ($125 each)',
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
      '4 VIP week passes ($125 each)',
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
      'A space all five nights',
      'Ten minutes on opening night',
      '4 VIP week passes ($125 each)',
      'The closing-night grand prize',
      'First look at presenting in 2028',
    ],
  },
]

const tables: Offer[] = [
  {
    id: 'table-night',
    name: 'Night table',
    price: '$500',
    spots: '8 tables a night',
    fit: 'Floor space only. You are in the room. You are not listed as a sponsor.',
    gets: [
      'One 6-foot table and two chairs',
      'Pick one night that matches what you sell',
      '2 staff passes for that night',
      'No logo on the homepage',
      'No mention from the stage',
    ],
  },
  {
    id: 'table-two',
    name: 'Two-night table',
    price: '$900',
    spots: '8 tables a night',
    fit: 'Same setup, two nights. Good if you want MedTech and Founders, or AI and Creative Tech.',
    gets: [
      'Everything in Night table',
      'A table on two nights you choose',
      '2 staff passes on each of those nights',
    ],
  },
  {
    id: 'table-week',
    name: 'Week table',
    price: '$2,000',
    spots: 'Limited',
    fit: 'You follow the city. One table, five nights. You reset with the week.',
    gets: [
      'A table all five nights',
      '2 VIP week passes ($125 each)',
      'Still a table, not a sponsorship',
    ],
  },
]

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.sponsorsPath },
  ...pageSocial({ title, description, path: EVENT.sponsorsPath }),
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
          lead="Five ways to back the week. Each price includes the one under it. A table is included from $1,000."
          applyKind="sponsor"
          sibling={{ kind: 'partner', label: 'Partner' }}
          offers={offers}
        />
        <OfferBoard
          railLabel="Tables"
          title="Or just take a table"
          lead="A table is not a sponsorship. Eight tables a night. Sponsors pick first. Leftover tables go to companies who only want the floor."
          applyKind="sponsor"
          offers={tables}
        />
        <section className="ed-cream-section">
          <div className="ed-container">
            <p className="ed-eyebrow">The case for the city</p>
            <h2 className="ed-manifesto-title">
              Why Baltimore, and what your support actually <span className="ed-highlight">pays for</span>
            </h2>
            <p className="ed-manifesto-sub">
              The longer pitch lives on Why Baltimore: culture, talent, the year-one budget, and how we will report
              results. Tiers and deliverables stay on this page.
            </p>
            <div className="ed-manifesto-cta">
              <Link href={EVENT.whyPath} className="ed-pill-btn">
                Read Why Baltimore
              </Link>
            </div>
          </div>
        </section>
        <InvolveClose title="If you want a table at year one, let’s talk." kind="sponsor" cta={SPONSOR_PITCH.cta} />
      </main>

      <HarborFooter />
    </div>
  )
}
