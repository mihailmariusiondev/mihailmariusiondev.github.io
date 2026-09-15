# DESIGN.md — s07 conversation

**One line:** A scripted conversational portfolio — a recruiter asks, a clearly labelled
scripted stand-in answers from the verified CV, no LLM, no network — opening straight into
a real exchange instead of an empty chatbox.

## Why it's wow
- The first viewport is no longer an empty log waiting for a click: a hero strip states the
  honest premise ("Not a live AI — a scripted stand-in") with a one-line nod to the real
  time voice assistant he actually shipped, four animated metric tiles (96% context cut,
  Top 1.42%, 34 WCAG findings, 21 of 53 rules retired), then an already-playing Q&A
  ("So, who are you?" → his intro) — so a recruiter sees substance before they type anything.
- Every subsequent answer can carry stat grids, a collapsible case-study card (context, role,
  decisions, outcome), a career timeline, or colleague quotes — same scripted-answer engine,
  richer payloads.
- The "no LLM" framing is turned into a feature, not an apology: it's the kicker line, and the
  copy explicitly distinguishes this scripted UI from the real conversational assistant he
  built in production.

## Art direction
Dark ink background (`#0b0d10`), warm amber accent (`#ffb454`) on a cream message ink, Space
Grotesk for display type, JetBrains Mono for labels/metadata — a "terminal briefing" feel that
reads as engineering-credible rather than templated-chatbot. Rounded speech-bubble shapes for
the conversation, terminal-style `//` kicker for the hero, dashed rules to separate the honesty
framing from the live exchange.

## Interaction model
- Suggested chips + free-text input, both routed through the same deterministic keyword-scored
  intent matcher (`src/intent.ts`) — substring scoring against EN/ES keyword lists, no LLM, no
  network call, ~16 intents.
- "Show everything" flips to a single scrollable reading view with every scripted answer and
  card, for screen readers, search, or anyone who'd rather scroll than chat.
- EN/ES toggle re-renders the whole shell and restarts the scripted opener in the new language;
  `lang` persists in `localStorage` and updates `<html lang>`.
- `prefers-reduced-motion`: typing effect and animated number count-ups are skipped, values and
  full lines render immediately; message/card rise animations are removed.

## Stack and dependencies
Vite + TypeScript, no framework (`package.json`). Only two runtime dependencies, both
self-hosted fonts: `@fontsource/space-grotesk` (~87 KB across subset files, only latin/latin-ext
used) and `@fontsource/jetbrains-mono` (~90 KB, same). Everything else — DOM building, the intent
matcher, the typing/count-up animation — is plain TypeScript in `src/main.ts`, `src/data.ts`,
`src/intent.ts`, `src/style.css`. `dist/` total is under 700 KB including both CV PDFs and the
portrait; the JS bundle is ~37 KB (~13 KB gzip).

## Known limitations
- No automated axe/Lighthouse a11y audit was run against this build; the footer only states
  behaviors that were actually verified by hand (focus rings, live-region announcements,
  reduced-motion fallback), not a WCAG conformance level.
- Typing/count-up animation is `requestAnimationFrame`-based, not timed to real per-character
  speech; it's a stylistic reveal, not a claim of realism.
