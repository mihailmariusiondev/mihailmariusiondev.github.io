# NOTES.md — s09 Infinite Canvas

## Skill ledger
- frontend-design / design-taste-frontend / high-end-visual-design: informed the "drafting table"
  dark canvas direction, monospace metadata labels, restrained accent color, avoiding generic
  hero-centered-text-block layouts.
- impeccable (animate.md, layout.md, typeset.md, colorize.md): eased fly-to timing, focus states,
  type pairing (mono label / humanist body), single accent hue with paper-white cards on graphite.
- accessibility: every node is a real `<button>`, full keyboard fly-to via focus, linear reading
  mode as a first-class parallel layout (not an afterthought), reduced-motion instant camera jumps,
  visible focus rings, landmark roles, skip link.
- performance: zero dependencies, zero build step, images/PDFs referenced not inlined, transforms
  use GPU-friendly `translate3d`/`scale` only.
- animate / find-animation-opportunities: intro flight, fly-to easing, edge-glow on focused path,
  reduced-motion branch that removes all of the above.

## QA evidence (see qa/)
- `qa/first-view-desktop.png` / `qa/first-view-mobile.png`: 1440x900 and 390x844 first viewport
  after the intro flight lands on the hero node. Console clean on both (puppeteer firstview tool).
- `qa/es-desktop.png`: language toggle re-renders all node content and toolbar chrome in Spanish
  in place, camera position preserved.
- `qa/case-study-zoom.png`: clicking a case-study node flies the camera to frame it at full detail
  tier (all fields, tags, "what this demonstrates").
- `qa/reduced-motion.png`: with `prefers-reduced-motion: reduce` emulated, the page jumps straight
  to the hero with no intro flight and no rAF easing loop.
- `qa/reading-mode.png`: the linear top-to-bottom fallback, same data, real heading structure.
- Two bugs found and fixed during QA: (1) `Cannot set properties of null (setting 'textContent')`
  on load — a `#hero-cta` button was referenced in `app.js` but never rendered (and would have been
  an invalid button-inside-button anyway); deleted the redundant CTA rather than patch it in, since
  "Reset view" already covers that action. (2) On mobile the hero's initial fly-to landed at
  scale ~0.33, just under the old dot/card threshold (0.35), so first view showed a bare dot
  instead of a readable card — lowered the dot threshold to 0.24. Also case-study nodes were
  declared with `h: 360` while their real rendered content ran to ~750px, so fly-to over-zoomed and
  the card bled off-screen; fixed by giving case nodes an honest `h: 780` and re-laying out the
  case/metric clusters with enough spacing to avoid overlap.
- Console checked with the puppeteer firstview tool on every scenario above — zero errors.

## Honest self-score
- Wow: 8/10 — a real spatial canvas with semantic zoom, fly-to, a minimap and a choreographed
  intro flight is a genuinely uncommon portfolio pattern, and it stays fully readable/keyboard-
  operable rather than being a gimmick layered on top of a normal page.
- Polish: 7/10 — interaction details (easing curve, focus rings, inertial pan, minimap click-to-
  jump, bilingual in-place re-render) are solid; visual polish is deliberately restrained (paper
  cards on a dark grid) rather than maximalist, and the type/spacing could take one more pass.

## Known limitations
- No WebGL background flourish (see DESIGN.md rationale).
- Pinch-to-zoom tested via touch events; no real touch device in the QA loop, verified in code
  logic only (two-pointer distance ratio -> scale).
- Case-study node heights are a fixed generous estimate (`h: 780`) rather than measured from the
  live DOM; some cards render with a little empty space below the content at full zoom.
