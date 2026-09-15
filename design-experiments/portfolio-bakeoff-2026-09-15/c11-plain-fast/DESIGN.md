# DESIGN.md — Plain Fast

## Thesis
Speed is the visual identity, not a caveat bolted onto a slow-looking site. System
fonts only (zero web-font requests), near-zero JavaScript, native cross-document
View Transitions, Speculation Rules prefetch/prerender, and an honest live readout
of the page's own measured load time and weight, taken from the Performance API in
the visitor's own browser. Nothing invented, nothing simulated.

## Design Read (one line)
An engineering instrument, not a brochure: ink-on-paper editorial layout, monospace
data voice, and the page proving its own claim about speed in real time.

## Three dials
- **Density**: medium. Generous rhythm (`--space-4`/`--space-5`) but data rows
  (`.field`, stats) run tight and tabular — this is a technical record, not a
  marketing spread.
- **Warmth**: cool/neutral. Paper/ink base with a single steel-blue accent for
  links, CTAs and the verified-results rule. No gradients, no warm accents.
- **Voice**: precise/quiet. System sans for prose, system mono for labels, data
  and the perf readout — the monospace signals "measured", not "styled".

## Token plan
- **Palette**: `--ink #0b0d10` / `--paper #f7f6f3` / `--paper-sunk #efede7`,
  accent `--steel #2f5680` / `--steel-dark #244562`, amber only for the
  "verified" badge. Full dark-mode pair inherited from base, re-verified.
- **Type**: `--font-body`/`--font-display` = `system-ui, -apple-system, "Segoe UI",
  Roboto, "Helvetica Neue", Arial, sans-serif` (one stack for both — no serif to
  license a second voice). `--font-mono` = `ui-monospace, "SF Mono", "Cascadia
  Mono", "Segoe UI Mono", Consolas, "Liberation Mono", monospace`. Zero
  `@import`, zero `<link rel="preconnect">` to a font host. Headings moved to
  weight 700 (was 500 on the serif) so hierarchy survives without a display face.
- **Layout** (ASCII, desktop hero):
  ```
  [Name/role]                         [Work Experience About Contact] [ES]
  ------------------------------------------------------------------------
  Enterprise frontend for                                    [portrait]
  e-commerce, banking, education.
  Senior Angular / Frontend Engineer
  <lede>
  [View case studies] [Download CV] [LinkedIn] [GitHub]
  <location line>
  ------------------------------------------------------------------------
  This page loaded in <N> ms and weighs <N> KB — measured in your browser, now.
  ```
- **Principles**: no web fonts; one JS budget line (the perf readout, ~50 lines,
  no framework); declarative browser hints (`@view-transition`, speculation
  rules) over hand-rolled JS; every visible number is either from `src/data/*`
  or read live from `performance.*`.

## Per-section concept spec (summary)
- **Header/nav**: sticky hairline top bar, flat opaque background (no
  `backdrop-filter` — a blurred glass panel is a compositing cost paid every
  scroll frame for decoration; removed for both principle and measured TBT).
  `view-transition-name: site-header` keeps it visually stable across
  cross-document navigations.
- **Hero**: h1 carries the role line inline (no eyebrow-above-heading kicker),
  portrait fixed-size to avoid CLS, CTAs as flat bordered buttons, then the perf
  readout as the section's closing line — the "wow" beat, placed where a
  recruiter's eye already lands after the CTAs.
- **Stats / case studies / experience / about / contact**: unchanged in
  structure from the base (already a strong "verified ledger" pattern with
  `.field` definition rows); only the type/font/motion system changed.

## What I threw away or changed after self-review
- Removed `@import url(fonts.googleapis.com/...)` (Newsreader/IBM Plex): the
  concept's whole premise is zero web-font weight/requests.
- Removed the hero's `.eyebrow` line sitting directly above the `<h1>`
  (`impeccable`'s craft-floor bans a kicker-above-heading pattern); merged the
  role into the h1 group instead. Left the same `.eyebrow` styling on
  page-head labels elsewhere (Work, Experience, About, Contact) and on the
  `stats` heading, since there it *is* the heading (an `<h2>`), not a kicker
  sitting above one — lower-risk, and out of scope for this pass's time-box.
- Removed `backdrop-filter` from the sticky header after Lighthouse traced
  17.7 s of Style & Layout main-thread work to it under CPU-throttled
  headless Chrome; a flat background is free.
- Headings moved from weight 500 to 700 to keep the type scale legible without
  a serif display face to lean on.

## Dependencies
None added. `package.json` unchanged (`astro`, `@astrojs/check`, `typescript`
only, inherited from `_base`).
