import type { Metadata } from 'next'
import { EVENT, isApplyOpenNow } from '@/lib/data'
import { ApplyClosed, ApplyShell } from '@/components/apply/apply-shell'
import { PartnerForm } from '@/components/apply/partner-form'

export const metadata: Metadata = {
  title: 'Partner',
  description: 'Partner with Baltimore Tech Week. Free for the groups that already gather the city.',
  alternates: { canonical: '/apply/partner' },
}

export default async function PartnerApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }>
}) {
  const { demo } = await searchParams
  const isDemo = demo === '1'

  return (
    <ApplyShell
      kicker={isApplyOpenNow() ? 'Community partner · Free' : `Opens ${EVENT.opensOn} · Community partner · Free`}
      title="Partner with the week"
      lead="For meetups, schools, accelerators, and groups that already gather Baltimore. Partnership is free. We list you and send a link so you can see who came because of you."
      demo={isDemo}
    >
      {isApplyOpenNow() || isDemo ? <PartnerForm demo={isDemo} /> : <ApplyClosed />}
    </ApplyShell>
  )
}
