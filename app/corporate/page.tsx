import Link from "next/link";
import { SponsorBoard } from "@/components/SponsorBoard";
import { communitySponsorLive, pageMeta, sponsorAudience } from "@/lib/site";

export const metadata = pageMeta(
  "Corporate Sponsor",
  "Corporate sponsorship for Bmore Tech Week. Reach founders, engineers, students, and tech leaders from Baltimore and the DMV. Apply by February 15, 2027.",
);

export default function CorporateSponsorPage() {
  return (
    <main className="plain-page">
      <div className="page-top">
        <div className="week-wrap">
          <header id="main">
            <p className="week-kicker">Corporate · Apply by February 15, 2027</p>
            <h1>Corporate Sponsor</h1>
            <p className="plain-lede">
              Put your company in front of founders, engineers, students, and tech leaders from Baltimore and the DMV.
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

          {communitySponsorLive ? (
            <p className="community-switch">
              Want to give as a person?{" "}
              <Link href="/community">Become a community sponsor</Link>
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
