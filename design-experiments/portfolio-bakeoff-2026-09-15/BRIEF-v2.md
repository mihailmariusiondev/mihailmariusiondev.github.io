# Bake-off v2: 16 portfolios FROM SCRATCH (overrides BRIEF.md)

Marius rejected v1: every concept was a copy of his current site with a new skin. v2 is the opposite.
Take the full context of his CV and build a brand-new website from an empty folder, with total creative
freedom. The single goal: a recruiter or engineering lead opens it and thinks "WOW, this person builds
exceptional interfaces". Every one of the 16 must be as wow as possible, and different from the others.

## Context (read ALL of it before designing): `/tmp/portfolio-design-bakeoff-20260914/_context/`
- `RETRACTED.md` overrides everything (claims being removed from the CV).
- START with `DOSSIER.md` and `facts.json`: the researched, source-tagged fact base (story material, all
  showable numbers, do-not-claim list). If they conflict with the files below, the files below win.
- `cv-en.txt`, `cv-es.txt` — the CV (text of the two PDFs). `experience.ts`, `caseStudies.ts`, `ui.ts` —
  all facts, outcomes, case studies, recommendations, contact, in EN and ES. `PRODUCT.md` — who he is and
  who the site is for. `assets/` — `me.webp` (his only photo), both CV PDFs, favicon.
- You may import/copy these data files into your project and restructure them however you like.

## Total freedom
- Start from an EMPTY directory. Do NOT open, copy or imitate `_base/src`, `cN-*` (v1) components, CSS,
  layout, page structure, navigation or copywriting. Invent your own information architecture, sections,
  routes, navigation, copy (rewritten in your own voice from the facts), interaction model and art direction.
- Any stack that builds to static files for GitHub Pages. Astro 4 is ready to go
  (`cp -r ../../_base/node_modules node_modules` gives you astro + typescript); you may also `npm install`
  locally whatever the idea needs (three, gsap, lenis, motion, d3, matter-js, ogl, fonts...). Record why.
- Go big: WebGL/shaders, 3D, physics, generative art, scroll cinema, sound (opt-in), games, spatial UI,
  bold typography, custom cursors, page transitions. Real craft and polish over gimmicks.

## The only non-negotiables
1. Truth: every fact, number, title, employer, date and technology must come from `_context`. Never invent
   metrics, clients, logos, testimonials, titles ("Tech Lead"), years-of-experience counts or availability.
   Audited wording: remote or hybrid from Zaragoza, available for occasional travel, EU citizen authorized
   across the EU/EEA, NO relocation; "LLM context payload" 570 KB -> 22 KB per execution (96%). The shopping
   assistant was a controlled pilot, never public. RETRACTED (never use, even if an old file says it):
   "catalog of backend tools", "Help Center replaced legacy guides in production", the internal name
   "Mateo", "international agricultural client". Backed and fine: OTP / hasPassword, Juan Pablo's quote. Illustrations must look illustrative, not like real dashboards.
2. Bilingual EN + ES (all content available in both; your own routing/toggle). Both CV PDFs, email
   (mihailmariusion@gmail.com), LinkedIn (https://linkedin.com/in/mariusdev) and GitHub
   (https://github.com/mihailmariusiondev) reachable from anywhere. All four case studies fully readable.
3. Works on a phone (390px) and desktop, keyboard usable, `prefers-reduced-motion` gives a calm version,
   content readable if WebGL is unavailable, zero console errors. Title/description/OG/lang set.
   Heavy stuff lazy-loaded; aim for a fast first paint, but wow beats a perfect Lighthouse score.
4. Stay inside your own directory. Never touch `/home/mihai-usl/repos/**` (reading the skills pool is
   fine), `_base`, `_context` (read-only), `_tools`, or others' dirs. No git, no global installs, no daemons.

## Skills (pool: `/home/mihai-usl/repos/marius/skills/<name>/SKILL.md`) — use every one that helps
Read the SKILL.md (and references) of at least: frontend-design, impeccable (reference/new-work.md,
craft-floor.md, overdrive.md, animate.md, delight.md, typeset.md, layout.md, colorize.md),
design-taste-frontend, high-end-visual-design, emil-design-eng, animate, find-animation-opportunities,
improve-animations, review-animations, gsap (if you animate with GSAP), frontend-app-builder,
imagegen-frontend-web (no image tool exists: apply as method), prototype, astro-best-practices,
accessibility, performance, frontend-testing-debugging, web-design-guidelines. Keep a skill ledger.

## QA (yours; bounded)
- Your QA preview: `127.0.0.1:45NN` (NN = your number). Stop it at the end. Never kill other processes.
- Headless browser: `export AGENT_BROWSER_CONFIG=/tmp/portfolio-design-bakeoff-20260914/_tools/agent-browser.json
  AGENT_BROWSER_HEADED=false`, session `v2-sNN` (close at end, never `close --all`); fallback puppeteer-core in
  `../../_tools/node_modules` with `/usr/bin/google-chrome`. `timeout 120` on every command.
- Screenshots in `qa/`: first viewport desktop 1440x900 and mobile 390x844, plus key sections, ES, reduced
  motion. LOOK at them; if it isn't wow, iterate. Console must be empty. `../../_tools/lh.sh` once (the
  machine is shared, scores are noisy).
- Build output must be in `dist/` (static). The orchestrator serves `dist/` on 0.0.0.0:44(20+NN).

## Deliverables in your dir
Working site + `dist/`; `DESIGN.md` (the idea in one line, why it's wow, art direction, stack and deps
with bytes); `NOTES.md` (skill ledger, QA evidence, screenshots list, honest self-score for wow and polish,
known limitations). Write both early and update them, so they exist even if you are stopped.

## Orchestrator rules learned (apply to every agent)
- Shell cwd resets to Marius's real repo after each command: begin every command with
  `cd /tmp/portfolio-design-bakeoff-20260914/v2/<your-dir> &&` and use absolute output paths.
- No years-of-experience counts ("nine years of…"). Use "since 2018" / "Angular since 2021".
- Ship a complete dist/ early (index.html plus all its CSS/JS/assets), then iterate.
- Never ship comments or strings that name the retracted claims (not even 'omitted: ...'); public JS/HTML is readable.
