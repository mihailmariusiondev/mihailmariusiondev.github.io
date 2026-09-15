# NOTES.md — c13 Atlas Map

## Concept + thesis
The career as a transit-line map: one drawn SVG line, eight companies as stations, current role
as the filled terminus. Legible as a single journey in 3 seconds, degrading gracefully to a plain
vertical rail on mobile and a fully-static map under reduced motion.

## Design Read + dials
"A metro map of a career: one line, one glance." Density medium (one row, no clutter). Motion:
draw-on-load line + staggered station reveal, both pure CSS (no JS at all — content and links are
always in the DOM). Voice: same precise ink/paper/steel system as the audited base, transit
iconography (station dots, terminus ring) replaces card chrome for this one section.

## Token plan
Reused the base's already-audited tokens verbatim: `--ink #0b0d10` / `--paper #f7f6f3` /
`--steel #2f5680` (the "line" colour), Newsreader + IBM Plex Sans + IBM Plex Mono, existing fluid
type scale and spacing scale. No new tokens added — the concept is a new component, not a new
system.

## Per-section concept spec (Atlas Map)
- Composition anchor: single horizontal SVG line spanning the section, stations evenly spaced
  below it via flexbox `justify-content: space-between`.
- Background: flat paper, no photo — the line + station nodes are the visual.
- Stations: one `<a>` per `experience[]` entry (8 roles, oldest→newest left to right), label =
  company (+ client) + period, no invented per-role cities (only the audited "Remote/hybrid from
  Zaragoza" caption above the line).
- Type: mono `--step-micro` labels, current role gets `--step-small`-equivalent weight bump +
  filled ring ("you are here").
- Motion: `stroke-dasharray`/`-dashoffset` CSS `@keyframes` draw (1.6s), staggered station
  fade/translate-in (`animation-delay: calc(0.25s + i*0.09s)`). Mobile: line becomes a vertical
  rail (`::before` scaleY draw) via a `max-width: 47.999rem` media query, same station data.
- Reduced motion: explicit `@media (prefers-reduced-motion: reduce)` block in the component sets
  the finished state directly (dashoffset 0, opacity 1, scaleY 1) — see "what changed" below for
  why this couldn't rely on the global rule alone.

## What was thrown away / changed after self-review
- Dropped a per-role "city per employer" idea (Madrid, etc.): not present in `src/data` or the
  CV, would have been invented geography — kept only the one audited location fact.
- **Bug caught in QA, fixed before hand-off**: the global `prefers-reduced-motion` rule in
  `global.css` only zeroes `animation-duration`, not `animation-delay`. With per-station staggered
  delays up to ~1s, a reduced-motion screenshot taken right after load showed only the first two
  stations rendered — the rest were still "waiting" on their delay before snapping to their
  (near-instant) final state. Fixed with an explicit `@media (prefers-reduced-motion: reduce)`
  block in `AtlasMap.astro` that sets `animation: none` and the finished values directly, so the
  map is genuinely static on first paint, not eventually-consistent.

## Skill ledger
- impeccable (context/new-work/shape): read for the "one memorable idea, drawn concept spec"
  method; wrote the per-section spec above before touching code.
- frontend-design / design-taste-frontend: applied as a two-pass check — density/motion/voice
  dials — against the brief; no separate token system needed since the base's is already audited
  and on-brand, reused as-is (ladder step 2: reuse what's already in the codebase).
- astro-best-practices: static-only component, scoped `<style>`, no client directives, no JS
  shipped for the animation (CSS-only).
- animate / emil-design-eng: motion table applied inline — gate (on load, above the fold, no
  IntersectionObserver needed since it's already visible), purpose (reveal the "line" metaphor),
  curve (`ease-out`, short 0.5–1.6s), reduced-motion (explicit override, see bug above).
- review-animations (self-review): Before = staggered stations relying only on the global
  reduced-motion duration override → invisible content mid-delay under reduced motion (caught via
  the actual QA screenshot, not guessed). After = explicit component-level override, finished
  state on first paint. Verdict: pass after the fix; motion is otherwise decorative-only, gated,
  and never blocks content (all stations are real `<a>` links in the DOM regardless of animation
  state).
- Given the hard 25-minute time-box, `impeccable detect`, `web-design-guidelines` WebFetch and a
  separate `astro check`-only pass were not run as discrete steps; `astro check` runs as part of
  `npm run build` (0 errors, reported below) and the a11y skill's targets (landmarks, skip link,
  focus, contrast) were carried over unchanged from the already-audited base.

## Dependencies added
None. No `npm install` — the concept is one new `.astro` component plus edits to two existing
files (`ui.ts`, `Layout.astro`, `HomePage.astro`).

## Build + linkcheck
- `npm run build`: `astro check` → 0 errors, 0 warnings, 0 hints; `astro build` → 19 pages built.
- `python3 ../_tools/linkcheck.py dist`: 19 pages, 487 refs, 0 broken.

## Lighthouse (mobile, local, machine CPU-contended — run twice per brief, not chased further)
| Run | Perf | A11y | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| 1 (`qa/lh-home.json`) | 77 | 100 | 100 | 100 | 3.9s | 0.016 | 10ms |
| 2, after font preconnect + hero preload (`qa/lh-home2.json`) | 79 | 100 | 100 | 100 | 3.7s | 0.016 | 90ms |

A11y 100 and SEO 100 hit target both runs. Performance sits at 77–79, below the 90 target;
applied one fix between runs (preconnect to Google Fonts, `<link rel=preload as=image>` for
`me.webp`) which moved LCP from 3.9s→3.7s but not past 90 — on this contended machine the two
runs' TBT moved 10ms→90ms with no code change in that dimension, consistent with noise. Known
limitation, see below.

## QA report
- Console: empty on `/`, `/es/`, one case study (checked via `agent-browser ... console` /
  `errors`, both empty).
- Keyboard: all 9 atlas stations and both hero CTAs are real `<a>` elements with the site's
  existing visible focus ring (`outline: 3px solid var(--steel)`); skip link present unchanged
  from base.
- Reduced motion: verified via `agent-browser set media reduced-motion` + screenshot — map is
  fully drawn and all 9 stations visible on first paint after the fix above (`qa/home-reduced-motion.png`).
- Dark: verified via `set media dark` — palette, line colour and current-station ring all keep
  contrast (`qa/home-dark.png`).
- Language switch: `/` ↔ `/es/` round-trips on the same page (checked the nav switcher target
  path); Atlas Map heading/caption/station periods all localized via `Localized<T>` + `t()`.
- Contrast pairs: unchanged from the already-audited base tokens (`--slate` / `--ink` on `--paper`
  and `--paper-sunk`, both ≥ 4.5:1 per the base's own token comments); the new `.atlas__period`
  text reuses `--slate-quiet` on `--paper`, same as `.hero__location`, already in that audited set.

## Impeccable detect / web-design-guidelines
Not run as separate passes given the 25-minute time-box (see Skill ledger); the component reuses
the base's already-detected-clean CSS primitives (`.wrap`, `.eyebrow`, focus rules) rather than
introducing new patterns that would need a fresh pass.

## Fidelity ledger (spec → shipped)
1. Single drawn SVG line, on load — shipped, CSS `@keyframes` stroke-dashoffset. Match.
2. Stations keyboard-focusable, visible labels — shipped as `<a>` with always-visible mono labels.
   Match.
3. Reduced motion → static drawn map — shipped, fixed after catching the delay bug. Match.
4. Mobile reflow to vertical line — shipped as a CSS rail with the same 8 stations. Match.
5. No invented locations — shipped: single audited "Remote/hybrid from Zaragoza" caption only.
   Match.
6. Fonts: kept base's Google Fonts `@import` (not self-hosted), added preconnect only — deviation
   from the ideal "self-hosted woff2 + preload" given the time-box; flagged below.

## Honest self-score (1-10)
- "Wow in 3s": 7 — the line + drawn stations reads immediately as "a career map," distinct from
  every card-grid portfolio, but the desktop station row is dense at 8 stops and could use one
  more pass on label truncation for the longest company names.
- Polish: 7 — motion, reduced-motion and mobile reflow are all real and correct; performance is
  short of the 90 target and a full impeccable/web-design-guidelines pass wasn't run.

## Screenshot list (`qa/`)
`home-desktop.png`, `home-desktop-atlas.png`, `home-mobile.png`, `home-mobile-atlas.png`,
`home-es-desktop.png`, `case-study-desktop.png`, `home-reduced-motion.png`, `home-dark.png`,
`lh-home.json`, `lh-home2.json`.

## Known limitations
- Lighthouse mobile performance 77–79, below the 90 target; the machine was CPU-contended
  (multiple other concepts' Chrome/Astro processes running concurrently, confirmed via `ps aux`
  during QA) and Lighthouse was run only twice per the brief's guardrail. Next step if revisited:
  self-host a woff2 subset instead of the Google Fonts `@import`, and profile whether the hero
  photo's decode time (640×640 webp) is the larger LCP factor.
- Agent-browser session note: the literal session name `bakeoff-c13` failed to launch Chrome on
  every attempt (`ozone_platform_x11` error, "Missing X server") even with `AGENT_BROWSER_HEADED=false`
  and no `DISPLAY` set, while every other session name (including `bakeoff-c13-test`) launched
  immediately — reproduced 4 times. QA was run under `bakeoff-c13-run` instead; that session was
  closed at hand-off. Flagging this as a tooling quirk, not a site issue.
- `impeccable detect`, a dedicated `web-design-guidelines` WebFetch pass, and a separate a11y-only
  audit were not run as discrete steps inside the 25-minute time-box; a11y/SEO/best-practices all
  scored 100 in Lighthouse regardless, and the new component only reuses already-audited base
  primitives.
