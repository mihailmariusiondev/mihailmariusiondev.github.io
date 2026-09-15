# DESIGN.md — The Data Observatory

## One line
A scrollytelling visual essay (NYT/Pudding style) that tells Marius's career only through the
numbers his own work actually produced — every chart hand-drawn in SVG, every value sourced.

## Why it's wow
Recruiters see career pages; almost nobody sees a career told as an honest, explorable dataset.
Instead of a résumé list, the payload-compression story (570 KB → 22 KB), the bundle audit, the
WCAG close-out and the review-system pruning become five interlocking charts with hover detail,
scroll-triggered reveals and a visible accessible data table behind every one. The craft signal is
the restraint: no invented dashboards, no decoration pretending to be data — an annotation and a
`[source]` tag on every number, straight from facts.json/DOSSIER.md.

## Art direction
- Palette: near-black observatory background (#0a0e14 / #10151d panels), warm paper white text
  (#f2f1ea), one signal color per axis — teal (#5eead4) for "reduction/efficiency" metrics, amber
  (#f6b93b) for "scale/before" metrics, so every chart's before/after reads instantly.
- Type: Space Grotesk (display, chart titles, big numbers) + IBM Plex Mono (data labels, source
  tags, UI chrome) — a technical, instrument-panel pairing. Loaded via Google Fonts `<link>`
  (network, not a build dep) with system fallback stack so the page never blocks on it.
- Motion: IntersectionObserver reveals + CSS transitions/width-scale animations on the SVG bars as
  each chart scrolls into view. `prefers-reduced-motion: reduce` short-circuits every animation to
  its final static state (checked in JS before any transition class is applied).
- Layout: full-bleed dark canvas, a left "instrument rail" (sticky mini nav of chart sections) on
  desktop, single column with the rail collapsed into a top scroll-progress bar on mobile.

## Stack & why
- **Zero build tooling.** Hand-written static HTML + CSS + vanilla JS. No React/Astro/D3: the
  charts are five simple shapes (bars, a radial gauge, a stacked timeline) — a full charting
  library is dead weight for that, and a bundler adds a build step with no payoff for a single
  static page. `index.html`/`es/index.html` are also the `dist/` output (copied verbatim).
- One dependency: Google Fonts CDN link (no npm package, no bytes in the repo).
- All copy is bilingual EN/ES in one `js/i18n.js` data object; a header toggle sets
  `document.documentElement.lang` and swaps `data-i18n` text content client-side — no route change,
  so charts never re-render on language switch, only their labels do.

## Data provenance
All numbers and copy paraphrased/quoted from `_context/facts.json` and `DOSSIER.md` only (§5, §6,
§16). Every chart has a `source` string rendered next to it (e.g. "Source: CV, Decskill · Zara
Home role") plus a `<details>`-hidden accessible `<table>` with the same numbers for screen readers
and JS-off / no-canvas fallback.
