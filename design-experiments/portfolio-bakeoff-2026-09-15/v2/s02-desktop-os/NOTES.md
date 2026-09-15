# NOTES.md — Strata OS

## Skill ledger
- `frontend-design`: read in full. Applied: hero = the boot moment + first app, not a hero-metric
  template; monospace earns its place (subject is literally an OS); avoided eyebrows/kickers,
  avoided gradient text, avoided the terracotta/near-black AI-tell palette.
- `impeccable` (SKILL.md + `craft-floor.md`): read. Applied the craft-floor "Verify" list by hand
  (contrast, depth, spacing, type, motion, states, browser surfaces, copy, coverage) since the
  `impeccable` CLI launcher isn't set up in this sandbox — noted here instead of silently skipping.
- `accessibility`, `web-design-guidelines`: informed keyboard model (Tab order, Esc to close
  focused window, focus returned to the opener, visible focus rings, landmark roles, reduced
  motion, reader-mode plain path).
- `animate` / `find-animation-opportunities`: informed the "one authored boot sequence, everything
  else answers a user action" rule; no scroll-triggered fade-ups.
- `high-end-visual-design`, `emil-design-eng`, `design-taste-frontend`: informed palette/type
  choices and the ban list (no eyebrows, no SaaS-card kit, no hairline-heavy broadsheet, themed
  focus rings and selection color).
- `astro-best-practices`: not applicable — deliberately not using Astro (see DESIGN.md ladder
  note); a static hand-authored page has nothing for astro-check to check.
- Not deeply read (time-boxed): `gsap` (no GSAP used — CSS transitions/Web Animations API cover
  everything needed, see ladder note), `imagegen-frontend-web` (no image tool exists in this
  sandbox; applied as method — planned visuals as CSS/SVG since no image generation available),
  `prototype` (single committed direction, brief didn't ask for a picker).

## Content corrections applied
- Context update mid-task: ENZO copy says he moved from .NET into Angular on an *existing* AWS
  serverless architecture (not that he built it). Help Center copy says "delivered market by
  market" with no "replaced legacy guides" claim. CV PDFs re-copied from `_context/assets` after
  the update (md5 verified different from the pre-update snapshot referenced in facts.json).

## Follow-up build pass (completion)
The previous agent left `dist/index.html` complete and content-correct but referencing
`styles.css`/`app.js` that did not exist (unstyled HTML in production). This pass wrote both files
from scratch, vanilla, no dependencies, matching the DESIGN.md ladder decision (no bundler needed
for a single-shell static OS):
- `dist/styles.css` — full visual language: graphite/amber palette, JetBrains Mono chrome + Inter
  content, window chrome, dock, springboard, command palette, reader mode, reduced-motion overrides,
  mobile breakpoint (springboard + fullscreen apps + Home button).
- `dist/app.js` — window manager (drag via Pointer Events, resize handle, focus/z-order, maximize,
  close), boot sequence (skippable, session-scoped, reduced-motion skips it instantly), dock +
  mobile springboard, command palette (⌘/Ctrl+K, arrow keys, Enter, fuzzy substring filter, opens
  apps / downloads CVs / copies email / switches language / toggles reader), EN/ES toggle (persisted,
  updates every `.i18n-en`/`.i18n-es` pair plus ARIA labels), reader mode (clones each window's body
  into one linear plain document, hides the desktop chrome), opt-in Web Audio click blips (off by
  default, persisted), clock, keyboard shortcuts (1–6 open apps, Esc closes focused window/palette).
- Removed an unused leftover `dist/icons.svg` (icons are inline in `index.html`'s sprite; the file
  had no references).
- Added a `<noscript>` fallback: without JS the boot/statusbar/dock/palette hide and windows lay out
  as plain static blocks so content stays readable.

## Skill ledger (this pass)
- `accessibility` / `web-design-guidelines`: fixed a real Lighthouse `button-name` failure — the
  mobile breakpoint visually hid chip labels but left icon-only buttons with no accessible name;
  added static `aria-label`s kept in sync with language and state via JS.
- `frontend-testing-debugging`: iterated with puppeteer-core against localhost:4502 across desktop,
  mobile, ES, reduced-motion, reader, drag and mobile fullscreen-app states; fixed two real bugs
  found this way (reader mode hid its own content because `#main` and `.desktop` are the same
  element; the mobile "Home" dock button never appeared because the `[hidden]` attribute beats a
  `display` rule regardless of specificity — fixed by toggling the property in JS instead of CSS).
- `performance`: kept assets minimal (no webfont bloat beyond two families, no JS deps); Lighthouse
  perf 87 on a shared machine (noisy, not chased further).

## QA evidence
- `qa/final-desktop.png` (1440×900), `qa/final-mobile.png` (390×844) — first paint, console clean
  (`node ../../_tools/firstview.cjs`).
- `qa/es-desktop.png` — full Spanish translation live (all six apps + dock).
- `qa/palette.png` — command palette filtering to "CV", showing both download actions.
- `qa/reduced-motion.png` — boot sequence skipped instantly, desktop opens directly.
- `qa/reader.png` — plain linear document, all app content flattened into one calm page.
- `qa/mobile-app.png`, `qa/mobile-home.png` — mobile springboard → fullscreen app → Home button
  back to springboard.
- `qa/drag.png` — a dragged, refocused window with the amber focus ring.
- `qa/lh.json` — Lighthouse (`../../_tools/lh.sh`): `perf=87 a11y=100 bp=100 seo=100 LCP=3.1s CLS=0
  TBT=50ms` (machine is shared/noisy; a11y/bp/seo are the meaningful ones here).
- Custom interaction script `qa/interact.cjs` (puppeteer-core, isolated browser contexts per test)
  exercises boot-skip, language toggle, command palette, reduced motion, reader mode, mobile
  fullscreen apps and window drag — zero console errors across all runs.

## Self-score (honest)
- **Wow: 7/10.** The concept lands (windows, dock, palette, reader mode, real drag/resize) and
  nothing else in a typical portfolio bake-off does this; but the visual craft is "clean instrument
  panel," not spectacular — no WebGL, no signature moment beyond the boot sequence. A stronger
  entry would add a more distinctive boot/wallpaper treatment and richer micro-interactions per app.
- **Polish: 8/10.** Zero console errors, a11y 100, keyboard-complete, bilingual, reduced-motion and
  reader fallbacks all genuinely work (verified with real interaction, not assumed). Docked at 8
  because the desktop canvas needs horizontal/vertical scrolling on smaller desktop viewports
  (windows are laid out at fixed authored positions) and the drag/resize interactions, while
  functional, have no inertia or snapping.

## Known limitations
- Desktop window positions are fixed authored coordinates on a scrollable canvas; on desktop
  viewports smaller than ~1650×1100 some windows sit outside the first screen and need scrolling
  or a resize/drag to reach (by design — a real desktop scrolls — but not auto-tiled).
- No auto-save of window position/size across reloads (resets to authored layout each visit).
- Sound is a single opt-in click blip via Web Audio oscillators; no distinct sounds per action.
- Reader mode is generated by cloning each window body once, so live window content changes
  (none currently happen at runtime) would not sync back into it.
