# Skills inventory for the bake-off (2026-09-14)

Discovery: Claude Code skill listing + `~/.claude/plugins/installed_plugins.json` +
`~/.claude/plugins/plugin-catalog-cache.json` + marketplace clones. No "Skill Finder" skill is
installed; the native listing + catalog were used instead. Nothing was installed.

| Skill | Status | Use |
|---|---|---|
| Anthropic `frontend-design` | Not installed as a plugin; its SKILL.md exists in the local `claude-plugins-official` marketplace clone | USED: read from the clone and imposed on every concept via BRIEF.md (token plan → self-review → build → screenshot critique; anti-default list) |
| `agent-browser` (+ `core`, `dogfood` modules, v0.37.1) | Installed | USED for rendered QA: screenshots desktop/mobile, console/errors, keyboard, reduced-motion emulation |
| `marius-agent-browser` | Installed | USED: isolation rules (unique named sessions, owned cleanup, no close --all) |
| `ponytail` | Installed (session hook) | Governs minimal dependencies |
| `web-design-guidelines` (Vercel) | Not installed, not in local catalog | Unavailable |
| Impeccable | Not installed, not in local catalog | Unavailable |
| OpenAI `build-web-apps` | Not installed; only the `codex` plugin (rescue/review) is present | Unavailable |
| `chrome-devtools-mcp` (`a11y-debugging`, perf traces) | In catalog only, requires MCP install | Not installed per constraints (no MCP); agent-browser covered browser QA |
| Motion / Three.js / 3D skills | None installed; `figma-implement-motion` in catalog needs Figma MCP | Unavailable |
