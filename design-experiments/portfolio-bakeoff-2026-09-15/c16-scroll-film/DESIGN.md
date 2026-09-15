# DESIGN.md — c16 Scroll Film

## Design Read
The audited ledger becomes a reel: the home page plays as five short chapters (opening,
the problem, the four cases as scenes, experience, contact as closing credits), narrated
by scroll instead of a menu — every fact stays exactly where `_base` put it, just paced.

## Dials
- **Motion**: GSAP + ScrollTrigger, home page only, loaded after first paint (`requestIdleCallback`
  fallback `setTimeout`). No pin traps keyboard focus; reduced motion and no-JS both render a
  normal readable page (chapters are plain sections with CSS `opacity:1` by default; JS only
  *adds* a start-hidden state via a `js-ready` class set after GSAP registers).
- **Palette/type**: unchanged from `_base` (ink/paper/steel ledger palette, Newsreader + IBM Plex).
  Swapped Google Fonts `@import` for self-hosted woff2 subset with `<link rel="preload">` +
  `font-display: swap` to kill the render-blocking font fetch (perf budget).
- **Layout**: existing `.wrap` grid system reused; chapters are full-bleed `<section data-chapter>`
  with a mono "reel counter" eyebrow (Ch.01/05 style) that GSAP updates as the active chapter
  changes — pure enhancement, invisible without JS.

## Per-section concept spec
1. **Opening (hero)**: existing hero, photo + title fade/rise 24px on load (existing content).
2. **Problem**: new short transition UI copy (no new facts) bridging hero → cases: "Four systems.
   Four constraints under audit." matched to `workLede` framing.
3. **Cases as scenes**: existing 4 `CaseStudyCard`s, each becomes a "scene" that rises and settles
   as it enters viewport (stagger via ScrollTrigger, no pin — pin was rejected as unsafe for
   keyboard/short-viewport users in the time-box; scrub-free "reveal on enter" delivers the film
   cadence without trapping scroll).
4. **Experience**: new compact teaser table pulled from `experience.ts` (existing data), revealed
   as a manifest scrolling in.
5. **Contact — closing credits**: existing contact links + CV, styled as a credits roll, fades in
   last.

## Dependency justification
`gsap` (core + ScrollTrigger only, no premium plugins) is required for scroll-chapter choreography
that CSS-only scroll-timeline can't yet do cross-browser. Installed only in this concept; see
NOTES.md for the exact bytes added. `rm -rf node_modules && cp -r ../_base/node_modules node_modules`
run before `npm install gsap`.

## Accessibility guardrails
- No `pin: true` anywhere (see above).
- All chapters are real DOM content, not `display:none` until scrolled — GSAP only tweens
  `opacity`/`transform`, so screen readers and no-JS users get the full page immediately.
- `prefers-reduced-motion: reduce` short-circuits all ScrollTrigger tweens to `duration: 0`.
- Focus order unaffected: no `tabindex` manipulation, no scroll hijacking.
