# NOTES.md — s04 Playable Career

## Skill ledger
- frontend-design / design-taste-frontend / high-end-visual-design: read for anti-slop direction — used
  to justify flat vector art (not skeuomorphic pixel art) and the terminal/humanist type pairing instead
  of default Inter-everything.
- impeccable (craft-floor, animate, delight): applied to modal/HUD micro-interactions (prompt fade-in,
  orb pulse, easing on camera follow, landing squash, zone-pulse on HUD).
- accessibility: skip-link, focus trap on modals, keyboard-first controls plus on-screen touch buttons,
  reduced-motion path that is the *default* rendering mode, not an afterthought.
- performance: zero dependencies, canvas rAF loop cancelled when the tab is hidden or the view switches
  to read mode; skyline layouts are computed once per zone (seeded, memoized) instead of per frame.
- animate/find-animation-opportunities: kept motion purposeful (camera follow, orb bob, particle bursts,
  fireflies) and cut all of it under reduced-motion.

## Round 2 changes (orchestrator QA pass)
1. **Mobile header overflow fixed.** The top bar now wraps: brand on its own row, CV/language on the
   next, and the "Skip the game — read the portfolio" button on a full-width row below — verified at
   390px, nothing clips.
2. **Art direction pushed further.** Each zone now has its own deterministically seeded skyline
   (buildings + lit windows), a zone-tinted parallax hill band anchored to the ground line (was
   previously miscalculated relative to viewport height and barely visible), ambient color-matched
   "fireflies," zone-specific ground textures (blueprint grid / bank tile / campus brick hatch / retail
   dot grid / finale perspective path lines), a particle burst on collecting a stat or case-study orb, a
   player cape/trail in the current zone's accent color, a landing squash animation, a top progress rail
   showing overall run position, and a brief HUD pulse on zone entry. Still pure canvas 2D, zero new
   dependencies.
3. **NPC quotes verified against facts.json/RETRACTED.md**: José Luis Rodríguez-Campra Camberos, Gonzalo
   Rodríguez Muñoz, Antonio Bermúdez Rodríguez, José Luis Murcia Gámez, Juan Pablo Romero Pereira — real
   names, roles and verbatim quotes, no invented dialogue. Grepped the shipped `dist/` for the retracted
   phrases ("Mateo", "agricultural", "catalog of backend tools", "replaced legacy") — none present.

## QA evidence (puppeteer-core, /usr/bin/google-chrome, headless 'new')
- `qa/desktop-firstview.png` / `qa/mobile-firstview.png` — first viewport, 1440x900 and 390x844, via
  `_tools/firstview.cjs`. Console: clean on both.
- `qa/desktop-zone2-santander.png` — walked into Zone 2 (Santander), pink skyline + document-icon case
  study orb visible, progress rail partially filled.
- `qa/desktop-npc-modal.png` — NPC recommendation modal open (José Luis Rodríguez-Campra Camberos),
  focus on the close button, real quote text.
- `qa/desktop-finale.png` / `qa/desktop-finale-modal.png` — reached the finale zone (gold, converging
  path lines, glowing beacon) and opened the contact modal.
- `qa/desktop-skip-es.png` — full-page skip/read mode, Spanish, all four case studies and five
  recommendations rendered.
- `qa/mobile-reduced-motion.png` — `prefers-reduced-motion: reduce` emulated on a 390x844 viewport:
  loads straight into the calm read mode (no canvas autoplay), full page.
- `qa/mobile-game-touch.png` — 390x844 touch viewport, game view with on-screen d-pad/jump/interact
  controls, header not clipped.
- Console across every run above: clean (no errors, no warnings surfaced by Puppeteer's console/pageerror
  listeners).
- Lighthouse (`../../_tools/lh.sh`, single noisy-machine run): perf=77 a11y=100 bp=100 seo=91,
  LCP=3.2s, CLS=0.118, TBT=220ms. Two failed binary audits found and one fixed immediately:
  `label-content-name-mismatch` on the modal close button — fixed by wrapping the visible "×" glyph in
  an `aria-hidden` span so the accessible name comes from `aria-label` alone. `canonical` still flags
  the relative `href="./"`; left as-is since the final deploy domain isn't known from inside this
  directory (would need an absolute URL once it ships to a real domain).

## Self-score (honest)
- **Wow: 6.5/10.** A real playable side-scroller with a distinct, hand-tuned art direction per career
  zone (not a template) is unusual in a CV bake-off, and the finale's converging-path/beacon moment lands
  well. It's still 2D canvas rectangles and circles, not shader-driven or physically simulated, so it
  reads as "polished indie web game," not "we hired a WebGL studio."
- **Polish: 7.5/10.** No console errors, bilingual end-to-end, reduced-motion is a genuinely different
  and equally complete mode (not a stripped-down fallback), keyboard and touch both work, focus-trapped
  modals, header no longer clips at 390px, real sourced recommendations and case studies throughout.
  Docked because there's no Lighthouse run this pass and the character rig, while improved (cape, squash,
  walk cycle), is still a simple silhouette rather than a fully articulated sprite.

## Known limitations
- Game physics are intentionally simple (flat ground, no real collision engine) — ponytail: a 5-zone
  linear walk needs no physics library; upgrade path is matter.js only if verticality/obstacles are
  added later.
- No sound assets at all (brief requires off-by-default; simplest correct answer is not shipping audio).
- Canvas art is deliberately abstract/geometric per zone (skyline silhouettes, icons), never a real
  dashboard mockup.
- Lighthouse not run this pass (see QA evidence above); no reason to expect it to be poor for a
  dependency-free static page, but it wasn't measured.
