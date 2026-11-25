import Link from "next/link";
import { HarborScene } from "@/components/HarborScene";
import { LivePortal } from "@/components/LivePortal";
import { UpdatesModal } from "@/components/UpdatesModal";
import {
  buildSummit,
  site,
  speakDeadlineLabel,
  sponsorAudience,
  techPillars,
} from "@/lib/site";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ live?: string }>;
}) {
  const params = await searchParams;
  const live = site.phase === "live" || params.live === "1";

  return (
    <>
      <HarborScene />
      <UpdatesModal />
      <div className="editorial-flow">
        {live ? <LivePortal /> : null}

        <section className="band-ink" aria-labelledby="identity-title">
          <div className="week-wrap">
            <p className="week-kicker week-kicker-on-ink">Conference</p>
            <h2 id="identity-title" className="week-title week-title-on-ink">
              {site.identityTitle}
            </h2>
            <p className="week-lede week-lede-on-ink">{site.identityLede}</p>
            <p className="home-speakers-note home-speakers-note-on-ink">{speakDeadlineLabel}</p>
            <div className="week-actions">
              <Link className="week-btn week-btn-on-ink" href="/speak">
                Apply to speak
              </Link>
              <Link className="week-btn week-btn-ghost-on-ink" href="/schedule">
                See the schedule
              </Link>
            </div>
          </div>
        </section>

        <section className="band-paper" aria-labelledby="pillars-title" id="summit">
          <div className="week-wrap">
            <p className="week-kicker">{buildSummit.kicker}</p>
            <h2 id="pillars-title" className="week-title week-title-sm">
              {buildSummit.name}
            </h2>
            <p className="week-lede">{buildSummit.lede}</p>
            <ul className="pillar-grid">
              {techPillars.map((pillar) => (
                <li key={pillar.id}>
                  <p className="pillar-label">{pillar.label}</p>
                  <h3>{pillar.name}</h3>
                  <p>{pillar.text}</p>
                </li>
              ))}
            </ul>
            <div className="week-actions">
              <Link className="week-btn week-btn-ghost" href="/schedule">
                See the schedule
              </Link>
            </div>
          </div>
        </section>

        <section className="band-ink home-beat" aria-labelledby="who-room">
          <div className="week-wrap home-audience-layout">
            <div className="home-audience-intro">
              <p className="week-kicker">{site.roomKicker}</p>
              <h2 id="who-room" className="week-title week-title-sm week-title-on-ink">
                {site.roomHeadline}
              </h2>
              <p className="week-lede week-lede-on-ink">{site.room}</p>
            </div>
            <ul className="home-audience">
              {sponsorAudience.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
