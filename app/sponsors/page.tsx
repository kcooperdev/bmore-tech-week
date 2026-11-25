import Link from "next/link";
import { communitySponsorLive, pageMeta, sponsorPaths } from "@/lib/site";

export const metadata = pageMeta(
  "Sponsor",
  "Fund a seat for someone who needs it, or sponsor Bmore Tech Week as a company.",
);

export default function SponsorsPage() {
  const paths = communitySponsorLive
    ? sponsorPaths
    : sponsorPaths.filter((path) => path.tone !== "community");

  return (
    <main className="plain-page">
      <div className="page-top">
        <div className="week-wrap">
          <header id="main">
            <p className="week-kicker">Sponsor</p>
            <h1>{communitySponsorLive ? "Two ways to show up" : "Sponsor the week"}</h1>
            <p className="plain-lede">
              {communitySponsorLive
                ? "People fund seats. Companies underwrite the week. Two ways to show up."
                : "Company packages from $500. Logos, tables, and brand in the room."}
            </p>
          </header>

          <ul className="path-list sponsor-paths">
            {paths.map((path) => (
              <li key={path.href}>
                <Link href={path.href} className="sponsor-path">
                  <strong>{path.title}</strong>
                  <span>{path.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
