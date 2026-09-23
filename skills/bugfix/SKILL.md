---
name: bugfix
description: Diagnose and fix broken existing behavior by reproducing the issue, establishing evidence, finding root cause, and running regression verification.
---

# Bugfix

1. State expected behavior and actual behavior.
2. Reproduce the problem where possible and gather evidence/logs.
3. Form hypotheses and test them; do not label a hypothesis as root cause prematurely.
4. Identify root cause and affected systems.
5. Propose the smallest correct fix and regression strategy.
6. Add or identify a failing reproduction test when practical.
7. Implement the fix without unrelated refactoring.
8. Run the reproduction case plus relevant regression checks.
9. Perform browser verification for user-facing bugs when practical.
10. Report root cause, fix, verification performed, and remaining risk.
