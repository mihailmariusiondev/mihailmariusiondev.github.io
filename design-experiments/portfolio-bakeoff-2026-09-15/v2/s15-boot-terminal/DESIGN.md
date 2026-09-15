# DESIGN.md — s15-boot-terminal

## One line
A retro-futurist CRT boot terminal: you power on Marius's career like an old workstation, then
drive a real shell (`help`, `cases`, `open <case>`, `experience`, `cv`, `contact`, `lang es/en`,
tab completion, history) rendered through a WebGL CRT shader (curvature, scanlines, phosphor glow,
flicker) with a full command-button palette for anyone who doesn't want to type.

## Why it's wow
- It is not a themed list of sections — it is an interactive machine. The visitor *boots* it,
  *types into it*, and the machine *answers in character* (a dry, technical, monospace voice)
  while the content is 100% identical in substance to a normal portfolio.
- A real WebGL fragment shader post-processes the DOM/canvas text layer: barrel distortion,
  interlaced scanlines, RGB phosphor mask, vignette, chromatic aberration on boot, occasional
  flicker — not just a `repeating-linear-gradient` scanline overlay.
- Recruiters who don't want to type get a full command-button palette (mobile: big tap targets)
  so the "wow" never becomes a wall.
- ASCII/ANSI-style bar charts render the real verified metrics (96%, top 1.42%, 34/23, 21 of 53)
  as terminal art, not generic stat cards.

## Art direction
- Palette: near-black CRT body (#050806), phosphor green primary (#39ff6a) with amber accent
  (#ffb000) for warnings/highlights, dim green (#0d2b12) for chrome/borders. One monospace face
  (system stack: "IBM Plex Mono" fallback to ui-monospace/Menlo/Consolas — loaded once, no
  external font risk) for everything: it's a terminal, not a mixed-type editorial design.
- Motion: boot sequence (skippable with any key/tap), cursor blink, per-character type-out for
  shell responses, subtle scanline roll and flicker via the shader. `prefers-reduced-motion`:
  boot is skipped straight to prompt, output prints instantly, no flicker/roll, CRT curvature and
  scanline mask stay (static, no animation) for the aesthetic without motion.
- No WebGL available or context creation fails → CSS-only CRT (scanline gradient, radial vignette,
  subtle text-shadow glow) fallback; content and shell logic are DOM-native throughout, so nothing
  is gated behind the shader.

## Stack & deps
- Zero build step: plain static HTML/CSS/JS (no framework, no bundler). This IS a "static site"
  per the brief; ponytail says don't add Astro/Vite ceremony for ~3 files.
  → skipped: Astro/TS build pipeline, add if the shell logic outgrows one file.
- WebGL: hand-written ~120-line fragment shader (no three.js/ogl) — the effect is a single
  full-screen quad post-processing a 2D canvas text buffer, a library would be pure overhead.
- Content: `data.js`, plain JS objects for EN/ES copy, case studies, experience, recommendations,
  stats — copied/restructured from `_context/*.ts` into vanilla JS.
- Fonts: system monospace stack, no webfont download (perf + zero external requests).
- `dist/` = the source tree itself (already static); no copy step needed beyond dropping any
  dev-only files (there are none).

## Bilingual
`lang es` / `lang en` shell commands and a persistent `EN/ES` toggle button switch a single
`data.js` locale key; the shell reprints the current context (or prompt) in the new language.
No routing/hash needed: it's one page, one running shell instance, state kept in JS.
