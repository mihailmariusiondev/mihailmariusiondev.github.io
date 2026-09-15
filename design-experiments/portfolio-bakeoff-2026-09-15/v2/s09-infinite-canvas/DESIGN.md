# DESIGN.md — s09 Infinite Canvas

## One line
Marius's career as a spatial map you fly through: a zoomable, pannable canvas where roles,
case studies, metrics and recommendations sit as connected nodes on a timeline path, with
semantic zoom (dots -> cards -> full detail), a minimap, keyboard/tab "fly to" navigation, and
a choreographed intro flight — plus a full linear reading-mode fallback for accessibility.

## Why it's wow
Nobody expects a portfolio to behave like a design-tool canvas (Figma/Miro). The camera itself
tells the career story: the intro flight opens on the whole map, then swoops into the hero node.
Zooming out reveals the shape of 8 years of work as a connected graph instead of a scroll of
text; zooming into any node reveals full case-study or role detail. It rewards curiosity
(explore the graph) while never gatekeeping the content (reading mode + real DOM everywhere).

## Art direction
Dark "drafting table" canvas: near-black graphite background with a faint dot grid, warm paper-
white node cards, a single accent (amber/orange) for edges, focus rings and the active path.
Typography: a monospace label face (like design-tool metadata: "NODE 03 / ROLE") paired with a
clean humanist sans for body copy. Nodes read like index cards pinned to a board, connected by
soft curved SVG paths that glow along the currently focused route.

## Interaction model
- Canvas = a `<div class="world">` transformed with `translate() scale()`, driving pan/zoom
  entirely with CSS transforms (no WebGL, no canvas-2d, no libraries) — real DOM content stays
  selectable, accessible and readable with JS/CSS disabled degrading gracefully to reading mode.
- Pan: pointer drag (with inertia), wheel (trackpad two-finger pan), arrow keys.
- Zoom: wheel + ctrl/cmd (trackpad pinch maps to this), pinch gesture (two-touch), +/-/0 keys,
  on-screen zoom control.
- Semantic zoom: 3 detail tiers driven by current scale, toggled via CSS classes on `.world`.
- Fly-to: every node is a real focusable `<button>`; click OR keyboard focus triggers an
  eased camera flight (rAF lerp) framing that node. Reduced motion = instant jump, no rAF loop.
- Minimap: fixed corner SVG, dots for every node + a draggable viewport rectangle; click/drag
  to jump instantly.
- Linear reading mode: one keyboard/UI toggle swaps to a normal top-to-bottom document built
  from the exact same data (no separate copy to keep in sync — one render function, two layouts).
- Contact (email/LinkedIn/GitHub) and both CV downloads live in a persistent top toolbar, so
  they're reachable from any camera position or mode, per brief non-negotiable #2.
- EN/ES toggle re-renders all node content in place, no page reload, keeps camera position.

## Stack and dependencies
Vanilla HTML + CSS + JS, zero build step, zero runtime dependencies (ponytail: a DOM-transform
canvas is a native platform feature — CSS transforms + rAF — a library buys nothing here that
isn't better done in ~500 lines of plain JS). `dist/` *is* the source; no bundler needed.
Byte budget: index.html + styles.css + app.js + data.js, all under ~60 KB combined before assets;
`me.webp` (36 KB), two CV PDFs (~65 KB each) lazy-referenced only as download links.

## Known limitations
- No WebGL/shader flourish (deliberate: DOM transforms keep text real, selectable, and screen-
  reader friendly without a parallel accessible-tree hack).
- Minimap viewport dragging is basic (click-to-center + drag), not a full miniature renderer.
