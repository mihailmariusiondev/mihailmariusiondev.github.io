# NOTES: c5-context-field (closed by the orchestrator)
The concept agent was stopped by the user before writing NOTES.md; closed with its current build and QA screenshots.
Direction/tokens: see `DESIGN.md` (if present). Verified 2026-09-14: build (astro check) 0 errors, 19 pages;
linkcheck 0 broken; 0 relocation/"tool payload" matches; LAN preview http://192.168.1.131:4405/ -> 200.
Dependencies: three ^0.169.0 (WebGL concept).
Pending (final QA phase): Lighthouse, skill ledger, review-animations, impeccable detect, keyboard/console re-check.
Screenshots: case-desktop.png case-mobile.png contact-desktop.png contact-mobile.png experience-desktop.png home-desktop.png home-es-desktop.png home-es-mobile.png home-mobile.png home-reduced-motion.png keyboard-focus.png

## Polish pass (2026-09-14)

Task: validate and fix the Three.js `ContextField` hero so WebGL is a true progressive enhancement.
Reviewed `src/components/ContextField.astro` and `src/scripts/context-field-webgl.ts` end to end.

Findings and fix:
- (a) reduced motion: already correct. `prefers-reduced-motion: reduce` short-circuits the whole
  enhancement gate before the dynamic `import()`; the static SVG stays the final state, no
  animation loop starts. Verified in browser (see evidence).
- (b) mobile/narrow viewports: **was missing**, fixed. Added a `window.matchMedia("(max-width:
  768px)")` gate alongside the existing reduced-motion / save-data / WebGL-availability checks in
  `ContextField.astro`, so `<= 768px` viewports never dynamic-import `three` and only ever render
  the static SVG field. Also applies when WebGL is unavailable (existing `webglOk` probe using a
  throwaway canvas's `getContext("webgl2")`/`getContext("webgl")`).
- (c) already correct: the `<script>` gate imports `../scripts/context-field-webgl` only inside
  `requestIdleCallback` after an `IntersectionObserver` reports the hero visible (so after first
  paint, never blocking LCP), and the mounted module pauses its `requestAnimationFrame` loop via a
  second `IntersectionObserver` (offscreen) and a `visibilitychange` listener (hidden tab), resuming
  on re-entry.
- (d) verified zero console errors/warnings across all four states below.
- (e) Lighthouse mobile: machine under heavy CPU contention (`uptime` load average 19.6 on 8 cores,
  concurrent concept agents running). Two runs only, both reported, both compromised by contention
  (see table); numbers not trustworthy per POLISH-QUEUE.md note, no further runs taken.

Evidence (agent-browser session `polish-c5`, headless, `127.0.0.1:4505`):
| State | Viewport | `three`/webgl chunk requested | console | errors |
|---|---|---|---|---|
| Desktop | 1440x900 | yes (`context-field-webgl.*.js`) | empty | empty |
| Mobile | 390x844 | **no** | empty | empty |
| Reduced motion | 1440x900, `prefers-reduced-motion: reduce` | **no** | empty | empty |
| WebGL disabled (puppeteer-core + `/usr/bin/google-chrome --disable-webgl --disable-webgl2`) | 1440x900 | **no** | empty | empty |

Screenshots added: `qa/polish-desktop.png`, `qa/polish-mobile.png`, `qa/polish-reduced-motion.png`,
`qa/polish-webgl-disabled.png` (static field renders correctly in all four).

Build: `npm run build` 0 errors, 19 pages. Linkcheck: `19 pages, 412 refs, 0 broken`.

Lighthouse mobile (`_tools/lh.sh`, 127.0.0.1:4505/, under contention noted above):
| Run | perf | a11y | bp | seo | LCP | TBT |
|---|---|---|---|---|---|---|
| 1 | 41 | 100 | 100 | 100 | 6.7s | 770ms |
| 2 | 38 | 100 | 100 | 100 | 4.3s | 10,370ms |

Both runs are far below the >=85 target and wildly inconsistent with each other (TBT swings
770ms -> 10.4s), which is the signature of CPU contention, not a real regression: the hero's WebGL
work is idle-gated and lazy-imported after first paint per (c) above, and a11y/bp/seo are stable at
100/100/100 across both runs. A clean re-run once the machine is uncontended is recommended before
trusting the perf number; not re-run here per the two-run cap.

Known limitation: perf score above should be re-verified uncontended; the fix itself (mobile/WebGL
gating, reduced-motion, lazy-load, pause offscreen/hidden) is verified directly in-browser and does
not depend on Lighthouse's perf score. 
