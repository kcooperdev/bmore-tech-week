import type { Metadata } from 'next'
import { EVENT } from '@/lib/data'
import { SPEAK_PITCH } from '@/lib/involve'
import { HarborTopbar } from '@/components/harbor-topbar'
import { HarborFooter } from '@/components/harbor-footer'
import { PageBanner } from '@/components/page-banner'
import { InvolveClose, InvolvePitch } from '@/components/involve-pitch'
import { SpeakersApply } from '@/components/speakers-apply'
import '../../styles.css'

const title = 'Give a Talk'
const description =
  'Apply to speak at Baltimore Tech Week. Workshops, panels, and tech talks from people who do the work here. April 26 to 30, 2027.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.speakersPath },
  openGraph: {
    title: `${title} | Baltimore Tech Week`,
    description,
    url: EVENT.speakersPath,
  },
}

export default function SpeakersPage() {
  return (
    <div className="bmore bmore-page">
      <HarborTopbar current="speakers" />
      <PageBanner title="Give a Talk" kicker="Get Involved" />

      <main id="main" tabIndex={-1}>
        <InvolvePitch copy={SPEAK_PITCH} />
        <SpeakersApply />
        <InvolveClose title="If you have a session in mind, send it." kind="speak" cta={SPEAK_PITCH.cta} />
      </main>

      <HarborFooter />
    </div>
  )
}
