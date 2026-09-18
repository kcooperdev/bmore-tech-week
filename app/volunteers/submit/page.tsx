import type { Metadata } from 'next'
import { CTA, EVENT } from '@/lib/data'
import { PublicShell, PageIntro } from '@/components/public-shell'
import { ComingSoonNotice } from '@/components/coming-soon'
import { VolunteerForm } from '@/components/forms/volunteer-form'

const title = 'Volunteer'
const description =
  'Crew a night of Baltimore Tech Week. Check-in, set up, or breakdown. April 26–30, after 6.'

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

export default function SubmitVolunteerPage() {
  return (
    <PublicShell sticky={false}>
      <PageIntro
        eyebrow="Crew"
        title={CTA.submitVolunteer}
        body="Check-in, set up, breakdown. Pick a role and a night. We’ll place you when the rooms lock."
      />
      <div className="mx-auto max-w-3xl px-4 pb-20 md:px-8">
        {EVENT.submissionsOpen ? <VolunteerForm /> : <ComingSoonNotice />}
      </div>
    </PublicShell>
  )
}
