# DESIGN.md — s11-exhibition

**One line:** A single-room-flow museum exhibition, "Interfaces Under Pressure" — the visitor walks through an entrance hall, four case-study installations on plinths, a stats vitrine, a career corridor and a visitor's book, ending at the gift shop (CV + contact).

## Why it's wow
- Real museum typography (a serif display face for wall texts + a mono "label" face for placards), not a generic SaaS look.
- Gallery lighting: dark charcoal walls, warm spotlight radial-gradients over each plinth, soft cast shadows under illustrated CSS-only "installation" objects representing each case study's technology (no fake dashboards — abstract geometric sculptures instead, per brief: illustrations must not look like real UI).
- Spatial navigation: desktop uses horizontal room-to-room CSS-3D pan-transitions (perspective + translateZ) triggered by a floor-plan minimap and arrow keys; mobile linearizes into a vertical "guided tour" (brief requirement).
- `prefers-reduced-motion`: transitions collapse to instant floor-plan jumps, no parallax, no 3D.
- Confidential/sanitized notices become museum "conservation notes" (small placards), recommendations become visitor's-book entries in a handwriting-style display face.

## Art direction
- Palette: near-black walls (#121014), warm gallery spotlight gold (#d9b475), plinth stone grey (#3a3630), text bone white (#f2ede3), one accent teal (#4f9d94) for interactive/wayfinding elements only.
- Type: "Fraunces" (serif, display, wall texts/headlines) + "IBM Plex Mono" (labels, placards, technical facts) — both loaded via system fallback stack if no network (self-hostable, but since environment has no internet at build time we ship with generous system-font fallbacks tuned to feel the same: Georgia/ui-serif for display, ui-monospace for labels). No external font requests → zero extra network weight, guaranteed zero console errors offline.
- Motion: CSS transforms + scroll-linked IntersectionObserver only. No WebGL, no animation library.

## Stack & deps
- Plain static HTML/CSS/JS. No build step, no framework, no npm packages.
  - Why: brief allows "any stack that builds to static files"; a hand-authored static site *is* static files with zero build risk, zero dependency bytes, zero supply-chain surface for a one-shot deliverable. Ladder rung 4 (native platform) wins over Astro/React/Three for this scope. Every visual effect here is CSS 3D + vanilla JS, so a build step or a rendering library would only add bytes and risk.
- Total payload: index.html + styles.css + script.js (all authored by hand) + 4 shipped assets (me.webp ~36KB, favicon.svg, 2 CV PDFs ~66KB each, only fetched on click).
- Bilingual: no routing, single page, both languages inline as `[data-en]`/`[data-es]` text pairs toggled via `html[data-lang]` CSS attribute selectors + a toggle button that also flips `<html lang>`. Zero re-render JS needed for text swap — CSS only, JS just flips one attribute + persists to localStorage.

## Known trade-offs
- No WebGL/three.js "light rooms" — CSS 3D perspective rooms instead. Chosen for guaranteed cross-device performance and zero console-error risk over spectacle; the brief says "real craft and polish over gimmicks."
