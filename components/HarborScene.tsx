"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Topbar } from "@/components/Topbar";
import { currentNavTone } from "@/lib/nav-tone";
import { site } from "@/lib/site";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function HarborScene() {
  const pin = useRef<HTMLElement>(null);
  const announced = useRef(false);
  const [reduced, setReduced] = useState(false);
  const [mode, setMode] = useState<"sunset" | "night">("night");
  const [hintOn, setHintOn] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = pin.current;
    if (!el) return;
    const theme = document.querySelector('meta[name="theme-color"]');

    const paint = (progress: number) => {
      const travel = clamp(progress);
      const night = clamp((travel - 0.16) / 0.52);
      const title = clamp((travel - 0.42) / 0.34);
      const hint = clamp(1 - travel / 0.22);
      const copy = night > 0.45 ? "#f3ead7" : "#16120c";
      el.style.setProperty("--day", String(1 - night));
      el.style.setProperty("--night", String(night));
      el.style.setProperty("--title", String(title));
      el.style.setProperty("--hint", String(hint));
      el.style.setProperty("--progress", String(travel));
      el.style.setProperty("--copy", copy);
      document.documentElement.style.setProperty("--copy", copy);
      el.classList.toggle("is-night", night > 0.5);
      const past = el.getBoundingClientRect().bottom <= 48;
      el.classList.toggle("is-past", past);
      el.dataset.navTone = past ? currentNavTone() : "night";
      document.documentElement.style.background = night > 0.5 ? "#070b16" : "#1a4d6a";
      theme?.setAttribute("content", night > 0.5 ? "#070b16" : "#2f7fa8");
      setHintOn(hint > 0.2 && !past);
      if (night > 0.8 && !announced.current) {
        announced.current = true;
        setStatus("Baltimore Tech Week. April 28 through April 30.");
      }
      if (night < 0.2) {
        announced.current = false;
        setStatus("");
      }
    };

    if (reduced) {
      paint(mode === "night" ? 1 : 0);
      return;
    }

    const onScroll = () => {
      const distance = el.offsetHeight / 2;
      const progress = distance <= 0 ? 0 : clamp(-el.getBoundingClientRect().top / distance);
      paint(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, mode]);

  function scrollIn() {
    const el = pin.current;
    if (!el) return;
    window.scrollTo({ top: el.offsetTop + el.offsetHeight / 2, behavior: "smooth" });
  }

  return (
    <section
      ref={pin}
      className="harbor-pin"
      aria-label="Baltimore Tech Week. April 28 through April 30, from sunset into night."
    >
      <Topbar scene />
      <div className="cycle-progress" aria-hidden="true" />
      <p className="sr-only" aria-live="polite">
        {status}
      </p>
      {reduced ? (
        <div className="mode-toggle">
          <button type="button" aria-pressed={mode === "sunset"} onClick={() => setMode("sunset")}>
            Sunset
          </button>
          <button type="button" aria-pressed={mode === "night"} onClick={() => setMode("night")}>
            Night
          </button>
        </div>
      ) : null}
      <div className="harbor-fixed">
        <Image
          className="plate plate-day"
          src="/images/harbor-sunset.jpg"
          alt="Painted Baltimore harbor at sunset, with the World Trade Center, National Aquarium, and Domino Sugars."
          fill
          priority
          sizes="100vw"
          quality={78}
        />
        <Image
          className="plate plate-night"
          src="/images/harbor-night.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={78}
          aria-hidden
        />
        <div className="plate-veil" />
        <button
          className={hintOn ? "day-scroll day-scroll-cue is-on" : "day-scroll day-scroll-cue"}
          type="button"
          aria-label="Scroll into Baltimore Tech Week"
          tabIndex={hintOn ? 0 : -1}
          onClick={scrollIn}
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M6 8.5 16 17.5 26 8.5" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 17 16 26 26 17" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <main className="night-title" id="main" tabIndex={-1}>
          <h1>
            <span>Baltimore</span>
            <span>
              <span className="night-title-accent">Tech</span> Week
            </span>
          </h1>
          <p className="night-meta">
            <time dateTime="2027-04-28/2027-04-30">{site.dates}</time>
          </p>
        </main>
      </div>
    </section>
  );
}
