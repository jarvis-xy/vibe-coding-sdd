# Antigravity Adapter

Map the core repository concepts to Antigravity's current persistent Rules and reusable Skills mechanisms.

Recommended mapping:

- `core/GLOBAL_RULES.md` → global or workspace persistent rule, depending on desired scope.
- `skills/*/SKILL.md` → reusable Antigravity skills using the currently supported skill format.
- `templates/project-context/*` → current repository `docs/`.
- `templates/specs/*` → current repository `specs/`.
- `browser-qa` → Antigravity browser capability when available.

Use `UNIVERSAL_BOOTSTRAP_PROMPT.md` if you want Antigravity to inspect its current version and install the files using native supported paths rather than relying on potentially stale hard-coded paths.
