# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Scope: this is the portfolio design bake-off workspace, NOT the real site. Read `README.md` (map, URLs,
commands), then `BRIEF.md` (spec) and `POLISH-QUEUE.md` (later requirements; they override the brief).

## Hard rules
- Never edit, commit or push `~/repos/mihailmariusiondev.github.io`; no git/branch/worktree here. No global installs.
- Work only inside your own `cN-*/` dir. `_base/`, `_shared/`, `_tools/` are read-only for concept agents.
- Content is fixed: every fact/number must exist in `src/data/*.ts`. Audited wording: remote or hybrid from
  Zaragoza, occasional travel, EU citizen, NO relocation; "LLM context payload" 570 KB -> 22 KB (96%).
- Previews on 0.0.0.0:4401-4416 are kept alive by `run/keepalive.sh` and are what Marius views over
  Tailscale (100.89.140.14). Don't kill them; use 127.0.0.1:45NN for your own QA preview.

## Commands (inside a concept dir)
- `npm run build` runs `astro check && astro build` (type errors fail the build); must yield 19 pages.
- `python3 ../_tools/linkcheck.py dist` checks internal links and #fragments; must print 0 broken.
- `../_tools/lh.sh <url> <out.json>` local Lighthouse (mobile). Scores are unreliable while other agents
  run; the comparable run is `_tools/sweep.sh` from the root with nothing else busy.
- Headless browser: `export AGENT_BROWSER_CONFIG=$PWD/../_tools/agent-browser.json AGENT_BROWSER_HEADED=false`
  (the user config is headed and fails without a display); own session name, never `close --all`.
  Fallback: puppeteer-core in `_tools/node_modules` with `/usr/bin/google-chrome`.
- Before `npm install` in a concept: `rm -rf node_modules && cp -r ../_base/node_modules node_modules`
  (node_modules is hard-linked to the base).

## Architecture of each concept (Astro 4, static, from `_base`)
- Content lives in `src/data/` (`ui.ts`, `experience.ts`, `caseStudies.ts`) as `Localized<T>` values
  `{ en, es }`; `src/i18n.ts` resolves them. New UI strings must be added in both languages.
- Routes are thin: `src/pages/**` (EN at `/`, ES mirror under `/es/`) only pass `lang` to the real page
  components in `src/components/pages/*Page.astro`; case studies come from `case-studies/[slug].astro`.
  The language switch must land on the same page in the other language.
- `src/layouts/Layout.astro` owns all SEO (title, canonical, hreflang en/es/x-default, OG/Twitter, Person
  JSON-LD); `public/` holds `robots.txt`, `sitemap.xml` (18 URLs), `me.webp` and the two CV PDFs.
- Styling is one `src/styles/global.css` plus scoped component styles; concepts add JS only as tiny
  islands (exceptions: c5 three.js, c16 gsap).
