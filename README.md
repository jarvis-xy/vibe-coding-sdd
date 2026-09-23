<div align="center">

# 🧭 Vibe Coding SDD

### 给 Claude Code、Codex、Antigravity、Kiro 和其他 AI Coding Agent 一套统一的 SDD 开发流程

**先定义，再开发；先验证，再完成。**

把“想到一句就让 AI 改一句”的 Vibe Coding，升级成可重复、可测试、可 Review、可验收、可回滚的工程流程。

[English](README.en.md) · [安装说明](INSTALL.zh-CN.md) · [发布说明](RELEASE.zh-CN.md) · [初始化提示词](UNIVERSAL_BOOTSTRAP_PROMPT.zh-CN.md)

<br/>

[![STAR ON GITHUB](https://img.shields.io/github/stars/jarvis-xy/vibe-coding-sdd?style=for-the-badge&logo=github&label=STAR%20ON%20GITHUB)](https://github.com/jarvis-xy/vibe-coding-sdd/stargazers)
[![VERSION](https://img.shields.io/badge/VERSION-v0.3.0-ff7a35?style=for-the-badge)](CHANGELOG.md)
[![CI](https://img.shields.io/github/actions/workflow/status/jarvis-xy/vibe-coding-sdd/installer-test.yml?branch=main&style=for-the-badge&label=CI)](https://github.com/jarvis-xy/vibe-coding-sdd/actions)

[![NODE](https://img.shields.io/badge/NODE-%3E%3D18-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)](package.json)
[![LICENSE](https://img.shields.io/github/license/jarvis-xy/vibe-coding-sdd?style=for-the-badge&label=LICENSE)](LICENSE)
[![AGENTS](https://img.shields.io/badge/AGENTS-Antigravity%20%7C%20Claude%20Code%20%7C%20Codex%20%7C%20Kiro-5b5bd6?style=for-the-badge)](#支持的-coding-agent)

<br/>

### 让 AI Coding 从“能写代码”变成“按流程把产品真正做对”

| 指标 | 普通 Vibe Coding | Vibe Coding SDD |
| --- | --- | --- |
| **需求定义** | 边聊边猜 | Spec 先定义“什么叫对” |
| **复杂功能** | 一次性让 AI 大改 | Design → Tasks → Task-by-Task |
| **Bug 修复** | 先 Patch 症状 | Reproduce → Evidence → Root Cause |
| **质量控制** | AI 自己写、自己说完成 | Tests → Review → Browser QA |
| **项目上下文** | 分散在多个对话里 | Global Rules + Project Context |
| **完成标准** | 代码写完 / Build 成功 | Spec ↔ Implementation ↔ Tests ↔ Behavior |

<br/>

[![TRY IT](https://img.shields.io/badge/TRY%20IT-npx%20vibe--coding--sdd%20init-ef4444?style=for-the-badge)](#快速开始)

</div>

---

## 目录

- [介绍](#介绍)
- [为什么选择 Vibe Coding SDD？](#为什么选择-vibe-coding-sdd)
- [核心方法](#核心方法)
- [三条标准工作流](#三条标准工作流)
- [快速开始](#快速开始)
- [安装](#安装)
- [支持的 Coding Agent](#支持的-coding-agent)
- [Global 与 Project](#global-与-project)
- [项目结构](#项目结构)
- [Definition of Done](#definition-of-done)
- [仓库结构](#仓库结构)
- [手动配置](#手动配置)
- [贡献](#贡献)
- [许可证](#许可证)

---

## 介绍

**Vibe Coding SDD** 是一套面向 AI Coding 的轻量工程方法。

它不是新的编程框架，也不绑定某一个模型，而是给 Claude Code、Codex、Antigravity、Kiro 等 Coding Agent 一套统一的开发纪律：

```text
任务分类
   ↓
Spec
   ↓
Design
   ↓
Tasks
   ↓
Coding
   ↓
Tests
   ↓
Review
   ↓
Browser QA
   ↓
Converge
   ↓
Done
```

核心目标只有一个：

> **让 AI 不只是“会写代码”，而是按照一套可验证的工程流程把产品真正做对。**

---

## 为什么选择 Vibe Coding SDD？

Vibe Coding 很快，但没有标准流程时，项目很容易出现这些问题：

- 需求还没定义清楚，AI 已经开始写代码；
- 大改动没有做 Impact Analysis；
- Bug 只修症状，不找 Root Cause；
- 同一个 AI 自己开发、自己 Review、自己宣布完成；
- Tests 没有真正执行，却被描述成“已通过”；
- 源码看起来正常，真实 Browser 里却不能用；
- Claude Code、Codex、Antigravity、Kiro 之间项目上下文越来越不一致。

Vibe Coding SDD 把这些问题统一收敛到一套标准流程中。

---

## 核心方法

| 概念 | 它解决什么问题 |
| --- | --- |
| **SDD** | 整套开发方法：先定义，再开发，用 Spec 驱动实现和验收 |
| **Spec** | 定义“什么叫做对” |
| **BDD** | 从用户可观察行为定义验收标准，常用 Given / When / Then |
| **TDD / Testing** | 用测试证明重要逻辑真的正确，而不是相信 AI 写出来的代码 |
| **DDD** | 复杂项目中按业务领域组织系统的可选架构方法 |

最重要的关系：

> **Spec 是文件 / 约定，SDD 是围绕 Spec 运转的一整套开发方式。**

---

## 三条标准工作流

### 1. Small Change

适合：

- 文案
- 颜色
- 间距
- 简单 UI
- 明确低风险的小修改

```text
Understand → Implement → Verify → Report
```

如果过程中发现涉及 Database、Auth、Payment、Business Logic、API、Architecture 或 Security，立即升级为 Feature / Bug 流程。

### 2. Feature

适合：

- 新功能
- 业务逻辑
- API
- Database
- Auth
- Payment
- Integration
- Architecture

```text
Understand
→ Requirements
→ Spec
→ Clarify
→ Impact Analysis
→ Technical Design
→ Tasks
→ Git Safety Point
→ Implement
→ Test
→ Code Review
→ Browser QA
→ Converge
→ Done
```

### 3. Bug

适合现有功能已经出现错误：

```text
Reproduce
→ Expected / Actual
→ Evidence
→ Root Cause
→ Impact
→ Fix Plan
→ Fix
→ Regression Test
→ Verify
→ Done
```

原则：

> **未经证据验证的解释只能叫 Hypothesis，不能叫 Root Cause。**

---

## 快速开始

你不需要先理解整个仓库。

现在就可以直接从 GitHub 一键运行安装器：

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init
```

安装器会让你选择：

1. 使用哪个 Coding Agent；
2. 安装到当前 Project 还是 Global；
3. 使用中文还是英文 Rules。

如果之后 npm 包完成正式发布，命令会进一步缩短为：

```bash
npx vibe-coding-sdd init
```

---

## 安装

### Antigravity · 全局 · 中文

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init \
  --agent antigravity \
  --scope global \
  --lang zh-CN \
  --yes
```

### Claude Code · 当前项目 · 中文

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init \
  --agent claude-code \
  --scope project \
  --lang zh-CN \
  --yes
```

### Codex · 当前项目 · 中文

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init \
  --agent codex \
  --scope project \
  --lang zh-CN \
  --yes
```

### Kiro · 全局 · 中文

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init \
  --agent kiro \
  --scope global \
  --lang zh-CN \
  --yes
```

### 安全选项

```bash
# 只预览，不真正修改
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent codex --scope project --dry-run --yes

# 强制更新冲突 Skill；更新前自动备份
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent codex --scope project --force --yes

# 检查安装状态
npx --yes github:jarvis-xy/vibe-coding-sdd doctor
```

完整说明见 [INSTALL.zh-CN.md](INSTALL.zh-CN.md)。

---

## 支持的 Coding Agent

| Coding Agent | Project Rules | Project Skills | Global Rules | Global Skills |
| --- | --- | --- | --- | --- |
| **Antigravity** | `.agents/rules/` | `.agents/skills/` | `~/.gemini/GEMINI.md` | `~/.gemini/config/skills/` |
| **Claude Code** | `CLAUDE.md` | `.claude/skills/` | `~/.claude/CLAUDE.md` | `~/.claude/skills/` |
| **Codex** | `AGENTS.md` | `.codex/skills/` | `~/.codex/AGENTS.md` | `~/.codex/skills/` |
| **Kiro** | `.kiro/steering/` | `.kiro/skills/` | `~/.kiro/steering/` | `~/.kiro/skills/` |
| **Generic** | `.vibe-coding-sdd/` | `.vibe-coding-sdd/skills/` | `~/.vibe-coding-sdd/` | `~/.vibe-coding-sdd/skills/` |

工具本身可以不断变化，但核心方法论不绑定任何厂商。

---

## Global 与 Project

这是整套方法最重要的边界：

> **Global = 我怎么开发。**  
> **Project = 这个产品是什么。**

### Global 应该包含

- SDD
- Spec 规则
- Feature / Bug / Small Change 工作流
- Testing
- Code Review
- Browser QA
- Git Safety
- Definition of Done

### Project 应该包含

- 产品定位
- 用户
- Tech Stack
- Architecture
- Database
- API
- Auth
- Payment
- UI
- SEO
- Deployment
- 当前 Feature Specs

不要把某个项目的 Next.js、Supabase、Stripe 等事实写入全局规则。

---

## 项目结构

推荐：

```text
project/
├── docs/
│   ├── product.md
│   ├── architecture.md
│   ├── tech-stack.md
│   └── testing.md
│
├── specs/
│   ├── active/
│   └── archive/
│
└── ...源码
```

对于一个正式 Feature：

```text
specs/active/<feature-name>/
├── spec.md
├── design.md
├── tasks.md
├── review.md
└── qa-report.md
```

这些文件不要求机械全部生成，复杂度应该跟风险成比例。

---

## Definition of Done

以下任何一个都不能单独代表完成：

- Code Written
- Build Passed
- Tests Passed
- AI Says Done
- 页面“看起来差不多”

真正的 Done：

```text
Request / Spec
      ↕
Implementation
      ↕
Tests
      ↕
Observed Behavior
```

高风险或用户可见功能还应该满足：

```text
Code Review ✅
Browser QA ✅
```

---

## 仓库结构

```text
vibe-coding-sdd/
├── core/                         # 核心方法论
│   ├── GLOBAL_RULES.md
│   ├── GLOBAL_RULES.zh-CN.md
│   ├── WORKFLOW.md
│   └── WORKFLOW.zh-CN.md
│
├── skills/                       # 可复用 Agent Skills
│   ├── feature/
│   ├── bugfix/
│   ├── small-change/
│   ├── code-review/
│   └── browser-qa/
│
├── adapters/                     # 各工具适配层
│   ├── antigravity/
│   ├── claude-code/
│   ├── codex/
│   └── kiro/
│
├── templates/
│   ├── project-context/
│   └── specs/
│
├── bin/
│   └── vibe-coding-sdd.js        # 一键安装器
│
├── UNIVERSAL_BOOTSTRAP_PROMPT.md
├── UNIVERSAL_BOOTSTRAP_PROMPT.zh-CN.md
└── package.json
```

---

## 手动配置

如果你不想运行任何安装器，可以直接把：

**[UNIVERSAL_BOOTSTRAP_PROMPT.zh-CN.md](UNIVERSAL_BOOTSTRAP_PROMPT.zh-CN.md)**

整段复制给你的 Coding Agent。

它会根据自己当前版本真正支持的 Rules / Skills / Instructions 机制配置这套工作流。

---

## 贡献

欢迎：

- Issue
- Pull Request
- 新 Coding Agent Adapter
- Workflow 改进
- Skill 改进
- 中文 / 英文文档改进

贡献说明见 [CONTRIBUTING.md](CONTRIBUTING.md)。

---

## 许可证

MIT License，见 [LICENSE](LICENSE)。

---

<div align="center">

**如果这套方法对你的 AI Coding 有帮助，欢迎点一个 ⭐ Star。**

**Build with AI. Verify like an engineer.**

</div>
