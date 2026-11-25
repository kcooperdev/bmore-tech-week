"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Topbar } from "@/components/Topbar";
import { currentNavTone } from "@/lib/nav-tone";
import { site, ticketsSoonLabel } from "@/lib/site";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function HarborScene() {
  const pin = useRef<HTMLElement>(null);
  const announced = useRef(false);
  const [reduced, setReduced] = useState(false);
  const [mode, setMode] = useState<"sunset" | "night">("night");
  const [hintOn, setHintOn] = useState(true);
  const [isNight, setIsNight] = useState(false);
  const [isPast, setIsPast] = useState(false);
  const [navTone, setNavTone] = useState("night");
  const [status, setStatus] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      const past = el.getBoundingClientRect().bottom <= 48;
      const nextNight = night > 0.5;
      const nextTone = past ? currentNavTone() : "night";
      const nextHint = hint > 0.2 && !past;

      el.style.setProperty("--day", String(1 - night));
      el.style.setProperty("--night", String(night));
      el.style.setProperty("--title", String(title));
      el.style.setProperty("--hint", String(hint));
      el.style.setProperty("--progress", String(travel));
      el.style.setProperty("--copy", copy);
      document.documentElement.style.setProperty("--copy", copy);
      document.documentElement.style.background = nextNight ? "#070b16" : "#1a4d6a";
      theme?.setAttribute("content", nextNight ? "#070b16" : "#2f7fa8");

      setIsNight((value) => (value === nextNight ? value : nextNight));
      setIsPast((value) => (value === past ? value : past));
      setNavTone((value) => (value === nextTone ? value : nextTone));
      setHintOn((value) => (value === nextHint ? value : nextHint));

      if (night > 0.8 && !announced.current) {
        announced.current = true;
        setStatus("Bmore Tech Week. April 26 through April 28.");
      }
      if (night < 0.2 && announced.current) {
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

  const pinClass = [
    "harbor-pin",
    isNight ? "is-night" : "",
    isPast ? "is-past" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      ref={pin}
      className={pinClass}
      data-nav-tone={navTone}
      aria-label="Bmore Tech Week. April 26 through April 28, from sunset into night."
    >
      <Topbar scene />
      <div className="cycle-progress" aria-hidden="true" />
      <p className="sr-only" aria-live="polite">
        {status}
      </p>
      {mounted && reduced ? (
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
          aria-hidden={true}
        />
        <div className="plate-veil" />
        <button
          className={hintOn ? "day-scroll day-scroll-cue is-on" : "day-scroll day-scroll-cue"}
          type="button"
          aria-label="Scroll into Bmore Tech Week"
          tabIndex={hintOn ? 0 : -1}
          onClick={scrollIn}
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M6 8.5 16 17.5 26 8.5" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 17 16 26 26 17" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <main className="night-title" id="main" tabIndex={-1}>
          <div className="night-title-inner">
            <p className="night-eyebrow">
              <time dateTime="2027-04-26/2027-04-28">{site.dates}</time>
              <span aria-hidden="true"> · </span>
              <span>Baltimore, MD</span>
            </p>
            <h1>
              <span>Bmore</span>
              <span>
                <span className="night-title-accent">Tech</span> Week
              </span>
            </h1>
            <p className="night-headline">{site.headline}</p>
            <p className="night-pillars" aria-label="Technology pillars">
              <span>GovTech</span>
              <span aria-hidden="true">·</span>
              <span>AI</span>
              <span aria-hidden="true">·</span>
              <span>Cybersecurity</span>
            </p>
            <button type="button" className="night-cta is-soon" disabled aria-disabled="true">
              {ticketsSoonLabel}
            </button>
          </div>
        </main>
      </div>
    </section>
  );
}
