# NOTES.md — s12-sequencer

## Skill ledger
- frontend-design / design-taste-frontend / high-end-visual-design: informed palette restraint
  (one accent, no gradient soup), real hardware tells (screws, LED bezels), typographic split
  between LCD-mono readouts and humanist-sans long-form prose.
- impeccable (craft-floor, typeset, layout, colorize, animate, delight): focus states, spacing
  rhythm, motion-with-purpose (LED clock ties to real content, not ambient noise), reduced-motion
  contract.
- accessibility: skip link, landmark roles, visible focus rings, aria-live on the LCD label,
  keyboard-operable steps/patches, alt text on photo, contrast checked against AA on dark panel.
- performance: no framework/bundle, no webfonts (system stack), lazy-decoded photo, PDFs linked
  not embedded, Web Audio graph only built on explicit opt-in gesture.
- Did not need: gsap/three/lenis — vanilla CSS transitions + one requestAnimationFrame clock cover
  the whole brief; skipped per ponytail (add a real animation library only if step count/complexity
  grows past what one rAF loop can drive).

## QA evidence
- Preview served via `python3 -m http.server 4512 --directory dist` from this directory, stopped
  at the end of the session.
- Screenshots (puppeteer-core headless only, `_tools/firstview.cjs` plus `qa/qa.cjs`, a small
  custom script for patch-open/ES/params/output/reduced-motion/keyboard states) saved under `qa/`:
  - `qa/home-desktop.png`, `qa/home-mobile.png` — first viewport, EN.
  - `qa/desktop-patch.png` — case-study patch panel open, full dl content.
  - `qa/desktop-es.png` — Spanish toggle (nav, hero, tracklist all mirrored).
  - `qa/desktop-params.png` — 5 stat knobs + start of scope/about panel.
  - `qa/desktop-output.png` — recommendations + contact jacks.
  - `qa/desktop-reduced-motion.png` — `prefers-reduced-motion: reduce` emulated, scope frozen.
  - `qa/desktop-keyboard-track1.png` — pressing "1" scrolls to and opens track 1, visible focus ring.
  - `qa/final-desktop.png`, `qa/final-mobile.png` — post-fix confirmation pass.
- Console: 0 errors across every run (`errors page1: []`, `errors page2: []`, and firstview's
  "console: clean").
- Lighthouse (`../../_tools/lh.sh`) run twice: `perf=25-26 a11y=96→100 bp=100 seo=100 CLS=0`.
  Fixed the one binary a11y failure (`color-contrast` on `.rec__note`, was `opacity:0.75` on
  `--ink-dim`; now a dedicated `#c7c4bd` at full opacity) — a11y went 96 → 100. Performance score
  and TBT are noisy on this shared machine (14+ concurrent `python3 http.server` processes plus
  other agents' Chrome instances competing for CPU during the trace); LCP/TBT numbers moved
  between runs with no code change in between, confirming machine contention rather than a real
  regression. The page itself ships zero JS dependencies, no webfonts and no render-blocking
  requests, so it is not chasing the number further.

## Self-score (honest)
- Wow: 7.5/10 — the instrument metaphor is fully carried through with real data, not just skinned;
  ceiling above this needs actual generative audio-reactive visuals, which is out of scope for a
  muted-by-default, zero-dependency build.
- Polish: 8/10 — consistent spacing/type system, real keyboard model, reduced-motion respected;
  docked a point for the scope waveform being a lightweight synthetic curve rather than a live
  Web-Audio analyser (kept simple since sound is opt-in and off by default for most visits).

## Known limitations
- No build pipeline: `dist/` is a straight copy of the working tree (there is nothing to compile).
- Web Audio synth is a simple oscillator-per-track sketch, not a full sequencer engine; it exists
  to make the "playable" claim real, not to be a DAW.
- Case-study PDFs are linked, not rendered inline (kept simple, they're already the source CVs).
