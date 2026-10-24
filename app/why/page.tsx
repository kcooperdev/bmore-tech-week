import type { Metadata } from 'next'
import { EVENT } from '@/lib/data'
import { pageSocial } from '@/lib/seo'
import { HarborTopbar } from '@/components/harbor-topbar'
import { HarborFooter } from '@/components/harbor-footer'
import { PageBanner } from '@/components/page-banner'
import { WhyBaltimore } from '@/components/why-baltimore'
import '../../styles.css'

const title = 'Why Baltimore'
const description =
  'Baltimore is the next major tech hub in the US. Tech Week is at night so the community can actually show up. Do not get left behind.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: EVENT.whyPath },
  ...pageSocial({ title, description, path: EVENT.whyPath }),
}

export default function WhyPage() {
  return (
    <div className="bmore bmore-page">
      <HarborTopbar current="why" />
      <PageBanner title="Why Baltimore" kicker="Do not get left behind" />
      <main id="main" tabIndex={-1}>
        <WhyBaltimore />
      </main>
      <HarborFooter />
    </div>
  )
}
