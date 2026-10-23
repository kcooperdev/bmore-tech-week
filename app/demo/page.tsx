import type { Metadata } from 'next'
import { EVENT } from '@/lib/data'
import { HarborTopbar } from '@/components/harbor-topbar'
import { HarborFooter } from '@/components/harbor-footer'
import { PageBanner } from '@/components/page-banner'
import { DemoDesk } from '@/components/demo-desk'
import '../../styles.css'

export const metadata: Metadata = {
  title: 'Demo desk',
  description: 'Click through Baltimore Tech Week forms and confirm they land in the run sheet.',
  robots: { index: false, follow: false },
  alternates: { canonical: EVENT.demoPath },
}

export default function DemoPage() {
  return (
    <div className="bmore bmore-page">
      <HarborTopbar current="demo" />
      <PageBanner title="Demo desk" kicker="Internal" />
      <main id="main" tabIndex={-1}>
        <DemoDesk />
      </main>
      <HarborFooter />
    </div>
  )
}
