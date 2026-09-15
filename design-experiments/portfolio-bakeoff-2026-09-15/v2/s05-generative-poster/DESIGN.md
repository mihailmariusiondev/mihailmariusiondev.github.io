# DESIGN.md — The Poster Machine

## One line
A single Swiss-poster page where every generative canvas is literally drawn out of his real numbers: 570 particles collapse to 22, a 53-bar grid gets pruned to 32, 9 employer columns set the type grid, and scrubbing the career timeline is what re-tints the whole page.

## Why it's wow
- Not decorative generative art with numbers pasted on top: the DATA is the geometry. The hero flow field starts with exactly 570 nodes and (on scroll into the stat) settles to exactly 22 — the 570→22 KB / 96% claim you can literally count.
- The WCAG stat draws 34 grid cells and marks 23 of them "closed" (34 findings, 23 merged PRs). The rules stat draws 53 bars and prunes 21. The SkillValue stat funnels 1000 dots into the top 1.42% band. Nothing is invented — every particle count is a real number from facts.json/experience.ts.
- Big International Typographic Style type (Helvetica-stack, huge tracked numerals, red/black/white poster grid) over the generative layer, not competing with it.
- Pointer subtly warps the flow field (a force field, not a toy); scroll position drives a playhead that scrubs the experience-timeline canvas and retints color bands by domain (e-commerce coral / banking navy / education ochre).
- Full `prefers-reduced-motion` fallback: every canvas still renders its exact final data-composition as one static frame — same information, zero motion, zero JS animation loop.

## Art direction
- Palette: paper white `#f4f1ea`, ink `#0e0e0f`, poster red `#e8402c` (accent/CTA), banking navy `#1c3557`, education ochre `#c98a1c`, e-commerce coral `#e8402c` reused. Big flat color fields, no gradients except the flow-field particles themselves.
- Type: system sans stack (Helvetica Neue/Arial/system-ui) at poster scale — `clamp()` fluid sizing, tight negative letter-spacing on display sizes, a monospace (ui-monospace) for all numerals/stats/timestamps to read as "measured data" vs. "voice" (the sans).
- Grid: a visible 12-column Swiss grid (thin hairlines), numbered sections like poster plates ("01 — Signal", "02 — Verified results"...).
- Motion: canvas-only. No page-transition libraries, no scroll-jacking. `IntersectionObserver` gates each canvas's animation loop (only the on-screen ones run, keeping this cheap without a framework).

## Stack & deps
Vanilla HTML + CSS + JS, zero npm dependencies. `dist/` is a straight static copy (no bundler).
- Why no Astro/three/gsap: the whole "wow" is five bespoke canvas-2D generative sketches driven by exact integers from the facts. Canvas 2D covers flow fields, particle funnels and bar grids fully — WebGL/three.js would add ~600 KB+ of library for zero visual gain here, and a bundler would add build-config surface for a page with no components to compose. `requestAnimationFrame` + `IntersectionObserver` + `matchMedia('(prefers-reduced-motion: reduce)')` are native and sufficient.
- Fonts: system stack only (no webfont fetch → faster first paint, and Helvetica-esque system fonts are exactly the poster's intended voice).
- Assets: `me.webp` (36 KB), both CV PDFs (~66 KB each), `favicon.svg` — copied verbatim from `_context/assets`, no re-encoding.
- Bilingual: one HTML document, all copy duplicated in `data-en`/`data-es` attributes (or a `LANG` JS dict for longer blocks), a single `<html lang>` + visible EN/ES toggle button flips a `document.documentElement.dataset.lang` and a `[data-lang]` CSS/JS pair — no routing needed for a one-page piece, per brief's "your own routing/toggle" allowance.

## Sections (poster "plates")
00 Hero — name/title/location, hero flow-field canvas seeded 570→22.
01 Verified results — 5 stat plates, each own generative sketch keyed to its exact number.
02 Case studies — 4 full sanitized write-ups (confidential note preserved), each with a tiny generative glyph seeded from its slug.
03 Experience — timeline canvas (bar length = real months at each employer, color = domain), full role list + recommendations underneath, scroll-scrubbed playhead.
04 Contact — email/LinkedIn/GitHub/CV EN+ES, restates the two headline stats as a closing poster.

## Known limitations (see NOTES.md for full QA)
- No WebGL: acceptable per brief ("canvas... or WebGL"); canvas-2D chosen deliberately, see stack note above.
- Single page, no deep-linkable routes per case study (brief only requires "reachable"/"readable", not routed); satisfied via in-page anchors.
