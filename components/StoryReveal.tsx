"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type StoryRevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  id?: string;
  "aria-labelledby"?: string;
};

export function StoryReveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  id,
  "aria-labelledby": labelledBy,
}: StoryRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setActive(true);
      return;
    }

    setActive(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setActive(true);
        observer.unobserve(node);
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      className={`story-reveal${active ? " is-in" : ""} ${className}`.trim()}
      style={delay ? ({ "--story-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
