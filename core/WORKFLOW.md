# Workflow Reference

## Decision tree

```text
New request
   │
   ├─ Broken existing behavior? ───────────────→ BUG
   │
   ├─ Purely local + low risk? ───────────────→ SMALL CHANGE
   │
   └─ Meaningful new/changed behavior ────────→ FEATURE
```

## Feature gates

A medium/high-risk feature moves through these gates:

1. **Understanding gate** — current system inspected.
2. **Specification gate** — behavior and acceptance criteria are clear.
3. **Design gate** — implementation approach and impact are understood.
4. **Task gate** — work is decomposed into verifiable steps.
5. **Implementation gate** — code and relevant automated checks complete.
6. **Review gate** — skeptical review has no unresolved blocker/high finding.
7. **Verification gate** — observed behavior matches the Spec.
8. **Convergence gate** — docs, tasks, code, tests and behavior agree.

## Risk scaling

| Risk | Expected process |
|---|---|
| Low | Lightweight understanding + change + verification |
| Medium | Mini Spec + tasks + tests + review |
| High | Full Spec + impact/design + recovery point + tests + independent review + QA |

## High-risk triggers

Typical triggers include payments, authentication/authorization, user balances/credits, destructive writes, migrations, sensitive data, production configuration, webhooks/idempotency, security boundaries, and widespread architectural changes.
