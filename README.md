# Vibe Coding SDD

**A tool-agnostic, Spec-Driven Development workflow for AI coding agents.**

[简体中文](README.zh-CN.md) · [Install](INSTALL.md) · [Universal Bootstrap Prompt](UNIVERSAL_BOOTSTRAP_PROMPT.md)

Vibe Coding SDD turns ad-hoc prompting into a repeatable engineering process:

**Classify → Specify → Plan → Build → Test → Review → Verify → Converge**

It is designed for builders who use AI to ship real software and want quality to depend on a process—not on one lucky prompt, one model, or one IDE.

## One-command install

Requires Node.js 18+.

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init
```

Choose your coding agent, install scope, and language interactively.

Examples:

```bash
# Antigravity · global · Chinese rules
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent antigravity --scope global --lang zh-CN --yes

# Claude Code · current project
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent claude-code --scope project --lang en --yes

# Codex · current project
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent codex --scope project --lang en --yes

# Kiro · global
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent kiro --scope global --lang en --yes
```

See [INSTALL.md](INSTALL.md) for safety behavior, `--dry-run`, `--force`, and current tool mappings.

## Why this exists

Vibe coding is fast, but unstructured AI coding often creates predictable problems:

- the agent starts coding before the requirement is clear;
- large changes happen without impact analysis;
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

## Three task lanes

### Small Change

For copy, styling, spacing, trivial UI changes, and clearly low-risk configuration.

`Understand → Implement → Verify → Report`

### Feature

For meaningful new behavior or changes to business logic, APIs, databases, authentication, payments, integrations, or architecture.

`Understand → Spec → Clarify → Impact → Design → Tasks → Implement → Test → Review → Browser QA → Converge`

### Bug

For broken existing behavior.

`Reproduce → Expected vs Actual → Evidence → Root Cause → Impact → Fix Plan → Fix → Regression Test → Verify`

## Global vs Project

The core boundary is simple:

> **Global = how you develop.**  
> **Project = what this product is.**

Global rules should describe process, safety, testing, and review. Project context should contain the real product stack, architecture, database, APIs, business rules, UI rules, deployment, and active feature specs.

Recommended project structure:

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

## Definition of Done

Code written is not Done. A build passing is not automatically Done. An AI saying “done” is not Done.

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

## Repository layout

```text
core/                         Stable methodology
skills/                       Reusable Agent Skills
adapters/                     Tool-specific mappings
  antigravity/
  claude-code/
  codex/
  kiro/
templates/
  project-context/
  specs/
UNIVERSAL_BOOTSTRAP_PROMPT.md
UNIVERSAL_BOOTSTRAP_PROMPT.zh-CN.md
bin/vibe-coding-sdd.js        One-command installer
```

## Supported adapters

- Antigravity
- Claude Code
- Codex
- Kiro
- Generic / other Agent Skills-compatible tools

The core method is vendor-independent. Adapter paths are intentionally thin so a tool can evolve without rewriting the methodology.

## Manual bootstrap

If you do not want to run code, paste [UNIVERSAL_BOOTSTRAP_PROMPT.md](UNIVERSAL_BOOTSTRAP_PROMPT.md) into your coding agent. Chinese users can use [UNIVERSAL_BOOTSTRAP_PROMPT.zh-CN.md](UNIVERSAL_BOOTSTRAP_PROMPT.zh-CN.md).

## Philosophy

- Process should scale with risk, not create paperwork for its own sake.
- Specs define **what**; designs define **how**.
- Important behavior should be observable and testable.
- Bugs require evidence and root-cause analysis before patching.
- Review should try to disprove completeness, not merely approve the writer’s work.
- Browser-facing work should be tested in the browser when practical.
- Never claim a test or verification was performed when it was not.

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
