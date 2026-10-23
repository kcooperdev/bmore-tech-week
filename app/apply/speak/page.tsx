import type { Metadata } from 'next'
import { EVENT, isApplyOpenNow } from '@/lib/data'
import { ApplyClosed, ApplyShell } from '@/components/apply/apply-shell'
import { SpeakForm } from '@/components/apply/speak-form'

export const metadata: Metadata = {
  title: 'Give a Talk',
  description: `Submit a workshop, panel, or tech talk for Baltimore Tech Week. Deadline ${EVENT.speakerDeadline}.`,
  alternates: { canonical: '/apply/speak' },
}

export default async function SpeakApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ format?: string; demo?: string }>
}) {
  const { format, demo } = await searchParams
  const isDemo = demo === '1'

  return (
    <ApplyShell
      kicker={
        isApplyOpenNow()
          ? `Deadline ${EVENT.speakerDeadline} · Decisions ${EVENT.speakerDecision}`
          : `Opens ${EVENT.opensOn} · Deadline ${EVENT.speakerDeadline}`
      }
      title="Give a Talk"
      lead="Tell us what you want to share: a workshop, a panel, or a short tech talk. First-time speakers are welcome. Five nights, 5:30 to 10PM."
      demo={isDemo}
    >
      {isApplyOpenNow() || isDemo ? <SpeakForm initialFormat={format || ''} demo={isDemo} /> : <ApplyClosed />}
    </ApplyShell>
  )
}
