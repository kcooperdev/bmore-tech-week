import Link from "next/link";
import { HarborScene } from "@/components/HarborScene";
import { LivePortal } from "@/components/LivePortal";
import { UpdatesModal } from "@/components/UpdatesModal";
import { buildSummit, communitySponsorLive, speakersAnnounce, sponsorAudience, site } from "@/lib/site";

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
              {site.name} {site.year} · {site.dates} · Baltimore, MD · $75
            </p>
            <h2 id="week-promise" className="week-title">
              {site.promise}
            </h2>
            <p className="week-lede">{site.sell}</p>
            <p className="home-speakers-note">{speakersAnnounce}</p>
            <div className="week-actions">
              <Link className="week-btn week-btn-ghost" href="/schedule">
                Schedule
              </Link>
              <Link className="week-btn week-btn-ghost" href="/speak">
                Apply to speak
              </Link>
            </div>
          </div>
        </section>

        <section className="band-paper home-beat" aria-labelledby="who-room">
          <div className="week-wrap">
            <p className="week-kicker">Who’s in the room</p>
            <h2 id="who-room" className="week-title week-title-sm">
              Built for people building here
            </h2>
            <p className="week-lede">{site.room}</p>
            <ul className="audience-list home-audience">
              {sponsorAudience.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band-paper" aria-labelledby="summit-title" id="summit">
          <div className="week-wrap">
            <p className="week-kicker">Included with your pass</p>
            <h2 id="summit-title" className="week-title week-title-sm">
              {buildSummit.name}
            </h2>
            <p className="week-lede">{buildSummit.lede}</p>
            <p className="home-speakers-note">{speakersAnnounce}</p>
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
              <Link className="week-btn" href="/schedule">
                See the schedule
              </Link>
              <Link className="week-btn week-btn-ghost" href="/tickets">
                Join the list
              </Link>
            </div>
          </div>
        </section>

        <section className="band-paper home-beat" aria-labelledby="founder-beat">
          <div className="week-wrap">
            <p className="week-kicker">Why this exists</p>
            <h2 id="founder-beat" className="week-title week-title-sm">
              {site.idea}
            </h2>
            <div className="week-actions">
              <Link className="week-btn week-btn-ghost" href="/about">
                Read the full story
              </Link>
            </div>
          </div>
        </section>

        {communitySponsorLive ? (
          <section className="band-paper home-beat home-fund" aria-labelledby="fund-seat">
            <div className="week-wrap">
              <p className="week-kicker">Community</p>
              <h2 id="fund-seat" className="week-title week-title-sm">
                Can’t come? Fund a seat.
              </h2>
              <p className="week-lede">
                Every $50 puts a student or a laid-off neighbor in the room. Give what you can and help grow the
                movement.
              </p>
              <div className="week-actions">
                <Link className="week-btn week-btn-ghost" href="/community">
                  Fund a seat
                </Link>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
