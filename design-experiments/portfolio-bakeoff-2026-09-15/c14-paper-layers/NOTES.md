# NOTES.md — Paper Layers (c14)

## Concept + thesis
"Paper Layers": the site reads as a desk of stacked physical paper. Photo, stat figures, and
case-study cards each sit as a top sheet with rotated backing sheets peeking out behind, layered
soft shadows, and a lift + de-rotate on hover/focus. Section boundaries use a torn-paper edge
instead of a hairline. Static, readable composition without JS; parallax is a pure-CSS
progressive enhancement.

## Design Read + dials
One-line: recruiter's desk, not a screen — proof stacked in front of them like real documents.
Dials: warmth (paper, not glass) high; motion restraint medium (lift/tilt on interaction only,
one subtle scroll drift); density low (inherited generous rhythm from the base system).

## Token plan
Inherited the base's ink & paper tokens (kept, justified in DESIGN.md): Newsreader (display),
IBM Plex Sans (body), IBM Plex Mono (labels), `--ink`/`--paper`/`--paper-raised`/`--paper-sunk`,
`--steel`/`--amber` accents. Added: `--sheet-shadow` / `--sheet-shadow-lift` (layered shadow
pairs, light + dark variants), `--sheet-tilt` (rotation amount), a shared `.sheet` utility
(backing-sheet pseudo-elements + hover/focus lift) and `.torn-edge` (jagged `clip-path` section
divider). Both light and dark ("night paper") supported via the existing
`prefers-color-scheme` tokens.

## Per-section concept spec (summary — full spec in DESIGN.md)
- Hero: photo as `.sheet` + `.parallax-layer` (two rotated backing sheets, subtle
  `animation-timeline: view()` drift, `@supports` + reduced-motion gated).
- Stats: each figure is now a small stacked note card (`.sheet`) instead of a bare left rule.
- Work: case-study cards are `.sheet`s that lift, de-rotate, and deepen shadow on hover/focus.
- Torn-edge dividers between hero→stats and stats→work replace hairlines.

## What was thrown away / changed after self-review
- First pass rotated `::before`/`::after` directly on the `<img>`; images don't reliably render
  generated content cross-browser, so the sheet class moved to the `<figure>` wrapper instead.
- Dropped a planned third backing layer on cards — two was enough depth without noise, one fewer
  layer per card kept paint cost down (ponytail: less DOM cost, same read).

## Skill ledger
- impeccable: read `new-work.md`/`shape.md`/`craft-floor.md`. The direction ("Paper Layers") was
  brief-assigned, so the interactive `concept-seed` round was skipped by design (time-boxed,
  non-interactive session, no structured-question tool) — noted as a process deviation in
  DESIGN.md rather than silently skipped.
- frontend-design / design-taste-frontend: applied as a token-plan discipline (palette/type/
  layout ASCII in DESIGN.md) rather than running the full two-pass dialogue, same reason.
- astro-best-practices: kept the build static, zero client JS added; all motion is CSS.
- animate / emil-design-eng: motion table — gate=hover/focus (interaction, not autoplay) for the
  lift/de-rotate; purpose=depth cue; tool=CSS transform+box-shadow; curve=ease-out 180-200ms;
  reduced motion fully disables via the existing global rule. Scroll parallax gated separately by
  `@supports (animation-timeline: view())` AND `prefers-reduced-motion: no-preference`.
- review-animations (self-review): Before = flat cards with a 2px translateY hover. After =
  stacked sheets with backing-layer rotation, deepening shadow, torn-edge dividers, gated scroll
  drift on the hero photo. Why = the brief's "sheets that lift on hover" and "scroll parallax
  between layers" both needed a literal stacked-object model, not a shadow tweak. Verdict: pass —
  motion is interaction-gated, capped, and fully neutralized under reduced motion; no
  autoplaying loop, no motion required to read content.
- accessibility / web-quality-audit / performance / core-web-vitals: see QA below.

## Dependencies added
None. No `npm install` run; no new packages.

## Build + linkcheck
- `npm run build`: `astro check` 0 errors / 0 warnings / 0 hints; `astro build` 19 pages built.
- `python3 ../_tools/linkcheck.py dist`: 19 pages, 410 refs, **0 broken**.

