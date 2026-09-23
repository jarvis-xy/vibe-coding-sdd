# Vibe Coding SDD

**一套与模型、IDE、Coding Agent 厂商无关的 Spec-Driven Development 标准开发工作流。**

[English](README.md) · [安装说明](INSTALL.zh-CN.md) · [发布说明](RELEASE.zh-CN.md) · [中文初始化提示词](UNIVERSAL_BOOTSTRAP_PROMPT.zh-CN.md)

它把“想到一句就让 AI 改一句”的 Vibe Coding，升级成一套可重复执行、可测试、可 Review、可回滚的工程流程：

**任务分类 → Spec → 设计 → Tasks → 开发 → 测试 → Review → 验收 → Converge**

适合希望用 AI 真正做产品，但又不希望项目质量依赖“某一次 Prompt 写得好不好”的开发者和 0 技术 Vibe Coder。

## 一条命令安装

需要 Node.js 18+。

npm 包正式发布后可以直接：

```bash
npx vibe-coding-sdd init
```

现在已经可以直接从 GitHub 安装：

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init
```

安装器会交互式询问：

- 使用哪个 Coding Agent
- 安装到当前 Project 还是 Global
- 使用 English 还是中文规则

也可以直接指定：

```bash
# Antigravity · 全局 · 中文
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent antigravity --scope global --lang zh-CN --yes

# Claude Code · 当前项目 · 中文
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent claude-code --scope project --lang zh-CN --yes

# Codex · 当前项目 · 中文
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent codex --scope project --lang zh-CN --yes

# Kiro · 全局 · 中文
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent kiro --scope global --lang zh-CN --yes
```

完整安全策略、`--dry-run`、`--force` 和各工具路径见 [INSTALL.zh-CN.md](INSTALL.zh-CN.md)。npm 发布见 [RELEASE.zh-CN.md](RELEASE.zh-CN.md)。

## 为什么需要它

Vibe Coding 很快，但没有标准流程时很容易出现：

- 需求还没定义清楚，AI 已经开始写代码；
- 大改动没有做影响分析；
- Bug 只修症状，不找 Root Cause；
- 同一个 AI 自己开发、自己检查、自己宣布完成；
- 测试没有真正执行，却被描述成“已通过”；
- 源码看起来正常，真实浏览器里却不能用；
- Claude Code、Codex、Antigravity、Kiro 之间项目上下文越来越不一致。

Vibe Coding SDD 的目标，是给 AI Coding 建立一个轻量但严格的“开发操作系统”。

## 核心概念

| 概念 | 作用 |
|---|---|
| **SDD** | 整套开发方法：用 Spec 驱动实现和验收。 |
| **Spec** | 定义“什么叫做对”。 |
| **BDD** | 从用户可观察行为定义验收标准，常用 Given / When / Then。 |
| **TDD / Testing** | 用测试证明重要行为真的正确，而不是相信代码。 |
| **DDD** | 复杂项目中按业务领域组织系统的可选架构方法。 |

## 三条主流程

### Small Change

适合文案、颜色、间距、简单 UI 和明确低风险的小修改。

`Understand → Implement → Verify → Report`

### Feature

适合新功能、业务逻辑、API、数据库、Auth、Payment、Integration、Architecture 等有意义的变化。

`Understand → Spec → Clarify → Impact → Design → Tasks → Implement → Test → Review → Browser QA → Converge`

### Bug

适合现有功能出现错误。

`Reproduce → Expected/Actual → Evidence → Root Cause → Impact → Fix Plan → Fix → Regression → Verify`

## Global 与 Project 的边界

只需要记住一句：

> **Global = 我怎么开发。**  
> **Project = 这个产品是什么。**

Global Rules 只放开发流程、安全、测试和 Review 原则。

具体项目使用的 Next.js、Supabase、Stripe、数据库表、API、SEO、UI、业务规则等，全部属于 Project Context。

推荐项目结构：

```text
project/
├── docs/
│   ├── product.md
│   ├── architecture.md
│   ├── tech-stack.md
│   └── testing.md
├── specs/
│   ├── active/
│   └── archive/
└── ...源码
```

## 什么才算 Done

以下任何一个都不能单独代表完成：

- 代码写完
- Build 成功
- Tests Passed
- AI 说 Done
- 页面看起来差不多

真正完成需要：

```text
Request / Spec
      ↕
Implementation
      ↕
Tests
      ↕
Observed Behavior
```

高风险或用户可见功能还应该完成 Code Review 和 Browser QA。

## 仓库结构

```text
core/                         稳定的核心方法论
skills/                       可复用 Agent Skills
adapters/                     各 Coding Agent 的适配层
  antigravity/
  claude-code/
  codex/
  kiro/
templates/
  project-context/
  specs/
UNIVERSAL_BOOTSTRAP_PROMPT.md
UNIVERSAL_BOOTSTRAP_PROMPT.zh-CN.md
bin/vibe-coding-sdd.js        一键安装器
```

## 当前支持

- Antigravity
- Claude Code
- Codex
- Kiro
- Generic / 其他支持 Agent Skills 的工具

核心方法论不绑定任何厂商。工具变化时，只需要更新 Adapter，而不是重写整套工作法。

## 不运行安装器也可以

直接把 [UNIVERSAL_BOOTSTRAP_PROMPT.zh-CN.md](UNIVERSAL_BOOTSTRAP_PROMPT.zh-CN.md) 整段复制给你的 Coding Agent，它会按照当前工具支持的 Rules / Skills 机制进行配置。

## 方法论原则

- 流程强度跟风险走，不制造 Markdown 官僚主义。
- Spec 定义 **WHAT**，Design 定义 **HOW**。
- 重要行为必须可观察、可验证。
- Bug 先找证据和 Root Cause，再修。
- Review 的目标是主动寻找“不完整”，而不是给自己盖章。
- 用户可见功能尽量进入真实 Browser 验收。
- 没有实际执行过的 Test / Verification，绝不能声称已经通过。

## 贡献

欢迎 Issue 和 Pull Request，见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## License

MIT，见 [LICENSE](LICENSE)。
