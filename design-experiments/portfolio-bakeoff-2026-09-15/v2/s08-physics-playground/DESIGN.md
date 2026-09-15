# DESIGN.md — Tactile Physics Playground

## One line
Marius's name, tech stack, outcome numbers and case studies are real physical
bodies (Matter.js) you can grab, throw and stack — every one of them is also
plain readable DOM content, so the physics is a layer of delight on top of a
fully accessible page, never a requirement to read it.

## Why it's wow
- The hero spells his name by springing draggable letters into place; grab
  one and it snaps back like a real spring-loaded object.
- The signature moment: the 570 KB → 22 KB LLM context reduction is staged as
  a literal on-screen compaction — a block gets squeezed down to 96% of its
  size, replayable on demand.
- Tech chips, recommendation cards and case studies fall, collide, stack and
  can be re-thrown; case studies self-arrange into a grid, freeze once
  settled, and open a full accessible dialog on click/tap/Enter.
- Reduced motion (or the in-page "Motion: off" toggle) does not fake a
  simplified simulation — it removes the simulation. The exact same DOM
  falls back to a calm CSS grid/flex layout. One code path serves reduced
  motion, no-JS-equivalent robustness, and the "readable without WebGL"
  requirement simultaneously.

## Art direction
Concrete/graph-paper playground aesthetic: a pale warm-grey backdrop with a
faint dot grid (a physical "table"), objects rendered as chunky
dashed-outline cards/pills (signalling "grabbable" the way a real object has
edges), a single accent (safety-orange) for interactive affordances and the
compression demo, monospace for numbers/labels (engineering-instrument feel),
a humane serif-free display face for the name. No gradients-as-decoration,
no glass, no gimmick 3D — craft is in the physics feel (restitution, air
friction, spring stiffness) not in visual noise.

## Stack & deps
- No framework. Plain HTML/CSS/JS, statically generated at build time by a
  ~150-line Node script (`build.mjs`) that inlines bilingual copy from
  `src/data.mjs` directly into `dist/index.html` (both `en`/`es` spans exist
  in the DOM at all times; a `<html data-lang>` attribute + CSS toggles which
  is visible — so language switch is instant, no reload, and the page is
  fully readable even with JS disabled, in English by default).
- `matter-js` (~85 KB min) is the only runtime dependency: a 2D physics
  engine for gravity, collision and spring constraints. Bodies are simulated
  by Matter but *rendered as real DOM elements* (position/rotation applied
  via `transform`), not drawn on a canvas — this keeps every physical object
  a real, focusable, screen-reader-readable element instead of a canvas
  pixel blob.
- `esbuild` (devDependency only, not shipped) bundles `src/main.js` +
  `matter-js` into one `dist/main.js` (~95 KB min+gzip'd by static hosting).
- Why not Astro/a framework: the whole site is one page with a handful of
  repeated card shapes; a build-time string template is less code than
  wiring a framework for four components, and it keeps the "both languages
  always in the DOM, no client fetch" guarantee trivial to reason about.

## Non-negotiables checklist
- Truth: every number/employer/date/tech comes from `_context/facts.json`,
  `cv-en/es.txt`; retracted phrases avoided (see NOTES.md).
- Bilingual: EN/ES same-page toggle, both CV PDFs, email, LinkedIn, GitHub
  reachable from the sticky header on every scroll position.
- Works at 390px and desktop, keyboard-usable (all interactive physics
  bodies are real `<a>/<button>` elements with visible focus rings and
  arrow-key nudge as a keyboard-equivalent to dragging), reduced-motion
  fallback, zero console errors, meta/OG/lang set.
