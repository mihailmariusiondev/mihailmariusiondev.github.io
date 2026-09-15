# DESIGN.md — s14-stories-app

## One line
A native-feeling stories app for a frontend engineer's career: tap through full-screen
story slides (intro, four case studies, verified-results reel), swipe a role deck like
a card game, and switch to a contact screen — with a phone-in-scene desktop
presentation instead of a stretched mobile page.

## Why it's wow
Recruiters skim; this makes skimming the interaction itself. Each case study is a
sequence of Instagram/TikTok-style story slides with segmented progress bars, manual
controls and keyboard navigation. The
role history is a physically draggable card deck with spring-back. On desktop the app
renders inside a floating phone frame in an ambient scene, with a side panel surfacing
quick stats and the language toggle — so desktop guests get a considered composition,
not a giant phone screenshot.

## Art direction
- Palette: near-black app chrome (#0b0c10) with each story getting its own accent wash
  (assistant = amber/coral, help center = teal, passwordless = violet, engineering
  controls = cyan, intro/impact = warm neutral) so the ring nav reads like distinct
  "channels" at a glance.
- Type: a tight system-ui/Inter-style stack for body copy (fast, no webfont weight),
  a bold condensed display cut (clamp'd) for slide headlines and stat numbers.
- Motion: a short ease-out slide transition and a draggable card deck using pointer
  events with a CSS return. Stories never auto-advance: tapping, controls and arrow
  keys own progression, including for reduced-motion users.
- Illustration: no fake dashboards — abstract shapes only (payload-shrink bars,
  route dots, gauge rings) built in CSS/SVG, matching the "illustrative, not real
  screenshots" rule.

## Stack & deps
- Plain HTML + CSS + vanilla JS. No framework, no bundler: this is a single static
  page whose entire "content model" is one bilingual JS data object, which is exactly
  what a stories app needs (render slides from data) — reaching for Astro/React here
  would add a build step to move JSON into HTML, so the site skips it. 0 KB of
  third-party JS.
- Fonts: system font stack (no webfont download, avoids FOUT/layout shift and a
  network request for a one-page interactive app).
- Bytes: `js/data.js` ~9 KB, `js/app.js` ~13 KB, `css/style.css` ~11 KB, `me.webp`
  36 KB, two CV PDFs ~65 KB each (lazy: only fetched on click). No images beyond the
  portrait; no external requests at all.

## Information architecture
Three bottom-tab "screens" inside one persistent app shell:
1. **Stories** — a horizontal ring rail (Intro · 4 case studies · Impact) opening a
   full-screen story viewer with segmented per-slide progress, tap-zones, swipe,
   hold-to-pause, keyboard control.
2. **Roles** — a swipeable card deck of the 9-role timeline, oldest-aware ordering,
   drag or arrow keys, dot pager.
3. **Connect** — a bottom sheet with email/LinkedIn/GitHub, both CV PDFs, and the two
   recommendation quotes.
A persistent header carries the name, role and EN/ES toggle from anywhere. On desktop,
three verified proof points plus contact and both CVs sit beside the phone frame.

## Bilingual
Single HTML page; `data.js` holds every string as `{en, es}`. Toggling language
re-renders text content in place (no navigation, no duplicated markup), matching
"same-page language switch." `<html lang>` and `<title>` update on toggle.
