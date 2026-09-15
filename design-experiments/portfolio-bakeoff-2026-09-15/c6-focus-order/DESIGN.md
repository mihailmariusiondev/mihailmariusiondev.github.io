# DESIGN.md — Focus Order (c6)

No interactive user session was available; per the orchestrator brief this concept's
direction, palette latitude and constraints were fully specified in advance
("Focus Order" — accessibility as the visual language). Assumptions below are
marked `[assumed]` and are conservative extrapolations of that direction, not
inventions of new facts.

## Design Read (one line)

The most beautiful thing a keyboard user has ever tabbed through: an oversized,
glowing focus ring that opens the page in reading order and then lives on every
control, while headings and case-study structure read like a hand-typeset
accessibility tree.

## The three dials

- **Density:** generous — AAA-leaning type sizes, wide rhythm, nothing crowded.
- **Energy:** one authored entrance (the ring sweep), then calm — no ambient motion.
- **Formality:** precise/technical-editorial (mono labels, ledger rules) but warm,
  never a debug console: labels use real words ("Section", "Landmark: navigation"),
  not `<h2>`/`role=nav` tokens.

## Redesign scope

This is a **redesign** (new-work.md): the base's ink/paper/steel identity is
evidence of the product's real information architecture (case-study fields,
stats, timeline), not authority over the look. I keep every component's
underlying data structure and DOM order, replace tokens, focus treatment, and
add two new pieces of first-class UI: the hero focus-sweep and a per-page
document-outline disclosure. Fonts (Newsreader / IBM Plex Sans / IBM Plex Mono)
are already loaded and fit "precise, audited engineering craft" — reused, not
replaced (ladder: don't add a dependency for what's already installed).

## Token plan

### Palette (light)

| Token | Hex | Use | Contrast vs paper |
|---|---|---|---|
| `--ink` | `#0a0b0d` | body text | 19.8:1 |
| `--paper` | `#fbfaf7` | page bg | — |
| `--paper-raised` | `#ffffff` | cards | — |
| `--paper-sunk` | `#efece4` | stats/outline strip | — |
| `--focus` | `#2436e0` | the signature ring + links + accents | 8.6:1 on paper |
| `--focus-dark` | `#1a27a8` | hover/pressed | 11.9:1 |
| `--focus-wash` | `#e8e9fb` | ring halo / active bg | — |
| `--slate` | `#41474f` | secondary text | 9.9:1 |
| `--slate-quiet` | `#585e66` | tertiary text | 6.7:1 |
| `--amber` | `#6f5709` | verified/confidential tag | 6.2:1 |
| `--amber-bg` | `#f3ecd6` | tag bg | — |
| `--rule` | `#dcd8ce` | hairlines | — |
| `--rule-strong` | `#b7b1a2` | borders | — |

### Palette (dark, `prefers-color-scheme: dark`)

| Token | Hex |
|---|---|
| `--ink` | `#f4f2ec` |
| `--paper` | `#08090b` |
| `--paper-raised` | `#131418` |
| `--paper-sunk` | `#0e0f12` |
| `--focus` | `#8fa0ff` |
| `--focus-dark` | `#c3ccff` |
| `--focus-wash` | `#1a1f3d` |
| `--slate` | `#b7bcc3` |
| `--slate-quiet` | `#969ba3` |
| `--rule` | `#26282d` |
| `--rule-strong` | `#3a3d44` |

All pairs checked with the WebAIM formula (contrast pairs table in NOTES.md).
`--focus` is used for the ring and for link/accent text; both roles pass their
respective threshold (3:1 non-text / 4.5:1 text) in both themes.

### Type

Unchanged families (already installed): `Newsreader` display, `IBM Plex Sans`
body, `IBM Plex Mono` labels/ledger. Scale pushed one notch larger for the
"generous, AAA-leaning" mandate: hero display up to `clamp(2.5rem,1.5rem+4.2vw,4rem)`,
body kept at 17px floor (already AA-safe), line-height 1.65 for body copy
(was 1.6).

### Layout ASCII (hero, desktop)

```
┌─────────────────────────────────────────────────────────┐
│  [ring sweep target 1]                                   │
│  Marius Mihail Ion                    ┌──────────┐       │
│  Senior Angular / Frontend Engineer   │  photo   │       │
│                                       │  square   │       │
│  Enterprise frontend for e-commerce,  └──────────┘       │
│  banking and education.                                  │
│                                                            │
│  [ring target 2: outcomes strip — 5 verified figures]     │
│                                                            │
│  [ring target 3] [ring target 4] [ring target 5]          │
│  View case studies  Download CV   LinkedIn · GitHub       │
└─────────────────────────────────────────────────────────┘
```

### Principles

1. The ring is real UI, not a video: it is the same element used at
   `:focus-visible` everywhere, just larger and choreographed once.
2. Reading order is DOM order. The sweep never fakes an order the screen
   reader wouldn't also produce.
