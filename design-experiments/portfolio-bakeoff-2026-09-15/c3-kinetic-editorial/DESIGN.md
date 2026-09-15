# DESIGN.md — Kinetic Editorial (c3)

## Design Read
Reading this as: solo senior-engineer portfolio for recruiters/eng leads scanning fast, with an
editorial / kinetic-type language, leaning toward native CSS + scroll-driven animation + one
characterful variable display font. No component library, no icon library: type carries the
interface.

## Three dials
- `DESIGN_VARIANCE: 8` — strong asymmetric grid, oversized type breaking the block, but content
  blocks (case fields, timeline, recs) stay orderly so long-form reads cleanly.
- `MOTION_INTENSITY: 6` — one orchestrated hero entrance, native scroll-driven type on the case
  index and case-page progress; no autoplay loops, no cursor-follow gimmicks.
- `VISUAL_DENSITY: 3` — airy; poster-scale type needs room to breathe. Data-dense sections
  (stats, timeline) still get generous separation.

## Token plan
- **Type:**
  - Display/kinetic: **Anybody** (variable, `wght` 100–1000, `wdth` 25–151) — the one
    characterful, animatable family. Used for h1/h2, nav, the hero name, kinetic case titles.
    Justification for a non-default choice: Anybody's width axis is the literal "kinetic type"
    mechanism the brief asks for (weight AND width, not just weight), and it reads as Swiss
    exhibition signage at poster scale, not a template display face.
  - Body: **Inter** (variable, `wght` 400–600) — plain, dense-readable workhorse for long-form
    case fields, timeline, recommendations. Kept deliberately quiet so all boldness stays in the
    display face, per the brief.
  - Labels/mono: system mono stack (`ui-monospace, SFMono-Regular, Menlo, monospace`) for tags,
    eyebrows-as-running-heads, stat numerals. Zero extra font weight.
- **Palette (light):** `--paper #FAFAF9` / `--paper-raised #FFFFFF` / `--paper-sunk #EFEEEA` /
  `--ink #111113` / `--slate #53565C` (AA on paper and paper-sunk) / `--rule #DBD9D3` / one signal
  accent `--signal #1E3AF0` (electric cobalt) used ONLY for the kinetic cues: progress bar, active
  nav state, focus ring, primary CTA, underline-on-hover. This avoids both banned defaults
  (cream+terracotta, black+acid-green): near-white/near-black structure, a single cold, saturated
  accent, all visual loudness spent on type scale/motion, not on multiple hues.
- **Palette (dark):** `--paper #0A0A0C` / `--paper-raised #131316` / `--paper-sunk #0E0E10` /
  `--ink #F3F2EE` / `--slate #B7B8BC` / `--rule #2B2B2F` / `--signal #7C93FF` (brighter cobalt for
  dark contrast). `color-scheme: light dark`, no toggle: system preference, per craft-floor "pick
  it from the use scene" (a recruiter's browser/OS already carries their preference).
- **Grid:** asymmetric 12-col on desktop (`--gutter` fluid), text column flush-left, oversized
  type allowed to sit off-grid at poster scale; content blocks (fields/timeline/recs) sit in a
  narrower measure column for readability.
- **Radius/shadow:** small radius (6px), soft-offset shadow reused from base (kept: already
  correct — offset + blur, not a flat halo).

## Anti-generic checklist (impeccable craft-floor, applied)
- No eyebrow-as-kicker above headings (craft-floor hard ban). Existing `*Eyebrow` UI strings are
  repurposed as inline running heads inside the nav/breadcrumb rail, never floated above an `h1`.
- No same-size icon+heading+text cards for the case index: cards keep summary/tags but the title
  is the kinetic element, not a matching icon.
