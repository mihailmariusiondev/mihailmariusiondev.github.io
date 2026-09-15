# Batch 1 orchestrator review (agents stopped by the user; artefacts collected as-is)
| site | state | first viewport | problems to fix in completion pass |
|---|---|---|---|
| s01 webgl-world | builds, 507 KB JS (three), console clean | WebGL did not render in headless (fallback card shown; judge 3D on a real device) | hero copy "Nine years of…" = forbidden years count; fallback banner overlaps card on mobile; NOTES TBD |
| s02 desktop-os | BROKEN: dist/index.html references styles.css + app.js that do not exist | unstyled HTML | agent stopped before writing CSS/JS: needs to be built |
| s03 scroll-cinema | builds, 162 KB JS (gsap), console clean | strong typographic title, dark/amber; wow depends on scroll | NOTES TBD; verify scroll choreography |
| s04 playable-career | builds, 38 KB JS, console clean, game + skip mode | sparse art (blob characters, starfield) | mobile header overflows (skip button clipped); art direction thin; NOTES TBD |
All four: CV PDFs resolve (corrected versions), no retracted claims in dist.
