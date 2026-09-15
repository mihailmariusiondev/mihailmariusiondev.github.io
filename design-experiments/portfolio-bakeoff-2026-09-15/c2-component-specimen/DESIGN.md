# DESIGN.md — Component Specimen

## Direction (assigned by brief, not rolled)
This concept's direction is pinned by the bake-off orchestrator: "Component Specimen." No
concept-seed / decision-page round was run — `new-work.md`'s tournament machinery is for open
visual-world choice, and this world is already named. What follows is the direction contract this
brief asks new-work.md's process to produce, written directly.

**THESIS.** The portfolio does not describe craft, it demonstrates it: the page itself is read as a
design-system specimen sheet — a live profile component with documented states, redline-annotated
outcome measurements, and case studies written as component documentation (anatomy, states,
outcome). Refuses the category default of a photo-hero-plus-card-grid portfolio.

**OWN-WORLD.** Ink-on-graph-paper engineering-spec palette (near-black ink, warm paper, one
signal-red "redline" accent used only for annotation/measurement, one spec-blue accent for
structure/links). A characterful grotesk (Hanken Grotesk) for UI and prose, a technical mono
(Fragment Mono) for labels, specimen numbers, and redline call-outs. Radius varies by hierarchy:
0–2px on structural chrome (tables, dl rows, spec sheets), 8px on content cards, full-pill on
interactive controls (segmented control, tags, nav). No grey-shadow card grid.

**STORY.** A recruiter lands, sees a labelled "Profile Component" with a segmented control
(`Overview / Outcomes / Contact`), flips through its states in place, and reads the strongest
outcomes as measured, annotated facts rather than marketing stats. Clicking through to a case study
reads it as that component's own documentation page.

**FIRST VIEWPORT.** Doc-site top bar (site name + primary nav, monospace). Below it, a labelled
"live component" frame: an eyebrow reading `COMPONENT · profile-card`, a segmented control (native
radio group) switching three panel states, the visible state showing photo + role + current
outcome + primary CTAs, with a small state-index readout (`01 / 03`) in the corner like a spec
sheet page count.

**FORM.** Native HTML/CSS component-documentation pattern (radio-driven state, `<details>` on
mobile nav, CSS view-transition-style cross-fades). No JS framework, no icon library.

**FINISH.** Unreviewed and undocumented is unfinished; this build ends with the finish review, the
verdict, DESIGN.md, and every shipping raster carrying its provenance. (No new rasters ship in this
concept — no image generation available, `public/me.webp` is the only photo, per brief.)

## Design Read
Reading this as: developer portfolio for recruiters/eng leads, with a technical-documentation /
design-system-specimen language, leaning toward native CSS component states + redline annotation,
not a marketing landing page.

## Three dials
- `DESIGN_VARIANCE: 5` — a spec sheet is ordered, not chaotic; the variance lives in the redline
  annotations and radius hierarchy, not in asymmetric layout.
- `MOTION_INTENSITY: 4` — state morphs are the signature motion; everything else is quiet feedback.
- `VISUAL_DENSITY: 5` — denser than a typical airy portfolio (labels, tags, dl rows, annotations),
  short of a data cockpit.

## Token plan
```
--ink:            #14120f   (near-black, warm)
--paper:          #f4efe4   (warm graph paper)
--paper-raised:   #fffdf7
--paper-sunk:     #ece5d3
--rule:           #d9cfb8
--rule-strong:    #b7a988
--spec-blue:      #2451a3   (structure, links, focus)
--spec-blue-dark: #163a7e
--spec-blue-wash: #e4ebf7
--redline:        #b5251f   (annotation ink only — measurement marks, call-outs, "verified" badge)
--redline-wash:   #f6e4e0
--slate:          #5b5445
--slate-quiet:    #6d6656
--font-display/ui: "Hanken Grotesk" (400/500/600/700)
--font-mono:       "Fragment Mono" (400) — labels, specimen numbers, redlines, nav
--radius-sharp: 2px   (spec sheet chrome: dl rows, tables, field lists)
--radius: 10px        (content cards, panels)
--radius-pill: 999px  (segmented control, tags, nav pills, buttons)
```
Contrast checked: `--ink` on `--paper` 15.7:1; `--slate` on `--paper` 5.1:1; `--spec-blue` on
`--paper` 6.3:1; `--redline` on `--paper` 5.9:1; dark-mode pairs re-checked in the same ratios
(inverted ink/paper, brightened accents). Dark mode: media-query mirror, same structural logic
(a spec sheet under a desk lamp vs. under studio light — both are "on the page", so the dark
variant keeps the same warm-graph-paper hue relationship, just inverted).

