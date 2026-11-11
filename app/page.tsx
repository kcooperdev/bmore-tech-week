import Link from "next/link";
import { HarborScene } from "@/components/HarborScene";
import { LivePortal } from "@/components/LivePortal";
import { TicketNotify } from "@/components/TicketNotify";
import { foundingSupporters, site, tracks } from "@/lib/site";

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
      <div className="editorial-flow">
        {live ? <LivePortal /> : null}

        <section className="band-paper" aria-labelledby="week-promise">
          <div className="week-wrap">
            <p className="week-kicker">
              {site.name} · {site.dates} · 4MLK, Baltimore
            </p>
            <h2 id="week-promise" className="week-title">
              {site.promise}
            </h2>
            <p className="week-lede">
              Three days with Baltimore’s founders, engineers, creators, researchers, operators, and future leaders from
              across the DMV. Leave with a collaboration, a hire, or a next step.
            </p>
            <p className="pass-line">{site.heroLine}</p>
            <p className="pass-line">{site.foundingYear}</p>
            <div className="week-actions">
              <a className="week-btn" href="#ticket-updates">
                Join the list
              </a>
              <a className="week-btn week-btn-ghost" href="#tracks">
                Explore the tracks
              </a>
            </div>
          </div>
        </section>

        <section className="band-paper home-beat" aria-labelledby="why-title">
          <div className="week-wrap">
            <h2 id="why-title" className="week-title week-title-sm">
              {site.whyHeadline}
            </h2>
            <p className="week-lede">{site.whyLede}</p>
            <p className="pass-line">
              <Link href="/about">The full story</Link>
            </p>
          </div>
        </section>

        <section className="band-paper" aria-labelledby="tracks-title" id="tracks">
          <div className="week-wrap">
            <h2 id="tracks-title" className="week-title week-title-sm">
              Explore the tracks
            </h2>
            <ul className="track-grid">
              {tracks.map((track) => (
                <li key={track.name}>
                  <h3>{track.name}</h3>
                  {track.text ? <p>{track.text}</p> : null}
                </li>
              ))}
            </ul>
            <div className="week-actions">
              <Link className="week-btn week-btn-ghost" href="/schedule">
                See the week
              </Link>
            </div>
          </div>
        </section>

        <section className="band-paper" aria-labelledby="supporters-title" id="supporters">
          <div className="week-wrap">
            <h2 id="supporters-title" className="week-title week-title-sm">
              Founding supporters
            </h2>
            <p className="week-lede">Names go up when the partnership is real.</p>
            <ul className="supporter-list">
              {foundingSupporters.map((supporter) => (
                <li key={supporter.name}>
                  <strong>{supporter.name}</strong>
                  <span>{supporter.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band-paper" aria-labelledby="ticket-updates-title" id="ticket-updates">
          <div className="week-wrap">
            <h2 id="ticket-updates-title" className="week-title week-title-sm">
              Three days at Bmore Tech Fest
            </h2>
            <p className="week-lede">{site.ticketLine}</p>
            <p className="pass-line">Be first to know when tickets open. Be part of year one.</p>
            <TicketNotify label="Join the list" buttonLabel="Join the list" />
          </div>
        </section>
      </div>
    </>
  );
}
