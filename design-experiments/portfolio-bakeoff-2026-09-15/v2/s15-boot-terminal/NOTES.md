# NOTES.md — s15-boot-terminal

## Skill ledger
- frontend-design / design-taste-frontend / high-end-visual-design: single accent color, one
  typeface, restraint on ornament, real content over placeholder.
- impeccable (animate.md, delight.md, typeset.md): boot sequence pacing, type-out cadence,
  cursor blink timing, reduced-motion contract.
- accessibility: keyboard-first (it's a shell), visible focus, skip-boot, aria-live output region,
  button palette as an equal-access alternative to typing.
- performance: zero webfonts, zero deps, one shader pass, lazy nothing needed (page is tiny).
- frontend-testing-debugging: puppeteer-core firstview screenshots, console-error check.

## Build
No bundler. `dist/` is the working tree (`index.html`, `style.css`, `main.js`, `data.js`,
`assets/`). Served by orchestrator directly.

## QA evidence (all in `qa/`)
- `desktop-boot.png` — firstview 1440x900, shell after auto-boot, console clean.
- `desktop-case.png` — `open shopping-assistant` case study body.
- `desktop-experience.png` — `experience` timeline.
- `desktop-stats2.png` — `stats` ASCII bar charts (fixed layout: bar/value line + wrapped label
  line, no more mid-bar wrap).
- `desktop-es.png`, `desktop-contact.png` — `lang es` + `recommendations` + `cv` + `contact`,
  confirms localized CV path (`marius-mihail-ion-cv-es.pdf`) and working mailto/LinkedIn/GitHub links.
- `mobile-shell.png`, `mobile-cases.png` — 390x844, palette buttons stacked 2-up, `cases` output.
- `desktop-reduced-motion.png` — `prefers-reduced-motion: reduce` emulated: boot skips straight to
  prompt, no flicker.
- Console errors: zero across every run (firstview.cjs + custom puppeteer-core scripts).

## Bug found and fixed during QA
`hidden` attribute on `#boot-screen`/`#terminal-body` was being overridden by the `display: flex`
class rule (same specificity, author stylesheet loads after the UA `[hidden]` rule) — both blocks
rendered stacked. Fixed with explicit `.boot-screen[hidden], .terminal-body[hidden] { display: none; }`.

## Self-score
- Wow: 7/10 — a genuinely working shell (tab completion, history, bilingual, ASCII bar charts) is
  rare in this bake-off's context, but the effect is more "correct implementation" than "surprising".
- Polish: 8/10 — zero console errors, clean responsive behavior, real reduced-motion contract,
  keyboard fully usable, button palette makes it accessible to non-typers.
- Known limitations: the WebGL layer is a decorative full-screen shader (scanlines/vignette/grain/
  flicker) over the DOM, not a DOM-capture warp — genuine curvature distortion of the actual text
  would need rendering the terminal into a texture, a much bigger and riskier addition for a
  monospace-text site; CSS fallback (no WebGL) keeps the same scanline/vignette look, just static.
