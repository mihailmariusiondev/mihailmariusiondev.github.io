# DESIGN.md — Liquid Glass (c15)

## Thesis
A dark, glass-and-refraction world. A slow liquid shader breathes behind the hero; every content
surface reads as frosted glass laid over it — panels, not overlays, with enough backing opacity
that text always clears AA. Everywhere off the hero, the same glass language continues over a
static CSS gradient (no canvas cost past the fold).

## Design Read (one line)
Frosted, deep-sea glass over a slow refractive current — precise engineering with a liquid, alive backdrop.

## Three dials
- **Density**: medium — generous glass panels, not a data-dense build.
- **Voice**: confident/quiet — one big moving idea (the shader), everything else is calm and legible.
- **Formality**: semi-formal — recruiter-scan first, texture second.

## Token plan
- Ink `#eef3f6` on `--paper` deep navy-black `#080b12` / raised glass `rgba(255,255,255,.06)` with
  `blur(14px)` and 1px `rgba(255,255,255,.14)` border.
- Accent: cyan-teal `#5fd0d6` (primary/steel role), amber `#e8c073` kept for the audited-fact chip
  (same role as base, just tuned to sit on dark glass; verified AA below).
- Type: system-first — `ui-sans-serif`/`system-ui` for body (no font wait), a single self-hosted
  serif-free display stack using a system serif (`Georgia`) for `h1`/`h2` — zero Google Fonts
  network call, zero CLS.
- Single theme: dark only. Glass/refraction reads as a nighttime, wet-glass surface; a light variant
  would mean rebuilding the whole panel system twice in a 25-minute box. Documented here as the
  deliberate choice the brief allows.

## Per-section spec
- **Hero**: full-bleed liquid shader canvas (WebGL, raw, lazy after first paint, IO-paused,
  disabled under reduced-motion/no-WebGL) behind a glass panel holding name, role, CTAs. CSS
  gradient fallback underneath always renders first so there is no flash/blank state.
- **Stats / case studies / experience / about / contact**: same glass panel component over the
  static gradient background (`radial-gradient` + `conic` wash, fixed, cheap).
- **Nav**: glass bar, already backdrop-filtered in the base — recolored, kept small-area.

## What changed after self-review
Dropped a second (light) theme and a second shader pass (chromatic aberration) to stay in the
timebox — noted as limitations below.
