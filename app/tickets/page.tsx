import type { Metadata } from 'next'
import { EVENT } from '@/lib/data'
import { HarborTopbar } from '@/components/harbor-topbar'
import { HarborFooter } from '@/components/harbor-footer'
import { PageBanner } from '@/components/page-banner'
import { TicketChooser } from '@/components/ticket-chooser'
import '../../styles.css'

const title = 'Tickets and VIP passes'
const description = `General Admission is free. Upgrade to a $45 single-night VIP or the $125 5-night Week VIP. Priority line, drinks, front row, and swag. On sale ${EVENT.opensOn}.`

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
      <PageBanner title="Tickets and VIP passes" kicker={`On sale ${EVENT.opensOn}`} />

      <main id="main" tabIndex={-1}>
        <TicketChooser />
      </main>

      <HarborFooter />
    </div>
  )
}
