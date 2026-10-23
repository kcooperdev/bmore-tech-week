import type { Metadata } from 'next'
import { EVENT, isApplyOpenNow } from '@/lib/data'
import { ApplyClosed, ApplyShell } from '@/components/apply/apply-shell'
import { AmbassadorForm } from '@/components/apply/ambassador-form'

export const metadata: Metadata = {
  title: 'Ambassador',
  description: 'Get the word out for Baltimore Tech Week. Tell your campus, meetup, workplace, or feed.',
  alternates: { canonical: '/apply/ambassador' },
}

export default async function AmbassadorApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>
}) {
  const { demo } = await searchParams
  const isDemo = demo === '1'

  return (
    <ApplyShell
      kicker={isApplyOpenNow() ? 'Get the word out' : `Opens ${EVENT.opensOn} · Get the word out`}
      title="Be an ambassador"
      lead="Tell the people you already know about the five nights. Campus, group chat, workplace, the feed. No booth. No quota."
      demo={isDemo}
    >
      {isApplyOpenNow() || isDemo ? <AmbassadorForm demo={isDemo} /> : <ApplyClosed />}
    </ApplyShell>
  )
}
