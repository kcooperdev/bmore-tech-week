import type { Metadata } from 'next'
import { EVENT } from '@/lib/data'
import { pageSocial } from '@/lib/seo'
import { HarborTopbar } from '@/components/harbor-topbar'
import { HarborFooter } from '@/components/harbor-footer'
import { PageBanner } from '@/components/page-banner'
import { TicketChooser } from '@/components/ticket-chooser'
import '../../styles.css'

const title = 'Tickets and VIP passes'
const description = `General Admission is $15 a night or $40 for the week. Sponsor a seat for someone else at the same prices. VIP is $45 a night or $125 for the week. On sale ${EVENT.opensOn}.`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.ticketsPath },
  ...pageSocial({ title, description, path: EVENT.ticketsPath }),
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
