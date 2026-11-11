import { SponsorBoard } from "@/components/SponsorBoard";
import { sponsorTiers } from "@/lib/involve";
import { pageMeta, sponsorAudience } from "@/lib/site";

export const metadata = pageMeta(
  "Sponsors",
  "Sponsor Bmore Tech Fest. Reach founders, engineers, students, and tech leaders from Baltimore and the DMV. Apply by February 15, 2027.",
);

const tiers = new Set(sponsorTiers.map((tier) => tier.value));

export default async function SponsorsPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string; day?: string }>;
}) {
  const params = await searchParams;
  const tier = tiers.has(params.tier ?? "") ? params.tier : undefined;

  return (
    <main className="plain-page">
      <div className="page-top">
        <div className="week-wrap">
          <header id="main">
            <p className="week-kicker">Apply by February 15, 2027</p>
            <h1>Sponsor</h1>
            <p className="plain-lede">
              Sponsors buy the audience, not a logo wall. Put your company in front of founders, engineers, students, and
              tech leaders from Baltimore and the DMV. Apply by February 15.
            </p>
          </header>

          <section className="sponsor-why" aria-labelledby="who-attends">
            <h2 id="who-attends">Who’s in the room</h2>
            <p>
              Year one packages are built for local companies that want direct access to the people building here, without
              enterprise pricing.
            </p>
            <ul className="audience-list">
              {sponsorAudience.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </section>

          <SponsorBoard closed initialTier={tier} />
        </div>
      </div>
    </main>
  );
}
