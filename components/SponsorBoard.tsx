import { sponsorTierCopy } from "@/lib/involve";
import { site } from "@/lib/site";

export function SponsorBoard({
  closed = false,
}: {
  initialTier?: string;
  initialDay?: string;
  closed?: boolean;
}) {
  return (
    <ul className="tier-grid">
      {sponsorTierCopy.map((item) => (
        <li key={item.id}>
          <article className={item.top ? "tier-card is-top" : item.pick ? "tier-card is-pick" : "tier-card"}>
            {item.pick ? (
              <p className="tier-flag">Most sponsors</p>
            ) : (
              <p className="tier-flag tier-flag-empty" aria-hidden="true" />
            )}
            <p className="tier-name">{item.name}</p>
            <p className="tier-price">{item.price}</p>
            <ul className="tier-perks">
              {item.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
            {closed ? (
              <>
                <button type="button" className="tier-apply" disabled>
                  Get this tier
                </button>
                <p className="tier-closed">Not open yet.</p>
              </>
            ) : (
              <a
                className="tier-apply"
                href={site.sponsorCall}
                target="_blank"
                rel="noreferrer"
              >
                Book a call
              </a>
            )}
          </article>
        </li>
      ))}
    </ul>
  );
}
