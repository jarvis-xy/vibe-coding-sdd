# Universal Bootstrap Prompt

Copy everything below into an AI coding agent when you want it to install or adapt Vibe Coding SDD.

---

I want you to configure this AI coding environment to use a reusable, tool-agnostic software-development workflow based on Spec-Driven Development (SDD).

This is a development-process configuration task. Do not implement unrelated product features, upgrade dependencies, alter production infrastructure, or change a production database.

## Goal

Create a two-layer system:

1. **Global development method** — how software should be developed in every project.
2. **Project context** — facts and constraints that belong only to the current repository.

Core rule:

**Global = how we develop. Project = what this product is.**

Do not put project-specific frameworks, vendors, APIs, database tables, business rules, or product facts into global rules.

## First: inspect capabilities

Before changing configuration, inspect the current agent/tool and determine its supported mechanism for persistent instructions, rules, skills/commands, subagents, browser automation, tests, and project-level context.

Use the tool's current native mechanism. Do not invent unsupported paths or commands. Do not use deprecated mechanisms when a supported replacement exists.

Preserve existing user rules and configuration. Merge carefully rather than blindly overwriting.

## Global task classification

Before meaningful code changes, classify the request:

- Task Type: SMALL CHANGE / FEATURE / BUG
- Complexity: LOW / MEDIUM / HIGH
- Risk: LOW / MEDIUM / HIGH

Briefly explain the classification, then follow the matching lane.

### SMALL CHANGE

Use for copy, styling, spacing, simple UI, and clearly low-risk local changes.

Workflow:

Understand → Implement → Verify → Report

Do not create a full Spec unless risk expands. If the work affects database, authentication, authorization, payments, subscriptions, business logic, API contracts, architecture, security, or migrations, stop and reclassify it.

### FEATURE

Use SDD for meaningful new behavior.

Workflow:

Understand → Requirements → Spec → Clarify → Impact Analysis → Technical Design → Tasks → Git Safety Point → Implement → Test → Code Review → Browser QA (when applicable) → Converge → Done

Do not begin substantial implementation before the Spec and Tasks are executable.

### BUG

Do not patch symptoms immediately.

Workflow:

Reproduce → Expected Behavior → Actual Behavior → Evidence → Root-Cause Analysis → Impact Analysis → Fix Plan → Regression Test Design → Fix → Test → Verify → Done

Call an unverified explanation a hypothesis, not a root cause.

Prefer the smallest correct fix and avoid unrelated refactoring.

## Spec rules

A Spec defines **WHAT must be true**. Technical Design defines **HOW it will be implemented**.

For medium/high-risk features, include as relevant:

- Problem
- Goal
- User Story
- Functional Requirements
- Acceptance Criteria
- Edge Cases
- Error States
- Constraints
- Out of Scope
- Affected Systems

Use BDD-style Given / When / Then acceptance criteria where they make observable behavior clearer. Do not force BDD syntax where it adds no value.

## Clarify and impact analysis

Before implementation, resolve ambiguity that can change behavior. Check relevant impacts such as frontend, backend, APIs, database, auth, permissions, payments, subscriptions, credits/balances, webhooks, AI jobs, storage, SEO, analytics, existing tests, deployment, security, and data integrity.

Only include areas that actually matter.

## Technical design

Prefer the current project's architecture and the smallest compatible solution. Do not introduce a new framework, database, dependency, state-management system, or architectural pattern without a clear need.

Describe implementation approach, affected modules/files, data flow, state changes, API/database changes, dependencies, errors, security, compatibility, migration, risks, and test strategy as relevant.

## Tasks

Break meaningful work into small, independently understandable and verifiable tasks. Each task should state:

- Objective
- Affected area
- Expected result
- Verification method

Avoid giant tasks such as "implement the entire system".

## Implementation

Work task-by-task. After each meaningful task, inspect the diff, run relevant checks, confirm no obvious regression, and update task status.

Do not silently change requirements because implementation is inconvenient. If implementation reveals a Spec flaw, update the Spec/Design first.

## Testing

Important business behavior must be verifiable. Apply stricter testing to authentication, authorization, payments, subscriptions, balances/credits, refunds, database writes, webhooks, AI jobs, retries, duplicate requests, idempotency, destructive operations, and data integrity.

Run the project's actual available checks: typecheck, lint, build, unit, integration, and/or E2E as appropriate.

Never claim a test passed unless it was actually run.

## Code review

After implementation, switch into skeptical reviewer mode. Review the Spec, acceptance criteria, design, tasks, git diff, and tests. Try to disprove that the implementation is complete.

Look for missing requirements, incorrect assumptions, logic bugs, edge cases, regression, security and authorization issues, data-integrity problems, race conditions, duplicate operations, idempotency issues, unnecessary complexity, performance concerns, and missing tests.

Do not invent findings.

## Browser QA

For meaningful user-facing behavior, test the real application in a browser when the tool supports it. Validate primary and negative flows, loading/empty/success/failure states, retry, refresh/navigation, repeated clicks/submissions, responsive behavior where relevant, console errors, failed requests, redirects, and persisted state.

Report acceptance criteria as PASS / FAIL / BLOCKED.

If browser automation is unavailable, do not pretend it was performed. Produce a manual QA checklist and mark browser verification as blocked or pending.

## Converge

Before Done, compare:

Spec ↔ Design ↔ Tasks ↔ Implementation ↔ Tests ↔ Observed Behavior

Resolve meaningful inconsistencies.

## Definition of Done

Code written is not Done. Build passed is not automatically Done. Tests passed alone are not always Done. An AI saying "done" is not Done.

A task is Done when Request/Spec, Implementation, Tests, and Observed Behavior are consistent. High-risk/user-facing work should also pass review and relevant QA.

## Git safety

Protect existing user work. Inspect repository state before risky changes. Avoid unrelated changes. Use a commit, branch, or worktree recovery point for medium/high-risk work when appropriate. Never perform destructive resets, mass deletions, forced overwrites, production-data changes, or large unrelated refactors without explicit need and authorization.

## Project context

For a new repository, inspect real code/config/docs before creating context. Recommend or create project-level docs only when useful:

- docs/product.md
- docs/architecture.md
- docs/tech-stack.md
- docs/testing.md
- optional database/ui/deployment/security/seo docs
- specs/active/
- specs/archive/

Never invent project facts. Use UNKNOWN or TO BE CONFIRMED if the repository does not establish a fact.

## Reusable commands/skills

If the agent supports reusable skills, commands, workflows, or prompt modules, install equivalents of:

- feature
- bugfix
- small-change
- code-review
- browser-qa

Install the reusable SDD rules/skills globally by default so all projects share the same development method. Use project scope only when the user explicitly wants repository-local overrides. Product facts, architecture, stack, business rules, and active specs remain project-local context.

## Avoid process bureaucracy

Process must scale with risk:

- Small change → lightweight lane
- Medium feature → mini Spec
- Large/high-risk feature → full SDD

The purpose is correctness and recoverability, not producing Markdown files.

## Final verification

After configuration, verify only what can actually be verified: persistent rule loading, reusable skill/command discovery, conflicts with existing instructions, and any available browser/tool integration. Fix configuration issues you can confirm.

Then report:

- Created
- Updated
- Installed reusable skills/commands
- Existing configuration conflicts and resolution
- How to invoke each lane
- What remains project-specific
- What was actually verified

Stop after configuring the development system. Do not begin unrelated product development.