## Per-section concept spec
- **Hero / profile component** — composition anchor: labelled component frame, top-left eyebrow
  `COMPONENT · profile-card`, segmented control top-right of frame. Background: flat paper, no
  photo bleed. Type scale: display grotesk ~3rem for name, mono labels 0.75rem tracked. CTA: pill
  buttons inside the active panel. Motion cue: cross-fade + 4px slide between panel states
  (`::view-transition` on supporting browsers, CSS-only fallback via `:checked` opacity/transform).
  ASCII:
  ```
  [ COMPONENT · profile-card                    01/03 ]
  [ (Overview) (Outcomes) (Contact)  <- segmented control ]
  [ photo | name, role, active-state body, CTAs         ]
  ```
- **Outcomes as redline specimens** — composition anchor: each stat is a measured annotation, not a
  card: a dimension line with tick marks, a mono value like a callout leader, the label as a spec
  note. Background: paper-sunk strip. Motion cue: tick marks draw in on scroll-into-view (one-time,
  reduced-motion shows static).
- **Case studies index** — component preview tiles: eyebrow `COMPONENT · case-study`, title, one
  spec line, tag row as pill "props". Motion cue: hover raises to `--paper-raised` with hairline
  border brightening, no shadow/translate cliché beyond 2px.
- **Case study page** — doc-site anatomy: breadcrumb, title + summary, an "Anatomy" tag row, a
  `field` list styled as a spec table (existing `dl` pattern, sharpened), an "Annotate" checkbox
  toggling a redline layer (call-out numbers beside each field, keyed to a legend) — content stays
  in the DOM either way.
- **Nav** — doc-site desktop: sticky top bar, site name left, section links + language switch right,
  mono type, active link underlined like an active doc-nav item. Mobile: a single `<details>`
  disclosure ("Menu") replacing the floating bottom bar, native and keyboard-operable with no JS.

## What changed after self-review
Dropped an initial idea to make the annotation toggle a JS-driven overlay with absolute-positioned
call-outs: at 320px width the leader lines collided with wrapped text. Replaced with a mono-numbered
inline list that keys to the same field order — same "redline" read, robust at 320–1920px, and it
works with CSS alone via a `<details>`/checkbox pattern rather than a script.

## Skill ledger
- **impeccable** (`context`, `new-work.md`, `shape.md`, `craft-floor.md`): read PRODUCT.md, direction
  already assigned by brief so concept-seed rounds were skipped (documented above); craft-floor's
  refuse list drove: no eyebrow eyebrow-then-heading pattern reused verbatim (existing base already
  used it — kept as `.eyebrow` but repurposed as a component-spec label, not a decorative kicker),
  no card-grid-of-icons, no gradient text, no border-left-as-decoration beyond 1–2px structural rules.
- **frontend-design**: token plan above is the two-pass output (drafted, then revised: first pass
  reused IBM Plex which the brief bans, swapped to Hanken Grotesk + Fragment Mono).
- **design-taste-frontend**: Design Read + three dials above (adapted: no Tailwind/React present,
  native Astro CSS instead; no icon library installed, nav uses text labels not icon glyphs).
- **frontend-app-builder / imagegen-frontend-web**: no image tool in this session; applied as method
  via the per-section spec above + fidelity ledger (below) instead of generated comps.
- **high-end-visual-design / redesign-existing-projects**: anti-generic checklists — confirmed no
  centered-hero-over-mesh, no three-equal-feature-cards, no glass, no purple gradient.
- **astro-best-practices**: static output kept, no new islands, scoped `<style>` per component kept.
- **animate + emil-design-eng**: motion thesis is the profile-component state morph (focal moment);
  supporting motion is hover/focus feedback only. See review-animations table in NOTES.md.
- **accessibility / core-web-vitals / seo / performance / web-quality-audit / pagespeed-insights /
  best-practices**: Lighthouse + manual QA in NOTES.md.

## Fidelity ledger (spec → build)
1. Segmented control drives 3 real panel states via native radios, content in DOM — built as spec.
2. Redline outcome specimens use dimension-line + tick-mark visual, mono callouts — built as spec.
3. Case study "Annotate" toggle is a `<details>`/checkbox pattern, content in DOM — built as spec.
4. Desktop doc-nav top bar / mobile `<details>` menu replaces old floating bottom bar — built as spec.
5. Radius hierarchy (2 / 10 / pill) applied across dl rows, cards, controls — built as spec.
