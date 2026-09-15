# NOTES.md

## Status
In progress — first working dist/ build coming up next, then QA screenshots.

## Skill ledger
- frontend-design / design-taste-frontend / high-end-visual-design: informed
  the "graph-paper playground" direction instead of generic gradients/glass.
- impeccable (animate, delight, craft-floor): spring constraints + restitution
  tuning instead of CSS-easing fakery for the "grabbable" feel.
- accessibility: DOM-rendered physics bodies (not canvas) so every object
  stays a real, keyboard-reachable, screen-reader-readable element.
- performance: matter-js is the only runtime dep; no canvas re-render loop
  for text, esbuild bundles a single JS file, images are the one existing
  webp/pdf asset.
- astro-best-practices: consciously NOT used — single page, no routing,
  static build script is less code than an Astro project for this shape.

## Retracted phrases avoided
No "catalog of backend tools", no "replaced legacy guides", no "Mateo", no
"international agricultural client". ENZO client left unnamed, described as
existing AWS serverless stack (not designed by Marius). Angular assessment
described as an assessment, never a certification. English kept at
"professional working proficiency".

## Known simplifications (ponytail)
- The 570→22 KB "compression" is a scripted squash timeline (CSS transform +
  eased JS), not a literal soft-body physics simulation — Matter.js doesn't
  do deformable bodies well, and a real soft-body solver is a lot of code for
  a moment that's on screen for two seconds. Ceiling: if we ever want the
  compactor itself to be physically simulated (piston as a kinematic body
  pushing rigid slices), see `main.js` `runCompression()`.
- Experience timeline cards are static (not physics bodies) — with ~5 dense
  bullets per role, springing them around would hurt readability far more
  than it would add delight. Only the connecting timeline dots get a subtle
  idle sway.

## QA evidence
(filled in after build + screenshots)

## Self-score
(filled in at the end)

## Known limitations
(filled in at the end)
