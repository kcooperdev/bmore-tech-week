import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { pageMeta, waysIn } from "@/lib/site";

export const metadata = pageMeta(
  "Get Involved",
  "Give a talk, partner, sponsor, or tell people about Baltimore Tech Week.",
);

export default function GetInvolvedPage() {
  return (
    <main className="plain-page">
      <PageHeader eyebrow="Applications are open" title="Get involved" lede="Give a talk, bring your people, put your name on the week, or tell someone who trusts you." />
      <div className="plain-body">
        <div className="week-wrap">
            <ul className="path-list">
              {waysIn.map((way) => (
                <li key={way.href}>
                  <Link href={way.href}>
                    <strong>{way.title}</strong>
                    <span>{way.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </main>
  );
}
