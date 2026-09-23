# Codex Adapter

Recommended mapping:

- Reference `core/GLOBAL_RULES.md` from repository/user instructions supported by the installed Codex environment (commonly project instructions such as `AGENTS.md`).
- Keep reusable workflow prompts available as skills/prompts supported by the environment.
- Treat `docs/` and `specs/` as the shared project source of truth.
- Use Codex for task execution, tests, git inspection, and implementation review while preserving the same SDD gates.

Use `UNIVERSAL_BOOTSTRAP_PROMPT.md` when you want Codex to inspect the current environment and configure itself without relying on stale paths.
