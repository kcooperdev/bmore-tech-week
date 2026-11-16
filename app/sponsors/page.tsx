import { SponsorBoard } from "@/components/SponsorBoard";
import { pageMeta, sponsorAudience } from "@/lib/site";

export const metadata = pageMeta(
  "Sponsors",
  "Sponsor Bmore Tech Fest. Reach founders, engineers, students, and tech leaders from Baltimore and the DMV. Book a call. Deadline February 15, 2027.",
);

export default function SponsorsPage() {
  return (
    <main className="plain-page">
      <div className="page-top">
        <div className="week-wrap">
          <header id="main">
            <p className="week-kicker">Book a call · Deadline February 15, 2027</p>
            <h1>Sponsor</h1>
            <p className="plain-lede">
              Put your company in front of founders, engineers, students, and tech leaders from Baltimore and the DMV.
            </p>
          </header>

          <section className="sponsor-why" aria-labelledby="who-attends">
            <h2 id="who-attends">Who’s in the room</h2>
            <ul className="audience-list">
              {sponsorAudience.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </section>

          <SponsorBoard />
        </div>
      </div>
    </main>
  );
}
