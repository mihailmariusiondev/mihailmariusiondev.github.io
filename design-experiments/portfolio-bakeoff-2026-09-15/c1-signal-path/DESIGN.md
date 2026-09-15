# DESIGN.md — Signal Path (c1)

## Thesis
The portfolio speaks the native vernacular of an Angular/RxJS engineer: a reactive
data-flow diagram. Real outcomes travel as events along signal lines and resolve into
verified facts. Light technical-drawing / oscilloscope surface (graph-paper ground,
phosphor-teal trace) with a true dark mode (scope-black, brighter phosphor).

## Design Read (one line)
An oscilloscope readout for a frontend engineer's career: outcomes are traces that
resolve, not badges that decorate.

## Three dials
- **Loud <-> Quiet:** quiet ground, loud signal. The grid and ink stay restrained;
  the teal trace and the marbles are the only saturated color, always earning it by
  carrying a real number.
- **Dense <-> Airy:** airy chrome, dense readouts. Generous space around headings;
  the diagrams and dl fields read as engineering documentation, not marketing tiles.
- **Playful <-> Serious:** serious, with one playful mechanism (the marble literally
  travels and the payload/finding counters visibly count down as it passes gates).
  Never cute, never bouncy.

## Token plan
- Ink `#0d1613` / Paper `#f4f2ea` (warm graph-paper, not cream, not cool gray) /
  Paper-raised `#ffffff` / Paper-sunk `#eae6d8`.
- Signal (phosphor teal) `#0d7a68`, Signal-bright `#12a88f`, Signal-wash `#e2f0ea`.
- Slate `#4a564d` / Slate-quiet `#586a5f` (>=4.5:1 on paper and paper-sunk, verified).
- Amber (closed/verified lamp) `#8a5c0a` / Amber-bg `#f3e8ce` (reused from base, kept).
- Grid line `#ded8c4`, rule-strong `#b9b09a`.
- Dark mode: Ink `#eef1ec`, Paper `#070b09`, Paper-raised `#0e1512`, Paper-sunk
  `#0a100d`, Signal `#3fd6b8`, Signal-bright `#79ecd4`, grid `#152019`.
- Type: display **Big Shoulders** (condensed, industrial, drawn-with-a-ruler
  character for the hero name/numbers) + body **Archivo** (grotesque, high
  x-height, reads fast at recruiter-scan sizes) + mono **JetBrains Mono** (signal
  labels, data readouts, nav, gate values). None of Inter / Space Grotesk / IBM
  Plex / Newsreader / Roboto.
- Layout ASCII (home):
  ```
  [rail nav]......................................[lang]
  |  SIGNAL PATH svg: 3 lanes, marbles travel L->R      |
  |  lane1: 570 KB ---o----> 22 KB   (-96%)              |
  |  lane2: 34 findings --o--> 0 closed                  |
  |  lane3: source dots --o--> Marius Mihail Ion / role   |
  |                                                        |
  |  [photo]   Enterprise frontend for e-commerce...      |
  |            lede + CTAs                                |
  |------------------------------------------------------- |
  |  Verified results  (5 stats, mono ledger)              |
  |------------------------------------------------------- |
  |  Case studies (2x2 cards, vertical field-path spine)   |
  ```
- Principles: every diagram is decorative + aria-hidden, paired with real static
  text that already carries the number (never diagram-only content). Nodes light
  up on scroll via `@supports (animation-timeline: view())`, static lit state
  otherwise. Signal-rail nav: a 2px rail with a moving current-page dot on desktop;
  thumb-zone bottom bar on mobile (kept from base, restyled into the rail language).

## Per-section concept spec
- **Hero:** composition anchor = SVG signal diagram spanning the width above the
  fold, three horizontal lanes, each a `<path>` with a `<circle>` marble on
  `offset-path`/`offsetDistance` CSS animation, decorative + `aria-hidden`. Real
  `<dl>` readout beneath states the same three facts as plain text (payload
  570->22 KB, 34 findings closed, name+role) so the page is fully legible with
  zero motion or a failed font. Background mode: graph-paper grid via CSS
  `background-image` linear-gradients, 24px pitch. Type scale: hero name at
  `--step-display` in Big Shoulders. CTA style: solid signal-teal primary +
  outline secondary, mono labels. Motion cue: marble travel, 2.4s linear loop,
  `prefers-reduced-motion` freezes marbles mid-path at their resolved end state.
- **Case studies:** vertical field-path spine (already a `<dl>` of fields) gets a
  left rail line whose segments light up via `animation-timeline: view()` as the
  section scrolls into the viewport; static (all lit) fallback without support.
- **Experience:** timeline dots light in sequence via the same scroll-timeline
  mechanism; static full-color fallback.
- **Nav:** desktop = thin sticky rail (hairline + mono labels + moving current dot
  under the active item, no dropdown); mobile = existing thumb-zone bottom bar,
  restyled to the rail's line language (dot markers instead of icon-only, labels
  kept for 2.5.3).

## What changed after self-review
Dropped a fourth hero lane (SkillValue rank) that made the SVG cramped at 390px;
three lanes read clearly at both breakpoints and the rank stat still lives in the
Verified Results ledger immediately below, so nothing is lost.
