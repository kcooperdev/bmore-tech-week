"use client";

import { useEffect, useRef, useState } from "react";
import { ApplyForm } from "@/components/ApplyForm";
import { leadDays, sponsorFieldsFor, sponsorTierCopy } from "@/lib/involve";

type Selection = { tier: string; day?: string };

export function SponsorBoard({
  initialTier,
  initialDay,
  closed = false,
}: {
  initialTier?: string;
  initialDay?: string;
  closed?: boolean;
}) {
  const known = new Set(sponsorTierCopy.map((item) => item.id));
  const knownDay = new Set(leadDays.map((day) => day.value));
  const starting =
    !closed && initialTier && known.has(initialTier)
      ? { tier: initialTier, day: initialDay && knownDay.has(initialDay) ? initialDay : undefined }
      : null;
  const [selection, setSelection] = useState<Selection | null>(starting);
  const dialog = useRef<HTMLDialogElement>(null);
  const picked = sponsorTierCopy.find((item) => item.id === selection?.tier);
  const day = leadDays.find((item) => item.value === selection?.day);

  useEffect(() => {
    const node = dialog.current;
    if (!node || !selection || node.open) return;
    node.showModal();
  }, [selection]);

  function open(tier: string, nextDay?: string) {
    if (closed) return;
    setSelection({ tier, day: nextDay });
    const query = nextDay ? `?tier=${tier}&day=${nextDay}` : `?tier=${tier}`;
    window.history.replaceState(null, "", `/sponsors${query}`);
  }

  function close() {
    dialog.current?.close();
  }

  return (
    <>
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
              <button type="button" className="tier-apply" disabled={closed} onClick={() => open(item.id)}>
                Get this tier
              </button>
              {closed ? <p className="tier-closed">Not open yet.</p> : null}
            </article>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="tier-dialog"
        aria-labelledby="sponsor-form-title"
        onClose={() => {
          setSelection(null);
          window.history.replaceState(null, "", "/sponsors");
        }}
      >
        {picked && selection ? (
          <>
            <div className="tier-dialog-bar">
              <div>
                <h2 id="sponsor-form-title">{day ? `${picked.name} · ${day.short}` : picked.name}</h2>
                <p>{picked.price}</p>
              </div>
              <button type="button" className="tier-dialog-close" onClick={close}>
                Close
              </button>
            </div>
            <ApplyForm
              key={`${selection.tier}-${selection.day ?? "open"}`}
              endpoint="/api/apply"
              extra={{ kind: "sponsor" }}
              defaults={{ tier: selection.tier, ...(selection.day ? { day: selection.day } : {}) }}
              submitLabel="Submit application"
              successTitle="Thanks. We have your application."
              successBody="Apply by February 15. The name is confirmed when the agreement is signed, by March 1. Talks are chosen that day, so the name can go out with the schedule. If you still need a time for the intro, we will write you."
              fields={sponsorFieldsFor(selection.tier)}
            />
          </>
        ) : null}
      </dialog>
    </>
  );
}
