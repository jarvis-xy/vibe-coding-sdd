# 通用初始化提示词

把下面整段复制给任何 AI Coding Agent，让它按当前工具支持的原生 Rules / Skills / Instructions 机制安装 Vibe Coding SDD。

---

我希望你把当前 AI Coding 环境配置为一套可长期复用、与厂商无关的 Spec-Driven Development（SDD）开发流程。

本次任务只配置开发方法，不开发无关产品功能，不升级依赖，不修改生产基础设施，不修改生产数据库。

## 目标

建立两层系统：

1. **Global Development Method**：所有项目都遵循“怎么开发”。
2. **Project Context**：只属于当前仓库的产品事实和约束。

核心原则：

**Global = 我怎么开发。Project = 这个产品是什么。**

禁止把某个项目的框架、厂商、API、数据库表、业务规则或产品事实写进 Global Rules。

## 第一步：检查当前工具能力

在修改配置前，先确认当前 Agent / IDE / CLI 原生支持的：

- Persistent Instructions / Rules
- Skills / Commands
- Subagents
- Browser Automation
- Tests
- Project Context

必须使用当前版本真实支持的原生机制。不要编造路径或命令；已有机制废弃时使用当前推荐替代方案。

保护已有用户规则。优先 Merge，不要直接覆盖。

## 全局任务分类

任何有意义的代码修改前先判断：

- Task Type：SMALL CHANGE / FEATURE / BUG
- Complexity：LOW / MEDIUM / HIGH
- Risk：LOW / MEDIUM / HIGH

简短说明原因，然后进入对应流程。

### SMALL CHANGE

适用于文案、样式、间距、简单 UI 和明确低风险的局部修改。

流程：

Understand → Implement → Verify → Report

如果发现涉及 Database、Auth、Authorization、Payment、Subscription、Business Logic、API Contract、Architecture、Security 或 Migration，立即停止 Small Change 并重新分类。

### FEATURE

有意义的新功能或行为变化使用 SDD：

Understand → Requirements → Spec → Clarify → Impact Analysis → Technical Design → Tasks → Git Safety Point → Implement → Test → Code Review → Browser QA（适用时）→ Converge → Done

中高风险 Feature 在 Spec 和 Tasks 达到可执行状态前，不开始大规模 Coding。

### BUG

不要上来就 patch symptom。

流程：

Reproduce → Expected Behavior → Actual Behavior → Evidence → Root-Cause Analysis → Impact Analysis → Fix Plan → Regression Test Design → Fix → Test → Verify → Done

未经验证的解释称为 Hypothesis，不称为 Root Cause。

优先最小正确修复，避免无关重构。

## Spec

Spec 定义 **WHAT 必须成立**，Technical Design 定义 **HOW 实现**。

中高风险 Feature 根据需要包含：

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

当 Given / When / Then 能让可观察行为更清晰时，优先使用 BDD 风格。不要机械套格式。

## Clarify / Impact Analysis

开发前解决会改变最终行为的歧义，并检查实际相关的 Frontend、Backend、API、Database、Auth、Permission、Payment、Subscription、Credits、Webhook、AI Jobs、Storage、SEO、Analytics、Tests、Deployment、Security、Data Integrity。

只分析真正相关的部分。

## Technical Design

优先沿用现有架构，采用最小兼容方案。没有明确必要，不引入新的 Framework、Database、Dependency、State Management 或 Architecture Pattern。

根据需要说明模块/文件、Data Flow、State Changes、API/DB Changes、Dependencies、Error Handling、Security、Compatibility、Migration、Risk 和 Test Strategy。

## Tasks

把有意义的工作拆成小而可验证的 Tasks。每个 Task 至少包含：

- Objective
- Affected Area
- Expected Result
- Verification Method

禁止“完成整个 XX 系统”这种巨型 Task。

## Implementation

