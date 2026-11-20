"use client";

import { useState } from "react";
import {
  communitySponsorAmounts,
  communitySponsorCopy,
  communitySponsorSeatCost,
  site,
} from "@/lib/site";

function seatsFor(amount: number) {
  return Math.floor(amount / communitySponsorSeatCost);
}

function seatLabel(seats: number) {
  if (seats <= 0) {
    return `Add $${communitySponsorSeatCost - 25} more to fund a full seat.`;
  }
  if (seats === 1) {
    return "Funds 1 seat for a student or laid-off neighbor.";
  }
  return `Funds ${seats} seats for students or laid-off neighbors.`;
}

export function CommunityGive() {
  const [amount, setAmount] = useState<(typeof communitySponsorAmounts)[number]>(50);
  const seats = seatsFor(amount);
  const subject = encodeURIComponent(`Community Sponsor · $${amount}`);
  const body = encodeURIComponent(
    `Hi Bmore Tech Week team,\n\nI want to be a Community Sponsor at $${amount}.\n\nName:\nEmail:\n\nThanks.`,
  );
  const mailto = `mailto:${site.email}?subject=${subject}&body=${body}`;

  return (
    <div className="community-give">
      <p className="community-give-label">1. Pick an amount</p>
      <div className="community-amounts" role="group" aria-label="Community sponsor amount">
        {communitySponsorAmounts.map((value) => {
          const selected = value === amount;
          const isSeat = value === communitySponsorSeatCost;
          return (
            <button
              key={value}
              type="button"
              className={[
                "community-amount",
                selected ? "is-selected" : "",
                isSeat ? "is-seat" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={selected}
              onClick={() => setAmount(value)}
            >
              ${value}
              {isSeat ? <span className="community-amount-flag">Funds a seat</span> : null}
            </button>
          );
        })}
      </div>
      <p className="community-give-label">2. Fund a seat</p>
      <p className="community-impact" aria-live="polite">
        {seatLabel(seats)}
      </p>
      <p className="community-give-label">3. Join the movement</p>
      <a className="week-btn" href={mailto}>
        {communitySponsorCopy.cta}
      </a>
      <p className="community-give-note">{communitySponsorCopy.note}</p>
    </div>
  );
}
