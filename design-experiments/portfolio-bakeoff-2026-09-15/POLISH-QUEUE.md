# Polish queue (final phase, after c5-c16 are built)
- c3: fix color-contrast until Lighthouse a11y = 100.
- c1, c3 (and c4): Lighthouse mobile perf >= 90 if reasonable. Remove Google Fonts wait/cost
  (self-host subset woff2 in public/, preload the display face, font-display swap/optional,
  drop unused weights/families), limit motion/JS, honour reduced-motion. Keep the concept.
- Re-run lh.sh on /, /es/, one case via 192.168.1.131; update NOTES.md; restart LAN preview.
- c8: write the missing DESIGN.md (from the built site + qa screenshots); concept must not stay incomplete.
- c5: validate Three.js: prefers-reduced-motion (static/no animation), WebGL not required on mobile
  (fallback works without it), zero console errors, reasonable Lighthouse (>= 85 perf target for WebGL).
- ALL: re-run Lighthouse sequentially (one Chrome at a time) after every agent finishes; perf numbers taken under CPU contention (load ~10/8 cores) are not trustworthy (c11 swung 28-57).
- c8: fix broken live render (only one case card, near-zero contrast, ~2000px blank before footer).
- c8-c14 (user, hard): first viewport must be genuinely distinct from _base (composition/type/motion,
  not colours), desktop 1440x900 + mobile 390x844. Do NOT claim 16 distinct until a fresh visual
  re-audit passes.
- Serving: all 4401-4416 on 0.0.0.0, verified via Tailscale http://100.89.140.14:PORT (keepalive: run/keepalive.sh).
