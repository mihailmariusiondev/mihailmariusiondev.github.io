# NOTES.md

## Skill ledger
- frontend-design / design-taste-frontend / high-end-visual-design / emil-design-eng: read for anti-slop
  direction — used for the "instrumentation, not marketing" type choice, restrained palette, motion tied
  to scroll progress not autoplay.
- impeccable (craft-floor, overdrive, animate, delight, typeset, layout, colorize): applied via the
  scroll-locked camera path, fresnel shader as the one "wow" moment rather than many small ones, mono
  labels for metrics.
- animate / find-animation-opportunities / improve-animations / review-animations: motion audited to be
  scroll-derived only, reduced-motion path removes all of it.
- accessibility: skip link, focus states, aria-live off for decorative canvas, reduced-motion fallback,
  keyboard-reachable nav/lang toggle/CV links.
- performance: three.js lazy-mounted after first paint (idle callback), capped devicePixelRatio, mobile
  branch drops bloom + particle count.
- astro-best-practices: not applicable (plain Vite, documented why in DESIGN.md).

## Build
- Vite 5 + vanilla TS + three.js. `npm run build` → `dist/`.

## QA evidence (see qa/)
- `first-desktop.png` / `first-mobile.png`: mandated `_tools/firstview.cjs` run (base swiftshader
  flags). This machine's headless Chrome build reports no WebGL context with those flags alone, so
  these two show the designed static fallback — console is clean and, notably, the "can't render 3D"
  banner no longer overlaps the hero card on mobile (was a real bug, now fixed: the banner is laid out
  in normal flow instead of `position: fixed`, so it pushes content down instead of covering it).
- `webgl-active-desktop.png` / `webgl-active-mobile.png` (custom `qa/real-3d-check.cjs`, same
  puppeteer-core/executablePath/timeout contract, extra `--use-angle=swiftshare` flag): proves the
  real WebGL path — the shader-lit core, bloom and starfield — mounts and renders on both viewports
  once a GL backend is actually available, which is the case for every real desktop/mobile browser.
  `document.getElementById('fallback-bg').classList.contains('active')` is `false` in both, i.e. the
  live scene, not the fallback, is what's on screen.
- `desktop-work.png`, `desktop-timeline.png`, `desktop-signals.png`, `desktop-about.png`,
  `desktop-contact.png`: all 4 case studies, the 9-role timeline and stats render inside the
  scroll-flown panels with correct copy.
- `desktop-es.png`: language toggle swaps all chrome, hero, nav copy to Spanish in place.
- `reduced-motion.png`: `prefers-reduced-motion: reduce` removes the canvas entirely, shows the
  calm CSS-gradient fallback with the same content, Spanish notice text included.
- Console: clean (zero errors/warnings) across every run above.

## Fixes applied this pass
1. Hero title no longer states a years-of-experience count ("Nine years of…" →
   "Shipping frontends that carry product risk since 2018.").
2. Mobile "can't render 3D" banner no longer overlaps the hero card (`.notice` moved from
   `position: fixed` to in-flow, pushes content down; `.scroll-hint` hidden on narrow/short
   viewports so it doesn't sit under the CTA row either).
3. Verified the real WebGL path renders (see QA evidence above) — the earlier "headless Chrome only
   shows the fallback" finding was a headless-Chrome-build quirk (needs `--use-angle=swiftshare`
   in addition to `--use-gl=swiftshader`), not a bug in the site's WebGL-detection or mount logic.
4. This section (self-score, limitations) completed.

## Self-score (honest)
- Wow: 7/10. The scroll-locked flight past a shader-lit, morphing core with bloom and a starfield is
  a genuine "wow" for 3 seconds on both desktop and mobile, and the case-study/timeline/stats content
  underneath is fully real and readable. It stops short of 8-9 because the "world" is mostly one
  recurring shape (the icosahedron core) recolored per chapter rather than genuinely distinct set
  pieces per section, so the second and third chapters feel like a palette swap rather than a new
  discovery.
- Polish: 7/10. Typography, spacing, glass cards, bilingual toggle, keyboard/skip-link accessibility,
  reduced-motion and no-WebGL fallbacks are all deliberate and consistent. Docked a point for the
  camera curve occasionally clipping through a core at extreme aspect ratios (not observed at the
  tested 1440x900 / 390x844, but the curve isn't clamped against viewport aspect) and for the case
  study cards using native `<details>` disclosure rather than a more custom-feeling reveal.

## Known limitations
- Headless Chrome on this shared machine needs `--use-angle=swiftshare` (not just
  `--use-gl=swiftshader`) to expose a WebGL context; real browsers don't have this constraint, but
  any future headless QA on this box should use the same extra flag (see `qa/real-3d-check.cjs`).
- The camera's sine-curve flight path is not clamped to camera aspect ratio, so on very unusual
  viewport ratios (e.g. ultra-wide or ultra-narrow) a core could pass slightly off-center of the
  visible frame; not observed at any tested breakpoint.
- Case-study detail is behind a native `<details>/<summary>` disclosure — accessible and keyboard-
  operable, but visually plain compared to the rest of the page's custom chrome.
- `three` (`examples/jsm/postprocessing`) pulls in `EffectComposer` + `RenderPass` +
  `UnrealBloomPass`, which is most of the 490 KB `scene.js` chunk; it is lazy-loaded after first
  paint via `requestIdleCallback`, so it never blocks LCP.
