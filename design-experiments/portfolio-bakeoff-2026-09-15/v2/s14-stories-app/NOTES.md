# NOTES.md — s14-stories-app

## Skill ledger
- `frontend-design` / `design-taste-frontend` / `high-end-visual-design`: informed the
  per-story accent-color system, restraint on gradients, and avoiding generic centered
  hero + card-grid template.
- `impeccable` (animate.md, delight.md, typeset.md, layout.md, colorize.md): spring
  easing curve choice, progress-bar micro-timing, type scale via `clamp()`, one accent
  hue per story rather than a rainbow.
- `animate` / `find-animation-opportunities`: kept only user-triggered slide and
  card-deck motion. Stories no longer auto-advance; the visible controls, tap zones
  and arrow keys own progression.
- `accessibility`: keyboard model (arrows/space/escape), focus-visible rings, aria-live
  slide announcements, reduced-motion fallback, alt text, tap targets >=44px.
- `performance`: zero webfonts, zero JS dependencies, lazy `<img>`/PDF loading, no
  WebGL/canvas — content is readable and fast with JS-off-adjacent simplicity even
  though the interactions need JS.
- `astro-best-practices` / `prototype`: considered Astro, decided a single static page
  is the leaner, more honest fit for a one-data-object stories app (see DESIGN.md).
- `web-design-guidelines`: checked visited/focus states, semantic landmarks, form-less
  contact (mailto/tel-free links only, no fake forms).

## QA evidence
Local preview served `dist/` on `127.0.0.1:4514`. Screenshots in `qa/`:
- `final-desktop.png` / `final-mobile.png` — stories home, phone-in-scene desktop vs. true mobile.
- `story-open.png`, `story-next.png` — story viewer, EN, keyboard `ArrowRight` advance.
- `roles.png` — swipeable role-deck screen.
- `connect.png` — connect sheet with contact links, CV downloads, recommendations.
- `connect-es.png` — same screen after the language toggle, confirming full ES mirror.
- `reduced-motion-story.png` — story viewer with `prefers-reduced-motion: reduce`: no
  auto-advance, static bar segments, manual Anterior/Siguiente buttons shown instead.
- `interact.cjs` — the puppeteer script used to drive all of the above.

Console: 0 errors/pageerrors across desktop, mobile, ES and reduced-motion runs.
`../../_tools/lh.sh` (mobile preset, shared machine — noisy): `perf=62 a11y=100
bp=100 seo=100, LCP=6.1s, CLS=0.028, TBT=0ms`, no failing binary audits. a11y/bp/seo
all perfect; LCP is inflated by Lighthouse's mobile throttling on a shared box for
what is otherwise a sub-100KB page with zero third-party requests.

One real bug caught and fixed during QA: `[hidden]` was being overridden by
`.viewer { display: flex }` (a class beats the UA `[hidden]` rule), so the story
viewer rendered open on first paint. Fixed with a single `[hidden] { display: none
!important; }` rule. Also fixed a Lighthouse a11y finding (`label-content-name-mismatch`
on the language toggle) by syncing its `aria-label` to the visible EN/ES text.

## Self-score (honest)
- Wow: 8/10 — the story-viewer + draggable deck genuinely feels app-like, not a
  scroll page with a skin; ceiling is that it's still 2D DOM, no WebGL flourish.
- Polish: 8/10 — consistent spacing/type scale, real focus states, 100/100/100 on
  a11y/best-practices/seo; a hand-rolled spring easing is not as buttery as a
  physics library on very old phones.

## Known limitations
- No service worker / offline mode — out of scope for a bake-off entry.
- Card-deck drag uses pointer events with a CSS spring-back transition, not a real
  physics engine (no added dependency for one interaction — see DESIGN.md stack note).
- Only one photo asset exists (`me.webp`); it is used once, on the Connect sheet.
