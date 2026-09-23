# 安装

[English](INSTALL.md)

## 一条命令安装

需要 Node.js 18+。

npm 包正式发布后：

```bash
npx vibe-coding-sdd init
```

在正式发布到 npm 之前，可以直接从 GitHub 安装：

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init
```

安装器会让你选择：

- Coding Agent：Antigravity / Claude Code / Codex / Kiro / Generic
- Scope：当前项目 / 全局
- Rule Language：English / 中文

### 直接安装示例

Antigravity，全局安装，中文规则：

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent antigravity --scope global --lang zh-CN --yes
```

Claude Code，安装到当前项目：

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent claude-code --scope project --lang zh-CN --yes
```

Codex，安装到当前项目：

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent codex --scope project --lang zh-CN --yes
```

Kiro，全局安装：

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent kiro --scope global --lang zh-CN --yes
```

## 安全策略

安装器默认采用保守策略：

- 已有 Instructions 文件使用带标记区块的方式 Merge，不整文件覆盖；
- 如果发现同名 Skill 已存在且内容不同，默认跳过；
- 只有显式使用 `--force` 才替换冲突 Skill，而且替换前会创建备份；
- `--dry-run` 可以只预览修改，不真正写文件；
- Project Scope 会同时把核心规则和模板保存到 `.vibe-coding-sdd/`。

例如：

```bash
# 只预览
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent codex --scope project --lang zh-CN --dry-run --yes

# 强制更新冲突 Skill（先备份）
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent codex --scope project --lang zh-CN --force --yes
```

## 检查安装

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd doctor
```

## 当前工具映射

| Agent | 项目级 Rules | 项目级 Skills | 全局 Rules | 全局 Skills |
|---|---|---|---|---|
| Antigravity | `.agents/rules/vibe-coding-sdd.md` | `.agents/skills/` | `~/.gemini/GEMINI.md` | `~/.gemini/config/skills/` + CLI 镜像 |
| Claude Code | `CLAUDE.md` | `.claude/skills/` | `~/.claude/CLAUDE.md` | `~/.claude/skills/` |
| Codex | `AGENTS.md` | `.codex/skills/` | `~/.codex/AGENTS.md` | `~/.codex/skills/` |
| Kiro | `.kiro/steering/vibe-coding-sdd.md` | `.kiro/skills/` | `~/.kiro/steering/vibe-coding-sdd.md` | `~/.kiro/skills/` |
| Generic | `.vibe-coding-sdd/` | `.vibe-coding-sdd/skills/` | `~/.vibe-coding-sdd/` | `~/.vibe-coding-sdd/skills/` |

Coding Agent 的配置路径会变化，因此 Adapter 层应保持轻量；真正稳定的 Source of Truth 是 `core/` 里的方法论。

## npm 发布

第一次 npm 发布和 Trusted Publishing 设置见 [RELEASE.zh-CN.md](RELEASE.zh-CN.md)。

## 手动安装

如果不想运行安装器，也可以把 `UNIVERSAL_BOOTSTRAP_PROMPT.zh-CN.md` 整段复制给 Coding Agent，让它根据自己当前版本支持的 Rules / Skills 机制完成配置。
