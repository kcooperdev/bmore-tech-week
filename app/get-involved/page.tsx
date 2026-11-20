import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { pageMeta, waysIn } from "@/lib/site";

export const metadata = pageMeta(
  "Get Involved",
  "Give a talk or sponsor Bmore Tech Week as a person or a company.",
);

export default function GetInvolvedPage() {
  return (
    <main className="plain-page">
      <PageHeader
        eyebrow="Applications are open"
        title="Get involved"
        lede="Give a talk, or sponsor the week as a person or a company."
      />
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
