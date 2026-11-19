"use client";

import { sponsorTierCopy } from "@/lib/involve";
import { sponsorCallUrl } from "@/lib/site";

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
            {item.pick ? <p className="tier-flag">Most sponsors</p> : <p className="tier-flag tier-flag-empty" aria-hidden="true" />}
            <p className="tier-name">{item.name}</p>
            <p className="tier-price">{item.price}</p>
            <ul className="tier-perks">
              {item.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
            <div className="tier-foot">
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
                  href={sponsorCallUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get this tier
                </a>
              )}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
