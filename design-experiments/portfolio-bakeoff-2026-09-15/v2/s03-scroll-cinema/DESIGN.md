# DESIGN.md — s03-scroll-cinema

## One line
"SIGNAL": a broadcast-control-room scroll film — dark terminal aesthetic, timecoded
scenes, masked type wipes and count-up data readouts — that turns Marius's verified
numbers into the plot of a cinematic reel instead of a resume.

## Why it's wow
- Full GSAP ScrollTrigger pinned-scene choreography: horizontal career reel, masked
  case-file wipes, scrubbed count-up stats, a pinned quote transmission deck.
- A distinct visual world inside "scroll cinema": not elegant/luxury cinema, but an
  engineering broadcast console — scanlines, timecode readout ("SCENE 03 · 00:41"),
  monospace data type paired with a huge geometric display face. Fits an engineer who
  measures everything (96%, 1.42%, 34/23, 21/53).
- Real numbers animate: 570 KB → 22 KB, 96%, Top 1.42%, 34 findings / 23 PRs, 21 of 53.
- Every case study opens into a full-screen "case file" dialog with every field
  (context, role, decisions, outcome, what it demonstrates) — cinematic teaser, fully
  readable detail, satisfying the "all four case studies fully readable" rule without
  breaking scroll pacing.
- A persistent corner dock (email / LinkedIn / GitHub / CV EN / CV ES / EN-ES toggle)
  stays reachable from every scene, including inside the case-file dialog.

## Art direction
- Palette: near-black (#0a0b0d) base, warm paper-white text, one signal accent
  (phosphor amber #ffb545) used sparingly for timecodes, active states and the count-up
  numbers — like an oscilloscope trace on a dark panel.
- Type: Bricolage Grotesque Variable (display, huge kinetic headlines, self-hosted via
  @fontsource-variable), Inter Variable (body/UI, self-hosted), Space Mono (timecodes,
  labels, stat values — the "instrument readout" voice).
- Texture: subtle scanline + grain overlay, CSS-only, fixed and cheap.
- Motion grammar: pin + scrub for structure (timeline reel, case files, stats, quotes),
  word-level split-text reveals on headlines (GSAP SplitText, free since GSAP 3.15),
  masked image/number wipes on scene transitions.

## Stack & deps (why)
- Vite (`^7`, already in the shared node_modules) — plain static build, no server
  runtime needed for a single scroll page; lighter than pulling in Astro for one route.
- `gsap` (^3.15, ~6.4 MB unpacked / ships only the ESM chunks actually imported —
  core + ScrollTrigger + SplitText) — the scroll choreography engine the brief asks for.
- `lenis` (^1, ~520 KB unpacked) — smooth scroll that GSAP's ScrollTrigger syncs to.
- `@fontsource-variable/bricolage-grotesque`, `@fontsource-variable/inter`,
  `@fontsource/space-mono` — self-hosted fonts, no Google Fonts request at runtime.
- No framework (no React/Astro): one HTML file, one CSS file, one JS entry. Content
  lives in `src/content.js` as plain EN/ES data objects copied verbatim from
  `_context` so every string traces back to source.

## Structure
- `index.html` — scene markup + persistent dock/nav.
- `src/content.js` — all EN/ES copy and facts (identity, stats, experience, case
  studies, recommendations, contact) — copied from `_context/*.ts`.
- `src/main.js` — Lenis + GSAP ScrollTrigger scene choreography, language toggle,
  reduced-motion fallback, case-file dialog.
- `src/style.css` — design system (tokens, scenes, dock, dialog, responsive/mobile
  rework, reduced-motion overrides).

## Horizontal reels: pin technique
The origin reel (scene 01) and transmissions reel (scene 05) pin visually via
CSS `position: sticky` on an inner wrapper inside a JS-sized outer track
(`height: calc(100vh + travelDistance)`), with GSAP ScrollTrigger only driving
the `x` scrub and recomputing that height on refresh (`onRefreshInit`). This
was a deliberate fix: GSAP's own `pin: true` auto-spacer, pinning an element
nested in a `justify-content: center` flex ancestor, under-measured the
travel distance and let the next scene's normal-flow content bleed into the
still-pinned reel. Sticky removes GSAP from the spacing calculation entirely
and eliminates the whole bug class. On mobile/reduced-motion the sticky rule
is turned off and the reels become plain native `overflow-x: auto` with
`scroll-snap`, so there is no scroll-jacking on touch at all.
