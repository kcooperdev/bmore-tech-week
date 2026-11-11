"use client";

import { useEffect, useRef, useState } from "react";
import { ApplyForm } from "@/components/ApplyForm";
import { sponsorFieldsFor, sponsorTierCopy } from "@/lib/involve";

export function SponsorBoard({
  initialTier,
  closed = false,
}: {
  initialTier?: string;
  initialDay?: string;
  closed?: boolean;
}) {
  const known = new Set(sponsorTierCopy.map((item) => item.id));
  const starting = !closed && initialTier && known.has(initialTier) ? initialTier : null;
  const [selection, setSelection] = useState<string | null>(starting);
  const dialog = useRef<HTMLDialogElement>(null);
  const picked = sponsorTierCopy.find((item) => item.id === selection);

  useEffect(() => {
    const node = dialog.current;
    if (!node || !selection || node.open) return;
    node.showModal();
  }, [selection]);

  function open(tier: string) {
    if (closed) return;
    setSelection(tier);
    window.history.replaceState(null, "", `/sponsors?tier=${tier}`);
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
                <h2 id="sponsor-form-title">{picked.name}</h2>
                <p>{picked.price}</p>
              </div>
              <button type="button" className="tier-dialog-close" onClick={close}>
                Close
              </button>
            </div>
            <ApplyForm
              key={selection}
              endpoint="/api/apply"
              extra={{ kind: "sponsor" }}
              defaults={{ tier: selection }}
              submitLabel="Submit application"
              successTitle="Thanks. We have your application."
              successBody="Apply by February 15. If you still need a time for the intro, we will write you."
              fields={sponsorFieldsFor(selection)}
            />
          </>
        ) : null}
      </dialog>
    </>
  );
}
