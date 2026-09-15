# DESIGN.md — Atlas Map (c13)

## Design Read (one line)
A transit map of a career: each role is a station on one line, drawn stop by stop, so a recruiter
reads eight years as a single, legible journey in three seconds.

## Three dials
- **Density**: medium. One line, one row of stations, no clutter — a metro map is legible precisely
  because it drops everything but stops and connections.
- **Motion**: line draws on load/scroll (stroke-dashoffset), stations pop in with a stagger. Fully
  gated by `prefers-reduced-motion` → static, already-drawn map, no animation at all.
- **Voice**: precise, technical, quietly confident — same ink/paper/steel system as the base, transit
  iconography (interchange dots, terminus caps) instead of card chrome.

## Token plan (kept from base, already audited)
- Palette: `--ink #0b0d10` / `--paper #f7f6f3` / `--steel #2f5680` (the "line colour") on light;
  inverted + lifted steel on dark. AA-checked pairs unchanged from base.
- Type: Newsreader (display) + IBM Plex Sans (body) + IBM Plex Mono (labels/stops) — system stack
  fallback already declared, `font-display: swap` already set.
- Layout: existing `.wrap` grid/spacing scale reused; new `.atlas` section only.

## Concept spec: Atlas Map section (replaces static "Experience" list preview on Home)
- **Composition anchor**: single horizontal line spanning the section width on desktop, one bend
  where the timeline reverses at the terminus (current role, right-most/top).
- **Background mode**: flat paper, no photo — the SVG line + circular station nodes ARE the
  visual, per brief ("one memorable visual idea").
- **Stations**: one per `experience[]` entry (8 roles), label = company (+ client in a sub-line),
  no invented cities — only "Remote/hybrid from Zaragoza" appears (audited fact), as the line's
  home terminus caption, not per-stop.
- **Type scale**: station label `--step-micro` mono (matches existing "stop" aesthetic of `.tag`),
  current-role station gets `--step-small` + steel fill "you are here" ring.
- **CTA style**: current-role station is a focusable `<a>` to `/experience/`; every station is a
  focusable `<a>` (keyboard reachable, visible focus ring from global.css).
- **Motion cue**: `stroke-dashoffset` line draw + staggered station fade/scale on IntersectionObserver;
  `prefers-reduced-motion` → CSS class short-circuits to the finished state, zero JS motion.
  Mobile ≤ 40rem: line rotates to vertical (flex column with a left rail line), same stations/order.
- **ASCII frame (desktop)**:
```
[Zaragoza remote/hybrid — line home]
o——————o——————o————o———o——o—o——●  (current, filled ring)
STRATESYS  IO  ALTRAN  INDEP  ENZO CloudAPPi Vermont/Santander Avanade/UNIR Decskill/Zara Home
```
- **ASCII frame (mobile, <=40rem)**: same stations, vertical rail, top→bottom oldest→newest.

## What changed after self-review
- Dropped a per-role "city" idea (Madrid etc.) — not in `src/data` or CV, would be invented; kept
  Zaragoza remote/hybrid as the only geography claim (audited).
- Kept the existing stats + case-study grid untouched (content contract, no regressions); Atlas Map
  is additive between hero and stats, so it doesn't crowd the 6–10s recruiter scan.

## Fidelity ledger (spec vs. shipped, ≥5 points)
1. Single line, draws on load — shipped via inline SVG `<path>` + stroke-dashoffset script. Match.
2. Stations keyboard-focusable links with visible labels — shipped as `<a>` per station with
   mono labels always visible (no hover-only reveal). Match.
3. Reduced motion → static drawn map — shipped: `prefers-reduced-motion` class sets dash offset 0
   and disables the observer/animation entirely. Match.
4. Mobile reflows to vertical line — shipped via flex-direction change + rotated connector. Match.
5. No invented locations — shipped: only "Zaragoza remote/hybrid" caption, no per-stop cities. Match.
6. Fonts: kept base's Google Fonts `@import` with `display=swap` — deviation from "self-hosted
   preload" ideal, accepted given the 25-minute time-box; noted as a known limitation.
