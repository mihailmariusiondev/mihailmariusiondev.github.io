# Portfolio design bake-off: shared brief (v3, 16 concepts)

Owner: Marius Mihail Ion (Senior Angular / Frontend Engineer, Zaragoza).
Base: `/tmp/portfolio-design-bakeoff-20260914/_base`, a copy of the live Astro 4 site with the
audited copy fixes already applied. Each concept `cN-*` is a sibling directory and a complete Astro
site. Product truth: `_shared/PRODUCT.md`.

## Hard boundaries

- Work ONLY inside your own concept directory. Never touch `/home/mihai-usl/repos/**` (read-only
  reads of the skills pool are fine), `_base`, `_shared`, `_tools` or another concept. No git init,
  branch, worktree, commit or push.
- No global installs, daemons, MCP servers, auth or persistent state. `npm install <pkg>` inside
  your concept only when the concept genuinely needs it; record why and the bytes it adds. Your
  node_modules is HARD-LINKED to the base: before any `npm install` run
  `rm -rf node_modules && cp -r ../_base/node_modules node_modules`.
- Fonts: Google Fonts CSS or self-hosted woff2 in `public/` are fine. No other network services, no
  stock photos (picsum/unsplash are banned here: this is a personal portfolio, invented imagery
  would be a fake claim). The only photo is `public/me.webp` (Marius's portrait).

## Content contract (non-negotiable)

- Keep ALL substantive content from `src/data/*.ts` in EN and ES: ui strings, experience rows,
  recommendations (full quotes, author, role, note), stats, the four case studies with every field,
  about paragraphs, contact links, accessibility statement. You may restructure and add UI strings
  (as `Localized<string>` in `src/data/ui.ts`, both languages), never delete facts.
- Keep `Localized<T>` + `astro check`, `/` = EN, `/es/` = ES, and a language switch that lands on
  the SAME page in the other language. All 19 routes at the same URLs (5 pages x 2, 4 cases x 2,
  404). Both CV PDFs, email, LinkedIn and GitHub reachable within one click from every page.
- Audited facts, keep exactly: remote or hybrid from Zaragoza, available for occasional travel, EU
  citizen authorized across the EU/EEA without sponsorship, NO relocation. Metric wording is
  "LLM context payload" 570 KB to 22 KB per execution (96%), never "tool payloads", never cost.
- Never invent or strengthen: no new technologies, metrics, titles, clients, logos, testimonials,
  availability dates, "Tech Lead", "sole owner", "built from scratch", global WCAG compliance,
  years-of-experience counts, fake dashboards, fake code from client projects. Every visible number
  must already exist in the data. Illustrative diagrams must be labelled/obviously illustrative and
  use only technologies present in the data. The assistant was a controlled pilot, never public.
- Presentation-only edits are fine: e.g. show date ranges with a hyphen or "to" instead of an en
  dash (design-taste bans em/en dashes as separators), shorten chrome, reorder.

## Quality contract

- Recruiter scan in 6-10 s above the fold on desktop AND mobile: name, Angular/frontend identity,
  2-3 strongest outcomes, CV + contact CTA.
- Semantic HTML, one h1 per page, logical headings, landmarks, skip link, visible focus, full
  keyboard operation, AA contrast (verify pairs numerically), targets >= 44px on touch, and
  `prefers-reduced-motion` honoured (gentler, not broken; content fully visible without JS).
- SEO: keep Layout's title/description/canonical/hreflang (en, es, x-default)/OG/Twitter/Person
  JSON-LD, `public/robots.txt`, `public/sitemap.xml` (18 indexable URLs), 404 noindex.
- Responsive 320-1920px, no horizontal scroll, nothing hidden under fixed UI. Light and dark (or a
  deliberate single theme justified in DESIGN.md).
- Performance: static output, minimal JS, lazy anything heavy, no CLS from fonts/images. Targets on
  local Lighthouse mobile: perf >= 90 (WebGL/GSAP concepts: >= 85 with the reason), a11y 100,
  best-practices >= 95, SEO 100 on indexable pages.

## Ambition bar (direct from Marius)

Recruiters must think "wow, this is gorgeous and this engineer clearly builds exceptional
interfaces". Not a recolour, not a corporate template. One memorable visual idea per concept that
lands in the first 3 seconds on desktop and mobile, executed with polish: orchestrated entrance,
microinteractions on every control, page/state transitions, scroll storytelling or spatial depth
where it fits. If your first build reads generic, throw it away and rebuild, and say so.

## Mandatory skill workflow (skills pool: `/home/mihai-usl/repos/marius/skills/<name>/SKILL.md`)

Use the Skill tool when a skill is listed for you; otherwise read its SKILL.md (and the references
it points to) from the pool. Record a "Skill ledger" in NOTES.md: skill, what you did with it,
what changed because of it. Where skills conflict, precedence is: this brief > impeccable >
frontend-design > design-taste-frontend > high-end-visual-design (its mandatory eyebrow pills and
double-bezel-everything are NOT required here) > redesign-existing-projects.

1. Context and direction
   - impeccable: from your concept root run
     `/home/mihai-usl/repos/marius/skills/impeccable/scripts/impeccable context`; copy
     `../_shared/PRODUCT.md` to your root (init answered by the orchestrator as structured simulated
     user from the approved brief). This is a redesign/replacement visual world: read
     `reference/new-work.md`, `reference/shape.md`, then write `DESIGN.md` in your root. Read
     `reference/craft-floor.md` immediately before your first UI edit.
   - frontend-design: two-pass token plan (palette hex, type, layout ASCII, principles), review
     against the brief, revise.
   - design-taste-frontend: one-line Design Read, the three dials, and at the end its Pre-Flight
     check (adapted: this is Astro + native CSS, not React/Tailwind; no icon library is installed,
     so prefer text labels, and any inline SVG must be minimal and justified).
   - frontend-app-builder + imagegen-frontend-web: NO image-generation tool exists in this session.
     Apply them as method: write a per-section concept spec in DESIGN.md (composition anchor,
     background mode, type scale, CTA style, motion cue, ASCII frame) as the accepted concept, then
     keep a fidelity ledger (>= 5 comparison points) between that spec and your screenshots.
   - high-end-visual-design, redesign-existing-projects: use as anti-generic checklists.
2. Build
   - astro-best-practices (static first, tiny islands, scoped CSS); docs-lookup for any
     version-sensitive Astro 4 API (e.g. View Transitions).
   - animate + emil-design-eng for every animation (gate, purpose, tool, curve from their tables,
     reduced motion, hover gating). gsap only if your concept is assigned it.
   - impeccable references for your concept: `animate.md` always; `overdrive.md` if assigned;
     `typeset.md`/`layout.md`/`colorize.md`/`delight.md` as needed.
3. Verify and refine (bounded: build, one batched desktop+mobile inspection, fix all, confirm)
   - frontend-testing-debugging: Browser plugin is NOT available; use `agent-browser` (headless,
     see QA) and state that fallback. Use its QA report shape in NOTES.md.
   - review-animations: self-review your motion; include its Before/After/Why table and verdict.
   - impeccable `critique.md`, `audit.md`, `polish.md`; then run once
     `/home/mihai-usl/repos/marius/skills/impeccable/scripts/impeccable detect --json src` and fix
     real findings.
   - web-design-guidelines: WebFetch
     https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md and
     review your changed files; fix findings.
   - accessibility, seo, performance, core-web-vitals, best-practices, web-quality-audit,
     pagespeed-insights: run local Lighthouse (below) on `/`, `/es/` and one case study; fix
     failures; report the table in web-quality-audit format (evidence, not promises).

## QA commands

```bash
export AGENT_BROWSER_CONFIG=/tmp/portfolio-design-bakeoff-20260914/_tools/agent-browser.json
export AGENT_BROWSER_HEADED=false          # the user config is headed; this forces headless
S=bakeoff-cN                               # your own session only; never `close --all`
npm run build                              # astro check must report 0 errors
python3 ../_tools/linkcheck.py dist        # must print 0 broken
npx astro preview --host 127.0.0.1 --port 44NN &   # your port; stop it at the end
agent-browser --session $S open http://127.0.0.1:44NN/ ; agent-browser --session $S set viewport 1440 900
agent-browser --session $S screenshot qa/home-desktop.png ; agent-browser --session $S console ; agent-browser --session $S errors
agent-browser --session $S set viewport 390 844   # mobile; also: set media dark / set media light reduced-motion
../_tools/lh.sh http://127.0.0.1:44NN/ qa/lh-home.json
```

Screenshots into `<concept>/qa/`: desktop 1440x900 and mobile 390x844 of `/`, `/es/`, one case
study, experience, contact; plus reduced-motion and dark mode of `/`. LOOK at them. Tab through
home (skip link, nav, CTAs). Check the language switch round-trips on a case page. Console and
page errors must be empty. When done: stop your preview and `agent-browser --session $S close`.

## Ports and sessions

cN previews on 44NN (c1=4401 ... c16=4416), session `bakeoff-cN`. The orchestrator serves all
concepts on 0.0.0.0 afterwards; root-relative links are fine (each concept owns its port root).

## Deliverable: `<concept>/NOTES.md` (compact)

Concept name + thesis; Design Read + dials; token plan; per-section concept spec summary; what you
threw away or changed after self-review; Skill ledger; dependencies added (or none) with bytes;
build + linkcheck result; Lighthouse table; QA report (console, keyboard, reduced motion, dark,
language switch, contrast pairs); review-animations table + verdict; impeccable detect result;
web-design-guidelines findings fixed; fidelity ledger; honest self-score (1-10) for "wow in 3 s"
and polish; screenshot list; known limitations.
