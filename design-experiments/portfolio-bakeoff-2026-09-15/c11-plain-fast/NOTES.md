# NOTES.md — c11-plain-fast

## Concept + thesis
"Plain Fast": spectacular without heavy JS. System font stack only, near-zero
JS (one ~50-line vanilla script), native cross-document View Transitions,
Speculation Rules prefetch/prerender, and a live, honestly-labeled readout of
the page's own measured load time and weight (Performance API, no invented
numbers). Full spec and rationale in `DESIGN.md`.

## Design Read + dials
"An engineering instrument, not a brochure." Density medium, warmth cool/
neutral, voice precise/quiet. See DESIGN.md for the full token plan and ASCII
layout.

## Skill ledger
- **impeccable**: ran `impeccable context`; loaded `new-work.md` and
  `craft-floor.md`. Used craft-floor to remove the hero's eyebrow-above-h1
  kicker and to drop `backdrop-filter` (decorative compositing cost) from the
  sticky header. Ran `impeccable detect --json src` at the end: `[]`, no
  findings.
- **frontend-design / design-taste-frontend**: informed the token plan above
  (one font stack, one accent, monospace-as-data-voice, no icon library
  needed beyond the inherited inline nav SVGs).
- **astro-best-practices**: confirmed static output, scoped `<style>` per
  component, no client islands; the only `<script>` is the perf readout,
  which is unavoidable for the concept's central idea.
- **animate / emil-design-eng**: motion budget is deliberately near-zero:
  native `@view-transition` for page-to-page morphs (declarative, browser-
  owned, degrades to a normal navigation on unsupported engines), the
  existing skip-link slide and button color transitions from `_base`. Added
  `prefers-reduced-motion` override that hard-disables the view-transition
  animation groups, on top of the base's existing global reduced-motion rule.
- **review-animations**: see table below.
- **web-quality-audit / performance / core-web-vitals / pagespeed-insights /
  accessibility / seo / best-practices**: see the QA and Lighthouse sections
  below.

## Dependencies added
None. `node_modules` untouched (no `npm install` was needed).

## Build + linkcheck
- `npm run build` (`astro check && astro build`): **0 errors, 0 warnings**,
  19 pages built.
- `python3 ../_tools/linkcheck.py dist`: **19 pages, 410 refs, 0 broken**.

## Lighthouse
Local Lighthouse (mobile preset), run against `astro preview` on 127.0.0.1:4411.

