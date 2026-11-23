import Link from "next/link";
import { HarborScene } from "@/components/HarborScene";
import { LivePortal } from "@/components/LivePortal";
import { UpdatesModal } from "@/components/UpdatesModal";
import { buildSummit, speakDeadlineLabel, sponsorAudience, site } from "@/lib/site";

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

        <section className="band-paper" aria-labelledby="week-promise">
          <div className="week-wrap">
            <p className="week-kicker">
              {site.dates} · Baltimore, MD · All-access pass $75
            </p>
            <h2 id="week-promise" className="week-title">
              {site.promise}
            </h2>
            <p className="week-lede">{site.sell}</p>
            <p className="home-speakers-note">{speakDeadlineLabel}</p>
            <div className="week-actions">
              <Link className="week-btn week-btn-ghost" href="/speak">
                Apply to speak
              </Link>
            </div>
          </div>
        </section>

        <section className="band-paper" aria-labelledby="summit-title" id="summit">
          <div className="week-wrap">
            <p className="week-kicker">{buildSummit.kicker}</p>
            <h2 id="summit-title" className="week-title week-title-sm">
              {buildSummit.name}
            </h2>
            <p className="week-lede">{buildSummit.lede}</p>
            <ul className="summit-outcomes" aria-label="What you get">
              {buildSummit.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ul className="summit-grid">
              {buildSummit.tracks.map((track) => (
                <li key={track.id}>
                  <p className="summit-when">{track.label}</p>
                  <h3>{track.name}</h3>
                  <p>{track.text}</p>
                  <ul className="summit-focus">
                    {track.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
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

        <section className="band-paper home-beat" aria-labelledby="who-room">
          <div className="week-wrap">
            <p className="week-kicker">{site.roomKicker}</p>
            <h2 id="who-room" className="week-title week-title-sm">
              {site.roomHeadline}
            </h2>
            <p className="week-lede">{site.room}</p>
            <ul className="audience-list home-audience">
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
