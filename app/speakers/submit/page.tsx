import type { Metadata } from 'next'
import { CTA, EVENT } from '@/lib/data'
import { PublicShell, PageIntro } from '@/components/public-shell'
import { ComingSoonNotice } from '@/components/coming-soon'
import { SpeakerForm } from '@/components/forms/speaker-form'

const title = 'Give a talk'
const description =
  'Got something worth saying in a Baltimore room? Send it. April 26–30, after 6.'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.speakerSubmitPath },
  openGraph: {
    title: `${title} | Baltimore Tech Week`,
    description,
    url: EVENT.speakerSubmitPath,
  },
}

export default function SubmitTalkPage() {
  return (
    <PublicShell sticky={false}>
      <PageIntro
        eyebrow="Talks"
        title={CTA.submitTalk}
        body="What you’d say, who it’s for, and where you’d rather be. We’ll find a room that fits."
      />
      <div className="mx-auto max-w-3xl px-4 pb-20 md:px-8">
        {EVENT.submissionsOpen ? <SpeakerForm /> : <ComingSoonNotice />}
      </div>
    </PublicShell>
  )
}
