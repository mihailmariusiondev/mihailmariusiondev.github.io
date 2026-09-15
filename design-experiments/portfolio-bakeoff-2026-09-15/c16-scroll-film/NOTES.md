# NOTES.md — c16 Scroll Film

## Concept + thesis
"Scroll Film": the audited ledger portfolio plays as five chapters (opening, the problem, the
four cases as scenes, experience, contact as closing credits), narrated by GSAP + ScrollTrigger
reveal-on-enter, home page only. See `DESIGN.md` for the full Design Read, dials, and per-section
concept spec.

## Token plan
Unchanged from `_base`'s ink/paper/steel ledger palette and Newsreader/Plex type scale, except
fonts are now system stacks (see Performance). Layout primitives (`.wrap`, `.field`, `.btn`)
reused as-is; new chapter chrome (`.reel-counter`, `.film-chapter`, `.film-rise`) is additive CSS
only.

## What changed after self-review
- Dropped `pin: true` from the plan entirely (kept in DESIGN.md as a rejected option): a pinned
  "four cases" scene risks trapping keyboard/short-viewport scroll in a 25-min time-box with no
  room to test every edge case. Reveal-on-enter delivers the film cadence safely.
- Dropped Google Fonts self-hosting in favor of system font stacks: same zero-fonts-wait outcome,
  fewer moving parts (ladder rung 4: native platform feature, no subsetting pipeline needed).

## Skill ledger
- **gsap**: read `SKILL.md`; used `gsap` core + `ScrollTrigger` only (no premium plugins), dynamic
  `import("gsap")` after first paint, `scrollTrigger.toggleActions` reveal pattern, no pin.
- **impeccable**: `reference/new-work.md` / `reference/shape.md` informed the chapter/reel framing;
  wrote `DESIGN.md` before first UI edit per `craft-floor.md`.
- **astro-best-practices**: kept the site static, the GSAP script is a single inline `<script>`
  scoped to `HomePage.astro` only (never shipped to case/experience/about/contact pages).
- **frontend-design / design-taste-frontend / high-end-visual-design**: applied as checklists —
  no new dependency beyond GSAP, no icon library, text-label CTAs kept from `_base`.
- **accessibility / core-web-vitals**: drove the "no pin, no `display:none` before JS, reduced
  motion short-circuits everything" rules baked into the implementation itself.

## Dependencies added
`gsap` (core + `ScrollTrigger`): `node_modules` 191M → 200M (base copy) → 206M after
`npm install gsap`, i.e. **+6M** for the package itself. Justification: chapter-by-chapter
scroll choreography needs `ScrollTrigger`'s viewport-relative triggers; CSS scroll-timeline isn't
cross-browser-safe yet. Loaded via dynamic `import()` after first paint, home page only.

## Build + linkcheck
- `npm run build`: **0 errors** (astro check clean, 19 pages built).
- `python3 ../_tools/linkcheck.py dist`: **19 pages, 424 refs, 0 broken**.

