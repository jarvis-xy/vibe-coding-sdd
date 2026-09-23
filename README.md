# Vibe Coding SDD

> A tool-agnostic, spec-driven workflow for building software with AI coding agents.

Vibe Coding SDD turns ad-hoc prompting into a repeatable engineering process:

**Classify → Specify → Plan → Build → Test → Review → Verify → Converge**

It is designed for people who use AI to build real products but do not want quality to depend on a single prompt, model, IDE, or agent.

## Why this exists

Vibe coding is fast, but unstructured AI coding often creates predictable problems:

- the agent starts coding before the requirement is clear;
- large changes are made without impact analysis;
- bugs are patched at the symptom instead of the root cause;
- the same agent writes and approves its own work;
- tests are skipped or claimed without being run;
- UI code looks correct in source but fails in the browser;
- project context drifts across tools and sessions.

This repository provides a lightweight operating system for AI-assisted software development without requiring you to become a traditional software engineer first.

## Core model

| Concept | Purpose |
|---|---|
| **SDD** | The overall development method: use a specification to drive implementation and verification. |
| **Spec** | Defines what correct behavior means. |
| **BDD** | Expresses important acceptance criteria as observable behavior, often Given / When / Then. |
| **TDD / Testing** | Proves important behavior works instead of trusting the implementation. |
| **DDD** | Optional architectural technique for organizing complex systems around business domains. |

The default workflow is intentionally simpler than heavyweight enterprise processes.

## Three task lanes

### Small Change

For copy, styling, spacing, trivial UI changes, and clearly low-risk configuration.

`Understand → Implement → Verify → Report`

### Feature

For meaningful new behavior or changes to business logic, APIs, databases, authentication, payments, integrations, or architecture.

`Understand → Spec → Clarify → Impact → Design → Tasks → Implement → Test → Review → QA → Converge`

### Bug

For broken existing behavior.

`Reproduce → Expected vs Actual → Evidence → Root Cause → Impact → Fix Plan → Fix → Regression Test → Verify`

## Quick start

The fastest way to adopt the workflow is to copy [`UNIVERSAL_BOOTSTRAP_PROMPT.md`](UNIVERSAL_BOOTSTRAP_PROMPT.md) into your AI coding agent and ask it to configure the workflow using the agent's native rule/skill system.

If you prefer manual setup:

1. Add [`core/GLOBAL_RULES.md`](core/GLOBAL_RULES.md) to your agent's persistent project/global instructions.
2. Install the reusable skills under [`skills/`](skills/).
3. Copy the relevant project context templates from [`templates/project-context/`](templates/project-context/).
4. Use [`templates/specs/`](templates/specs/) for medium/high-risk work.

## Recommended project structure

```text
project/
├── docs/
│   ├── product.md
│   ├── architecture.md
│   ├── tech-stack.md
│   └── testing.md
├── specs/
│   ├── active/
│   └── archive/
└── ...your source code
```

**Global = how you develop.**  
**Project = what this product is.**

Do not hard-code project-specific technologies or business rules into global instructions.

## Definition of Done

Code written is not Done. A build passing is not automatically Done. An AI saying "done" is not Done.

A meaningful task is Done when these agree:

```text
Request / Spec
      ↕
Implementation
      ↕
Tests
      ↕
Observed behavior
```

For high-risk or user-facing work, Code Review and Browser QA should also pass.

## Tool adapters

The core method is model- and vendor-independent. Adapter notes are included for:

- Antigravity
- Claude Code
- Codex
- Kiro

See [`adapters/`](adapters/). Treat adapter-specific paths and commands as convenience guidance; the core files remain the source of truth.

## Philosophy

- Process should scale with risk, not create paperwork for its own sake.
- Specs define **what**; designs define **how**.
- Important behavior should be observable and testable.
- Bugs require evidence and root-cause analysis before patching.
- One agent may write; another context or agent should review when risk is meaningful.
- Browser-facing work should be tested in the browser when practical.
- Never claim a test or verification was performed when it was not.

## License

MIT. See [LICENSE](LICENSE).