- No hand-rolled icon set: nav drops the bespoke SVG glyphs and uses text labels only (no icon
  library is installed, brief's adapted pre-flight rule).
- No hard offset "neobrutalist" shadows, no gradient text, no glass-as-decoration, no sparkline
  filler, no section numbers.
- Display type is allowed past the general 6rem ceiling at the hero/case-index scale: this is the
  brief's explicit, named exception ("type IS the interface... poster scale... huge titles"), the
  one place this concept is allowed to override the default check.

## Per-section concept spec

### Nav (SiteNav.astro)
- Composition anchor: wordmark top-left, always visible; desktop nav is a horizontal row of
  oversized text links (1.5–1.75rem, Anybody) beside it — "full index" always on screen, no
  hamburger. Mobile: wordmark + a text "Menu" button opening a native `popover` panel (zero JS)
  with the same items stacked at poster scale.
- Background mode: sticky hairline bar, translucent blur on scroll.
- Type scale: nav links ~1.6rem desktop / popover items ~3rem mobile.
- CTA style: language switch is a small pill, always visible in the header row (not inside the
  popover) so it's reachable in one tap from every page.
- Motion cue: hover/focus on a nav link swings `wdth`/`wght` toward its bold-condensed target
  (transition, not looping); active page gets a signal-colored underline that grows from 0 width.
- ASCII frame (desktop):
  ```
  [Marius Mihail Ion            Work  Experience  About  Contact   (ES)]
  ```
- ASCII frame (mobile popover):
  ```
  [Marius Mihail Ion                         Menu]
  ┌──────────────────────────────┐
  │ Home                          │
  │ Work                          │
  │ Experience                    │
  │ About                         │
  │ Contact                       │  Close
  └──────────────────────────────┘
  ```

### Hero (HomePage.astro)
- Composition anchor: text flush-left across ~8/12 cols, portrait right on desktop (kept from
  base), asymmetric.
- Background: `--paper`, no imagery beyond the existing portrait.
- Type scale: name/role/title at poster scale (`clamp(3rem, 2rem + 6vw, 7.5rem)` for the role line,
  a bit smaller for the sentence-length heading) using Anybody.
- CTA style: existing button row, restyled to the token system, primary CTA in `--signal`.
- Motion cue: one orchestrated entrance on load — role line resolves from extreme width/weight
  (ultra-condensed thin) to its settled voice, staggered by word; the two or three strongest stat
  figures resolve a beat after (opacity+clip-path), CSS-only, `prefers-reduced-motion` shows the
  settled end-state immediately.
- ASCII frame:
  ```
  SENIOR ANGULAR / FRONTEND ENGINEER
  Enterprise frontend for           [portrait]
  e-commerce, banking and
  education.
  [lede] [View case studies] [CV] [LinkedIn] [GitHub]
  ```

### Stats
- Composition anchor: unchanged ledger layout, restyle numerals into the mono stack, kept small
  and quiet vs. the kinetic hero above it (contrast of quiet vs. loud is part of the rhythm).

### Case-studies index (CaseStudiesPage.astro / CaseStudyCard.astro)
- Composition anchor: stacked full-bleed rows instead of a 2-up card grid — each case is one row,
  its title set at poster scale so the list itself performs the "kinetic" idea; summary/tags stay
  body-scale and always legible underneath.
- Motion cue: `@supports (animation-timeline: view())` scroll-driven scale/weight on each title as
  it crosses the viewport (`animation-range: entry 0% cover 45%`), gated, with a static (fully
  resolved) fallback when unsupported or reduced motion.
- ASCII frame:
  ```
  Real-time Shopping Assistant  →
  A controlled whitelist pilot: a 96% smaller context payload...
  [Angular][TypeScript][WebRTC]...
  ───────────────────────────────
  Help Center Rollout  →
  ...
  ```

### Case study page (CaseStudyPage.astro)
- Composition anchor: title + summary top, then a two-column layout ≥64rem: sticky left rail
  listing every field label (scrollspy-free, plain anchor links) + "All case studies"; right
  column the long-form `dl`.
- Motion cue: a fixed top progress bar bound to `animation-timeline: scroll()` (gated in
  `@supports`, hidden otherwise) showing read progress through the article.
- ASCII frame:
  ```
  [progress ─────────────░░░░░░░░░░]
  Case study / Real-time Shopping Assistant
  REAL-TIME SHOPPING ASSISTANT
  summary...
  ┌ rail ┐  ┌ fields ──────────────┐
  │Context│  │ Context              │
  │My role│  │ ...                  │
  │Outcome│  │                      │
  └──────┘  └──────────────────────┘
  ```

### Experience (timeline + recommendations)
- Kept structurally; timeline period set in mono, company/role in Anybody at a moderate weight
  (not poster scale — this is a scan list, kinetic energy is spent on hero + case index already).

### About / Contact / 404
- Same token system; 404 gets one kinetic moment (the number "404" itself resolving in Anybody),
  cheap and on-brief.

## Fidelity ledger (spec vs. shipped, filled after build)
See NOTES.md.
