# Vibe Coding SDD

> 一套与模型、IDE、Coding Agent 厂商无关的 AI 软件开发标准流程。

它把“想到一句就让 AI 改一句”的 Vibe Coding，升级为可重复执行的工程流程：

**任务分类 → Spec → 设计 → Tasks → 开发 → 测试 → Review → 验收 → Converge**

## 核心概念

- **SDD**：整套 Spec-Driven Development 方法。
- **Spec**：定义“什么叫做对”。
- **BDD**：用用户可观察行为描述验收标准，常用 Given / When / Then。
- **TDD / Testing**：用测试证明重要行为真的正确。
- **DDD**：复杂项目中按业务领域组织系统的可选架构方法。

## 三条工作流

### Small Change

文案、颜色、间距、简单 UI、明确低风险配置：

`Understand → Implement → Verify → Report`

### Feature

涉及新功能、业务逻辑、API、数据库、Auth、支付、集成等：

`Understand → Spec → Clarify → Impact → Design → Tasks → Implement → Test → Review → Browser QA → Converge`

### Bug

`Reproduce → Expected/Actual → Evidence → Root Cause → Impact → Fix Plan → Fix → Regression → Verify`

## 最快使用方法

把 [`UNIVERSAL_BOOTSTRAP_PROMPT.md`](UNIVERSAL_BOOTSTRAP_PROMPT.md) 整段复制给你正在使用的 AI Coding Agent，让它根据自己支持的 Rules / Skills / Instructions 机制进行安装。

核心原则只有一句：

> **Global = 我怎么开发；Project = 这个产品是什么。**

全局规则不要写死 Next.js、Supabase、Stripe 等项目事实。项目真实信息应保存在 `docs/` 与 `specs/` 中。

## Done 的定义

以下都不能单独代表完成：代码写完、Build 成功、AI 说完成、页面看起来差不多。

真正的完成要求：

```text
Request / Spec
      ↕
Implementation
      ↕
Tests
      ↕
Observed Behavior
```

高风险和用户可见功能还应完成 Code Review 与 Browser QA。

## License

MIT。
