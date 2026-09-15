# NOTES.md — s03-scroll-cinema

## Status
Complete. All seven acts (hero/signal, origin reel, the turn, four case files,
verified results, transmissions, end card) are choreographed, real numbers
count up from source, both horizontal reels pin cleanly on desktop and become
native swipeable `scroll-snap` reels on mobile/reduced-motion, the EN/ES
toggle covers every string, and `dist/` is a fresh production build.

## Bug found and fixed this pass
The previous agent's build had GSAP `ScrollTrigger` `pin: true` on the two
horizontal reels (origin, transmissions), targeting an element nested inside
a `justify-content: center` flex ancestor with a dynamically-computed `end`
distance. GSAP's auto pin-spacer under-measured that distance (verified with
`ScrollTrigger.getAll()` in-page: reported `end` pixel was correct, but the
actual `.pin-spacer` DOM height stayed at the element's un-pinned natural
height, even after forced `ScrollTrigger.refresh()`). Net effect: the pin
never released cleanly, so the next scene's normal-flow content rendered on
top of the still-"pinned" reel — visible as text-over-text overlap at scene
01→02 and scene 05→06 on every load, both languages, both real scroll and
`window.scrollTo`-based QA. Root-caused with a puppeteer + wheel-scroll debug
script that dumped every `ScrollTrigger` instance's start/end/pin state.
Fixed by removing GSAP's own pin mechanism for these two reels: they now pin
via CSS `position: sticky` inside a JS-sized outer wrapper (`height: calc(100vh
+ distance)`), with ScrollTrigger only scrubbing the `x` transform. This is a
smaller, more robust primitive than fighting GSAP's spacer math, and it also
made the mobile fallback (native `overflow-x: auto` + `scroll-snap`, no pin at
all) simpler to reason about. Confirmed fixed via Lighthouse CLS: 0.

## Skill ledger
- frontend-design, design-taste-frontend, high-end-visual-design, emil-design-eng,
  impeccable (animate/delight/typeset/layout/colorize/craft-floor/overdrive/new-work):
  read for direction — dark broadcast-console palette, one accent color, self-hosted
  variable fonts, restrained motion grammar rather than gimmick-stacking.
- gsap, animate, find-animation-opportunities, improve-animations, review-animations:
  used to choose the pin/scrub/split-text grammar, then to diagnose and fix the
  pin-spacer bug above (every animation now traces back to a real scene beat).
- astro-best-practices: read, then deliberately NOT used — a single-page scroll
  film doesn't need Astro's routing/islands; plain Vite is the smaller, lazier
  build for one HTML entry (ladder rung 4/5: native tooling over an unneeded
  framework).
- accessibility, web-design-guidelines: reduced-motion static edit, keyboard-
  reachable native `<dialog>` (Escape closes, focus stays trapped by the UA),
  visible focus states, semantic h1→h2→h3 heading order, alt text, skip link,
  `role="text"` on SplitText spans (so the reconstructed `aria-label` has a
  valid host role) and an aria-label that includes the visible EN/ES button
  text (fixed both after Lighthouse flagged them).
- performance, core-web-vitals: self-hosted fonts with font-display swap, lazy
  dock, single photo asset, no webfont/GA network calls, deps audited for byte
  cost, CLS confirmed at 0 after the pin fix.
- frontend-testing-debugging: puppeteer-core QA below, including a custom
  `ScrollTrigger.getAll()` in-page debug script to root-cause the pin bug.

## QA evidence (qa/)
- `first-final-desktop.png` / `first-final-mobile.png` — first viewport via
  `_tools/firstview.cjs`, console clean both times.