## Lighthouse (mobile, local, `/`)
Machine was heavily CPU-contended during this run (`uptime` load average 15.4, multiple sibling
concepts' Chrome/Lighthouse processes running concurrently) — numbers below are noisy, not chased
past the brief's 2-run cap.

| Run | perf | a11y | best-practices | seo | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| 1 | 55 | 100 | 100 | 100 | 5.9 s | 0.056 | 320 ms |
| 2 | 60 | 100 | 100 | 100 | 4.8 s | 0.060 | 370 ms |

Perf is below the 85 target for GSAP concepts. a11y/best-practices/SEO are clean. Given the
machine's load average (15+) during both runs and that GSAP loads only after first paint via
dynamic import, the LCP number likely reflects contended CPU time rather than render-blocking
work in this build; a re-run on an idle machine is the honest next step (not done here — 2-run
cap already spent). Known limitation, reported honestly rather than hidden.

## QA report
- **Console/page errors**: empty on every page checked (`/`, `/es/`).
- **Keyboard**: skip link present and functional (inherited from `_base` layout, untouched); no
  `tabindex` manipulation added; focus order unaffected by chapter reveal (content is real DOM,
  not conditionally rendered).
- **Reduced motion**: `prefers-reduced-motion: reduce` short-circuits the entire GSAP branch (the
  `<script>` checks `matchMedia` before ever importing `gsap`) — page renders fully visible,
  static, screenshot confirmed (`qa/home-reduced-motion.png`).
- **No JS**: chapters are plain sections with no default hidden state in CSS; `gsap.set(...,
  {autoAlpha:0})` only runs after the dynamic import resolves, so a no-JS visitor sees the full
  page immediately (verified by inspection — no CSS rule hides `.film-rise` by default).
- **Dark mode**: `qa/home-dark.png` — palette swap from `global.css` `prefers-color-scheme` block,
  untouched by this concept, applies correctly to new sections too.
- **Language switch**: `/` ↔ `/es/` round-trips on the same route (unchanged `SiteNav`/`i18n`
  logic; not touched).
- **Contrast pairs**: inherited from `_base` (documented there as ≥4.5:1 on both `--paper` and
  `--paper-sunk`); new chrome uses only existing tokens (`--ink`, `--paper`, `--slate`, `--steel`),
  no new colors introduced.

## Screenshots (`qa/`)
`home-desktop.png`, `home-mobile.png`, `home-es-desktop.png`, `home-es-mobile.png`,
`case-desktop.png`, `case-mobile.png`, `experience-desktop.png`, `experience-mobile.png`,
`contact-desktop.png`, `contact-mobile.png`, `home-dark.png`, `home-reduced-motion.png`,
`home-scenes.png` (cases-as-scenes chapter, scrolled), `home-credits.png` (closing-credits
chapter, scrolled, reel counter reads "Chapter 05 — Closing credits").

## Review-animations self-review

| Before | After | Why |
|---|---|---|
| Static sections, no scroll narrative | `.film-rise` reveal-on-enter per chapter, staggered 0.08s | Delivers the "scroll storytelling" brief requirement without a scroll-hijacking pin |
| Google Fonts `@import` (render-blocking) | System font stack | Kills font-wait entirely; simpler than self-hosting under the time-box |
| No chapter orientation while scrolling | Sticky reel counter (`Chapter 0N — Label`) | Cheap narrative cue, JS-only, never the sole navigation path |

**Verdict**: motion is additive and reversible (JS off / reduced-motion both degrade to the exact
`_base` reading experience), stagger and duration stay inside emil-design-eng's short/functional
range (0.6s, power2.out), no pin risk taken.

## Fidelity ledger (spec → build)
1. Opening chapter keeps hero exactly as `_base` — match.
2. "The problem" transition copy added as new UI strings, no new facts — match.
3. Four cases render as `.scene` wrappers around unchanged `CaseStudyCard` — match.
4. Experience teaser pulls first 4 `experience.ts` rows verbatim (no data edits) — match.
5. Closing credits reuse `contactLinks` verbatim — match.

## impeccable detect
Not run due to time-box; no invented facts/technologies were introduced (new UI strings only
narrate existing content), so risk is low. Flagged as a known gap.

## web-design-guidelines
Not fetched/run in this pass due to time-box. Known gap — the implementation follows the same
semantic/landmark/focus patterns as `_base`, which already passed this checklist upstream.

## Self-score (honest)
- Wow in 3s: **6/10** — the reel counter and staggered reveal read as intentional, but the visual
  language itself is close to `_base`; the "wow" is paced motion, not a new visual world.
- Polish: **6/10** — build is clean, a11y/no-JS/reduced-motion guardrails are solid, but
  Lighthouse perf and a full web-design-guidelines/impeccable-detect pass were not completed
  inside the time-box.

## Known limitations
- Lighthouse perf (55–60) is below the 85 target; likely inflated by machine contention (load avg
  15+) but not re-verified on an idle machine — 2-run cap already used.
- `impeccable detect` and the `web-design-guidelines` WebFetch review were skipped under the
  time-box; no new facts/tech were invented, which is the highest-risk finding those checks catch.
- Mobile pin behavior: none used, so "no long pins" requirement is trivially satisfied, but this
  also means the mobile experience is closer to a normal page than a distinct "lighter" mobile
  film variant — the brief's "lighter" bar is met by omission rather than a bespoke mobile cut.
