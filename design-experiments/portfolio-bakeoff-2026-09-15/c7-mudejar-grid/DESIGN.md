# DESIGN.md — Mudéjar Grid

## Design Read (one line)
An engineering portfolio built like a lazería panel: an 8-point star (`lazo de ocho`) generated
by one parametric function becomes the hero's assembling motif, the card frame, the timeline
marker and the background lattice — geometry as the layout system, not a decorative sticker.

## Three dials
- **Density:** medium-high. The star lattice is a quiet structural wash (6–10% opacity) behind
  content, never competing with text; foreground stays as spare as the base site.
- **Motion:** one big orchestrated moment (hero assembly, ~900ms, CSS-only, staggered) + small
  hover/focus confirmations. No scroll-jacking, no looping ambient motion.
- **Voice:** precise, contemporary, engineering-grade. No arches, no tourist iconography, no
  "flamenco" clichés — pure geometric abstraction, the same discipline a real lacería artisan
  used: compass, straightedge, repeat unit.

## Token plan

### Palette (glazed ceramic, not cream+terracotta)
Light:
- `--ink:#12201d` (near-black, warm green-black, evokes fired clay body)
- `--paper:#f5f2e8` (unglazed plaster, warm off-white — not cream/beige-forward)
- `--paper-raised:#ffffff`, `--paper-sunk:#ece6d4`
- `--cobalt:#1f4e8c` / `--cobalt-dark:#153761`
- `--green:#1f6b52` / `--green-dark:#154a39`
- `--ochre:#a9762a` / `--ochre-dark:#7c5a20`
- `--slate:#4a5750`, rules `#ddd6c2` / `#c3b99f`

Dark: ground `#0d1712` (deep glaze-kiln black-green), paper-raised `#131f19`, cobalt `#7fa8de`,
green `#6fbf9c`, ochre `#e0b466`. AA-checked pairs below.

### Type
- Display/headings: **Space Grotesk** 500/600 — geometric grotesk, its squared terminals echo the
  star's straight edges. Replaces the base site's serif (deliberate break: this concept is about
  construction geometry, not editorial warmth).
- Body: **Inter** — neutral, high x-height, reads at recruiter-scan speed.
- Mono (labels, stats, tags, nav): **IBM Plex Mono**, kept from the base — numerals and technical
  labels read as measured facts, consistent with the base site's ATS-safe intent.

### Layout
```
[ eyebrow · mono ]
[ HERO TITLE — Space Grotesk, star cluster assembles behind/around it ]
[ lede ]  [ ·star-framed portrait· ]
[ CTA  CTA  CTA  CTA ]
———— lattice divider (thin repeating strip, tile unit) ————
[ stat│tile ] [ stat│tile ] [ stat│tile ] [ stat│tile ] [ stat│tile ]
———— work ————
[ card+tile motif A ]  [ card+tile motif B ]
[ card+tile motif C ]  [ card+tile motif D ]
```
`--tile: 3.5rem` is the repeat unit of the background lattice and the size reference for every
star chip (portrait frame corners, card motifs, timeline markers). Section gutters and the stat
rule spacing stay on the existing modular scale (`--space-*`), which already sits close to
multiples of `--tile`; a literal star grid is used only where geometry is visible (background
lattice, chips), not forced onto every text measure — that would sacrifice reading comfort for a
slogan.

## Per-section concept spec

1. **Hero.** Composition anchor: text column left, star-framed portrait right (desktop) /
   stacked (mobile), matching the base site's proven recruiter-scan order. Background: a faint
   (8%) tile lattice wash, full-bleed, behind the whole hero. Motion cue: 7 small 8-point star
   tiles scatter → rotate/translate/scale into a locked ring around the eyebrow + into the
   portrait's frame corners, 900ms, staggered 60ms, `cubic-bezier(.2,.8,.2,1)`, CSS keyframes only.
   Type scale: existing fluid `--step-display`. CTA style: kept pill/rect buttons from base, now
   cobalt-primary.
   ASCII: see Layout above.
2. **Case study cards.** Each card carries one `CaseTile` motif in its header: spike count (8 or
   6) and tone (cobalt/green/ochre, cycling by index) differ per card — one shared generator, four
   distinct outputs, never four different hand-drawn icons.
3. **Case study detail.** The same card's tone/motif repeats at the top of its full page, so the
   card → page transition is legible as "same tile, more detail."
4. **Experience timeline.** The dot-and-spine marker becomes a small rotated star chip per row,
   tone cycling cobalt/green/ochre every 3 rows, connected by the existing spine rule — "sequence
   of interlocking tiles," per brief.
5. **Stats.** Each stat gets a small corner tile chip instead of a plain left rule.
6. **About/Contact.** Restrained: an eyebrow-level tile chip and a thin lattice-strip section
   divider only. These are read-heavy pages; geometry stays in the frame, not the prose.

## What I threw away after self-review
- First pass used literal SVG `<path>` arcs to fake Mudéjar strapwork (lazo interlace) behind the
  stars — at small sizes it read as noise/moiré and hurt AA contrast under text. Replaced with a
  single clean star-polygon generator reused at different scale/rotation/opacity: calmer, still
  systemic, passes contrast checks.
- First hero motion looped continuously (breathing scale). Cut it: a portfolio recruiters scan in
  6–10s needs the "wow" once, then stillness; looping motion near body text fails the calm bar in
  `emil-design-eng`/`animate`.
- Considered a manual light/dark toggle; the base site has none and toggling is out of scope —
  kept `prefers-color-scheme` only, both palettes hand-tuned.

## Skill ledger
- **impeccable (context/shape/new-work):** ran `impeccable context`; direction was pre-assigned by
  the orchestrator brief (not an open concept choice), so the concept-seed/roll workflow does not
  apply (it explicitly excludes "a precisely specified narrow request"). Used `new-work.md`'s
  redesign framing: preserved all product truth/content, replaced the visual world.
- **frontend-design:** produced the two-pass token plan above (palette hex, type, ASCII layout,
  principles) before writing CSS.
- **design-taste-frontend:** Design Read + three dials above; applied its pre-flight adapted for
  Astro/native CSS — no icon library, inline SVG limited to the star generator (justified: it is
  the structural language required by the brief) plus the five existing nav icons kept as-is.
- **frontend-app-builder / imagegen-frontend-web (method only, no image tool in session):** wrote
  the per-section spec above as the accepted concept; fidelity ledger in the QA section.
- **high-end-visual-design / redesign-existing-projects:** anti-generic checklist — no default
  cream+terracotta, no stock icon set, no generic card-grid-with-shadow-only; motion is
  purpose-built, not a fade-in-on-scroll library default.
- **astro-best-practices:** static output kept, one shared `mudejar.ts` generator (no runtime JS
  shipped — all output is server-rendered SVG/CSS), scoped `<style>` per component preserved.
- **animate + emil-design-eng:** hero assembly gated to first paint only (`animation-fill-mode:
  both`, no replay), reduced-motion collapses to end state via the base site's existing global
  rule (`animation-duration:0.01ms`), hover states use existing 120–150ms ease transitions.
- **review-animations:** self-review table in NOTES.md.
- **accessibility/a11y, seo, performance, core-web-vitals, best-practices, web-quality-audit,
  pagespeed-insights:** verified via local Lighthouse + manual contrast checks, see NOTES.md.
