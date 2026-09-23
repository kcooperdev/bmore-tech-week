import type { Metadata } from 'next'
import Image from 'next/image'
import { EVENT } from '@/lib/data'
import { HarborTopbar } from '@/components/harbor-topbar'
import { SpeakersApply } from '@/components/speakers-apply'
import '../../styles.css'

const title = 'Call for Speakers'
const description =
  'Apply to speak at Baltimore Tech Week 2027. Five nights in local restaurants, coworking spaces, and neighborhood rooms. April 26–30.'

export const dynamic = 'force-dynamic'

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

      <section className="cfp-hero cfp-hero-speakers" aria-label="Call for Speakers">
        <Image
          className="cfp-hero-plate"
          src="/images/harbor-night.png"
          alt=""
          fill
          sizes="100vw"
          priority
          quality={78}
        />
        <div className="cfp-hero-veil" />
        <div className="cfp-hero-copy">
          <div className="night-title">
            <h1>
              <span>Call for</span>
              <span>Speakers</span>
            </h1>
          </div>
        </div>
      </section>

      <main className="cfp-main" id="main" tabIndex={-1}>
        <SpeakersApply />
      </main>
    </div>
  )
}