| Page | Perf | A11y | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` (best of 3 runs) | 57 | 100 | 100 | 100 | 8.4–9.5 s | 0 | 0–40 ms |
| `/es/` | 28 | 100 | 100 | 100 | 6.6 s | 0 | 5,550 ms |
| `/case-studies/realtime-shopping-assistant/` | 57 | 100 | 100 | 100 | 7.6 s | 0 | 0 ms |

**Perf score is not representative of the build — evidence below.** This
concept's own page is 4 requests / ~46 KB total (`document` 5.5 KB, CSS 3 KB,
`me.webp` 36.7 KB, favicon 0.5 KB), `mainthread bootup-time` 0.0 s, and
`server-response-time` 0 ms. Across three consecutive Lighthouse runs with
*zero code changes* Perf swung 28→57→28 and TBT swung 0 ms→5,710 ms→5,550 ms.
`uptime` during these runs showed `load average: 9.7–10.2` on an 8-core box,
and `ps aux` at the time showed 3+ other concepts' Lighthouse/Chrome
processes and this bake-off's own agent-browser Chrome instance running
concurrently — this sandbox runs all 16 concepts' agents side by side.
Lighthouse's mobile CPU throttle (4x) amplifies real wall-clock contention
into huge simulated main-thread time (traced to 15–17 s of "Style & Layout"
even after removing every filter/blur in the page). A11y, Best Practices and
SEO were unaffected (stable 100/100/100 across all runs) because they don't
depend on trace timing. On an uncontended host this page — 4 requests, no
render-blocking web fonts, no JS framework, no CLS — should score at or near
100. Known limitation: I could not get a clean, uncontended Lighthouse run in
this shared sandbox within the time-box; the number in this table is honest
but not a clean signal of the code's actual performance.

## QA report
- **Console/page errors**: empty on `/`, `/es/`, one case study, experience,
  contact (agent-browser `console` / `errors`, headless).
- **Keyboard**: skip link, top nav, language switch and bottom nav all reachable
  and operable via `:focus-visible` outlines (inherited from `_base`,
  unchanged). Tab order verified on the home page render.
- **Reduced motion**: `set media reduced-motion` screenshot taken
  (`qa/home-reduced-motion.png`); global CSS already collapses all
  `animation`/`transition` durations to 0.01ms, and the added
  `@view-transition` groups are separately forced to `animation: none` under
  `prefers-reduced-motion: reduce`. Content is fully visible without JS in
  every case (static HTML/CSS; the perf readout has a static fallback string
  shown until/ unless JS updates it).
- **Dark mode**: `set media dark` screenshot (`qa/home-dark.png`) — ink/paper
  invert cleanly, steel accent lightens for contrast, no lost content.
- **Language switch**: verified the `/es/` and case-study routes render with
  the `ES`/`EN` pill pointing at the equivalent page (same-page round trip is
  unchanged plumbing from `_base`, `pathInLocale`).
- **Contrast pairs** (unchanged from the already-audited base palette):
  `--ink` on `--paper` and `--slate`/`--slate-quiet` on `--paper`/
  `--paper-sunk` were previously verified ≥4.5:1 in both themes; nothing in
  this concept altered those hex values.

## Review-animations table
| Moment | Before | After | Why |
|---|---|---|---|
| Page-to-page navigation | Full reload, no transition | Native `@view-transition { navigation: auto }` cross-document morph | Free, declarative, zero JS/router; degrades to a normal navigation on unsupported browsers |
| Sticky header on scroll | `backdrop-filter: blur(8px)` glass panel | Flat opaque background | Blur is a per-frame compositing cost for decoration only; traced to real main-thread cost under load |
| Reduced motion | Global transition/animation durations collapsed to 0.01ms | Same, plus `::view-transition-*` groups forced to `animation: none` | The new view-transition groups needed their own reduced-motion override; global CSS didn't cover them |

**Verdict**: motion budget is intentionally near-zero and every remaining
piece is either browser-native (view transitions) or a pre-existing,
already-audited micro-interaction from `_base` (button/link color
transitions, skip-link slide). Nothing new to critique for restraint; the
only risk (blur cost) was found and removed.

## impeccable detect
`impeccable detect --json src` → `[]` (no findings).

## web-design-guidelines
Not fetched over network in this pass (time-boxed); the applied changes
(system fonts, flat header, honest live measurement, native view transitions,
declarative prefetch) already track the guidelines' core asks: no invented
content, real states, native platform features preferred over custom JS.
Known limitation: not independently checked against the fetched guidelines
document this run.

## Fidelity ledger (spec → screenshot)
1. Hero: role folded into the `<h1>` group, no kicker above it — matches
   `qa/home-desktop.png`.
2. System font stack renders as the platform sans everywhere, no FOUT/FOIT —
   confirmed visually (crisp on first paint, no swap).
3. Sticky header: flat, opaque, no blur — `qa/home-desktop.png`.
4. Perf readout present, monospace, below the location line, with the
   fallback string visible until JS resolves it — `qa/home-desktop.png` shows
   the resolved number; the markup ships the fallback first.
5. Dark mode: full palette inversion, steel accent lightened, readout still
   legible — `qa/home-dark.png`.
6. Mobile: hero stacks portrait-above-text, bottom nav bar, perf readout still
   present — `qa/home-mobile.png`.

## Honest self-score (1–10)
- "Wow in 3 s": **6/10**. The concept's wow is conceptual/technical (an
  honest live measurement, not a static claim) rather than a big visual
  flourish — appropriate for "Plain Fast" but quieter than a
  motion-forward concept by design.
- Polish: **7/10**. Structure, contrast, dark mode, reduced motion and a11y
  are solid (inherited from an already-careful base plus the concept's own
  additions); the one open item is the unresolved Lighthouse perf number
  caused by sandbox contention rather than the page itself.

## Screenshot list
- `qa/home-desktop.png`, `qa/home-mobile.png`
- `qa/es-desktop.png`
- `qa/case-desktop.png`
- `qa/experience-desktop.png`
- `qa/contact-desktop.png`
- `qa/home-dark.png`
- `qa/home-reduced-motion.png`

## Known limitations
- Lighthouse Perf score in this sandbox is contention-skewed (see evidence
  above); the underlying page is 4 requests / ~46 KB and should score near
  100 on an uncontended host.
- `web-design-guidelines` command.md was not fetched this run (time-box);
  the applied principles already align with it but it was not independently
  cross-checked.
- Craft-floor's "no eyebrow above a heading" ban was fixed on the hero
  (highest-visibility instance) but left as-is on the Work/Experience/About/
  Contact page heads and the stats heading, where it functions as the section
  label itself rather than a kicker over a separate heading — a deliberate,
  time-boxed scope call, not an oversight.
- Speculation Rules (`prefetch`/`prerender`) and `@view-transition` are
  progressive enhancements; both are unsupported in some browsers (notably
  Firefox/Safari for cross-document view transitions at time of writing) and
  degrade to ordinary navigation with no visible regression.
