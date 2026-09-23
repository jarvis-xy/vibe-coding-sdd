# Claude Code Adapter

Recommended mapping:

- Reference or import `core/GLOBAL_RULES.md` from the project's persistent Claude Code instruction file.
- Represent the five reusable skills as project/user commands, skills, or prompt modules supported by the installed Claude Code version.
- Keep product and architecture truth in project `docs/` and active feature state in `specs/`.
- For independent review, start a fresh reviewer context/subagent when risk justifies it.

Use `UNIVERSAL_BOOTSTRAP_PROMPT.md` to let the installed version choose its current native configuration mechanism.
