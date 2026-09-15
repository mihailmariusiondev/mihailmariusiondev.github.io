# DESIGN.md — Night Instrument

## Thesis
A single deliberate dark theme: a calibration bench at night. Surfaces are dark
slate-navy, not black, lit by two real accent colours (a cyan-teal "live signal"
and a brass-amber "verified reading"), never black+acid-green. A tiny pointer
script lights the element under the cursor/finger like a dial catching light;
keyboard focus lights the same way without a mouse. Outcomes are presented as
calibrated readouts, typeset in mono, using only the numbers already in
`src/data/experience.ts` — no invented scales, gauges or progress bars implying
a maximum that isn't in the data.

## Design Read (one line)
Precision instrument panel at night: dark surfaces, two real accent colours,
readouts you can audit, light that follows you.

## Three dials
1. **Warmth vs. clinical**: warm. Amber/brass reads as measured, human craft,
   not surveillance-clinical cyan-on-black.
2. **Density vs. air**: instrument density on data (readouts, field rows) but
   generous air everywhere else — this stays a portfolio, not a dashboard.
3. **Motion vs. stillness**: mostly still. The one motion idea (the light) is
   spatial and cursor-driven, not decorative animation layered on top.

## Why one theme (no light mode)
The visual idea IS the dark surface: light "arriving" via the pointer/focus
spotlight only reads as an event against a dark instrument panel. A light-mode
variant would either lose the effect (nothing to light) or require a second,
unrelated visual language — which contradicts "one memorable visual idea."
`color-scheme: dark` is set so browser UI (scrollbars, form controls) matches.

## Token plan

| Token | Hex | Role | Contrast on `--paper` (#0b0f16) |
|---|---|---|---|
| `--paper` | `#0b0f16` | base surface | — |
| `--paper-raised` | `#141b24` | cards, header | — |
| `--paper-sunk` | `#080b10` | stats band, footer | — |
| `--ink` | `#eef1f5` | primary text | 16.9:1 |
| `--slate` | `#aab4c0` | secondary text (body-size) | 9.1:1 |
| `--slate-quiet` | `#8b96a3` | tertiary/meta text | 6.6:1 (on `--paper-sunk`) |
| `--steel` (teal) | `#6fe3d0` | live signal: links, active rules, readout numerals | 12.4:1 |
| `--steel-dark` (teal, brighter) | `#9ff0e2` | hover state | 14.7:1 |
| `--amber` | `#e8b054` | verified/audited badge | 9.8:1 |
| `--amber-bg` | `#2a2014` | verified badge background | amber-on-bg 8.2:1 |
| `--rule` / `--rule-strong` | `#232b36` / `#374252` | hairlines, borders (decorative) | n/a |

All numeric text pairs verified with the WCAG relative-luminance formula
(script run locally, see NOTES.md) — every pair above clears AA (4.5:1) with
margin; most clear AAA (7:1).

Fonts: system stack only (`ui-sans-serif` for display/body,
`ui-monospace` for readouts/labels). No Google Fonts, no self-hosted woff2 —
zero font network requests, zero swap/CLS risk, and a technical mono numeral
set is exactly the "instrument" voice this concept wants. This is the direct
answer to the brief's performance note.

Type scale, spacing and layout primitives are unchanged from `_base`
(`--step-*`, `--space-*`, `.wrap`, `.field`, `.tag` etc.) — the redesign is
carried entirely by colour, font stack, the spotlight system and the readout
treatment of `.stat`, so every page template inherits it with no structural
rewrite.

## The spotlight system
Two layers, both CSS-variable driven, both written by one ~25-line inline
script in `Layout.astro`:

1. **Ambient page glow** (`#ambient-spot`, fixed, `pointer-events:none`,
   `mix-blend-mode: screen`): a soft radial teal wash that follows the pointer
   across the whole viewport. Only becomes visible (`opacity` transition)
   after the first `pointermove`, and only when the browser reports a fine
   pointer (`matchMedia('(hover:hover) and (pointer:fine)')`) — so touch users
   never get a phantom cursor glow.
2. **Local element glow** (on `.btn`, `.card`, `.stat`, `.topnav__link`,
   `.langswitch`, `.bottomnav__link` — the existing interactive classes, no
   markup changes needed): each element tracks pointer position *relative to
   itself* in `--mx`/`--my` (percentages) and reveals a radial-gradient rim on
   `:hover`/`:focus-visible`. Keyboard focus does not run the pointer math —
   it defaults `--mx`/`--my` to 50% 50% (centred glow), so Tab-through lights
   the same element the same way with zero JS pointer dependency.

Both layers are inert (no listeners even attached, no visible effect) under
`prefers-reduced-motion: reduce`: content is fully readable and fully
interactive with the spotlight system entirely absent, not just slowed down.

## Per-section concept spec

**Hero** — composition anchor: text-left, portrait-right (desktop) /
stacked (mobile), unchanged grid from `_base`. Background: flat `--paper`,
ambient spotlight visible here first. Type: system-sans display at the
existing fluid `--step-display`, heavier weight + tightened tracking for an
instrument-plate feel. CTA: `.btn` pair, local glow on hover/focus (`.btn`).
Motion cue: pointer/focus glow only; no entrance animation (a night panel
doesn't power on with a flourish, it's just lit).
```
[ EYEBROW: SENIOR ANGULAR / FRONTEND ]
[ H1 headline.............. ]      [ photo ]
[ lede...................... ]
[ [btn primary] [btn] [in] [gh] ]
[ location mono line ]
```

**Stats / readouts** — composition anchor: full-width band, `--paper-sunk`,
5-across on desktop. Background: sunk surface reads as a recessed panel.
Type: mono numerals at 1.625rem (unchanged size), teal left rule per readout
(existing `.stat` border, recoloured) — a ledger of audited entries, no chart
or scale implied. CTA: none, informational. Motion cue: local glow per
readout (`.stat`).
```
┌ 96%          ┌ 95% (top 1.42%)   ┌ 34 findings ...
│ label text   │ label text        │ label text
```

**Work / case studies** — composition anchor: 2-up card grid (desktop),
existing `CaseStudyCard`. Background: `--paper-raised` cards on `--paper`.
Type: mono eyebrow + sans title, unchanged scale. CTA: whole card is the
link, local glow (`.card`) + steel border on hover/focus. Motion cue: local glow
+ existing 2px lift (kept, honours reduced motion already).

**Nav** — composition anchor: sticky hairline top bar (desktop), floating
bottom bar (mobile), unchanged from `_base`. Local glow added to
top-nav links (`.topnav__link`) and the language switcher (`.langswitch`) for focus/hover legibility.

## What changed after self-review
- First pass gave the ambient spotlight a hard-edged circle: softened to a
  three-stop radial gradient so it reads as light falling on a surface, not a
  UI cursor ring.
- Dropped a plan to show stat values as horizontal "gauge" bars and a plan
  for decorative corner-bracket ticks — both risked implying a max/scale
  that isn't in the data, or collided with the spotlight's own `::before`
  layer; kept plain mono numerals + the existing left-rule instead.
- Kept `--rule`/`--rule-strong` structural tokens instead of inventing new
  ones: fewer variables, same visual system, faster to audit for contrast.
