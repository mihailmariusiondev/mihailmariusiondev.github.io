# DESIGN: c8-spatial-deck

Reconstructed 2026-09-14 from the built source (`src/`) and the `qa/` screenshots — the concept
agent was stopped before it wrote this file. Nothing below is invented; every value is read
directly from `src/styles/global.css`, `src/components/**` and `src/data/*.ts`, and checked
against the rendered screenshots.

> Updated during the polish pass (2026-09-14, second round): the hero's first viewport and the
> Work section's motion mechanism both changed after an independent review. See "Polish pass" in
> NOTES.md for the full account; the sections below describe the current, shipped state.

## Thesis

A drafting-table blueprint for an engineer who ships production case studies, not slides: the
four case studies exist physically as a stack of index cards fanned in real 3D space, and clicking
one lifts it off the deck into its own page (a cross-document View Transition morphs the plane
into the case-study header). Everything else on the site — nav, stats, timeline, contact — is
calm, ledger-plain typography, so the one spatial idea in the "Work" section carries all the
visual ambition instead of it being smeared across every section.

## Design Read (one line) + three dials

**Design Read:** Blueprint ledger — hairline rules, mono captions, paper-white cards — with one
real 3D card deck as the signature move.

**Dials:**
1. **Density:** low-to-medium. Generous `--space-4`/`--space-5` block rhythm, one column of prose
   at `--measure: 68ch`, five-up stat ledger only at `>= 64rem`.
2. **Depth:** high, but contained to one section. `perspective: 1600px` + `preserve-3d` planes for
   the deck; everywhere else is flat paper with a single soft `--shadow-raised`.
3. **Motion:** restrained-orchestrated. One entrance choreography (`plane-settle`, staggered
   90ms/card) plus one scroll-linked camera dolly (CSS `animation-timeline: view()`), then nothing
   free-runs — hover/focus tilts are the only other motion, and reduced-motion removes all of it.

## Token plan (actual values, from `src/styles/global.css`)

**Palette — light (`:root`):**
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#12181f` | Text, headings |
| `--paper` | `#eef1f5` | Page background |
| `--paper-raised` | `#ffffff` | Cards, planes, buttons |
| `--paper-sunk` | `#e2e7ee` | Stats band |
| `--steel` | `#2b5f8a` | Primary accent, active rule |
| `--steel-dark` | `#1f4763` | Link/hover accent, mono captions |
| `--steel-wash` | `#dfe9f2` | Badge fill, active nav fill |
| `--slate` | `#48545f` | Body/secondary text |
| `--slate-quiet` | `#57636e` | Tertiary/meta text |
| `--amber` / `--amber-bg` | `#6f5709` / `#f3ecd6` | "Verified"/confidential callouts |
| `--rule` / `--rule-strong` | `#ccd4dd` / `#a9b4c0` | Hairlines, borders |

**Palette — dark (`prefers-color-scheme: dark`):** near-black blueprint navy `--paper: #080b10`,
raised surface `--paper-raised: #121a24`, ink flips to pale `#eef3f8`, steel accent lightens to
`#86b5e0`/`#b3d4f2` for AA contrast on the dark surfaces, shadows deepen to pure-black alpha
(`rgb(0 0 0 / 0.65)` on the deck). A deliberate single accent-hue shift (not just an inversion):
"a lightbox in a dim room" per the source comment.

**Fonts (Google Fonts, self-served via `@import`):**
- Display/headings: `"Newsreader"` (serif, optical size axis `6..72`, weights 400/500/600 + italic
  400), fallback `Georgia, serif`.
- Body/UI: `"IBM Plex Sans"` (400/500/600), fallback `system-ui, sans-serif`.
- Mono (labels, nav, eyebrows, buttons, stat values): `"IBM Plex Mono"` (400/500), fallback
  `"Courier New", monospace`.

**Type scale** (fluid `clamp()`, one source of truth): `--step-display` 2.25→3.5rem,
`--step-h1` 1.875→2.75rem, `--step-h2` 1.5→1.875rem, `--step-h3` 1.1875→1.375rem, `--step-lede`
1.0625→1.25rem, body 1.0625rem, small 0.9375rem, micro 0.8125rem.

**Spacing:** `--space-1` 0.5rem … `--space-6` 7rem (six-step scale), fluid `--gutter`
`clamp(1.25rem, 5vw, 3rem)`.

**Radius/shadow:** `--radius: 6px` (photo/buttons), plane radius `14px`; `--deck-shadow` /
`--deck-shadow-hover` are the deck's own two-layer shadow, distinct from the flatter
`--shadow-raised` used elsewhere.

## Per-section concept spec

**Header/nav** (`SiteNav.astro`) — composition: sticky hairline top bar (name + mono role left,
links + language pill right) on `>= 48rem`; below that, the top bar keeps only name + language
pill and a floating rounded bottom bar (5-column icon+label grid, in the thumb zone,
`position: fixed`) takes over navigation. Background mode: translucent paper + `backdrop-filter:
blur` on desktop sticky bar. Motion cue: active link gets a 2px steel underline, no animated
indicator.

