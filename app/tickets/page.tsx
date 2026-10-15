import type { Metadata } from 'next'
import Image from 'next/image'
import { EVENT } from '@/lib/data'
import { HarborTopbar } from '@/components/harbor-topbar'
import { TicketChooser } from '@/components/ticket-chooser'
import '../../styles.css'

const title = 'Tickets'
const description = `General Admission is $0. The Week Pass is $75 for April 26–30, with drink vouchers you redeem at a participating restaurant. Only 25 for the week. On sale ${EVENT.opensOn}.`

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
        <TicketChooser />
      </main>
    </div>
  )
}
