const stops: [string, string][] = [
  [".page-hero", "night"],
  [".plain-page", "dark"],
  [".plain-hero", "dark"],
  [".band-paper", "dark"],
  [".band-ink", "dark"],
  [".band-connect", "dark"],
  [".band-build", "dark"],
  [".band-opportunity", "dark"],
  [".band-sky", "dark"],
  [".harbor-footer", "sunset"],
];

/** Which header treatment sits over the content at the top of the viewport. */
export function currentNavTone() {
  let bestTop = -Infinity;
  let best = "dark";
  for (const [selector, tone] of stops) {
    for (const node of document.querySelectorAll(selector)) {
      const rect = node.getBoundingClientRect();
      if (rect.top <= 56 && rect.bottom > 56 && rect.top >= bestTop) {
        bestTop = rect.top;
        best = tone;
      }
    }
  }
  return best;
}
