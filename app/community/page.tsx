import Link from "next/link";
import { redirect } from "next/navigation";
import { CommunityGive } from "@/components/CommunityGive";
import { communitySponsorCopy, communitySponsorLive, pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Community Sponsor",
  "Every $50 funds a student or laid-off neighbor at Bmore Tech Week. Give $25–$250.",
);

export default function CommunitySponsorPage() {
  if (!communitySponsorLive) redirect("/sponsors");

  return (
    <main className="plain-page">
      <div className="page-top">
        <div className="week-wrap community-page">
          <header id="main">
            <p className="week-kicker">{communitySponsorCopy.kicker}</p>
            <h1>{communitySponsorCopy.title}</h1>
            <p className="plain-lede">{communitySponsorCopy.lede}</p>
          </header>

          <CommunityGive />

          <section className="community-story" aria-labelledby="community-why">
            <h2 id="community-why">Why this exists</h2>
            <p>{communitySponsorCopy.belief}</p>
          </section>

          <p className="community-switch">
            Sponsoring as a company?{" "}
            <Link href="/corporate">See corporate packages</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
