# DESIGN.md — Context Field

Concept `c5-context-field`, bake-off port 4405. Written from the built world per `impeccable`
new-work.md step 6 (this concept's direction was assigned by the orchestrator brief, not rolled;
the interactive question tool and `concept-seed` script were unavailable in this harness, so the
direction, ask-round and finish-review steps below are a stated in-thread substitution, disclosed
here rather than silently skipped).

## Direction contract

**THESIS.** The site's own proof point — an LLM context payload cut from 570 KB to 22 KB per
execution — becomes a literal field of tokens the visitor watches get routed and stripped in the
first three seconds. Refuses the generic hero-metric template (big number, small label, static
card): the number is not reported, it is *demonstrated* as a live process.

**OWN-WORLD.** Deep graphite-navy ground (`#0d1420`, hued, never near-black), one acid-lime
accent (`#c8f04a`) that marks what survives routing; everything stripped fades to slate and
disappears. Type: IBM Plex Sans for display and body (dropped Newsreader — a book serif has no
place in a systems/data world), IBM Plex Mono for every label, stat, nav item and data readout.
No kickers/eyebrows above headings (banned outright by craft-floor; removed sitewide, the strings
still exist in `ui.ts` and are used elsewhere — nav, titles, breadcrumbs).

**STORY.** A recruiter lands, sees 570 dim points drifting in a loose cloud; within ~2.5s most
fade and drift away while 22 lime points pull into a tight cluster beside the name. The headline,
role, and the 96% stat resolve as static text at the same time the cluster settles — the field
never gates legibility, it races it and loses on purpose (text renders instantly; the field is
commentary, not the message).

**FIRST VIEWPORT.** Full-bleed dark hero. Left: h1 ("Enterprise frontend for e-commerce, banking
and education."), role/stat readout line, lede, CTA row (case studies / CV / LinkedIn / GitHub),
location line — all real DOM text, rendered before any script runs. Right/behind: the canvas
(or, pre-hydration/no-JS/reduced-motion/save-data/no-WebGL, a static CSS/SVG dot field in the same
geometry, lime-on-navy, motionless). Portrait photo keeps its existing position, layered above the
field on desktop.

**FORM.** WebGL/Three.js field, assigned directly by the brief (concept 5 of 16, "the serious
WebGL/Three.js concept"). No catalog roll: the brief pins the technique and the metric it dramatizes.

**FINISH.** Unreviewed and undocumented is unfinished; this build ends with the finish review, the
verdict, DESIGN.md, and every shipping raster carrying its provenance. (No rasters ship — the field
is code-generated geometry, not an image asset — so the raster clause is vacuously satisfied; the
finish review here is the self-review recorded in NOTES.md, run in-thread: no finish-reviewer
subagent exists in this tool surface.)

## Token plan

```
--bg:            #0d1420   (deep hued graphite-navy, not near-black)
--bg-raised:     #131b28
--bg-sunk:       #0a0f18
--ink:           #eef1ee   (primary text, AA on --bg: ~15.5:1)
--slate:         #a7b0ba   (secondary text, AA on --bg: ~8.6:1)
--slate-quiet:   #7d8894   (tertiary/meta, AA on --bg: ~5.4:1)
--accent:        #c8f04a   (acid lime — the one accent; "survived" tokens, focus rings, primary CTA)
--accent-ink:    #0d1420   (text ON accent-filled surfaces)
--rule:          #202b3a
--rule-strong:   #34405230-40% harder line for dividers
--font-display:  "IBM Plex Sans" (was Newsreader — dropped, serif ≠ this world)
--font-body:     "IBM Plex Sans"
--font-mono:     "IBM Plex Mono" (labels, nav, stats, data readouts — used for its literal reason:
                  code/data, not as a "technical" costume)
```

Single deliberate dark theme (brief allows "a light variant with AA contrast" as the alternative
to a dark theme — this concept takes the dark branch and states it here rather than shipping a
second, unrelated light system: the field's glow and the lime accent only read correctly against
a dark ground, and `color-scheme: dark` plus tokens above are fixed regardless of OS preference).
Layout, spacing scale, radii and the grid primitives (`.wrap`, `.field`, `.tag`, breadcrumb) are
inherited unchanged from the base implementation — only the palette, type, hero, and the
kicker-removal are new.

### ASCII frame — home hero (desktop ≥56rem)

```
┌─────────────────────────────────────────────────────────────┐
│ Marius Mihail Ion · Senior Angular / Frontend Engineer   [ES]│ <- sticky nav
├─────────────────────────────────────────────────────────────┤
│                                                     ·  ·   ·  │
│  Enterprise frontend for                          ·    ●    │ <- field: dim
│  e-commerce, banking and                         · ●  ● ●   │    dots drift,
│  education.                              [photo] ·  ●●●●●·  │    lime cluster
│                                                    ·●●●●●●   │    pulls tight
│  Senior Angular / Frontend Engineer                ·●●●●·   │    beside photo
│  96% · 570 KB → 22 KB per execution                 · ·     │
│                                                                │
│  Software developer since 2018 ...                            │
│  [View case studies] [Download CV] [LinkedIn] [GitHub]        │
│  Based in Zaragoza, Spain · EU citizen · Remote or hybrid ... │
└─────────────────────────────────────────────────────────────┘
```

Mobile (<56rem): field sits as a shorter band behind the stacked photo+text column, same dot
geometry at lower density (fewer points painted, still proportional 570:22 in ratio, not count).

## Per-section concept spec (fidelity ledger targets)

1. **Hero** — comp anchor: field cluster resolves beside portrait; background mode: canvas/SVG
   full-bleed dark; type scale: `--step-display` on h1; CTA: filled lime primary + outlined mono
   secondaries; motion cue: 2.5s settle-in, then idle drift gated by scroll/pointer.
2. **Stats** — comp anchor: five-figure ledger, left-aligned mono values; background: `--bg-sunk`
   band; motion cue: none (static, the hero already demonstrated the number in motion).
3. **Case studies grid** — comp anchor: bordered link cards, lime border on hover/focus; no kicker.
4. **Experience timeline** — spine unchanged from base, lime marker on the current role only.
5. **Recommendations** — quote cards, plain 1px border, no colored side rule.
6. **About / Contact** — narrow measure, CV button accent lime, contact rows as field/dl pattern.

## What was thrown away / changed after self-review

- First pass used a colored 2px `border-left` on `.stat` (inherited from the base file) — removed
  per craft-floor's explicit ban on colored side borders on cards/list items; stats now use the
  same `border-top` field/dl rhythm as the case-study definition list, for one grammar sitewide.
- Dropped the eyebrow/kicker line above every `<h1>` (About, Contact, Experience, Case studies,
  the Home hero role line, and the case-study card's "Case study" label) — craft-floor bans this
  outright ("no brief earns it back"). The underlying `ui.ts` strings are unchanged and still used
  in `<title>`, breadcrumbs, and `aria-label`s; only the visual kicker pattern is gone.
- Considered animating the field continuously at 60fps on a timer; changed to an idle low-amplitude
  drift plus a scroll/pointer-driven convergence intensity, and a hard pause on
  `visibilitychange`/off-screen, to hold the perf and battery budget the brief sets.

Skill ledger, Lighthouse table, QA report, review-animations table, and self-scores are in NOTES.md.
