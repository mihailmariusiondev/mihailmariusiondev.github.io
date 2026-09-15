# NOTES: s07 conversation

Base version was shipped by a previous agent (stopped mid-QA) and orchestrator notes were left
in place; this pass finished the concept per orchestrator findings.

## Idea
A scripted conversational portfolio: the recruiter asks, a clearly labelled "scripted stand-in"
answers from the verified CV (no LLM, no network). Suggested chips + free-text box routed
through a keyword intent matcher, a "Show everything" reading view, EN/ES toggle. Full details
in `DESIGN.md`.

## What changed this pass
1. **First viewport wow (orchestrator finding #2).** Added a hero strip above the chat: honest
   "not a live AI" kicker, one line nodding to the real production voice/text shopping
   assistant without implying this page is live AI, and four animated metric tiles. The chat log
   now auto-plays an orchestrated first exchange ("So, who are you?" → his intro answer) instead
   of sitting empty until a click.
2. **Footer claim (orchestrator finding #3).** Removed the unverified "This site targets WCAG
   2.1 AA" line — no formal audit of this build was run, so that line could not be verified. It
   now describes only behaviors actually checked below: visible focus states, live-region
   announcements, reduced-motion fallback.
3. Fixed a stale `aria-pressed="false"` on the reading-view toggle button that never reflected
   the real state; it now tracks `reading`.
4. Re-checked all copy in `src/data.ts` against `RETRACTED.md`: no retracted strings, no
   years-of-experience counts.

## Skill ledger
- `accessibility` — reference for focus-visible, aria-live, reduced-motion, keyboard checks below.
- `impeccable` / `frontend-design` — used for the hero/first-viewport rework and typography pairing.
- `animate` — reference for the count-up/typing reveal already in place, gated on reduced motion.
- Puppeteer-core (per orchestrator QA tooling), not Agent Browser (per instructions for this task).

## Stack
Vite + TypeScript (no framework). Fonts: `@fontsource/space-grotesk`, `@fontsource/jetbrains-mono`
(self-hosted). Source: `src/data.ts` (facts), `src/intent.ts` (intent matching), `src/main.ts`
(UI), `src/style.css`. Rebuilt `dist/` = ~37 KB JS (~13 KB gzip), ~33 KB CSS, plus fonts/CV
PDFs/portrait, all under 700 KB total.

## QA evidence (this pass, puppeteer-core headless, /usr/bin/google-chrome)
- `npm run build` (tsc + vite build): clean, no TS errors.
- `node _tools/firstview.cjs http://localhost:4507/ qa/first`: console clean, `qa/first-desktop.png`
  (1440×900) and `qa/first-mobile.png` (390×844) show the new hero + auto-played first exchange.
- Reduced motion (`prefers-reduced-motion: reduce` emulated): `qa/reduced-motion.png` — typing
  and count-up skipped, full text renders immediately, verified visually.
- ES toggle: `<html lang>` flips to `es`, `qa/es.png` captured; content re-renders in Spanish.
- Reading view in ES: `qa/reading-es.png` — every scripted answer, stat grid, case card,
  timeline and quote block all present on one scrollable page.
- Free-text fallback: nonsense query → `.msg-fallback` shown (no crash, no fabricated answer).
- Free-text intent match: "tell me about the shopping assistant" → matched the shopping-assistant
  intent and rendered its case-study card.
- Keyboard: `Tab` from page load lands on the first header button (`.pill-btn`), confirming a
  sane, visible tab order into interactive controls.
- `grep` over `dist/assets/*.js` and `dist/index.html` for every RETRACTED.md phrase (catalog of
  backend tools, "replaced legacy guides", "Mateo", "international agricultural client") and for
  the removed WCAG claim: zero hits.
- Console errors across all of the above: zero.

## Screenshots (in `qa/`)
- `first-desktop.png`, `first-mobile.png` — first viewport, EN, default motion.
- `reduced-motion.png` — first viewport with reduced motion.
- `es.png` — chat view in Spanish.
- `reading-es.png` — full "Show everything" reading view in Spanish.

## Honest self-score
- **Wow: 7/10.** The first viewport now shows real content and a real exchange immediately,
  which was the main gap. It's still a text-forward, single-column layout with no WebGL/3D/motion
  spectacle — deliberately, since the concept's credibility rests on looking like a plain,
  auditable transcript rather than a flashy AI demo.
- **Polish: 8/10.** Bilingual, keyboard-usable, reduced-motion-safe, zero console errors, fast
  (small bundle, self-hosted fonts), copy re-verified against the retraction list.
- **Known limitations:** no automated axe/Lighthouse run in this pass (see `DESIGN.md`); the
  typing/count-up reveal is a stylistic choice, not a literal speech-timing simulation.
