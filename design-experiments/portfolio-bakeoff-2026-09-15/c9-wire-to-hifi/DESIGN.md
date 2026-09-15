# Wire to Hi-fi — DESIGN.md

## Design Read (one line)
An annotated redline wireframe over the real page bleeds out into the finished,
full-colour interface as you scroll the hero — the site literally shows its own
design process before settling into the shipped product.

## Three dials
- **Density**: calm, generous. The base layout (single-column hero, ledger-style
  stats, two-column case grid) is already well-proportioned; the concept adds a
  scroll moment, not more content.
- **Warmth**: precise/cool. Ink-on-paper with a steel-blue accent; the wireframe
  layer reuses the same paper/rule tokens desaturated, so the "before" state
  reads as the same product sketched, not a different brand.
- **Motion**: one deliberate, scroll-scrubbed crossfade at the top of the page.
  Everywhere else is static — the trick would cheapen if repeated on every
  section.

## Token plan
- Colour: `--ink #0b0d10` / `--paper #f7f6f3` / `--steel #2f5680` (unchanged
  from base — a redesign of the palette wasn't needed, the concept is
  structural/motion, not chromatic). Dark mode via `prefers-color-scheme`.
- Type: system stacks only (`ui-serif` display, `system-ui` body, `ui-monospace`
  labels) — no Google Fonts import, no self-hosted woff2. Zero font network
  cost, zero swap CLS; the fastest possible first paint, which matters more
  here than a bespoke typeface because the concept's first 3 seconds is a
  scroll-linked animation that must start rendering immediately.
- Layout: unchanged 12-ish column wrap grid from `_base` (`.wrap`, `.hero__grid`,
  `.stats__list`, `.work__grid`). ASCII:

```
[ eyebrow ]                          [ dashed box: IMG 640×640 ]
[ grey bar bar ]  <- h1 wireframe
[ grey bar    ]
[ grey · grey ]   <- lede wireframe
[▭][▭][▭][▭]      <- CTA wireframe (dashed, ×4)
[ grey bar ]       <- meta line
        ⌄ scroll ⌄  (crossfade 0–60vh)
Marius Mihail Ion                     [ photo, colour ]
Enterprise frontend for e-commerce,
banking and education.
Software developer since 2018...
[View case studies][Download CV][LinkedIn][GitHub]
Based in Zaragoza, Spain · EU citizen...
```

- Principles: (1) the wireframe is a real redline of the real content, not a
  generic placeholder — its boxes/bars are sized and positioned to the actual
  hero grid; (2) the effect is CSS-only, driven by `animation-timeline:
  scroll(root block)`, so it costs 0 bytes of JS; (3) unsupported browsers and
  `prefers-reduced-motion` get the finished page immediately — never a broken
  or half-drawn state.

## Per-section concept spec
**Hero** (the only wire→hifi moment — see "what I threw away"):
- Composition anchor: text-left / portrait-right (desktop), stacked (mobile) —
  unchanged from base.
- Background mode: flat paper, no imagery besides the portrait.
- Type scale: display h1, mono eyebrow/annotations.
- CTA style: primary steel button + three ghost buttons; wireframe CTAs render
  as dashed empty slots with an annotation ("cta ×4 · min 44px target").
- Motion cue: `.wire__frame` (boxes/bars/annotations, `aria-hidden`) fades from
  opaque to invisible over document scroll 0→60vh while `.wire__content`
  (the real hero markup) grayscale-and-opacity fades in over the same range.
  `animation-range: 0 60vh` on `animation-timeline: scroll(root block)`.
- ASCII frame: see token plan above.

**Stats / case grid / all other pages**: no wire effect — shipped as the
resolved hi-fi design from the first frame. Explained below.

## Fidelity ledger (spec vs. screenshot)
1. Photo wireframe box is a dashed square with "IMG · 640×640" label, aligned
   to the real portrait's grid slot — confirmed in `qa/home-top-wireframe.png`.
