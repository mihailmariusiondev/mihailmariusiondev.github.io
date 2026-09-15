# NOTES.md — s13-case-file

## Skill ledger
- frontend-design / design-taste-frontend / high-end-visual-design: informed the single-world
  commitment (noir case file, no generic gradient-hero defaults), restrained palette, real texture
  via CSS/SVG instead of stock imagery.
- impeccable (craft-floor, typeset, layout, colorize, animate, delight): pass on focus states, type
  scale, spacing rhythm, motion easing/duration, and small delight moments (stamp slam, string draw).
- animate / find-animation-opportunities: folder open/close as a 3D hinge, string draw-on with stroke-
  dashoffset, stat stamps triggered on scroll-into-view via IntersectionObserver, all with a
  prefers-reduced-motion branch that skips straight to end state.
- accessibility: skip link, visible focus rings, folders are `<button>`/`<details>`-driven (keyboard
  operable), stamps/redaction are decorative (aria-hidden) with the real text always in the DOM,
  color contrast checked against the dark board background, lang attribute swapped on toggle.
- performance: zero build tooling or remote fonts, preloaded portrait, no images besides the required
  portrait + favicon, CSS-only texture and one small vanilla JS file (no framework runtime).
- astro-best-practices: not applicable — plain static HTML chosen deliberately (ponytail: no framework
  needed for a single page).

## QA evidence
- Screenshots in `qa/`: final-desktop.png / final-mobile.png (first viewport EN), desktop-full.png /
  mobile-full.png (full page), case-open.png (folder opened), desktop-es.png (ES toggle),
  reduced-motion.png.
- Console: checked via firstview.cjs on desktop+mobile — zero errors, both runs.
- Preview served at http://127.0.0.1:4513 during QA; stopped at end (confirmed no lingering process).
- Lighthouse before the final micro-pass (`../../_tools/lh.sh`, run twice — first run noisy per shared-machine warning):
  run 1: perf=52 a11y=96 bp=100 seo=100 (color-contrast fail on witness-note text, fixed).
  run 2 after fix: perf=88 a11y=100 bp=100 seo=100, LCP=2.9s, CLS=0, TBT=0ms. Raw json: qa/lh2.json.

## Self-score (honest)
- Wow: 8/10 — the case-file world is fully committed and distinct from a generic dark portfolio; the
  string/stamp/folder interactions are the payoff. Ceiling not hit: no physics/WebGL, by choice, to
  keep it fast and dependency-free.
- Polish: 8/10 — reduced-motion path, keyboard access and bilingual parity are solid; the mobile flip
  stack is simpler than the desktop board by necessity.

## Known limitations
- No WebGL/3D; the "cinematic lighting" is CSS radial-gradient + mix-blend-mode, not real light
  simulation. This is deliberate: real depth of feeling without a runtime dependency.
- The preview is intentionally static and has no remote runtime dependency. Performance remeasurement
  must run when the shared preview host is not under concurrent Lighthouse load.
