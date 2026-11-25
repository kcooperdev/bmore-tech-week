"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { currentNavTone } from "@/lib/nav-tone";
import { nav, site } from "@/lib/site";

function isCurrent(pathname: string, href: string) {
  const path = href.split("#")[0];
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function Topbar({
  scene = false,
  inertBar = false,
}: {
  scene?: boolean;
  inertBar?: boolean;
}) {
  const pathname = usePathname();
  const bar = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState(scene ? "night" : "dark");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (scene) {
      setTone("night");
      return;
    }
    const paint = () => setTone(currentNavTone());
    paint();
    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    return () => {
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
    };
  }, [scene, pathname]);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("is-nav-open");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("is-nav-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      ref={bar}
      className={`${scene ? "topbar" : "topbar site-topbar"}${open ? " is-menu-open" : ""}`}
      data-nav-tone={tone}
      inert={inertBar || undefined}
    >
      <button
        type="button"
        className="topbar-burger"
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          ) : (
            <path d="M5 7h14M5 12h14M5 17h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          )}
        </svg>
      </button>
      <nav className="topbar-links topbar-desktop" aria-label="Primary">
        <span className="topbar-corner-item">
          <Link className="harbor-link" href="/" aria-current={pathname === "/" ? "page" : undefined}>
            Home
          </Link>
        </span>
        {nav.primary.map((item) => (
          <span key={item.href} className="topbar-corner-item">
            <Link className="harbor-link" href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          </span>
        ))}
      </nav>
      {open ? (
        <div className="topbar-drawer-layer">
          <button type="button" className="topbar-drawer-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="topbar-drawer" id="site-menu" role="dialog" aria-label="Menu">
            <Link href="/" className="topbar-drawer-brand" onClick={() => setOpen(false)}>
              Bmore
              <br />
              <span>Tech</span> Week
            </Link>
            <p className="topbar-drawer-meta">{site.dates}</p>
            <Link href="/" className="topbar-drawer-link" aria-current={pathname === "/" ? "page" : undefined} onClick={() => setOpen(false)}>
              Home
            </Link>
            {nav.primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="topbar-drawer-link"
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
