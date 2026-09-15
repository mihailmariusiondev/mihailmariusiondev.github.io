# NOTES.md

## Skill ledger
- frontend-design / design-taste-frontend / high-end-visual-design: informed palette (one accent
  pair, not rainbow charts), type pairing, avoiding generic "AI dashboard" look.
- impeccable (craft-floor, typeset, layout, colorize): focal type scale, spacing rhythm, contrast.
- accessibility: every chart has a real `<table>` fallback, visible focus states, skip link,
  `aria-live` off (static after load), reduced-motion branch.
- performance: no framework, no webfonts blocking render (font-display swap + system fallback), all
  images `loading="lazy"` except hero photo, SVGs inline (no extra requests).
- animate / find-animation-opportunities: scroll-reveal + bar-grow limited to chart entrance only;
  no gratuitous motion elsewhere; reduced-motion disables all of it.
- astro-best-practices: deliberately NOT used — no build tooling needed for a single static page
  (see DESIGN.md "Stack & why").

## Build
No build step. `index.html` + `es/index.html` are the source AND copied verbatim into `dist/`.

## QA evidence
- `qa/en-desktop.png` / `qa/en-mobile.png` — first viewport, via `firstview.cjs`. Console: clean.
- `qa/en-full.png` — full-page desktop (note: below-the-fold sections show as their reveal-hidden
  state here since the tool doesn't scroll; real per-section captures below).
- `qa/en-timeline.png`, `qa/en-signals.png`, `qa/en-cases.png`, `qa/en-recs.png`, `qa/en-about.png`,
  `qa/en-contact.png` — scrolled-into-view captures of every section (custom `qa/shot.cjs`, waits
  1.2s for the reveal transition), all render correctly, console clean on every run.
- `qa/es-desktop.png` — Spanish after clicking the language toggle (client-side, no reload):
  nav, hero, CTAs, chart cards all translate correctly.
- `qa/mobile-en.png` — 390×844 first viewport, no horizontal overflow.
- `qa/reduced-motion.png` — `prefers-reduced-motion: reduce` emulated: bars render at their final
  width immediately (no animation), confirmed via the `reduced()` branch in `charts.js`.
- `qa/case-expanded.png` + `qa/interact.cjs` — case-study `<details>` toggle opens on click,
  zero console errors.
- Lighthouse (`_tools/lh.sh`, one run, shared/noisy machine per brief):
  first run `a11y=94` flagged two real bugs (`color-contrast` on `--ink-dimmer` text, `heading-order`
  h2→h4 skip in the skills column) — both fixed (`--ink-dimmer` brightened to `#8b93a3`, skills
  headings changed to `h3`). Second run: `perf=53 a11y=100 bp=100 seo=100`, CLS=0.001.
  Performance's low score traces to `mainthread-work-breakdown≈20s`, implausible for a page with
  no framework and a handful of DOM writes — consistent with CPU contention on the shared bake-off
  machine (16 agents building in parallel), not a real page-weight problem. Not chased further per
  brief: "wow beats a perfect Lighthouse score."

## Bug found and fixed during QA
Chart labels in the two-bar "before/after" SVG (`renderBeforeAfter`) originally sat to the right of
the bar and overflowed the chart card, getting clipped (e.g. "570 KB" cut mid-word). Fixed by moving
every bar label above its bar (matches the style already used in the other chart types).

## Self-score (honest)
- Wow: 7/10. The honest-data-only framing and the sourced/tabled charts are a genuinely different
  read on a CV than the other 15 will produce; the ceiling here is the chart variety (6 chart shapes,
  all bars/gauges/proportions — no scatter, no map, no true "explorable" brushing interaction beyond
  hover/tables) and a reveal-on-scroll that's tasteful but not a full pinned scrollytelling engine.
- Polish: 8/10. Consistent type/color system, working bilingual toggle, accessible tables behind
  every chart, zero console errors, a11y 100 after fixes, real reduced-motion path.
- Known limitations: charts are hand-rolled SVG (bars, one radial gauge, one proportion bar), not a
  general charting engine — deliberate (ponytail: no d3 needed for 6 simple shapes); no
  pinned/sticky-step scrollytelling, just IntersectionObserver reveal (kept simple to avoid jank on
  low-end phones); language toggle is a client-side text swap rather than `/es/` routing (satisfies
  "own routing/toggle" per brief, but means the two languages aren't separately linkable URLs).
