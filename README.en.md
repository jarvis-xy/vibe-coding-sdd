# Vibe Coding SDD

**A tool-agnostic, Spec-Driven Development workflow for AI coding agents.**

[简体中文](README.md) · [Install](INSTALL.md) · [Release](RELEASE.md) · [Universal Bootstrap Prompt](UNIVERSAL_BOOTSTRAP_PROMPT.md)

Vibe Coding SDD turns ad-hoc prompting into a repeatable engineering process:

**Classify → Specify → Plan → Build → Test → Review → Verify → Converge**

It is designed for builders who use AI to ship real software and want quality to depend on a process—not on one lucky prompt, one model, or one IDE.

## One-command install

Requires Node.js 18+.

After the npm package is published:

```bash
npx vibe-coding-sdd init
```

Available directly from GitHub today:

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

See [INSTALL.md](INSTALL.md) for safety behavior, `--dry-run`, `--force`, and current tool mappings. See [RELEASE.md](RELEASE.md) for npm publishing.

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

> **Global = how you develop.**  
> **Project = what this product is.**

Global rules describe process, safety, testing, and review. Project context contains the actual stack, architecture, database, APIs, business rules, UI rules, deployment, and active feature specs.

## Definition of Done

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

## Supported adapters

- Antigravity
- Claude Code
- Codex
- Kiro
- Generic / other Agent Skills-compatible tools

## License

MIT. See [LICENSE](LICENSE).