2. H1 wireframe renders as two grey bars sized to the real two-line heading,
   with a mono "h1 · display / 44–56px" annotation above it, exactly as
   spec'd — same screenshot.
3. CTA row wireframe is four dashed slots matching the real four buttons'
   count and roughly their width, annotated "cta ×4 · min 44px target" —
   same screenshot.
4. Crossfade midpoint (`qa/home-mid-crossfade.png`, scroll≈300px) shows real
   text emerging through the thinning wireframe bars, matching the spec'd
   "bleeds out" description, not an abrupt cut.
5. Reduced motion (`qa/home-reduced-motion.png`) shows the finished hero with
   no wireframe artefact at all, matching the spec'd instant-final-state rule.

## What I threw away or changed after self-review
- First pass considered a per-element `view-timeline` (`animation-timeline:
  view()`) on the hero, matching a common scroll-driven-animation pattern.
  Rejected after testing: for a section pinned to the very top of the page,
  the "cover" progress of its own view timeline is already >0% at scroll=0
  (the element has already started "covering" the viewport by definition),
  so the hero rendered already-resolved at first paint — the opposite of the
  brief. Switched to a **root-document scroll timeline**
  (`animation-timeline: scroll(root block)`) with an explicit `0 60vh` pixel
  range, which is anchored to true page-scroll zero.
- Considered applying the wire→hifi treatment to the stats strip and case
  grid too, for more "scroll storytelling." Cut it: a second and third
  identical crossfade reads as a gimmick repeated, not a motif, and it would
  have doubled the maintenance surface (duplicate wireframe markup per
  section) for a diminishing return once the trick is already understood
  from the hero. One well-executed moment beats three diluted ones.
- Considered a JS `IntersectionObserver` fallback for browsers without
  `animation-timeline: scroll()`. Cut it: the brief only requires the page be
  "fully readable without JS," which the CSS-only `@supports` fallback
  (finished page, no wireframe) already satisfies — a JS fallback would add a
  script, an observer, and a class-toggle race for a browser segment that
  still gets a fully readable, correctly designed page either way.
- Dropped the Google Fonts import (`Newsreader` + `IBM Plex`) entirely in
  favour of system font stacks. The brief's performance rule explicitly asks
  to avoid the Google Fonts network cost; a wireframe-to-hifi concept's whole
  point is an instant, crisp first paint, so a font-swap delay would work
  against the concept's own thesis.

## Skill ledger
- **impeccable**: ran `impeccable context`, read `new-work.md` / `shape.md`
  before building, `craft-floor.md` before the first edit, then `impeccable
  detect --json src` at the end (0 findings, no fixes needed).
- **frontend-design**: token plan above; kept the base palette/type-scale
  since the concept's differentiator is structural motion, not colour —
  reused rather than reinvented per the ladder.
- **design-taste-frontend**: Design Read stated at top; three dials stated;
  pre-flight adapted (no icon library used — CTAs and annotations are text
  only, one small set of decorative `<span>` wireframe elements, no SVG).
- **frontend-app-builder / imagegen-frontend-web**: no image-gen tool in this
  session; applied as method via the per-section spec + fidelity ledger
  above instead of generated comps.
- **astro-best-practices**: kept the effect static/CSS-only, no islands, no
  client JS; reused existing `<style>`-scoped component CSS pattern.
- **animate**: the crossfade is the one animation in this build — gated by
  `@supports`, purpose (reveal the finished product), tool (CSS scroll
  timeline, not JS/GSAP — smallest tool for a linear scroll-scrub), curve
  (linear, because it's scroll-position-driven, not time-driven — an eased
  curve would fight the 1:1 scroll mapping), reduced-motion override to
  instant-final-state.
- **review-animations**: see table in NOTES.md.
- **accessibility / web-design-guidelines / performance**: findings and fixes
  in NOTES.md.