**Hero** (`HomePage.astro` `.hero`) — composition anchor: text column left (title, mono role,
lede, four CTAs, mono location line); on the right, a small **spatial deck** (`.hero__deck`), not
a flat photo: the portrait card floats at the front of a real 3D stack (`perspective` +
`preserve-3d`) with the two strongest existing stats (96% context reduction, Top 1.42% Angular
assessment ranking) as fanned outcome cards peeking out behind it, same technique as the Work
section at a smaller scale. Centred above text on mobile, right-aligned beside it on desktop (grid
`order` swap, not DOM reorder — text stays first for a11y). The stat mini-cards are
`aria-hidden="true"` (decorative echo; the same figures are announced properly, with full labels,
in the accessible "Verified results" list one section down — no duplicate announcement). Type
scale: `--step-display` serif h1. CTA style: `.btn-primary` filled steel pill-corner rectangle +
three `.btn` outline buttons (CV/LinkedIn/GitHub) — CV and contact (LinkedIn/GitHub) both one
click from the fold. Motion cue: the deck cards settle in with a 700ms staggered fan-in
(`hero-card-settle`) on first paint; `prefers-reduced-motion: reduce` removes the animation and
pins every card at its resting fanned position, fully opaque, so the composition (not just the
motion) is what reads instantly.

**Verified results** (`.stats`) — composition: five-up mono ledger on `--paper-sunk`, each entry a
left steel rule + value + label, collapsing to 2-up then 1-up under `64rem`/`40rem`. No cards, no
icons: an audited entry, not a badge (per the source's own comment).

**Work / spatial deck** (`.deck-section`) — the concept's signature: 4 `<li class="plane">` cards
absolutely positioned inside a `perspective: 1600px` stage, each with a per-card `--i`-driven
`--settle` transform (fanned in x/y/z + `rotateY`), entering via a staggered 900ms
`cubic-bezier(0.16,1,0.3,1)` settle animation. A `position: sticky` viewport plus 260vh of extra
scroll height lets a `@supports (animation-timeline: view())` scroll-linked "camera" dolly the
whole stack forward as the section passes (progressive enhancement: browsers without
`animation-timeline` just keep the settled fan). Hover/focus lifts a plane flat toward the viewer
(`translate3d(0,-14px,140px) rotateY(0) rotateX(0)`) — picking a card off the deck. Mobile
(`<= 47.999rem`): the whole 3D system collapses to a static full-width vertical stack (no
`position: sticky`/scroll-hijack, no overlapping tap targets) with a lighter fade-up entrance —
same visual idea, no depth-stacking risk on touch.

**Case study page** (`CaseStudyPage.astro`) — the header card reuses the exact plane surface
treatment (`--paper-raised`, `14px` radius, `--deck-shadow`) and carries
`view-transition-name: case-${slug}`, matching the name set on the deck plane's `<a>` on the home
page: a cross-document View Transition morphs the clicked card into the case header with zero
JS. Body: definition-list `.field` rows (mono uppercase `dt` / prose `dd`), a hairline-separated
ledger matching the "audited" motif.

**Experience** (`ExperiencePage.astro`) — a vertical dotted timeline: steel dot + mono date range
left, bold company/client + role right, one hairline-free flowing list (screenshot: `deck timeline`
style, no cards).

**About / Contact** — plainest pages in the set: `.page-head` eyebrow+h1+lede rhythm, prose
paragraphs at `--measure`, a `.field` definition list for Contact's email/LinkedIn/GitHub rows.
Deliberately quiet, so the deck stays the one loud idea.

## Motion + reduced-motion behaviour

All deck motion is pure CSS (no JS ships for any of it): the entrance (`plane-settle`,
`plane-settle-mobile`), the scroll-linked camera (`deck-travel` on `animation-timeline: view()`),
and the hover/focus lift (`transition: transform`) are keyframe/transition-driven only.

`prefers-reduced-motion: reduce` is handled twice:
- Globally in `global.css`: every `animation-duration`/`transition-duration` collapses to `0.01ms`
  and `scroll-behavior` reverts to `auto`.
- Specifically for the deck (`HomePage.astro` `@media (prefers-reduced-motion: reduce)`): the
  entrance and scroll-camera animations are killed outright (`animation: none !important`), each
  plane is pinned directly to its resting `--settle` transform at full opacity (so content is
  never invisible waiting for a keyframe that will not run), and the hover/focus lift is reduced
  to a small flat `translateZ(20px)` nudge instead of the full off-deck lift. Verified in
  `qa/deck-reduced-motion.png`: the fanned deck renders in its final, fully visible state with the
  scroll-sticky camera track removed.

## Fidelity notes (spec vs. built screenshots)

1. Hero: text-left/photo-right desktop layout, CTA order and mono role/location line — matches
   `qa/home-desktop.png` exactly.
2. Stats ledger: five-column left-rule entries on `--paper-sunk` — matches `qa/home-desktop.png`
   band below the hero.
3. Deck fan geometry: cards visibly offset in x/y with a growing z-depth per index and a slight
   `rotateY` — matches `qa/deck-scroll1.png` and `qa/deck-mobile.png` (mobile: flat stack, no fan,
   as specified for `<= 47.999rem`).
4. Case study header as a raised card echoing the deck plane (radius, shadow, background) —
   matches `qa/case-desktop.png`.
5. Dark theme: navy paper, pale ink, lightened steel accent, deepened shadows — matches
   `qa/home-dark.png` against the light `qa/home-desktop.png`.
6. Mobile bottom nav: five-icon rounded floating bar with active-item steel-wash fill — matches
   `qa/deck-mobile.png` and `qa/home-mobile.png`.
7. Reduced motion: deck cards render pinned at their fanned resting position, fully opaque, no
   in-flight animation frame — matches `qa/deck-reduced-motion.png`.

## Known limitations

- The scroll-linked camera dolly (`animation-timeline: view()`) is Chrome/Edge-only at the time of
  writing; Safari/Firefox fall back to the static settled fan, which is an accepted progressive
  enhancement, not a bug.
- This DESIGN.md was written after the build (source-of-truth reconstruction), not before it —
  the "spec then build" ordering the brief describes for a from-scratch concept was not followed
  live; this document instead documents the concept as shipped, verified against its own
  screenshots and CSS.