按 Task-by-Task 实现。每个有意义的 Task 后检查 Diff、运行相关 Checks、确认没有明显 Regression，并更新状态。

不要因为实现困难偷偷改变 Requirements。实现发现 Spec 问题时，先修正 Spec / Design，再继续。

## Testing

重要业务行为必须可验证。对 Auth、Authorization、Payment、Subscription、Credits/Balance、Refund、Database Write、Webhook、AI Jobs、Retry、Duplicate Request、Idempotency、Destructive Operation、Data Integrity 使用更严格验证。

根据项目真实能力运行 Typecheck、Lint、Build、Unit、Integration、E2E。

没有实际运行过的测试，禁止声称通过。

## Code Review

实现后切换到 Skeptical Reviewer 模式，读取 Spec、Acceptance Criteria、Design、Tasks、Git Diff、Tests。

主动寻找 Missing Requirement、Wrong Assumption、Logic Bug、Edge Case、Regression、Security/Authorization、Data Integrity、Race Condition、Duplicate Operation、Idempotency、Unnecessary Complexity、Performance、Missing Tests。

目标是 **Try to disprove that the implementation is complete**，不是证明自己写对了。不要虚构问题。

## Browser QA

重要用户可见功能，在工具支持时用真实 Browser 验收。检查 Primary/Negative Flow、Loading/Empty/Success/Failure、Retry、Refresh/Back、重复点击/提交、Responsive、Console Errors、Failed Requests、Redirect、Persisted State。

Acceptance Criteria 输出 PASS / FAIL / BLOCKED。

如果当前工具没有 Browser Automation，不要假装执行；生成 Manual QA Checklist，并把 Browser Verification 标为 Pending / Blocked。

## Converge

完成前对照：

Spec ↔ Design ↔ Tasks ↔ Implementation ↔ Tests ↔ Observed Behavior

修复有意义的不一致。

## Definition of Done

Code Written、Build Passed、Tests Passed 或 AI Says Done，都不能单独代表 Done。

真正 Done 要求 Request/Spec、Implementation、Tests、Observed Behavior 一致。高风险/用户可见工作还应完成对应 Review 与 QA。

## Git Safety

保护已有用户工作。高风险修改前检查 Repository 状态；避免无关修改；中高风险任务根据需要使用 Commit / Branch / Worktree 作为 Recovery Point。

未经明确授权，不执行 destructive reset、大量删除、强制覆盖、生产数据修改或大规模无关重构。

## Project Context

进入新项目时先读取真实代码、配置、README 和已有文档，再决定是否建立：

- docs/product.md
- docs/architecture.md
- docs/tech-stack.md
- docs/testing.md
- 可选 database/ui/deployment/security/seo 文档
- specs/active/
- specs/archive/

禁止编造项目事实。无法确认就写 UNKNOWN / TO BE CONFIRMED。

## 可复用 Skills

如果当前工具支持 Skills / Commands / Workflow Modules，安装等价的：

- feature
- bugfix
- small-change
- code-review
- browser-qa

这套方法论默认安装到 Global Scope，使所有项目共享同一套 SDD Rules / Skills。只有用户明确要求某个仓库使用局部覆盖时，才使用 Project Scope。Project Context（产品、架构、技术栈、业务规则、Specs）仍然只属于具体项目。

## 避免流程官僚化

流程必须与风险匹配：

- Small Change → 轻量流程
- Medium Feature → Mini Spec
- Large / High Risk Feature → Full SDD

目标是提高正确率和可恢复性，不是制造 Markdown。

## 最终验证

配置完成后，只验证真正能验证的内容：Rules 是否加载、Skills 是否可发现、是否与已有配置冲突、Browser/Tool Integration 是否可用。

最终报告：

- Created
- Updated
- Installed Skills / Commands
- Existing Config Conflicts
- 各流程如何调用
- 哪些内容仍属于 Project Context
- 实际验证了什么

完成开发系统配置后停止，不继续开发无关业务功能。