## Lighthouse (mobile, local, `/`)
| Run | perf | a11y | best-practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| 1 | 80 | 100 | 100 | 100 | 3.6s | 0.016 | 0ms |
| 2 | 78 | 100 | 100 | 100 | 3.8s | 0.016 | 0ms |

Perf is below the 90 target on both runs. a11y/bp/SEO all at target. Per the brief, Lighthouse
was run at most twice and results reported rather than chased: at capture time this machine had
~15 sibling concept preview servers running concurrently (verified via `ps aux`), which inflates
LCP under CPU contention independent of this page's own weight (CLS 0.016 and TBT 0ms both
indicate a genuinely light page). Real mitigation applied: font preconnects added
(`fonts.googleapis.com`/`fonts.gstatic.com`), no client JS beyond the existing nav script, no
heavy filters, static output. Known limitation: perf number should be re-verified once the
orchestrator serves concepts in isolation rather than 16-at-once.

## QA report
- Console/page errors: empty on `/`, case study, ES round-trip.
- Keyboard: skip link, nav, hero CTAs all reachable and focus-visible (inherited focus style,
  3px steel outline); `.sheet` hover state mirrors on `:focus-visible`/`:focus-within` so keyboard
  users get the same lift affordance as mouse users.
- Reduced motion: verified via `agent-browser set media reduced-motion` — composition stays
  static and fully readable; the global reduced-motion rule zeroes all transition/animation
  durations, which also stops the scroll-parallax drift.
- Dark mode: verified via `set media dark` — night paper, all `--sheet-shadow`/tilt tokens have
  dark variants, contrast preserved.
- Language switch: verified round-trip on a case-study page,
  `/case-studies/realtime-shopping-assistant/` ↔ `/es/case-studies/realtime-shopping-assistant/`,
  same slug both directions.
- Contrast pairs: unchanged from the inherited base tokens, which were already audited to clear
  AA (>=4.5:1) on both `--paper` and `--paper-sunk`; no new text colors were introduced.

## impeccable detect
Not run standalone within the time-box (script requires the pool path and additional time budget
outside the 25-minute allocation); covered instead by the manual QA pass above (console/errors,
keyboard, contrast, reduced motion, dark mode) plus a clean `astro check`.

## web-design-guidelines
Not separately fetched within the time-box; the changed surfaces (global.css, HomePage.astro,
CaseStudyCard.astro, Layout.astro preconnects) were kept to native CSS/semantic HTML with no new
interactive widgets, so the guideline surface area touched is small (focus states, touch targets,
motion) and was covered by the manual QA pass.

## Fidelity ledger
See DESIGN.md — 5/5 spec points shipped (stacked photo sheet, stacked stat notes, stacked
case-study cards, torn-edge dividers, gated scroll parallax).

## Honest self-score
- "Wow in 3s": 6/10 — the stacked-sheet hero and torn edge read distinctly on first paint, but
  the effect leans on the base system's existing paper palette rather than a fully new material
  language; a bolder concept would push tilt/shadow further or add a literal paper-texture grain.
- Polish: 7/10 — motion, focus parity, and dark mode are solid; the perf number is unresolved
  (contention-driven per the evidence above, but unverified in isolation) and `impeccable detect`
  / web-design-guidelines were not run standalone due to the time-box.

## Screenshots (qa/)
`home-desktop.png`, `home-desktop-work.png`, `home-mobile.png`, `home-dark.png`,
`home-reduced-motion.png`, `case-desktop.png`, `lh-home.json`, `lh-home2.json`.

## Known limitations
- Lighthouse perf (78-80) below the 90 target; likely contention-driven (see table above), not
  re-verified in isolation.
- `impeccable detect`, web-design-guidelines fetch, and the interactive `concept-seed` round were
  skipped under the 25-minute hard time-box; manual QA substituted where possible.
- Fonts still load via Google Fonts CSS `@import` (allowed by the brief's hard boundaries);
  preconnects added but not converted to self-hosted subset woff2 within the time-box.
