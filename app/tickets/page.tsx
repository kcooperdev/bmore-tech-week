import type { Metadata } from 'next'
import Image from 'next/image'
import { EVENT } from '@/lib/data'
import { HarborTopbar } from '@/components/harbor-topbar'
import { OfferBoard, type Offer } from '@/components/offer-board'
import '../../styles.css'

const title = 'Tickets'
const description = `Baltimore Tech Week 2027 passes go on sale ${EVENT.opensOn}. Community is free. Support is $25. VIP is $99, capped at 50.`

const offers: Offer[] = [
  {
    id: 'community',
    name: 'Community Pass',
    price: 'Free',
    spots: 'Open',
    fit: 'The rooms, the showcases, and the drawings. No purchase required to enter.',
    gets: [
      'Open sessions, panels, and workshops',
      'Networking and startup showcases',
      'Nightly giveaways',
      'A sticker',
    ],
  },
  {
    id: 'support',
    name: 'Support Pass',
    price: '$25',
    spots: '150 spots',
    fit: 'The free pass, with a seat held and a note before everyone else.',
    gets: ['Everything in Community', 'A lanyard', 'Reserved seating', 'News before the public list'],
  },
  {
    id: 'vip',
    name: 'VIP Pass',
    price: '$99',
    spots: '50 spots',
    fit: 'Front of the room, and one reception with the speakers.',
    gets: ['Everything in Support', 'Front-row seating', 'A swag bag', 'One VIP reception'],
  },
]

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.ticketsPath },
  openGraph: {
    title: `${title} | Baltimore Tech Week`,
    description,
    url: EVENT.ticketsPath,
  },
}

export default function TicketsPage() {
  return (
    <div className="bmore bmore-page">
      <HarborTopbar current="tickets" />

      <section className="cfp-hero cfp-hero-offer" aria-label="Tickets">
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
            <p className="night-kicker">On sale {EVENT.opensOn}</p>
            <h1>
              <span>Tickets</span>
            </h1>
          </div>
        </div>
      </section>

      <main className="cfp-main" id="main" tabIndex={-1}>
        <OfferBoard
          railLabel="Ticket passes"
          lead={`Three passes. They open together on ${EVENT.opensOn}.`}
          offers={offers}
          close={{
            title: `On sale ${EVENT.opensOn}`,
            body: 'Want a note that morning about the {name}? Leave it with us.',
            label: 'Remind me',
            remind: true,
          }}
        />
      </main>
    </div>
  )
}
