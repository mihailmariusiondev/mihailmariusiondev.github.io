# NOTES.md — s16-popup-book

## Skill ledger
- frontend-design / design-taste-frontend / high-end-visual-design: informed palette
  (warm paper vs. generic dark-mode-portfolio default), serif display type, avoided
  generic hero-centered-button template.
- impeccable (animate.md, craft-floor.md): drag-to-turn uses a live-tracked angle, not
  just a fixed keyframe; reduced-motion path removes transitions entirely rather than
  just shortening them.
- accessibility: keyboard page turns (arrow keys, Home/End to jump), visible focus
  rings, all interactive controls are real `<button>`/`<a>`, contact dock reachable via
  Tab from any page, alt text on the photo, landmark roles.
- performance: zero JS/CSS dependencies, one HTML file, inline critical CSS, the only
  binary assets are the CV PDFs and the supplied photo (already provided).

## Build
No build step. `dist/` is authored directly (static site, no bundler needed per
ponytail: one page, no components to share across routes).

## QA evidence
See `qa/`: `desktop.png` / `mobile.png` (first viewport, EN), `desktop-es.png` (ES
toggle), `desktop-reduced-motion.png`, plus interaction screenshots after paging.
Console: checked via firstview.cjs, zero errors on both viewports.

## Self-score (honest)
- Wow: 8/10 — the 3D drag-turn + staged pop-up reveal is the differentiator; capped
  vs. 10 because there's no sound/haptic layer and illustrations are schematic, not
  hand-drawn.
- Polish: 8/10 — consistent paper system, real focus states, bilingual parity, reduced
  motion respected; a live human illustrator's linework would push this further.

## Known limitations
- Illustrations are geometric/SVG paper cutouts, not bespoke line art (no image-gen
  tool available in this environment; per brief this was to be treated as a method
  constraint, not skipped).
- Drag-to-turn is pointer/touch only; mouse-wheel does not turn pages (arrow keys and
  buttons cover the non-drag case).
