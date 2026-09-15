# DESIGN.md — s04 Playable Career

## One line
A side-scrolling "career run" you walk with arrow keys through five real zones (Origins → Santander →
UNIR → Zara Home → Contact), collecting verified-outcome orbs and talking to NPCs who deliver Marius's
real LinkedIn recommendations — with a one-click "Skip the game" link, always visible, that drops a
recruiter straight into a fast, fully readable portfolio.

## Why it's wow
- Nobody else in a CV bake-off ships an actual playable platformer with real career data as level design.
- The skip mode isn't an apology tab: it is a fully designed, calm, fast reading experience in its own
  right, built from the same data, so a recruiter in a hurry loses nothing.
- Every collectible and NPC line is sourced verbatim from `_context` (stats.ts / recommendations /
  caseStudies). No invented dialogue.

## Art direction
Flat vector "engineering blueprint meets arcade" look, built entirely from canvas primitives (no pixel
art assets, no fake dashboards — explicitly illustrative). Each zone is a distinct, deterministically
seeded skyline (buildings sized/placed by a small hash-seeded PRNG per zone id) with lit windows, a
zone-tinted parallax hill band, twinkling stars and ambient color-matched "fireflies" — Origins in blue
over a blueprint grid floor, Santander in pink/red over a banking-hall tile floor, UNIR in green over a
brick-hatch courtyard floor, Zara Home in purple over a soft retail dot-grid floor, and the finale in
gold with converging perspective path lines leading to a glowing beacon. The player has a color-matched
cape/trail per zone, a landing squash, and a walk-cycle; collectibles are hexagon "medal" or folded
"document" icons with a pulsing glow and a particle burst on collection; a top progress rail shows
overall run position with a zone-colored gradient; zone entry pulses the HUD label. Terminal/monospace UI
chrome (JetBrains Mono via system stack fallback, no webfont fetch) for HUD and modals to read as
"engineer's tool," body copy in a clean humanist sans (system-ui) for legibility.

## Structure
- Zone A — Origins (2018–2022): Stratesys, IO Digital, Altran, ENZO, CloudAPPi. 2 NPCs.
- Zone B — Vermont / Santander (2022–2024): passwordless migration case study. 1 NPC.
- Zone C — Avanade / UNIR (2024–2025). 1 NPC.
- Zone D — Decskill / Zara Home (2025–2026, current): 3 case studies + 5 verified-result orbs. 1 NPC.
- Finale — Contact: CV downloads (EN/ES), email, LinkedIn, GitHub.
- Skip-the-game mode: same 5-section structure as a scrollable, print-quiet reading page.

## Stack & deps
Zero dependencies. Static HTML + CSS + vanilla JS (Canvas 2D for the game, no WebGL/three.js). No
bundler, no framework: ponytail rung 4/6 — a 5-zone platformer with ~15 interactables and a richer art
layer (seeded skylines, particles) still doesn't need React/Phaser/Vite/three; a `requestAnimationFrame`
loop and well under a thousand lines of JS is smaller and has zero build risk for a static GitHub Pages
deploy. Total JS/CSS: ~34 KB across 4 JS files + 1 CSS file, 0 KB of npm installs.

## Bilingual
Single-page client-side toggle (EN default, ES). All copy lives in `data.js` as `{en, es}` pairs mirroring
the source `.ts` files; toggling swaps `document.documentElement.lang` and re-renders text nodes tagged
`data-i18n`. No routing needed for a single-page game.

## Accessibility / reduced motion
`prefers-reduced-motion` and any device without a fine pointer with a keyboard risk get the reading mode
by default (game still reachable via a button, never auto-played; reduced motion also disables ambient
particles, fireflies, twinkle and the zone-pulse animation, keeping only the essential state changes).
Skip-link, focus-visible states, all interactive game actions are also reachable via on-screen buttons
(not keyboard-only), modals are focus-trapped and Escape-closable, color contrast checked against AA.
The top bar wraps on narrow viewports (brand on its own row, then CV/language, then the "Skip the game"
button on a full-width row) so nothing clips at 390px.
