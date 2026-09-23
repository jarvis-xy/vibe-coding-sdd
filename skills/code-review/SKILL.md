---
name: code-review
description: Independently review implemented changes against requirements, design, tests, security, data integrity, architecture, and regression risk.
---

# Code Review

Assume the implementation may be incomplete.

Read the relevant Spec, acceptance criteria, design, task list, git diff, and tests. Look for:

- missing requirements;
- incorrect assumptions or logic;
- edge/error states;
- regressions;
- security and authorization problems;
- data-integrity issues;
- race conditions, duplicate operations, and idempotency;
- architecture violations or unnecessary complexity;
- performance concerns where material;
- missing or weak tests.

Classify findings as BLOCKER / HIGH / MEDIUM / LOW when useful. For each finding include evidence, impact, and suggested correction. Do not invent findings.

Default behavior: report findings first; do not modify code unless explicitly asked or the calling workflow authorizes fixes.
