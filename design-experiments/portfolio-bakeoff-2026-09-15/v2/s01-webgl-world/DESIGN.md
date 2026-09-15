# DESIGN.md — Deep Field

**One line:** Marius's career as a single navigable WebGL "signal field" — a scroll-flown journey past four glowing case-study monoliths and a nine-node experience timeline, rendered with a custom fresnel/noise shader, bloom, and a reactive starfield, with a fully designed static fallback for no-WebGL / reduced-motion.

## Why it's wow
- First 3 seconds: full-viewport WebGL canvas, dark void, a slowly rotating faceted "core" crystal lit by a custom GLSL fresnel+noise shader, drifting particle starfield, bloom glow, name/title typeset in a huge display face — no scroll needed to feel it.
- Scrolling doesn't just fade divs: it drives the camera along a gently curved flight path (sine-offset x/y, not a straight dolly), so passing each chapter feels like flying past a structure in space, not swiping a slideshow.
- Each of the 4 case studies gets its own monolith color/shape state (the core morphs distortion + hue per chapter) synced 1:1 with the HTML overlay panel — the "world" is not decorative, it's the navigation.
- The experience chapter spawns 9 orbiting nodes (one per real role, real dates) around the core — literally his timeline as a constellation.
- Mobile gets a lighter, still-designed pass: fewer particles, capped pixel ratio, bloom disabled, same flight path and copy.
- Reduced-motion / no-WebGL: canvas never mounts; a static gradient + CSS-only starfield page with the same chapters stacked vertically, same copy, same CTAs — designed, not a broken apology screen.

## Art direction
- Palette: near-black void (#05060a), one signal color per language-neutral accent (electric cyan #6df3ff core glow, warm amber #ffb85c for metrics), no gradients-as-wallpaper — light only comes from the shader-lit core and bloom.
- Type: display serif-less geometric (system stack: "Inter", fallback) at huge scale for the hero, monospace (ui-monospace) for metrics/labels to read as instrumentation, not marketing.
- Motion: everything is scroll-position-derived (0..1 progress), no autoplay timelines fighting the user; parallax mouse drift is subtle (±12px) and disabled under reduced-motion.

## Stack & deps
- Vite 5 + vanilla TypeScript (no framework — a single scroll-driven page doesn't need one; Astro's routing/SSR is unused overhead here since language is a client-side data-swap, not separate pages).
- `three` (^0.169, ~600 KB unminified core + examples/jsm postprocessing used from the same package, no extra install) for the scene, EffectComposer + RenderPass + UnrealBloomPass for the glow.
- No GSAP/Lenis: scroll progress read directly from `window.scrollY` against a tall spacer document, lerped in the RAF loop — one `requestAnimationFrame` loop is simpler than a scroll-animation library for a single continuous progress value.
- No CSS framework: hand-written CSS custom properties, ~9 KB.

## Bilingual approach
- One HTML document, two in-memory content maps (`content.en`, `content.es`) mirroring `ui.ts`'s `Localized<T>` shape. A `lang` toggle button swaps `document.documentElement.lang`, re-renders text nodes from the active map, and persists the choice in `localStorage`. `<html lang>` and OG tags update on load from the initial choice (default `en`). No separate routes: the brief allows "your own routing/toggle" and everything is single-page and scroll-driven, so client-side toggle keeps the flight-path state (scroll position, camera) intact across a language switch, which duplicate pages would break.
