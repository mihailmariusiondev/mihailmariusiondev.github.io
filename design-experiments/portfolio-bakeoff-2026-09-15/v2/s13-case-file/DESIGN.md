# DESIGN.md — s13-case-file

**One line:** A noir investigation dossier on "Subject: Marius Mihail Ion" — a cork evidence board of
pinned proof (stats, photo, timeline) strung together in red thread, four case files you unclip and
open like manila folders, and typed witness statements clipped below, all lit like a detective's desk
lamp at night.

## Why it's wow
- Full sensory case-file world: cork/kraft-paper CSS texture, a single
  warm desk-lamp light pool that tracks scroll, pushpins with drop shadows, a wax "VERIFIED" stamp that
  slams down on real numbers, redaction bars that are literally the honest sanitization language from
  the brief (not a gimmick — it's the actual "sanitized/no client secrets" disclosure).
- Interaction is diegetic: case folders have a tab you click to unclip and swing open (CSS 3D flip),
  the evidence board has SVG red string hand-drawn between the photo pin and each stat pin on load,
  witness statements are paperclipped typed index cards.
- Mobile doesn't shrink the desk — it becomes a readable stack of case folders with native tap controls,
  keeping the same "opening a file" feeling at 390px.
- Reduced motion: no stamp slam, no string draw-on, no lamp parallax — everything appears in its final
  state instantly, calm and fully readable.

## Art direction
- Palette: near-black corkboard (#141210), kraft/manila (#d8c39c / #c9b285), blood-red string (#a3231c),
  pale teal (#83c8b3) for availability, redaction black bars. Desk-lamp warm glow (#ffdca0 radial).
- Type: system monospace for case data and a restrained system serif for the name and section heads.
  The hierarchy stays legible without a remote font request or layout shift.
- Texture: CSS-only repeating cork lines and a desk-lamp vignette, with no bitmap texture weight beyond
  the required portrait.

## Stack & deps
- Plain static HTML + CSS + vanilla JS. No framework, no bundler: ship dist/ directly as source.
  `ponytail: a single-page dossier with ~5 sections needs no Astro/build step — index.html is the site.`
- No runtime dependencies or remote font requests; the portrait is preloaded because it is visible in
  the first viewport.
- Content stored once in `js/data.js` (EN/ES pairs transcribed verbatim from `_context`), rendered by
  `js/app.js`; no duplicated markup per language, so a translation can never drift or go missing.

## Content
All copy is copied/adapted directly from `_context/{ui.ts, experience.ts, caseStudies.ts, facts.json}`.
No invented facts, metrics, clients or titles. RETRACTED phrases avoided. Redaction stamps are used only
where the source itself says "sanitized"/"confidential" — never invented drama.
