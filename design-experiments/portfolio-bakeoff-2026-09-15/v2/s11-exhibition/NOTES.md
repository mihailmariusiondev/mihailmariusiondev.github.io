# NOTES.md — s11-exhibition

## Skill ledger
- frontend-design / design-taste-frontend / high-end-visual-design: informed palette restraint (one accent color), real serif+mono pairing instead of default sans, avoiding generic card-grid layout.
- impeccable (typeset, layout, colorize, delight): wall-text hierarchy, plinth/label spacing rhythm, spotlight gradients as the "delight" layer instead of gratuitous animation.
- animate / find-animation-opportunities: motion only on room-enter (IntersectionObserver reveal) and room-to-room pan; everything else static. Reduced-motion strips all of it to instant floor-plan jumps.
- accessibility: skip link, landmark roles per room (`role="region"` + `aria-label`), visible focus rings, floor-plan nav is real `<nav>` with buttons, alt text on photo, PDFs are real links (not JS-only downloads).
- performance: no frameworks/build, no webfont network requests, only 4 binary assets, CV PDFs lazy (only requested on click), image has explicit width/height to avoid CLS.
- astro-best-practices / frontend-app-builder: considered, not used — see DESIGN.md for why plain static HTML won on the ponytail ladder for this scope.

## QA evidence
- `qa/final-desktop.png` (1440x900), `qa/final-mobile.png` (390x844) — firstview.cjs, EN, console clean.
- `qa/room1.png`, `qa/room3-es.png` — case-study rooms (EN and ES), each sculpture visually distinct.
- `qa/results.png` — verified-results vitrines grid.
- `qa/guestbook.png` — visitor's-book recommendation cards.
- `qa/exit.png` — gift-shop/contact/CV/a11y-statement room.
- `qa/entrance-es.png` — language toggle switched to ES (persisted via localStorage), floor-plan nav also localizes (Sala I, Trayectoria, Libro...).
- `qa/reduced-motion.png` — `prefers-reduced-motion: reduce` emulated: sculpture hover animation and room-enter transform both disabled via CSS, floor-plan nav remains primary navigation.
- `qa/career-mobile.png` — mobile viewport, career corridor stacks correctly, floor-plan nav scrolls horizontally.
- Custom puppeteer script (qa/shots.cjs, run then removed) checked console errors across 3 browser contexts (desktop EN→ES, reduced-motion, mobile): all `errors: []`.
- Bug caught and fixed during QA: initial CSS rule `[lang] { display: none }` also matched `<html lang="en">`, blanking the entire page. Fixed by scoping to `body [lang]`.
- Manual keyboard walk-through: Tab reaches skip link, language toggle, floor-plan buttons, all case-study/contact/CV links in DOM order; visible focus ring via `:focus-visible`.

## Self-score (honest)
- Wow: 7/10 — strong art direction and a real spatial idea, but CSS-3D rooms read as a stylized single-page scroll more than a literal walkable exhibit; no WebGL centerpiece.
- Polish: 8/10 — bilingual parity is complete, all four case studies fully readable, zero console errors, responsive 390–1920px, reduced-motion path works.

## Known limitations
- No WebGL room; CSS 3D perspective stands in for it (see DESIGN.md trade-off).
- Single-page (no client routing) — language and rooms are all in one document, per brief's "your own routing/toggle" allowance.
