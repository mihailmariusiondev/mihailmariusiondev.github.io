# Dossier — Marius Mihail Ion, Senior Angular / Frontend Engineer

Compiled for 16 design agents building portfolio concepts from scratch. Every fact below is
tagged with its source. Where source 1 (the audited site data) and other sources overlap, source 1's
exact wording is the ceiling — never strengthen it. Read "Do not claim" and "Conflicts" before writing
any copy.

**Source key**
- `[S1]` = `/tmp/portfolio-design-bakeoff-20260914/_context/{cv-en.txt, cv-es.txt, experience.ts, caseStudies.ts, ui.ts, PRODUCT.md}` — authoritative, audited, already cleared for public use.
- `[S2]` = public GitHub API (`gh api users/mihailmariusiondev`, `.../repos`), read-only, 2026-09-14.
- `[S3]` = `/home/mihai-usl/repos/marius/data/knowledge/*.md` (professional-facts SSOT, CV policy, Decskill/Inditex case file). Richer background, NOT all cleared for public copy — use for texture/understanding, not verbatim public claims, unless it matches S1.
- `[S4]` = `/home/mihai-usl/repos/mihailmariusiondev.github.io/src/data/*.ts` and `README.md` — same content as S1 (this is the live site's data layer; identical to the copied context files).

---

## 1. Identity & contact

- Full name: **Marius Mihail Ion**. `[S1][S3]`
- Title: **Senior Angular / Frontend Engineer** (EN) / **Ingeniero Frontend Sénior (Angular)** (ES). `[S1]`
- Base: **Zaragoza, Spain**. `[S1][S2 location field]`
- Email: `mihailmariusion@gmail.com` `[S1]`
- Phone: `+34 662 439 252` `[S1]`
- LinkedIn: `linkedin.com/in/mariusdev` `[S1]`
- GitHub: `github.com/mihailmariusiondev` `[S1][S2]`
- Portfolio: `https://mihailmariusiondev.github.io` `[S1][S2 blog field]`
- GitHub public bio (verbatim, as of 2026-09-14): *"Senior Front-End Dev | Angular Specialist | Clean Code Advocate | Performance Optimizer | Team Player & Mentor | AI Tools Enthusiast"* `[S2]`
- GitHub account created 2021-09-07; 2 followers, following 1, **1 public repository** (the portfolio itself, `mihailmariusiondev.github.io`, Astro, 0 stars). `[S2]`

## 2. Work model — audited, exact wording required

- **Remote or hybrid from Zaragoza.** `[S1]`
- **Available for occasional travel.** `[S1]`
- **EU citizen: authorized to work across the EU/EEA without sponsorship.** `[S1]`
- **Permanent or B2B.** `[S1]`
- **No relocation claims.** `[S1 PRODUCT.md]` — never imply willingness to relocate internationally.

## 3. Professional summary (canonical, EN — verbatim from CV)

> Senior Frontend Engineer with software experience since 2018, specialized in Angular and TypeScript
> since 2021. I have built products for global e-commerce (Zara Home), banking (Santander) and online
> education (UNIR). My work covers frontend architecture, performance, accessibility, testing, APIs
> and AI integrations. My full-stack .NET/C# background (2018–2020) helps when designing
> authentication and API contracts. `[S1 cv-en.txt]`

ES (verbatim, mirror of the above):

> Ingeniero Frontend Sénior con experiencia en software desde 2018 y especializado en Angular y
> TypeScript desde 2021. He desarrollado productos para comercio electrónico global (Zara Home), banca
> (Santander) y educación en línea (UNIR). Trabajo en arquitectura frontend, rendimiento,
> accesibilidad, testing e integraciones con API e IA. Mi base full stack en .NET/C# (2018–2020) aporta
> contexto al diseñar autenticación y contratos de API. `[S1 cv-es.txt]`

Site hero copy (already localized, usable verbatim): `[S1 ui.ts]`
- `heroTitle`: "Enterprise frontend for e-commerce, banking and education." / "Frontend corporativo para comercio electrónico, banca y educación."
- `heroLede`: "Software developer since 2018, specialized in Angular since 2021. I work on
  authentication, SSR, accessibility, performance and API integration: the points where frontend
  decisions carry product risk." / (ES mirror, see ui.ts)
- `heroLocation`: "Based in Zaragoza, Spain · EU citizen · Remote or hybrid from Zaragoza · Available
  for occasional travel."

## 4. Roles (experience timeline) `[S1 experience.ts + cv-en.txt]`

| # | Period | Company | Client | Role | Location |
|---|---|---|---|---|---|
| 1 | May 2025 – July 2026 | Decskill Spain | Zara Home (Inditex) | Senior Front-End Analyst (Angular) | Zaragoza, Spain (100% remote per contract, `[S3]`) |
| 2 | March 2024 – May 2025 | Avanade | UNIR | Senior Front-End Analyst (Angular) | Remote, Spain |
| 3 | December 2022 – March 2024 | Vermont Solutions (Viewnext / IBM) | Santander | Senior Front-End Developer (Angular) | Madrid, Spain |
| 4 | October – December 2022 | CloudAPPi | Regional Government of Madrid | Mid-Level Front-End Developer (Angular, React) | Madrid, Spain |
| 5 | September 2021 – October 2022 | ENZO (Rent & Buy S.A.) | — [RETRACTED: "international agricultural client" — see §13] | Mid-Level Front-End Developer (Angular) | Madrid, Spain |
| 6 | June 2020 – September 2021 | Independent Projects & Upskilling | — | (career break: WordPress dev, Office automation, frontend upskilling) | — |
| 7 | March – June 2020 | Altran (Capgemini) | — | Mid-Level Full Stack Developer (.NET) | — |
| 8 | November 2018 – September 2019 | IO Digital (Query Software) | — | Mid-Level Full Stack Developer (.NET) | — |
| 9 | July – November 2018 | STRATESYS | — | Junior Full Stack Developer (.NET) | — |

Per-role bullets (verbatim from `cv-en.txt`, use these — do not invent new ones):

**Decskill · Zara Home**
- Built the Angular frontend of Zara Home's AI shopping assistant: real-time voice and text over
  WebRTC. [RETRACTED: "wired to a catalog of backend tools" — see §13.] Released to production
  behind a feature flag as a controlled pilot.
- Reduced LLM context payload from 570 KB to 22 KB per execution through routing and context
  stripping (96% reduction).
- Delivered a conversational Help Center, rolled out market by market with SSR-safe Angular
  integration, localized routes and accessibility preserved throughout the release. [RETRACTED:
  "that replaced legacy shopping guides in production" — see §13.]
- Audited a 19 MB JavaScript bundle and identified approximately 3.4 MB of removable weight. Shipped
  two PRs with dynamic imports for hls.js and html2canvas, lodash-es removal and a Luxon-to-native-Date
  migration.
- Delivered the account-area migration to passwordless (OTP) authentication: designed dual-path UX
  driven by `hasPassword`, with OTP flows for email change and password creation, validated end-to-end
  on the pre-integration environment across four documented scenarios.
- Closed 34 WCAG 2.1 AA findings from a formal accessibility audit: heading hierarchy site-wide,
  keyboard navigation, ARIA semantics and focus management.

**Avanade · UNIR**
- Acted as the hands-on frontend technical reference, guiding Angular architecture, component design
  and code-quality decisions across the team.
- Defined the core architecture: authentication flows, admin UI, centralized permissions and
  navigation.
- Worked within an Nx monorepo and refactored the Admissions module, removing circular dependencies
  and centralizing permissions logic.
- Introduced linting, formatting and unit testing to a back-office that had none, plus review
  protocols and quality gates.
- Mentored the team on Angular practices, ran SonarQube analysis sessions and received an Inspire
  Greatness award (August 2024).

**Vermont Solutions · Santander**
- Senior Angular reference across three concurrent banking applications, leading day-to-day delivery
  with the backend, design and Scrum teams.
- Led a team of 5 on an internal mobile banking app (employees managing their own transactions and
  cards), and was the senior technical reference for a team of 4 on Santander's internal real-estate
  portal.
- Built a transaction-monitoring dashboard with Chart.js (bar and donut charts) and gesture
  interactions with HammerJS. On one project, owned around 80% of the front-end implementation.
- Implemented Figma designs as Angular components on Santander's internal frontend platform: Flame
  design system, NgDarwin security/logging libraries, Storybook and Nexus for internal packages.
- Kept quality high with systematic unit testing (Karma, Jasmine) and static analysis (SonarQube,
  ESLint, Fortify).

**CloudAPPi**
- Built authentication flows and incremental improvements on Madrid Digital, a legacy Angular 8
  monolith (Angular Material, RxJS).
- Also contributed to a React project (ReactJS 17, Redux Toolkit, Material UI).

**ENZO (Rent & Buy S.A.)** [client description "international agricultural client" RETRACTED — see §13]
- Built reusable Angular components against a serverless AWS backend (Lambda, API Gateway, S3,
  CloudFront, SQS/SNS) and authentication flows with AWS Cognito.
- Onboarded new team members on architecture and Angular practices, and joined English-language
  client meetings and requirement gathering.

## 5. Case studies (sanitized, public-ready) `[S1 caseStudies.ts]`

### Real-time Shopping Assistant (`realtime-shopping-assistant`)
- Tags: Angular, TypeScript, WebRTC, OpenAI Realtime API, SSR, Accessibility.
- Summary: "A controlled whitelist pilot: a 96% smaller LLM context payload, SSR-compatible and never
  opened to the public."
- Context: global multi-market e-commerce frontend needed a conversational shopping experience with
  voice, text and product context.
- **My role**: "I implemented the Angular integration as a senior individual contributor. The wider
  product was a team effort, with a co-lead alongside me." (**never claim sole ownership**)
- Frontend problem: manage the WebRTC lifecycle, initialize only on request, stay SSR-safe, keep the
  model context bounded, avoid tracking before the assistant opened.
- Engineering decisions: lazy initialization, platform guards, a controlled feature flag, a routing
  and context-stripping design.
- Outcome: reached production as a controlled whitelist pilot, never opened publicly. LLM context
  payload fell from 570 KB to 22 KB per execution (96% reduction).
- Demonstrates: Angular integration, async lifecycle management, SSR safety, accessibility, controlled
  rollout, measurable context design.

### Help Center Rollout (`help-center-rollout`)
- Tags: Angular, SSR, Feature Flags, Observability, Accessibility.
- Summary: country-by-country rollout, SSR-safe Angular integration, stable routes, accessible
  localized experiences.
- Context: new conversational Help Center rolled out country by country without changing entry points.
  [RETRACTED: "had to replace legacy shopping guides" — see §13.]
- Delivery: integrated the conversational experience into existing Angular routes and localized entry
  points across markets.
- Rollout: expanded market by market, with SSR behavior, accessibility and route stability verified
  before each step.
- Outcome: rolled out country by country with stable routes, localized titles, accessibility and SSR
  support.
- Demonstrates: Angular delivery, SSR, accessibility, staged rollout, risk control across localized
  markets.

### Passwordless Account Migration (`passwordless-account-migration`)
- Tags: Angular, Authentication, API Contracts, OTP, NgRx, Integration Testing.
- Summary: contract-first passwordless migration, separate password/OTP paths, incremental scope,
  end-to-end validation.
- Context: account area had to support existing-password and passwordless users without disrupting
  established flows.
- Contract analysis: mapped UI dependencies and auth states before changing flows, scoped
  implementation to the verified contract.
- Decision: kept migration incremental, separated password-state handling from the rest of account
  experience.
- Implementation: separate password and OTP paths (email change, password creation), dependent actions
  gated by auth state.
- Validation: validated in a pre-integration environment (existing-password behavior, passwordless
  forms, OTP email change, password creation).
- Outcome: delivered incrementally without disrupting existing account behavior.
- Demonstrates: contract-first frontend integration, auth state, scope control, backward
  compatibility, risk-based decision-making.

### Engineering Controls for Frontend Delivery (`engineering-controls`)
- Tags: GitHub, Automated Review, Prompt and Context Engineering, MCP, Developer Tooling.
- Summary: an automated review system that measured its own noise, retired 21 of its 53 rules, and got
  adopted outside its origin team.
- Problem: automated review can look like coverage while producing noise and untrusted rules.
- System: a GitHub-connected review system with domain-specific checks, flagging injection,
  authorization and secrets-management defects before merge.
- Control loop: first version hurt credibility; measured output and removed ignored rules, retiring
  21 of 53.
- Adoption: a Teams CLI merged into a shared Inditex engineering repo; a documentation MCP adopted by
  the Android team.
- Demonstrates: the signal isn't "an LLM was present" — it's that the automation had boundaries,
  measurement, rejection criteria, and adoption outside its origin team.

## 6. Outcomes / metrics — exact wording, cleared for public use `[S1 experience.ts stats[]]`

| Value | Label (EN) |
|---|---|
| **96%** | Reduction in the AI shopping assistant's LLM context payload (570 KB to 22 KB per execution), achieved with a routing and context-stripping design. |
| **Top 1.42%** | Ranking among all candidates on an independent Angular assessment by SkillValue, with a 95% score. |
| **34** | Accessibility findings from a formal WCAG 2.1 AA audit closed through 23 merged pull requests: headings, keyboard, ARIA and focus. |
| **21 of 53** | Rules retired from his own automated review system after measuring its real output against what the team actually used. |
| **Adopted** | Internal documentation tooling (an MCP server) adopted by the Android team, outside its origin platform. |

**All numbers cleared for a public site** (design agents may display these, exactly): 96%, 22 KB, 570 KB,
top 1.42%, 95%, 34, 23, 21, 53, "Angular 8–20" (skill range), 2018 (career start), 2021 (Angular
start), May 2025–July 2026 / March 2024–May 2025 / Dec 2022–March 2024 / Oct–Dec 2022 / Sept
2021–Oct 2022 (role date ranges), 5 (team led at Santander), 4 (team senior-referenced at
Santander), 80% (frontend implementation ownership on one Santander project), 3.4 MB (bundle weight
identified as removable, "approximately"), 19 MB (audited bundle size), 34 WCAG findings / 23 PRs,
4 (documented OTP validation scenarios), August 2024 (Inspire Greatness award).

## 7. Skills / technology `[S1 cv-en.txt]`

- **Angular & TypeScript**: Angular 8–20, Signals, Standalone Components, SSR, lazy loading, RxJS,
  NgRx, Angular Material/CDK, feature flags.
- **Product Frontend**: JavaScript, HTML5, CSS/SCSS, React 17 (project experience), responsive
  design, design systems, WCAG 2.1 AA accessibility, i18n (Transloco), web performance.
- **Testing & Quality**: Jest, Karma/Jasmine, SonarQube/SonarCloud, ESLint, Prettier, systematic PR
  review.
- **APIs & Delivery**: REST, OpenAPI/Swagger, OAuth 2.0, JWT, HTTP interceptors, WebRTC, AWS
  serverless services (Lambda, Cognito, API Gateway, S3), GitHub Actions, Git/GitHub, Jira, Figma,
  Agile/Scrum.
- **AI & Engineering Tools**: OpenAI Realtime API, WebRTC, LLM integrations, prompt & context
  engineering, MCP tooling.

## 8. Education & certifications `[S1 cv-en.txt]`

- **Angular assessment: 95% score, top 1.42% of all candidates · SkillValue**, September 2022.
  (Internal note `[S3]`: this test is formally titled "Angular 12 quiz medium level" — describe it as
  an assessment, never as an "Angular certification.")
- **Green Software for Practitioners · Linux Foundation + Green Software Foundation**, 2025.
- **Higher Technician in Multi-platform Applications Development · Joyfe College, Madrid**, 2017–2018.

Supplementary, internal-only, not currently on the public CV/site `[S3]` — usable for texture but not
as headline claims unless promoted to S1: Grado Medio in Microcomputer Systems and Networks, San
Gabriel College (2015–2016); several skills-assessment badges (HackerRank Angular/JS, Ninja Talent,
API Owner) that are lower-signal than the SkillValue assessment already on the CV.

## 9. Languages `[S1 cv-en.txt]`

- **Spanish: Native**
- **Romanian: Native**
- **English: Professional working proficiency**

Do not claim English "native" or "C2 certified" — internal source `[S3]` confirms a 2025 goFLUENT C2
evaluation exists but its certificate was never archived; the public-facing claim must stay at
"professional working proficiency."

## 10. Recommendations (full text) `[S1 experience.ts recommendations[]]`

1. **José Luis Murcia Gámez**, Frontend Developer, UNIR project (Avanade). *Translated from a
   recommendation published on LinkedIn.*
   > "His knowledge of Angular is excellent, but what I really highlight from working with him is his
   > willingness to help and share his experience. Another aspect I value a lot about Marius is his
   > focus on good practices. He not only applies them in his daily work, but also promotes their
   > adoption within the team, organizing meetings when necessary and aligning everyone around
   > building quality, maintainable and scalable software."

2. **Juan Pablo Romero Pereira**, Frontend Developer, Zara Home (Inditex). *Translated from a
   recommendation published on LinkedIn.* (Also appears on the CV's "Recognition" line.)
   > "Working with Marius has been a real pleasure. I especially highlight his initiative with AI
   > tools applied to development, from which I learned a great deal working side by side with him.
   > Any team would be more than fortunate to count on someone with his technical level and his
   > attitude."

3. **José Luis Rodríguez-Campra Camberos**, BAU Coordinator / Scrum Master. *Translated from a
   recommendation published on LinkedIn.*
   > "Marius proved to be a highly adaptable and resourceful programmer on both occasions we worked
   > together, at Stratesys and at Avanade (consultancy/service provider for Proeduca), where he
   > worked as an external consultant. His ability to learn quickly and his contribution to the
   > projects were fundamental. I highly recommend him for his professionalism and technical skills."

4. **Antonio Bermúdez Rodríguez**, Developer. *Published on LinkedIn (written in English by its
   author).*
   > "Great partner, he has done a great job in his last project demonstrating that he can design and
   > build business applications successfully."

5. **Gonzalo Rodríguez Muñoz**, Full Stack Software Developer, ENZO. *Translated from a recommendation
   published on LinkedIn.*
   > "Marius was a great professional to work with. We worked together at ENZO, and his work ethic is
   > immaculate; he is very easy to work with and goes out of his way to help when you ask for
   > guidance."

## 11. Public GitHub footprint `[S2]`

- Exactly **one public repository** as of 2026-09-14: `mihailmariusiondev.github.io` — "Bilingual
  portfolio and case studies for Senior Angular / Frontend roles," Astro, 0 stars, not a fork.
- No other public repos, no public gists. Do not list any other named GitHub project (bots, demos,
  etc.) as publicly visible — see Conflicts §14.
- README of that repo (usable verbatim for "about the site" copy): stack is Astro, TypeScript,
  semantic HTML, responsive CSS, GitHub Pages; content is "Profile, verified career timeline,
  sanitized case studies, recommendations, and downloadable 2-page CVs in English and Spanish";
  privacy note: "All case studies are sanitized. This repository does not contain client source code,
  credentials, internal URLs, private screenshots, proprietary documentation or vulnerability
  details"; scope note: "The case studies document real work already completed; they are not toy
  projects created for recruitment."

## 12. Site structure / product facts `[S1 PRODUCT.md, ui.ts]`

- Bilingual: EN at `/`, ES at `/es/`. Astro 4 static site on GitHub Pages, 19 stable routes.
- Audience: recruiters/hiring managers (often mobile, from LinkedIn) needing to confirm identity and
  see strongest outcomes in 6–10 seconds; engineering leads reading case studies for decision quality.
- Success metric: visitor downloads the CV or contacts Marius, leaves thinking "this engineer builds
  exceptional product interfaces."
- Brand personality: "Precise, calm, confident engineering craft; humane, not flashy for its own
  sake."
- Nav items: Home, Work (case studies), Experience, About, Contact.
- Contact links: Email (`mailto:mihailmariusion@gmail.com`), LinkedIn, GitHub.
- Accessibility statement text (ui.ts, usable verbatim): "this site targets WCAG 2.1 AA. Every
  interactive element has a visible keyboard focus state, headings are structured in document order,
  color contrast is checked against the AA thresholds, and motion is disabled when [reduced-motion] is
  set."
- About-page paragraphs (4, EN, verbatim — see `ui.ts` `aboutParagraphs` for the ES mirror):
  1. "I am a senior frontend individual contributor working on enterprise Angular products with
     TypeScript, RxJS, NgRx and server-side rendering."
  2. "I am strongest where product frontend meets platform concerns: authentication migrations, API
     contracts, controlled rollouts, accessibility, performance and SSR."
  3. "Earlier full-stack .NET/C# work from 2018 to 2020 gives me useful backend context without
     changing the direction of my career: frontend product engineering is the focus."
  4. "I also build engineering controls when they solve a delivery problem (automated review, context
     management and documentation search) but they remain part of the frontend system rather than a
     separate professional identity."

## 13. Do not claim (hard rules — apply across all 16 concepts)

- **No "Tech Lead"** title anywhere (Avanade role was "hands-on frontend technical reference," not a
  formal Tech Lead title). `[S1][S3]`
- **RETRACTED BY MARIUS (2026-09-14), overrides every other source including the audited CV text —
  do not use, even though they appear verbatim in the current site data:**
  1. "wired to a catalog of backend tools" (AI shopping assistant bullet).
  2. "Help Center that replaced legacy shopping guides in production" / "replace legacy shopping
     guides" (Help Center bullet and case study).
  3. The internal project name **"Mateo"** for the UNIR administrative back-office.
  4. "international agricultural client" as the description of ENZO's client.
  Safe substitutes: describe the assistant as wired to backend tools (no "catalog" framing); describe
  the Help Center as a conversational Help Center rolled out market by market (no claim about what it
  replaced); refer to the UNIR project only as "UNIR's administrative back-office for student
  management," never by an internal code name; describe ENZO's client only as unnamed / not further
  specified (omit "international agricultural").
- **No "sole owner" / "sole frontend owner" / "built from scratch"** of the AI shopping assistant or
  anything else — it was a team effort with a co-lead. `[S1][S3]`
- **No years-of-experience counts** ("8 years", etc.) — always phrase as "since 2018" /
  "since 2021"; the career has real gaps and a 15-month break, so a rounded year count is
  indefensible. `[S1 PRODUCT.md][S3]`
- **No global WCAG compliance claim** — the only defensible claim is "closed 34 findings from a
  formal WCAG 2.1 AA audit" (23 merged PRs). Never "WCAG 2.1 AA compliant site" or "fully accessible."
  `[S1][S3]`
- **No invented metrics, clients, or logos.** Only Zara Home (Inditex), Santander, UNIR are named
  clients; do not add or imply other brand logos.
- **The AI shopping assistant was a controlled pilot, never public** — never say "launched," "live for
  customers," "in production for shoppers," or give a market count for it. It shipped to production
  behind a feature flag, whitelist-only. `[S1][S3]`
- **The LLM context payload reduction is 570 KB → 22 KB per execution (96%).** Never call this "tool
  payloads," never attach it to a cost or dollar saving — it is a context-size metric only. `[S1]`
- **Never "in production in 130 markets"** for the assistant, and never "never reached production" —
  both are false; the precise, safe phrasing is the S1 case-study wording above.
- **No NX as a personal Inditex skill/achievement** — internal source explicitly states Marius did not
  use or build the NX monorepo at Inditex; it predates him and isn't part of his contribution. Do not
  list "Nx" as an Inditex-specific achievement (it's fine to list Nx generically under the UNIR role,
  where he did work inside an existing Nx monorepo). `[S3]`
- **No "certification" language for the SkillValue Angular assessment** — it's an assessment/exam
  score (95%, top 1.42%), not a credential.
- **No English "native" or "C2"** claim — keep at "professional working proficiency."
- **No availability/departure-date claims, no employer dispute narrative, no litigation content** —
  none of this belongs on a portfolio; it is out of scope entirely regardless of source.
- **No bots or personal repos beyond the one public GitHub repo** unless independently reverified
  public at build time (see Conflicts).
- **No raw activity-volume counts as if they were impact** (PR counts, review counts, lines of code,
  token counts) — S1 already strips these out; don't reintroduce them from S3's internal, more
  detailed tallies.

## 14. Conflicts between sources (source 1 always wins for public copy)

1. **Bundle-reduction bullet nuance**: S1/CV says "identified approximately 3.4 MB of removable
   weight. Shipped two PRs..." — this is correct and should be used as-is. S3 adds the extra detail
   that only ~500 KB gzip of that 3.4 MB was actually implemented/shipped in the two PRs (hls.js
   dynamic import 1.25 MB, html2canvas-pro dynamic import 422 KB, lodash-es removal 127 KB, Luxon→Date
   migration). This is not a contradiction (S1 never says the full 3.4 MB shipped) but a designer
   should not infer or state that the entire 3.4 MB was removed — only "identified," with two PRs
   shipped.
2. **Personal GitHub projects**: S3 (internal knowledge, dated as recently as August 2026) lists
   several personal repos as "verified live" (four Telegram bots, `configs`, etc.) beyond the
   portfolio. The live public GitHub API check on 2026-09-14 `[S2]` shows exactly **one** public repo
   (the portfolio itself). Treat the internal list as stale or those repos as currently private/removed
   — **do not present any GitHub project other than the portfolio site as publicly visible** unless
   re-verified.
3. **Education**: S1/CV lists only the Joyfe College higher technician (2017–2018). S3 additionally
   lists a mid-level vocational qualification (San Gabriel College, Microcomputer Systems and
   Networks, 2015–2016) that never made it onto the public CV. Not a contradiction, just an omission —
   safe to leave out per S1's ceiling, or include as minor background only if a design explicitly needs
   an earlier education anchor.
4. **English proficiency**: S3 records a 2025 goFLUENT C2 self-reported evaluation, but flags its
   certificate as never archived and explicitly instructs never to publish "C2" or "native." S1's CV
   only ever says "professional working proficiency." No real conflict — S1 is simply more conservative
   and is the one to use.

## 15. Story material — strongest true narrative threads

Use these as concept starting points; keep the specific claims exactly as phrased in §5/§6 if quoted.

- **The 96% compression story.** A voice/text AI shopping assistant had to keep an LLM's working
  context small enough to be fast and cheap to reason over — the frontend engineer's job was to design
  what the model gets to see. Payload went from 570 KB to 22 KB per execution through routing and
  context-stripping. This is a "less is the feature" story: restraint as the engineering
  accomplishment, not raw feature count. Strong visual metaphor: a shrinking/filtering data pipeline,
  before/after payload size.
- **The controlled pilot that never went public.** The AI assistant shipped to real production
  infrastructure but stayed behind a feature flag, visible to nobody but a whitelist. That's a story
  about judgment and restraint under a live system — building something real and choosing not to flip
  the switch to "everyone" until it's earned. Good for a "shipped ≠ launched" narrative beat.
- **Rewriting the routing bug he inherited, in the Help Center.** (Public-safe phrasing only —
  internal detail on the exact guard mechanism is off-limits, but the shape of the story is fair game:
  a market-by-market rollout that had to be SSR-safe and accessible from day one, verified step by
  step before each country went live.) Story arc: staged rollout discipline, verifying before
  expanding, never regressing existing entry points.
- **Contract-first authentication migration.** Before touching the passwordless/OTP migration, Marius
  mapped the UI's dependency on every authentication state first, then scoped the implementation to
  what the verified contract actually supported — a deliberately incremental, non-disruptive migration
  across two states of a live account system (users with and without a password). Good "measure twice,
  cut once" engineering narrative.
- **Auditing his own tool and cutting it down.** He built an automated PR-review system, then treated
  it like any other system under audit: measured what the team actually used versus what the tool
  proposed, and retired 21 of 53 rules that were creating noise instead of value. The "adopted outside
  its origin team" detail (an MCP tool for docs, picked up by the Android team) is a strong,
  concrete signal of usefulness without needing an inflated number.
- **From .NET to Angular, cleanly explained.** Software developer since 2018 (STRATESYS, IO Digital,
  Altran — all full-stack .NET/C#), then a deliberate 15-month break for independent projects and
  upskilling, then Angular specialization from ENZO onward (September 2021) through to enterprise
  e-commerce, banking and education platforms. A credible "found the specialization" arc, not a
  jack-of-all-trades story.
- **Domain range as credibility, not padding.** Three very different regulated/large-scale domains —
  global e-commerce (Zara Home/Inditex), banking (Santander), online education (UNIR) — each with its
  own constraints (localization/SSR at scale, compliance and security posture in banking, an
  under-tooled internal back-office at UNIR). The throughline is frontend architecture that survives
  contact with a real regulated or high-traffic system, not a portfolio of toy apps.
- **The UNIR "back office had nothing" story.** He introduced linting, formatting and unit testing
  into an administrative back-office that previously had none, plus review protocols and quality
  gates, while acting as the hands-on architecture reference. A "raising the floor" story rather than
  a green-field build.

## 16. Numbers that may be shown publicly (consolidated list)

96%, 570 KB, 22 KB, 95%, top 1.42%, 34 (WCAG findings closed), 23 (merged PRs closing them), 21 of 53
(review rules retired), ~3.4 MB (identified removable bundle weight, "approximately"), 19 MB (audited
bundle size), 2 (dynamic-import PRs shipped for the bundle work), 4 (documented OTP validation
scenarios), 5 (team size led at Santander, internal mobile banking app), 4 (team size senior-referenced
at Santander real-estate portal), ~80% ("around 80%") frontend ownership on one Santander project, 2018
(career start year), 2021 (Angular specialization start year), August 2024 (Inspire Greatness award
date), September 2022 (SkillValue assessment date), 2025 (Green Software certificate year), 2017–2018
(Joyfe College dates), all role date ranges in §4.

Do not surface any number from `[S3]` not already in this list (e.g., 19,507 lines of code, 97 days a
PR stayed open, 126 files, 87/126 PRs merged, 460 PRs reviewed by a pipeline, 99 human reviews, token
counts, request counts) — these are internal verification detail, not cleared for public display, and
several were explicitly retired by the professional owner of these facts for not reproducing reliably
or for reading as unverifiable volume rather than impact.