- `desk-desktop-00..07.png` — full desktop scroll pass (real wheel events, so
  Lenis/ScrollTrigger stay in sync with what's rendered) across every scene:
  hero, origin reel, the turn (mask reveal + split headline), all four case
  files, verified-results stat grid, transmissions reel, end card. No overlap,
  no visual regressions, count-up numbers animate from source values.
- `desk-mobile-00..08.png` — full mobile (390×844) scroll pass: stacked
  layout, native swipeable card reels, no pin/scroll-jacking.
- `case-dialog.png` — a full case file open, all seven fields readable;
  Escape closes it (verified programmatically, `dialog.open === false`).
- `es-top.png` / `es-mid.png` / `es-end.png` — ES toggle, verified every
  visible string switches (hero, transmissions quotes, CV link labels).
- `reduced-top.png` / `reduced-mid.png` / `reduced-end.png` — `prefers-
  reduced-motion: reduce` gives the calm composed edit: content is fully
  visible immediately, no scroll-jacked pin distance added, reels become
  short native flow.
- `lh.json` — Lighthouse (mobile preset): perf 48–56 (noisy shared machine,
  TBT ~1.1–1.3s from GSAP+SplitText+Lenis parse/hydrate — acceptable per
  brief, "wow beats a perfect Lighthouse score"), **a11y 98, best-practices
  100, seo 100, CLS 0**. Fixed the two a11y findings it caught (SplitText
  span aria-label role, lang-toggle label/content mismatch) and added
  `robots.txt` for the seo audit. One residual non-critical axe nit
  (`heading-order`) verified as a false positive by hand: the live DOM's
  heading sequence is h1 → h2 → h3×4 → h2 → h2 → h2, no skipped level.
- Console: zero errors across every page load and interaction tested
  (first view, full scroll, case dialog open/close, lang toggle, reduced
  motion, ES).

## Honest self-score
- Wow: 7/10. The broadcast-console concept, timecode readout, masked stat
  reveal and case-file dialogs are distinctive and on-brand for an engineer
  who quantifies everything; it reads as considered rather than templated.
  It is not doing anything visually unprecedented (no WebGL/3D/shaders) — the
  craft is in the choreography and restraint, not in a single show-stopping
  effect.
- Polish: 8/10 after this pass. The layout bug that made two scene
  transitions look broken is fixed and verified with real evidence at every
  breakpoint/language/motion-preference combination; a11y/seo/best-practices
  audits are effectively clean.

## Known limitations
- Lighthouse performance score is mediocre (48–56) on this shared machine,
  driven mostly by TBT from GSAP + SplitText + Lenis parsing/executing before
  first interaction; not re-chased further since the brief explicitly weighs
  wow over a perfect Lighthouse number, and CLS/a11y/seo/bp are strong.
  Would trim by deferring ScrollTrigger/SplitText registration until after
  first paint if this needed a higher perf score.
- One axe `heading-order` false positive remains in the Lighthouse report
  (see QA evidence above) — inspected by hand and the actual heading
  sequence is valid; not chased further to avoid over-fitting to one
  audit tool's edge case.
- Count-up numbers are captured mid-animation in a few QA screenshots taken
  shortly after scroll-into-view (by design: they animate over ~1.6s); the
  final settled values match `content.js` exactly and were spot-checked in
  the case-file dialog and stat cards.

## Skill ledger
- frontend-design, design-taste-frontend, high-end-visual-design, emil-design-eng,
  impeccable (animate/delight/typeset/layout/colorize/craft-floor/overdrive/new-work):
  read for direction — dark broadcast-console palette, one accent color, self-hosted
  variable fonts, restrained motion grammar rather than gimmick-stacking.
- gsap, animate, find-animation-opportunities, improve-animations, review-animations:
  used to choose the pin/scrub/split-text grammar and keep every animation purposeful
  (scene transitions = plot beats, not decoration).
- astro-best-practices: read, then deliberately NOT used — a single-page scroll film
  doesn't need Astro's routing/islands; plain Vite is the smaller, lazier build for one
  HTML entry (ladder rung 4/5: native tooling over a framework not needed here).
- accessibility, web-design-guidelines: reduced-motion static edit, keyboard-reachable
  dialog, visible focus states, semantic headings, alt text, skip link.
- performance, core-web-vitals: self-hosted fonts with font-display swap, lazy dock,
  single photo asset, no webfont/GA network calls, deps audited for byte cost.
- frontend-testing-debugging: used for the QA pass (agent-browser screenshots +
  console check) described below.

## QA evidence
(filled in during the QA pass — screenshots land in qa/)

## Honest self-score
(filled in after QA)

## Known limitations
(filled in as they're found)
