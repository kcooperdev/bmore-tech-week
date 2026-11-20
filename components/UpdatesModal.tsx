"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

const KEY = "btw-updates-modal";
const KIT_UID = "f6f157d08e";
const KIT_SRC = `https://bmore-tech-fest.kit.com/${KIT_UID}/index.js`;

export function UpdatesModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const formMount = useRef<HTMLDivElement>(null);
  const mountToken = useRef(0);

  function clearKitForm() {
    const mount = formMount.current;
    mountToken.current += 1;
    if (mount) mount.replaceChildren();

    document
      .querySelectorAll(`script[data-uid="${KIT_UID}"], .formkit-form[data-uid="${KIT_UID}"]`)
      .forEach((node) => {
        if (mount?.contains(node)) return;
        if (node.parentElement === mount) return;
        // Only remove orphans left outside the live mount.
        if (!mount || !mount.contains(node)) node.remove();
      });

    if (Array.isArray(window.__sv_forms)) {
      window.__sv_forms = window.__sv_forms.filter((entry) => {
        const node = entry?.element;
        return node instanceof Element && document.contains(node);
      });
    }
  }

  function loadKitForm() {
    const mount = formMount.current;
    if (!mount) return;

    clearKitForm();
    const token = mountToken.current;

    const script = document.createElement("script");
    script.async = true;
    script.dataset.uid = KIT_UID;
    script.dataset.btwKit = "updates";
    script.src = `${KIT_SRC}?v=${token}`;
    mount.appendChild(script);

    // If Kit is slow or a prior clear races the download, retry once while this open is current.
    window.setTimeout(() => {
      if (token !== mountToken.current) return;
      if (mount.querySelector(`.formkit-form[data-uid="${KIT_UID}"]`)) return;
      if (!mount.contains(script)) {
        const retry = document.createElement("script");
        retry.async = true;
        retry.dataset.uid = KIT_UID;
        retry.dataset.btwKit = "updates";
        retry.src = `${KIT_SRC}?v=${token}-retry`;
        mount.appendChild(retry);
      }
    }, 1200);
  }

  function openModal() {
    const node = dialog.current;
    if (!node) return;
    if (!node.open) node.showModal();
    loadKitForm();
  }

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {
      return;
    }

    const timer = window.setTimeout(openModal, 700);
    return () => {
      window.clearTimeout(timer);
      clearKitForm();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- land once
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(KEY, "dismissed");
    } catch {
      /* ignore */
    }
    clearKitForm();
    dialog.current?.close();
  }

  return (
    <dialog
      ref={dialog}
      className="updates-dialog"
      aria-labelledby="updates-title"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) dismiss();
      }}
      onClose={clearKitForm}
    >
      <div className="updates-dialog-card">
        <button type="button" className="updates-dialog-close" aria-label="Close" onClick={dismiss}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <p className="updates-dialog-kicker">
          {site.name} · {site.year}
        </p>
        <h2 id="updates-title">Stay in the loop</h2>
        <p className="updates-dialog-copy">
          Get updates, announcements, and a note when tickets go on sale. No spam, just what matters for{" "}
          {site.dates}.
        </p>

        <div ref={formMount} className="updates-dialog-form updates-kit-form" />

        <button type="button" className="updates-dialog-skip" onClick={dismiss}>
          Not now
        </button>
      </div>
    </dialog>
  );
}

declare global {
  interface Window {
    __sv_forms?: Array<{ element?: Element | null }>;
  }
}
