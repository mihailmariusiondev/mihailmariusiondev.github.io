# DESIGN.md — s06 Kinetic Editorial Magazine

## One line
A single-scroll editorial "issue" about Marius: a huge kinetic masthead cover, a table of contents,
five spreads (verified numbers, four feature articles, career chronology, letters/recommendations,
masthead+colophon), set in two self-hosted variable fonts whose weight/optical-size axes react to
scroll velocity and cursor proximity.

## Why it's wow
- The name on the cover is a live variable-font instrument: `font-variation-settings` on `wght`/`opsz`/
  `SOFT` responds continuously to cursor distance (desktop) and to scroll velocity everywhere else —
  type that behaves like it's under editorial pressure, not just animated once.
- Real magazine craft, not a skin: drop caps, pull quotes pulled verbatim from the real recommendations,
  a running masthead/issue line, a colophon, a rule-based grid that inverts left/right per feature
  (odd/even spreads), dashed outcome rules.
- Feature spreads reveal with a clip-path "page lift" on scroll (GSAP + ScrollTrigger), not a generic
  fade-up.
- Fully grounded copy: every number, quote, employer and date traces to `_context`; nothing from the
  RETRACTED list appears (no "catalog of backend tools", no "replaced legacy guides", no "Mateo", no
  "international agricultural client").

## Art direction
Newsprint palette: warm paper (#f2ede3), near-black ink, one red spot color used only for numbers,
pull-quote rules, drop caps and the language pill. Fraunces Variable (serif, wght+opsz+SOFT+WONK) for
all display type; Space Grotesk Variable (sans, wght) for UI chrome, labels, body meta. Swiss-brutalist
structural cues: hairline rules, uppercase kickers, folio numbers, a hard grid that still breaks (drop
cap floats out of the column, odd/even spreads swap sides).

## Stack & deps (bytes)
- Astro 4 (static build, copied `node_modules`/`astro`/`typescript` from `_base` per brief) — zero
  runtime framework, just HTML/CSS + two small scripts.
- `gsap` (ScrollTrigger only) for scroll-velocity kinetic type and spread reveals — chosen because
  hand-rolling a scroll-velocity-to-CSS-variable pipeline with cross-browser scrub timing is exactly
  what ScrollTrigger already solves; the alternative was a bespoke IntersectionObserver + rAF
  velocity tracker, more code for a worse result. Bundled JS: ~117 KB raw / ~46 KB gzip (single
  hoisted script, includes gsap core + ScrollTrigger).
- `@fontsource-variable/fraunces` and `@fontsource-variable/space-grotesk` — installed for their
  source `.woff2` files only; the actual site loads a **hand-picked subset**: latin + latin-ext
  woff2-variations files copied into `public/fonts/` (italic, vietnamese, cyrillic axes dropped).
  Total font payload ≈ 270 KB across two full variable families (wght+opsz+SOFT+WONK for Fraunces).
- No client framework, no CSS framework, no analytics/tracking.

## Bilingual & routing
Two static routes: `/` (EN) and `/es/` (ES), same `Page.astro` component parameterized by `lang`,
content pulled from one bilingual data file (`src/data/content.ts`). A fixed top-bar pill switches
language, always visible via `mix-blend-mode: difference` so it reads over any background.

## Accessibility & motion
- `prefers-reduced-motion: reduce` disables all ScrollTrigger kinetic-weight tweening, the cover
  cursor-reactive type, the custom cursor dot and the clip-path spread reveal; content lands in its
  final state immediately (all `.reveal` elements get `is-visible` synchronously).
- Visible focus rings (`:focus-visible`, red outline), skip link, semantic headings in document order,
  `lang` set per page, real `<blockquote>`/`<figure>` for quotes, all body copy meets AA contrast on
  the paper background.
- Content is fully readable with JS disabled or fonts unavailable (system serif/sans fallbacks in the
  font stacks); nothing depends on WebGL.

## Known limitations
- No page-router transitions between EN/ES (language switch reloads to the equivalent page) — a
  deliberate simplification; a client-side crossfade was scoped out as unnecessary polish for a
  same-page toggle.
- Kinetic weight axis is a visual flourish layered on top of otherwise static, readable text; it never
  changes hierarchy or content order, only style.
