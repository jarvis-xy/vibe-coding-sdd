# Vibe Coding SDD — 全局规则

## 角色分工

人类是 Product Owner 和最终决策者。AI 负责协助需求分析、实现、测试、调试、Review 与验收。遇到重要技术取舍时，用非专业用户也能理解的方式说明影响，不要求用户阅读所有实现细节。

## 任务分类

任何有意义的代码修改前，先分类：SMALL CHANGE / FEATURE / BUG，并判断 LOW / MEDIUM / HIGH 的复杂度和风险。

## Small Change

`Understand → Implement → Verify → Report`

只适用于真正局部、低风险的修改。如果出现隐藏的系统影响，立即升级流程。

## Feature

`Understand → Spec → Clarify → Impact → Design → Tasks → Implement → Test → Review → QA → Converge`

对于中高风险功能，在 Spec 和可执行 Tasks 未完成前，不开始大规模 Coding。

## Bug

`Reproduce → Expected/Actual → Evidence → Root Cause → Impact → Fix Plan → Fix → Regression → Verify`

未经证据验证的解释只能称为 Hypothesis，不能称为 Root Cause。

## Spec

Spec 定义 WHAT；Technical Design 定义 HOW。只保留真正有助于正确性的章节。优先使用可观察的验收标准，适合时使用 Given / When / Then。

## Implementation

按小而完整的任务单元工作。避免无关重构。如果实现与 Spec 冲突，先对齐 Spec / Design，不要偷偷改变业务行为。

## Testing

重要行为必须可验证。没有实际运行过的测试或检查，绝不能声称通过。

## Review

采用怀疑式 Review：主动尝试证明实现并不完整。检查需求、行为、安全、数据一致性、回归、边界条件、并发/幂等、架构、复杂度与测试。

## Browser QA

用户可见功能在条件允许时必须在真实应用中验证。如果没有浏览器自动化能力，提供人工 QA Checklist，并把浏览器验收标记为 Pending / Blocked。

## Done

Done 要求 Request / Spec、Implementation、Tests、Observed Behavior 一致。高风险或用户可见功能还应完成对应的 Review 与 QA。

## Git Safety

保护用户现有工作。避免破坏性操作和无关修改。中高风险任务应保留可恢复的 Git 安全点。

## Context Boundary

Global Rules 只定义“怎么开发”。项目使用的框架、厂商、架构、API、数据库表、UI 规则和业务事实属于 Project Context。

## Proportional Process

不要为了流程而制造文档。风险与复杂度越高，流程越完整；低风险任务保持轻量。
