# DESIGN.md — Paper Layers (c14)

## Process note (time-boxed run)
25-minute hard time-box, non-interactive session (no structured-question tool, no image
generation). The concept ("Paper Layers": stacked physical paper, layered shadows, scroll
parallax, sheets that lift) was assigned by the brief/orchestrator, so the `impeccable
concept-seed` direction round was skipped by design (new-work.md routes a brief-pinned direction
straight to execution). Read `craft-floor.md`, `animate.md`, `layout.md` for execution discipline.

## Thesis
The site IS a desk of stacked paper: hero portrait, stat ledger, and case-study cards sit as
physical sheets with a backing sheet peeking out behind each, soft layered shadows, a slight
rotation that straightens on hover/focus, and jagged torn-edge dividers between sections. Depth
comes from real stacked geometry, not a drop-shadow applied to a flat card.

## Inherited system (kept, not replaced)
The base already carries an "ink & paper" token set (Newsreader serif + IBM Plex Sans/Mono,
`--paper`/`--paper-raised`/`--paper-sunk`, hairline rules). That is the right material for this
concept, so tokens are kept; the work is adding literal stacked-sheet depth and parallax on top.

## Token plan
- Palette: unchanged (`--ink` #0b0d10, `--paper` #f7f6f3, `--steel` #2f5680, `--amber` #6f5709
  verified badge). Dark mode = night paper, already wired via `prefers-color-scheme`.
- Type: Newsreader (display/headings), IBM Plex Sans (body), IBM Plex Mono (labels/eyebrows) —
  unchanged, already self-consistent with a "paper" register.
- New: `--sheet-shadow-1/2` layered shadow tokens, `--sheet-tilt` rotation amount, torn-edge
  `clip-path` recipe shared by section dividers.

## Layout (ASCII, desktop hero)
```
┌───────────────────────────────────────────────────┐
│  eyebrow                        ░░ backing sheet ░ │
│  H1 title                      ┌──────────────┐    │
│  lede                          │  photo sheet │←tilt│
│  [CTA][CTA][in][gh]            └──────────────┘    │
└───────────────────────────╱╲╱╲╱╲╱╲ torn edge ╱╲───┘
```

## Per-section concept spec
- **Hero**: photo sits as a top sheet with two rotated backing sheets peeking from behind
  (`::before`/`::after`), parallax: photo layer moves slightly slower than the text column on
  scroll (`animation-timeline: view()`, `@supports` gated, reduced-motion disables it — the global
  reduced-motion rule already zeroes animation-duration).
- **Stats**: each stat is a small stacked note card (backing sheet + tilt) instead of a bare
  border-left rule, still numeric/mono led.
- **Work (case studies)**: cards become stacked sheets: a rotated backing sheet behind each card,
  lifting and de-rotating to flat on hover/focus, layered shadow deepens.
- **Section boundaries**: hero→stats and stats→work use a torn-paper edge (`clip-path` jagged
  polygon) instead of a hairline, reinforcing "sheets stacked on a desk."
- Motion cue: lift + de-rotate + shadow deepen on hover/focus-visible, 180ms ease-out; scroll
  parallax only on the hero photo layer, capped and gated by `@supports`+reduced-motion.

## Accessibility / reduced motion
- Reduced motion: `prefers-reduced-motion: reduce` already zeroes all animation/transition
  durations site-wide (global.css); parallax is pure CSS `animation-timeline` which stops moving
  under that same rule, and the composition is static and fully readable without it — no JS is
  used for layout.
- Focus-visible lift matches hover lift so keyboard users get the same affordance.
- Torn edges and backing sheets are `aria-hidden`/decorative pseudo-elements only; no semantic
  content lives in them.

## Fidelity ledger (spec → shipped)
1. Photo as top sheet with 2 rotated backing sheets — shipped.
2. Stat cards as stacked notes — shipped.
3. Case-study cards as stacked sheets with hover de-rotate/lift — shipped.
4. Torn-edge section dividers — shipped.
5. Scroll parallax on hero photo layer, `@supports` gated — shipped.
