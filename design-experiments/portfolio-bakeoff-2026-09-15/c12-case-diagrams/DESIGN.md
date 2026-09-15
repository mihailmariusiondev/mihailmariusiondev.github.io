# DESIGN.md: Case Diagrams (c12), minimal, written by the orchestrator

The concept agent was stopped before writing this file; reconstructed from the built source and qa/ screenshots.

## Thesis
Each case study is explained by its own bespoke, animated inline SVG diagram instead of decorative imagery.
The diagram is the memorable idea: the home page previews all four, and each case page opens with its own.

## Diagrams (src/components/diagrams/)
- `AuthPathsDiagram`: passwordless account migration, the auth state paths.
- `RolloutDiagram`: market-by-market controlled rollout.
- `PayloadFunnelDiagram`: LLM context payload 570 KB -> 22 KB per execution (96%).
- `ReviewLoopDiagram`: review / findings loop.
- `DiagramFrame`: shared frame and "illustrative" labelling; `DiagramReveal`: IntersectionObserver draw-on-scroll.
Every SVG has a localized `<title>` (EN/ES). Only numbers and technologies already in src/data.

## Tokens
Base palette kept: ink #0b0d10, paper #f7f6f3, paper-raised #ffffff, paper-sunk #efede7, steel #2f5680 (accent),
steel-dark #244562, slate #4d5a64, amber #6f5709 on #f3ecd6, rules #d8d4cb/#b9b3a6. Dark mode via prefers-color-scheme.
Type via --font-display / --font-body / --font-mono variables from the base.

## Motion
Diagrams draw in once when scrolled into view (IntersectionObserver); prefers-reduced-motion shows the final
static diagram (6 reduced-motion rules in src). Content is fully readable without JS.

## Pending
Formal skill ledger, fidelity ledger and self-review were not produced by the stopped agent.
