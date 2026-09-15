# DESIGN.md — Controlled Rollout

## Thesis
The portfolio ships itself like a staged product release. Marius's recurring truth (feature flags,
market-by-market rollout, contract-first migration) becomes the visual system rather than a
dashboard costume: a real flag control gates the hero's outcomes, and every case study renders as
a release record whose fields are staged steps carrying strictly true status words (pilot, rolled
out, validated) instead of invented ones.

## Design Read
One line: a feature-flag control panel that happens to be a portfolio — calm engineering paper,
signal-blue actions, and a four-colour status vocabulary that never claims more than the data does.

Three dials:
- **Density**: Restrained-to-Committed. Neutral paper carries the reading; the signal blue and the
  status colours are the only saturated ink, used at controlled dosage (badges, flag, active states).
- **Voice**: dual — an editorial serif (Source Serif 4) narrates the case-study prose, a technical
  mono (JetBrains Mono) speaks every piece of system chrome (nav, labels, status pills, the flag).
- **Motion**: one authored moment (the flag reveal + card→page view transition), gentle micro-states
  elsewhere, nothing ambient or looping.

## Token plan
Palette (light — AA verified against paper #F4F5F2, all ≥4.5:1 unless noted large-text):
- `--ink` #10151C, `--paper` #F4F5F2, `--paper-raised` #FFFFFF, `--paper-sunk` #E9EBE6
- `--steel` (primary/signal) #2454E0 (5.61:1), `--steel-dark` #17369E (9.33:1), `--steel-wash` #E4EAFC
- `--slate` #4B5563 (6.91:1), `--slate-quiet` #59636E
- `--rule` #DAD9D3, `--rule-strong` #B9B6AC
- Status system (invented, one per release stage — never reused for anything else):
  - `--status-pilot` #6B3FA0 (6.75:1) — controlled pilot, restricted access
  - `--status-rollout` #8A5300 (5.78:1) — staged, market by market, in progress
  - `--status-validated` #0A6870 (5.95:1) — validated pre-integration, not yet public
  - `--status-adopted` #1E7A3D (4.91:1) — shipped and adopted beyond its origin team
  - each has a `-wash` background (`#F1E9FB`, `#F7ECD8`, `#DFF3F4`, `#E1F5E7`) ≥4.3:1 with its ink
Dark mode retints all of the above (see global.css); every status/paper pair re-verified ≥4.5:1
(status-on-dark ranges 9.0–12.3:1 — dark mode has more headroom, still checked, not assumed).

Type: `Source Serif 4` (display + body prose — the narration voice) paired with `JetBrains Mono`
(all UI chrome, labels, status pills, the flag, nav, buttons — the system voice). Neither face is on
the banned list (Inter/Space Grotesk/IBM Plex/Newsreader) or the wider AI-default list.

Layout (desktop hero):
```
┌───────────────────────────────────────────────────────────┐
│ [flag: outcomes ●━━ GA]                    build: EN · ES  │ command bar
├───────────────────────────────────────────────────────────┤
│  RELEASE  marius-mihail-ion            ┌───────────┐       │
│  # Marius Mihail Ion                   │  portrait │       │
│  Senior Angular / Frontend Engineer    └───────────┘       │
│  [lede — 1 sentence identity]                               │
│  ▸ outcome 1   (staged reveal, flag-gated)                  │
│  ▸ outcome 2                                                 │
│  ▸ outcome 3                                                 │
│  [View case studies] [Download CV] [LinkedIn] [GitHub]      │
│  location / work-model line                                 │
└───────────────────────────────────────────────────────────┘
```
Mobile: single column, portrait above name, flag control docked under the header row, thumb-zone
bottom nav bar (inherited, retinted).

## Principles
1. The flag is real: a native `<input type="checkbox">`, keyboard-operable, default **checked** so
   the 2–3 strongest outcomes are on-screen with no interaction (recruiter-scan requirement holds
   even with JS off — this is pure CSS `:has()`, not a JS-gated reveal).
2. Status words are the exact brief ceiling: pilot (never public), rolled out (country by country),
   validated (pre-integration) — never "live", "GA" or "shipped to production" where the data says
   otherwise.
3. No kicker/eyebrow stacked above a heading anywhere (craft-floor ban). Where the base template had
   one, the label now rides inline beside or under the heading as release metadata, or is dropped.
4. Cross-document View Transitions: `@view-transition { navigation: auto; }` plus a matching
   `view-transition-name` on the case card and the case page's corresponding region. Pure
   progressive enhancement — unsupported browsers get a normal navigation, history works natively
   because these are real MPA links, not an intercepted router.

## Per-section concept spec
- **Command bar (SiteNav)**: compact sticky mono bar, desktop; floating thumb-zone bar, mobile.
  Composition anchor: name+role left, links+language switch right. Background mode: translucent
  paper + blur (inherited). Type: JetBrains Mono for links. CTA style: underline-free links with a
  rule under the active item. Motion cue: none ambient; focus/hover only.
- **Hero**: composition anchor: text-left / portrait-right (desktop), stacked (mobile). Background:
  flat paper. Type: Source Serif display h1, mono lede-meta. CTA style: filled primary (View case
  studies) + outline buttons. Motion cue: the flag reveal — staggered opacity/translateY on the
  outcome list, exponential ease-out, ~350ms with per-item delay, instant under reduced motion.
- **Case grid / cards**: composition anchor: 2-col grid, each card = a release-record summary with a
  status pill top-right. Background: raised paper card. Type: mono status + tags, serif title.
  Motion cue: card lift + border-color on hover; `view-transition-name` per slug.
- **Case study page**: composition anchor: release header (title, status pill, tags) then a spine of
  staged steps (was a `<dl>`, now numbered stage markers echoing the Experience timeline language).
  Motion cue: the view-transition morph from the originating card; steps have no scroll-triggered
  animation (kept quiet — this is a Read-mode surface).
- **Experience / About / Contact**: inherit the token system; timeline retinted, eyebrow removed
  from page heads (folded into a mono meta line under the h1 instead of above it).

## Finish
Unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict,
DESIGN.md, and every shipping raster carrying its provenance. (No rasters are shipped in this
concept — no invented imagery beyond `public/me.webp`.)
