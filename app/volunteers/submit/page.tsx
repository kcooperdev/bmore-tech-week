import type { Metadata } from 'next'
import { CTA, EVENT } from '@/lib/data'
import { HarborTopbar } from '@/components/harbor-topbar'
import { HarborFooter } from '@/components/harbor-footer'
import { PageBanner } from '@/components/page-banner'
import { VolunteerForm } from '@/components/forms/volunteer-form'
import '../../../styles.css'

const title = 'Volunteer'
const description =
  'Crew a night of Baltimore Tech Week. Check-in, set up, or breakdown. April 26–30, after 5:30 PM.'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.volunteerSubmitPath },
  openGraph: {
    title: `${title} | Baltimore Tech Week`,
    description,
    url: EVENT.volunteerSubmitPath,
  },
}

export default async function SubmitVolunteerPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>
}) {
  const { demo } = await searchParams
  const isDemo = demo === '1'
  return (
    <div className="bmore bmore-page">
      <HarborTopbar current="volunteers" />
      <PageBanner title={CTA.submitVolunteer} kicker="Crew the week" />

      <main className="cfp-main" id="main" tabIndex={-1}>
        <section className="cfp-section">
          <p className="cfp-kicker">Sign up to volunteer</p>
          <h2 className="cfp-h2">Help run a room</h2>
          <p className="cfp-copy">
            Check-in, set up, or breakdown. Pick your role and the nights you can work (April 26–30). Volunteers get
            full access to the sessions they crew.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <VolunteerForm demo={isDemo} />
          </div>
        </section>
      </main>

      <HarborFooter />
    </div>
  )
}
