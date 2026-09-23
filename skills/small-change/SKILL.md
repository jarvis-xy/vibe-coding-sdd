---
name: small-change
description: Make a low-risk local change such as copy, styling, spacing, simple UI, or trivial configuration without unnecessary process overhead.
---

# Small Change

1. Confirm the change is genuinely local and low risk.
2. Understand the target and existing conventions.
3. Make the smallest coherent change.
4. Avoid unrelated refactors or new architecture.
5. Run the cheapest relevant verification.
6. Visually verify UI work when practical.
7. Report the change and verification.

If database, auth, permissions, payment, business logic, API contracts, migration, architecture, or security impact appears, stop and reclassify as FEATURE or BUG.
