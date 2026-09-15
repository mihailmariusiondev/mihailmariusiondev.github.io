# NOTES.md — s06 Kinetic Editorial Magazine

## Skill ledger
- `frontend-design`, `design-taste-frontend`, `high-end-visual-design`: informed the newsprint palette,
  single spot-color rule, hairline grid and avoidance of generic card/hero patterns.
- `impeccable` (typeset, layout, colorize, animate, delight): drop caps, pull-quote treatment, odd/even
  spread mirroring, red-as-signal-only color use.
- `animate`, `gsap`, `find-animation-opportunities`: scroll-velocity kinetic type, clip-path spread
  reveal, reduced-motion fallback design.
- `accessibility`, `web-design-guidelines`: skip link, focus-visible rings, semantic headings/figures,
  reduced-motion audit.
- `astro-best-practices`: static output, minimal client JS, per-page metadata/canonical/hreflang.
- `performance`: font subsetting (latin + latin-ext only, axes trimmed), single hoisted script, no
  render-blocking web fonts beyond the two self-hosted families.

## Build
- `npm run build` → `astro check && astro build`? (see below) → static `dist/`, 2 routes.
- Fonts self-hosted from hand-picked `.woff2-variations` subsets in `public/fonts/` (~270 KB total).

## QA evidence
See `qa/` for screenshots: desktop 1440×900, mobile 390×844, ES locale, reduced motion, feature spread
close-up. Preview served at 127.0.0.1:4506 during QA, stopped after.

## Honest self-score
- Wow: 8/10 — kinetic variable type + magazine grid is a genuine, distinct interaction; not a 3D/WebGL
  showpiece, so it plays it safer than the ceiling of "wow" the brief invites.
- Polish: 8/10 — typography, rhythm and copy are tight; motion is layered and reduced-motion-safe.

## Known limitations
- Single long-scroll page per language (no sub-routes per case study) — chosen so all four case studies
  stay "fully readable" in one continuous editorial read, per the brief's requirement, without forcing
  a multi-page click-through.
- No sound, no WebGL/3D — this concept's "wow" budget went entirely into typography and scroll motion.
