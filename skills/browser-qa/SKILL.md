---
name: browser-qa
description: Verify user-facing behavior in the real application against acceptance criteria using browser automation when available, or produce a manual QA checklist when it is not.
---

# Browser QA

1. Read the relevant Spec and acceptance criteria.
2. Test the primary end-to-end flow.
3. Test meaningful negative/error paths.
4. Check loading, empty, success, failure, disabled, and retry states where relevant.
5. Check refresh/back navigation and repeated click/submission behavior where relevant.
6. Check desktop/mobile when responsive behavior matters.
7. Inspect console/network failures when tooling permits.
8. Capture evidence such as screenshots/recordings when useful.
9. Mark each acceptance criterion PASS / FAIL / BLOCKED.

Never infer browser success from source code alone. If browser automation is unavailable, provide a concrete manual checklist and mark browser verification pending/blocked.
