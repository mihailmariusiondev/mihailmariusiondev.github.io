# DESIGN.md — Strata OS

**One line:** Marius's portfolio is a small, invented desktop operating system called Strata OS —
boot sequence, dock, draggable/resizable windows, a command palette — where each section of his
career is an app instead of a page.

## Why it's wow
- Not a scroll page with a skin: it's a *system*. You boot it, open apps, drag windows, press
  `Ctrl/Cmd+K` for a command palette that jumps anywhere or copies the email instantly.
- The metaphor is load-bearing, not cosmetic: case studies are `Documents`, the career is a
  `Timeline` app, recommendations are a `Messages` thread, the CV is a real file you open and
  download, contact is a `Mail` compose window.
- On mobile it becomes a real phone home screen (springboard grid + bottom dock + full-screen
  apps with a back button), not a squeezed desktop.
- A hidden-in-plain-sight "Reader" toggle collapses the whole OS into one calm, linear document —
  the plain-reading path, one tap away, same content, zero chrome.

## Art direction
- **Concept:** "Strata" = layered domains (e-commerce, banking, education) stacked like geological
  strata / like overlapping windows. Instrument-panel personality: precise, calm, a little
  mechanical — not a macOS/Windows skin, not glossy, not neon-cyberpunk.
- **Palette:** graphite base `#15171B` → `#1B1E24`, window surface `#20242B`, hairline
  `#343A44`, primary text `#ECEDEF`, secondary text `#A6ACB8` (blue-tinted, never flat gray),
  system accent **amber** `#E8A33D` (a warm instrument-light color — deliberately not the
  Claude/AI-tell terracotta `#D97757`, not generic green/violet), status-ok `#6FCF97`,
  status-danger `#E2645B`.
- **Type:** `JetBrains Mono` for OS chrome (titlebars, dock labels, status bar, command palette —
  earns the monospace because the subject really is a technical OS), `Inter` for app content
  (readable prose in the windows). Two families, clearly distinct roles.
- **Icons:** one custom SVG sprite, single-weight line icons, no emoji, no unicode glyphs.
- **Motion:** one authored boot sequence on first load; window open/close/focus/drag/resize as the
  only other motion, all tied to a user action. `prefers-reduced-motion` removes the boot
  animation and all easing (instant state changes, functionality unchanged).
- **Sound:** opt-in only, off by default. A toggle in the status bar enables tiny synthesized
  click/open blips (Web Audio oscillator, no audio files).

## Stack & deps
- Hand-authored static HTML + CSS + vanilla JS (ES modules). **No framework, no bundler.**
  `dist/` is the literal source — nothing to build. This is a deliberate ladder call: a
  single-page interactive shell doesn't need Astro/Vite/React to compile; native browser
  primitives (Pointer Events for drag/resize, `<dialog>`-free custom windows, CSS for layout)
  cover everything the brief asks for.
- Fonts: `JetBrains Mono` + `Inter` via Google Fonts `<link>` (real webfont files, not a system
  fallback), ~40–60 KB woff2 total, `font-display: swap`, preconnected.
- Assets copied from `_context/assets`: `me.webp` (photo), both CV PDFs, `favicon.svg`.
- Zero npm dependencies. `ponytail: no bundler because there's nothing to bundle — revisit only
  if the JS grows past one file and needs real module splitting.`

## Build status
Completed by a follow-up pass: `dist/styles.css` (17 KB) and `dist/app.js` (16.7 KB) were written
to back the HTML shell (previously referenced but missing, so the live site rendered unstyled).
`dist/` is now a complete, self-contained static site — index.html + styles.css + app.js + assets,
zero build step, zero npm dependencies. Total `dist/` size ~280 KB (dominated by the two CV PDFs
and the photo; the HTML/CSS/JS shell itself is ~88 KB uncompressed).

## Content model (truth)
All copy is written from `_context/facts.json` / `DOSSIER.md`, honoring every 2026-09-14
retraction: no "catalog of backend tools", no "replaced legacy guides in production", no
"Mateo", no "international agricultural client". The AI shopping assistant is described only as
a controlled, whitelisted pilot, never public. Every number shown is on the cleared list.