3. Structure is disclosed, not decorated: the outline panel and the case-study
   tree use real semantics (`<details>`, `<dl>`, heading levels) styled with
   intention, never `console`-style monospace dumps pretending to be debug UI.
4. Motion is one authored moment (the sweep) plus small state transitions;
   everything obeys the sitewide reduced-motion kill switch already in
   `global.css`.

## Per-section concept spec

**Hero** — composition anchor: text-first, photo secondary (unchanged from
base grid). Background: flat `--paper`. Type scale: display h1. CTA style:
primary filled `--focus` pill + ghost buttons. Motion cue: on load (unless
reduced motion or a returning tab-user), an oversized ring (declarative CSS
custom-property driven, positioned via a tiny inline script that reads real
element rects) visits eyebrow → h1 → lede → outcomes strip → CTA row → contact
row, ~2.6s total, then fades and hands off to native `:focus-visible`.

**Verified results (stats)** — anchor: full-width ledger on sunk paper.
Background: `--paper-sunk`. Type: mono figures, bold. CTA: none. Motion: each
stat's left rule draws in on first paint (CSS `@keyframes`, staggered
`animation-delay`), reduced-motion collapses to instant.

**Case studies grid** — anchor: 2-up cards. Background: raised cards on
`--paper`. CTA: whole-card link. Motion: hover lift + ring-colored border,
already present, recolored to `--focus`.

**Case study detail** — anchor: single column, `<dl>` fields rendered as a
connected outline ("tree"): each field gets a small vertical connector rule
and a role-labelled mono tag (Context / Decision / Outcome inferred from the
field's own label — no new copy invented). Motion: fields fade/rise in with a
short stagger on load, reduced-motion instant.

**Experience/timeline** — unchanged structural spine, recolored, connector
dot on the current role uses `--focus`.

**About / Contact** — unchanged structure, tokens only.

**All pages** — a bottom-of-`<main>` `<details>` "Page structure" disclosure:
lists the page's real heading outline (built from the actual rendered
headings by a ~20-line inline script, progressive enhancement — the page is
complete without it) and the landmark roles present (hard-coded from Layout's
constant markup: banner/navigation, main, contentinfo — this never drifts
because Layout always renders exactly these three). Closed by default, a
`<summary>` styled with the ring treatment on focus.

## What I threw away after self-review

- First pass drew the hero ring with fixed `%`-position CSS keyframes (no JS).
  Killed it: at anything other than the exact preview width the ring drifted
  off the real targets, which is the one thing this concept cannot get wrong.
  Replaced with a tiny rect-measuring script (still zero dependency).
- Considered a persistent sidebar landmark rail (always visible). Killed it:
  at 1440px it fought the case-study measure and on mobile there was no room;
  a closed-by-default `<details>` gives the same information on demand without
  permanently taxing the layout — closer to "gorgeous," further from "debug
  overlay."
- Considered literal `<h2>`, `role="nav"` token labels in the outline panel.
  Killed it: reads as a lint tool. Switched to plain-English structure words.

## Skill ledger

- **impeccable** (`context`, `craft-floor.md`, `new-work.md`, `shape.md`): ran
  `impeccable context`; it flagged PRODUCT.md as schema-stale (pre-existing,
  orchestrator-owned, not touched) and confirmed this is a redesign with no
  DESIGN.md yet. craft-floor.md's refusals (no kicker abuse beyond the
  inherited page-head eyebrows, no gradient text, no hard neobrutalist
  shadows, theme the browser surfaces) applied directly to the focus-ring and
  selection styling below.
- **frontend-design**: token pass above; two rounds (first pass accent was the
  base's muted `#2f5680` steel — too quiet for a concept whose entire thesis
  is a visible ring; revised to the more saturated `#2436e0` indigo, which
  still clears AA text contrast and gives the ring real presence).
- **design-taste-frontend**: Design Read + three dials above; pre-flight
  adapted for Astro/native CSS — no icon library installed, so the outline
  panel and ring use text/mono labels and the only inline SVG is the
  pre-existing nav icon set (unchanged).
- **frontend-app-builder / imagegen-frontend-web**: no image tool in this
  session; applied as method via the per-section spec above + the fidelity
  ledger in NOTES.md.
- **high-end-visual-design / redesign-existing-projects**: anti-generic
  checklist — no template hero-metric cards were added beyond what the base
  already had (kept, not introduced), no stock icon soup.
- **astro-best-practices**: static output preserved, the hero-sweep and
  outline scripts are the only JS on the site, both inline `<script>` (no
  island framework needed), both progressive enhancement.
- **animate / emil-design-eng**: see NOTES.md review-animations table.
- **accessibility / web-design-guidelines / seo / performance /
  core-web-vitals / best-practices / web-quality-audit / pagespeed-insights**:
  see NOTES.md QA + Lighthouse sections.
