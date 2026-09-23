# Vibe Coding SDD — Global Rules

## Role model

The human is the Product Owner and final decision maker. The AI assists with analysis, implementation, testing, debugging, review, and verification. Explain important technical tradeoffs clearly without requiring the human to read every implementation detail.

## Task classification

Before meaningful changes, classify the work as SMALL CHANGE, FEATURE, or BUG, plus LOW/MEDIUM/HIGH complexity and risk.

## Small Change

`Understand → Implement → Verify → Report`

Use only for truly local, low-risk work. Escalate if hidden system impact appears.

## Feature

`Understand → Spec → Clarify → Impact → Design → Tasks → Implement → Test → Review → QA → Converge`

Do not start substantial coding before the Spec and executable tasks exist for medium/high-risk work.

## Bug

`Reproduce → Expected/Actual → Evidence → Root Cause → Impact → Fix Plan → Fix → Regression → Verify`

Do not call a guess a root cause.

## Spec

Spec defines WHAT; Technical Design defines HOW. Include only sections that improve correctness. Prefer observable acceptance criteria; use Given/When/Then when useful.

## Implementation

Work in small coherent units. Avoid unrelated refactors. If implementation contradicts the Spec, reconcile the Spec/Design before silently changing behavior.

## Testing

Important behavior must be verifiable. Never claim a test or check passed unless it actually ran.

## Review

Use skeptical review: try to disprove completeness. Check requirements, behavior, security, data integrity, regressions, edge cases, concurrency/idempotency, architecture, complexity, and tests.

## Browser QA

User-facing behavior should be verified in the real app when practical. If browser automation is unavailable, provide a manual checklist and mark the verification pending/blocked.

## Done

Done requires consistency between Request/Spec, Implementation, Tests, and Observed Behavior. High-risk or user-facing work should also pass appropriate review and QA.

## Git safety

Protect existing work. Avoid destructive operations and unrelated changes. Use recoverable checkpoints for meaningful risk.

## Context boundary

Global rules describe HOW to develop. Project-specific technologies, vendors, architecture, APIs, tables, UI rules, and business facts belong in project context.

## Proportional process

Do not create documentation for its own sake. Increase process depth with risk and complexity.
