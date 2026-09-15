# DESIGN.md — s16-popup-book

**One line:** Marius's career as a hand-turned paper pop-up book: ten spreads, each a
cut-paper diorama on the left and readable copy on the right, turned in real 3D with
drag physics, keyboard, or swipe.

## Why it's wow
- Pages are real CSS 3D objects (perspective + rotateY around a spine), not a carousel
  wearing a page-curl filter: front/back faces, correct z-stacking as pages pile up,
  draggable with a live angle while you hold, a snap-commit/snap-back on release.
- Every spread's left panel is a small layered-SVG "pop-up" scene (gears, a shield, a
  ladder of roles, an envelope) that rises with a staggered scale/translate the instant
  the spread becomes current — paper engineering, not a stock icon.
- Warm paper palette, cut-edge drop shadows, a linen/kraft texture done entirely in CSS
  gradients (no image assets besides the CV PDFs and the one supplied photo).

## Art direction
- Palette: warm cream paper (#f3ead8), kraft brown (#8a6a4a), ink (#2b2620), accent red
  thread (#c1443a) for the physical "ribbon bookmark" and active states.
- Type: serif display (Fraunces-style via system/Georgia stack — no webfont fetch, keeps
  it dependency-free) for titles, a clean humanist sans for body copy.
- Motion: 3D page turn ~650ms cubic-bezier, drag-tracked rotation, pop-up reveal staged
  120ms per layer. `prefers-reduced-motion`: turns and pop-ups become instant (no
  transition), content unchanged.

## IA (10 pages / spreads)
0 Cover · 1 Origins (2018→Angular) · 2 Angular today (SkillValue) · 3 Experience ladder
(6 roles) · 4–7 the four case studies · 8 Recommendations · 9 Contact + CV downloads.
A persistent bottom-right dock (email / LinkedIn / GitHub / CV EN+ES / EN·ES toggle) is
reachable from every page, independent of book position.

## Stack & deps
Plain HTML + CSS + vanilla JS, zero build step, zero npm dependencies (0 bytes of deps).
Ponytail call: Astro/bundler buys nothing for one static page with no components to
reuse across routes; a single `index.html` is the smaller, more honest artifact and is
already the required `dist/` output. Bilingual EN/ES done with `.en`/`.es` spans toggled
by a `lang-es` class on `<body>` (persisted in `localStorage`), not a router — one URL,
instant toggle, everything indexable either way via `lang` attribute updates.

## Known limitations
- No WebGL/shaders — the "paper" is CSS/SVG, which keeps first paint fast and avoids a
  GPU dependency; still reads as tactile at 1440 and 390px.
- Case-study pages are copy-dense; illustration stays small and schematic on purpose so
  the real content (the four case studies) stays fully readable per the brief.
