import { SponsorBoard } from "@/components/SponsorBoard";
import { leadDays, sponsorTiers } from "@/lib/involve";
import { pageMeta, sponsorAudience } from "@/lib/site";

export const metadata = pageMeta(
  "Sponsors",
  "Sponsor Bmore Tech Fest. Reach founders, engineers, students, and tech leaders from Baltimore and the DMV. Apply by February 15, 2027.",
);

const tiers = new Set(sponsorTiers.map((tier) => tier.value));
const days = new Set(leadDays.map((day) => day.value));

export default async function SponsorsPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string; day?: string }>;
}) {
  const params = await searchParams;
  const tier = tiers.has(params.tier ?? "") ? params.tier : undefined;
  const day = days.has(params.day ?? "") ? params.day : undefined;

  return (
    <main className="plain-page">
      <div className="page-top">
        <div className="week-wrap">
          <header id="main">
            <p className="week-kicker">Apply by February 15, 2027</p>
            <h1>Sponsor</h1>
            <p className="plain-lede">
              Put your company in the room with the people building Baltimore’s tech future. Apply by February 15. The
              name is confirmed March 1, when the talks are chosen, so it goes on the site with the schedule.
            </p>
          </header>

          <section className="sponsor-why" aria-labelledby="who-attends">
            <h2 id="who-attends">Who’s in the room</h2>
            <p>
              Sponsors buy access to the audience: founders, builders, students, and decision-makers shaping what’s next
              across Baltimore and the DMV.
            </p>
            <ul className="audience-list">
              {sponsorAudience.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </section>

          <SponsorBoard closed initialTier={tier} initialDay={day} />
        </div>
      </div>
    </main>
  );
}
