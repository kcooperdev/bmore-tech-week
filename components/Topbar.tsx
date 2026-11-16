"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { currentNavTone } from "@/lib/nav-tone";
import { nav } from "@/lib/site";

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
  const [involved, setInvolved] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    setInvolved(false);
  }

  useEffect(() => {
    if (scene) return;
    const el = bar.current;
    if (!el) return;
    const paint = () => {
      el.dataset.navTone = currentNavTone();
    };
    paint();
    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    return () => {
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
    };
  }, [scene, pathname]);

  return (
    <header
      ref={bar}
      className={scene ? "topbar" : "topbar site-topbar"}
      data-nav-tone={scene ? "night" : "dark"}
      inert={inertBar ? true : undefined}
    >
      <nav className="topbar-links" aria-label="Primary">
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
        <span className="topbar-corner-item topbar-dropdown">
          <button
            type="button"
            className="harbor-link topbar-dropdown-btn"
            aria-expanded={involved}
            onClick={() => setInvolved((value) => !value)}
          >
            Get Involved
            <svg className="topbar-caret" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div className={involved ? "topbar-dropdown-menu is-open" : "topbar-dropdown-menu"} role="menu">
            {nav.involved.map((item) => (
              <Link key={item.href} role="menuitem" className="topbar-dropdown-item" href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </span>
      </nav>
    </header>
  );
}
