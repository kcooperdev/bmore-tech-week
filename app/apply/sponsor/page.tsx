import type { Metadata } from 'next'
import { EVENT, isApplyOpenNow } from '@/lib/data'
import { ApplyClosed, ApplyShell } from '@/components/apply/apply-shell'
import { SponsorForm } from '@/components/apply/sponsor-form'

export const metadata: Metadata = {
  title: 'Sponsor',
  description: 'Book a 30-minute call, then submit a sponsor application for Baltimore Tech Week 2027.',
  alternates: { canonical: '/apply/sponsor' },
}

export default async function SponsorApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string; demo?: string }>
}) {
  const { tier, demo } = await searchParams
  const isDemo = demo === '1'

  return (
    <ApplyShell
      kicker={isApplyOpenNow() ? 'Book a call · then submit' : `Opens ${EVENT.opensOn} · Book a call · then submit`}
      title="Sponsor the week"
      lead="Five tiers, $500 to $10,000. First we hold a 30-minute intro. Then you send a short application. We will talk nights, placement, and what people in the room will actually see."
      demo={isDemo}
    >
      {isApplyOpenNow() || isDemo ? <SponsorForm initialTier={tier || ''} demo={isDemo} /> : <ApplyClosed />}
    </ApplyShell>
  )
}
