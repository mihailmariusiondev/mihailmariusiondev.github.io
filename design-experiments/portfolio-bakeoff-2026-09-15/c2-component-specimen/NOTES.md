# NOTES: c2-component-specimen (closed by the orchestrator)

The concept agent was stopped by the user before writing NOTES.md. Per the user's "Opcion 1", the
orchestrator closed this batch with its current build and screenshots. Direction, tokens and
per-section spec: see `DESIGN.md`. Items not re-run are marked **pending**, not claimed.

## Verified by the orchestrator (2026-09-14)
- Build: `npm run build` (astro check) OK, 19 pages.
- Linkcheck: `python3 ../_tools/linkcheck.py dist` -> 19 pages, 0 broken.
- Facts: 0 matches for relocation, "tool payload", "cargas útiles" in src/ and dist/.
- Dependencies added: none (same as _base). Client JS in dist: 0 bytes of .js files (inline scripts only, if any).
- LAN preview: `npx astro preview --host 0.0.0.0 --port 4402`, http://192.168.1.131:4402/ -> 200 on /, /es/,
  /case-studies/realtime-shopping-assistant/, /es/contact/, /marius-mihail-ion-cv.pdf.

## Lighthouse (local, mobile preset, via http://192.168.1.131:4402 over plain HTTP)
| Page | Perf | A11y | BP | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| / | 90 | 100 | 78 | 100 | 2.7 s | 0 |
| case (passwordless) | 90 | 100 | 78 | 100 | 2.7 s | 0 |

BP 78 is an artefact of serving over LAN HTTP (failed audits only `is-on-https`, `redirects-http`);
GitHub Pages serves HTTPS. JSON: `qa/lh-_.json`, `qa/lh-_case_studies_passwordless_account_migration_.json`.

## Screenshots
- qa/case-desktop.png
- qa/case-mobile.png
- qa/contact-desktop.png
- qa/contact-mobile.png
- qa/experience-desktop.png
- qa/home-dark.png
- qa/home-desktop-contact-state.png
- qa/home-desktop-outcomes-state.png
- qa/home-desktop.png
- qa/home-es-desktop.png
- qa/home-mobile.png
- qa/home-reduced-motion.png

## Known limitations / pending
- Meets perf target on home and case.
- Pending (agent stopped): skill ledger, review-animations table, impeccable detect, web-design-guidelines pass,
  fidelity ledger, keyboard/console re-check. Covered later by the cross-concept reviewer.
