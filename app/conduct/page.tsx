import { PageHeader } from "@/components/PageHeader";
import { pageMeta, site } from "@/lib/site";

export const metadata = pageMeta(
  "Code of Conduct",
  "Baltimore Tech Week is for anyone curious about what is being built in the city. Harassment is not welcome.",
);

export default function ConductPage() {
  return (
    <main className="plain-page">
      <PageHeader eyebrow="Community" title="Be decent" lede="You don't need a tech title to be here." />
      <div className="plain-body">
        <div className="week-wrap narrow-copy">
            <p>Harassment is not part of the week. That includes 4MLK and official partner events.</p>
            <p>
              If something is off, tell an organizer or email <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
        </div>
      </div>
    </main>
  );
}
