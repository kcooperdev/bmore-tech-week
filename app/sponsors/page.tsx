import { SponsorBoard } from "@/components/SponsorBoard";
import { leadDays, sponsorTiers } from "@/lib/involve";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Sponsors",
  "Sponsor Baltimore Tech Week. Apply by February 15, 2027. Names are confirmed March 1, when the talks are chosen.",
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
              Three ways onto the week. Apply by February 15. The name is confirmed March 1, when the talks are chosen, so it goes on the site with the schedule.
            </p>
          </header>
          <SponsorBoard initialTier={tier} initialDay={day} />
        </div>
      </div>
    </main>
  );
}
