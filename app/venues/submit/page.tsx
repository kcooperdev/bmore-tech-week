import type { Metadata } from 'next'
import { CTA, EVENT } from '@/lib/data'
import { PublicShell, PageIntro } from '@/components/public-shell'
import { ComingSoonNotice } from '@/components/coming-soon'
import { VenueForm } from '@/components/forms/venue-form'

const title = 'Host a night'
const description =
  'Got a room in Baltimore for the week of April 26? Tell us about it. We put talks in rooms after 6.'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.venueSubmitPath },
  openGraph: {
    title: `${title} | Baltimore Tech Week`,
    description,
    url: EVENT.venueSubmitPath,
  },
}

export default function SubmitVenuePage() {
  return (
    <PublicShell sticky={false}>
      <PageIntro
        eyebrow="Venues"
        title={CTA.submitVenue}
        body="Bar, office, gallery, studio. Tell us what you’ve got and which nights work. We’ll be in touch."
      />
      <div className="mx-auto max-w-3xl px-4 pb-20 md:px-8">
        {EVENT.submissionsOpen ? <VenueForm /> : <ComingSoonNotice />}
      </div>
    </PublicShell>
  )
}
