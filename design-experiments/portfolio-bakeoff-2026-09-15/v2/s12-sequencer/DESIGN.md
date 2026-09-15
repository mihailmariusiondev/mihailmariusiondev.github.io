# DESIGN.md — s12-sequencer

## One line
A hardware step sequencer / synth rack where Marius's career is the composition: nine roles are
tracks with lit step-patterns, four case studies are patches you load into the display, verified
numbers are calibrated parameter knobs, and a scope panel breathes even when muted.

## Why it's wow
- Recruiters skim; this makes skimming physical. The rack reads instantly as "instrument," the
  channel strips read instantly as "career," and every LED, fader and knob is wired to a real,
  cited fact — nothing decorative is fake data.
- Sound is a bonus, never a requirement: the whole thing is legible, keyboard-operable and
  gorgeous with the audio engine untouched (LEDs pulse on a CSS/JS clock, the scope draws a
  synthetic waveform derived from scroll position, not from audio analysis).
- Two case studies fully open in a lightbox "patch" display with typeset prose, not a compressed
  gimmick — worth reading, not just worth looking at.

## Art direction
- Palette: near-black brushed panel (#111316 / #17191d), warm off-white LCD text (#F4EFE6),
  amber/lime step LEDs (#ffb020 active / #4b5563 idle), one accent teal (#38f2c8) for hover/focus.
  Faint brushed-aluminum vertical grain via repeating-linear-gradient, screws (radial-gradient
  dots) at panel corners for the hardware tell.
- Type: `Space Grotesch`-like system stack unavailable offline, so JetBrains-Mono-esque monospace
  for readouts (`ui-monospace, "SF Mono", Menlo, Consolas`) + a plain humanist sans
  (`ui-sans-serif, system-ui`) for long-form case-study prose, so reading stays comfortable.
- Every module has a real skeuomorphic tell (screw, LED, knurled knob ring, jack) but stays flat
  enough to render crisp on a phone — no heavy 3D/gradients that fight small screens.

## Interaction model
- The rack is one page split into channel strips (Home hero + Experience = 9 tracks), a patch bay
  (4 case studies as loadable patches, open a full-panel display), a parameter bank (5 stats as
  knobs, hover/focus reveals the exact figure and citation-safe copy), a scope + about panel, and
  an output-jack panel for contact/CV/LinkedIn/GitHub, reachable from a persistent header rack too.
- Keyboard playable: digits 1–9 select a track/step and (if sound is on) trigger a note on that
  track's oscillator; arrow keys move focus between steps; Enter/Space opens the focused patch.
- Sound is strictly opt-in via a big labeled POWER toggle in the header; Web Audio only
  initializes on user gesture after toggling on. Default: muted, LEDs and scope still animate on a
  visual clock.
- `prefers-reduced-motion: reduce` freezes the LED clock and scope to a single static frame and
  disables the transport-lit-step animation; content and layout stay identical.

## Stack and dependencies
- Plain HTML + CSS + vanilla JS. No framework, no bundler, no npm dependency: the whole "instrument"
  is under ~40 KB of hand-written CSS/JS plus the provided photo/PDF/favicon assets. Zero added
  bytes for a design system a single page doesn't need (ponytail: skip Astro/build tooling — a
  static folder already satisfies "static dist/ for GitHub Pages").
- `dist/` is a byte-identical copy of the project root (no build step exists to diverge them).

## Content mapping (facts -> instrument)
- 9 experience entries -> 9 channel strips, each with period/company/client/role from
  `experience.ts`, verbatim.
- 4 case studies -> 4 patch slots -> full patch-display panel using every field from
  `caseStudies.ts` (context, role/delivery, decisions, outcome, what this demonstrates,
  confidential/sanitized notice where present).
- 5 stats -> 5 labeled knobs, value + full label from `experience.ts` stats, unrounded.
- 5 recommendations -> a "patch notes" ticker/list under Experience, quotes + author + role + note
  from `experience.ts`, unmodified.
- About paragraphs -> scope-panel readout text, verbatim from `ui.ts`.
- Contact links + both CV PDFs + email/LinkedIn/GitHub -> output-jack panel, reachable from every
  page state via the sticky header.
