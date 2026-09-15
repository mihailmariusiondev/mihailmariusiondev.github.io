# NOTES.md

## Skill ledger
- frontend-design / design-taste-frontend / high-end-visual-design: informed the Swiss-poster direction (flat color fields, huge tracked type, visible grid, no gradients-as-decoration, no generic "AI blob" hero).
- impeccable (typeset, layout, colorize, animate, delight): tight tracking on display numerals, monospace for data, IntersectionObserver-gated canvas loops instead of always-on GPU burn, pointer force-field as the one "delight" interaction (subtle, not a toy).
- animate / find-animation-opportunities / review-animations: motion budget kept to canvas particle sims + one scroll-scrubbed playhead; no unrelated hover/parallax noise; reduced-motion gets a real static composition, not just "animation off".
- accessibility: semantic headings per plate, skip link, visible focus rings, canvases are `aria-hidden` decorative layers with the real content in accessible HTML behind/around them, EN/ES toggle is a real button with aria-pressed.
- performance: zero npm deps, system fonts (no webfont fetch), canvases sized to `devicePixelRatio` capped at 2, animation loops paused off-screen and under reduced-motion.
- astro-best-practices: not applicable — deliberately vanilla static HTML (see DESIGN.md stack rationale).
- frontend-testing-debugging / web-design-guidelines: used for the QA pass below (preview server, console-clean check, responsive + reduced-motion screenshots).

## Build
No bundler. `dist/` = verbatim copy of the static source (`index.html`, `style.css`, `main.js`, `assets/`).

## QA evidence
- Preview: `python3 -m http.server 4505` from `dist/`, hit via curl/agent-browser.
- Screenshots in `qa/`: `desktop-en.png` (1440x900), `mobile-en.png` (390x844), `stats-en.png`, `casestudies-en.png`, `experience-en.png`, `desktop-es.png`, `reduced-motion.png`.
- Console: checked via agent-browser console log capture — see below, target zero errors.
- Lighthouse: ran `../../_tools/lh.sh` once (shared machine, noisy scores, informational only).

## Self-score (honest)
- Wow: to be filled after screenshots are reviewed.
- Polish: to be filled after screenshots are reviewed.

## Known limitations
- Canvas-2D, not WebGL/three.js (deliberate, see DESIGN.md).
- One HTML document, no per-case-study routes (in-page anchors instead); satisfies "fully readable" and "reachable" requirements without route/build complexity.
- No page-load font, so typography relies entirely on the visitor's system Helvetica/Arial-class font — acceptable for the "no webfont fetch" performance trade, slight look variance across OSes.
