import { SponsorBoard } from "@/components/SponsorBoard";
import { pageMeta, sponsorAudience } from "@/lib/site";

export const metadata = pageMeta(
  "Sponsors",
  "Sponsor Bmore Tech Week. Reach founders, engineers, students, and tech leaders from Baltimore and the DMV. Apply by February 15, 2027.",
);

export default function SponsorsPage() {
  return (
    <main className="plain-page">
      <div className="page-top">
        <div className="week-wrap">
          <header id="main">
            <p className="week-kicker">Apply by February 15, 2027</p>
            <h1>Sponsor</h1>
            <p className="plain-lede">
              Put your company in front of founders, engineers, students, and tech leaders from Baltimore and the DMV.
              Apply by February 15.
            </p>
          </header>

          <section className="sponsor-why" aria-labelledby="who-attends">
            <h2 id="who-attends">Who’s in the room</h2>
            <p>
              Our packages are built for companies that want direct access to the people building here, without
              enterprise pricing.
            </p>
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
