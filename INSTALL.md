# Installation

[中文安装说明](INSTALL.zh-CN.md)

## One-command install

Requires Node.js 18+.

After the npm package is published:

```bash
npx vibe-coding-sdd init
```

Until then, install directly from GitHub:

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init
```

The installer asks for:

- coding agent: Antigravity / Claude Code / Codex / Kiro / Generic
- scope: project / global
- rule language: English / 中文

### Non-interactive examples

Antigravity, global, Chinese rules:

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent antigravity --scope global --lang zh-CN --yes
```

Claude Code, current project:

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent claude-code --scope project --lang en --yes
```

Codex, current project:

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent codex --scope project --lang en --yes
```

Kiro, global:

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent kiro --scope global --lang en --yes
```

## Safety behavior

The installer is conservative by default:

- existing instruction files are merged using a marked Vibe Coding SDD block;
- existing conflicting skill files are skipped;
- `--force` backs up a conflicting file before replacing it;
- `--dry-run` shows what would change without writing files;
- project installs also keep a copy of core rules and templates under `.vibe-coding-sdd/`.

Examples:

```bash
# Preview installation
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent codex --scope project --dry-run --yes

# Update conflicting skill files (with backups)
npx --yes github:jarvis-xy/vibe-coding-sdd init --agent codex --scope project --force --yes
```

## Verify installation

```bash
npx --yes github:jarvis-xy/vibe-coding-sdd doctor
```

## Current mappings

| Agent | Project rules | Project skills | Global rules | Global skills |
|---|---|---|---|---|
| Antigravity | `.agents/rules/vibe-coding-sdd.md` | `.agents/skills/` | `~/.gemini/GEMINI.md` | `~/.gemini/config/skills/` + CLI mirror |
| Claude Code | `CLAUDE.md` | `.claude/skills/` | `~/.claude/CLAUDE.md` | `~/.claude/skills/` |
| Codex | `AGENTS.md` | `.codex/skills/` | `~/.codex/AGENTS.md` | `~/.codex/skills/` |
| Kiro | `.kiro/steering/vibe-coding-sdd.md` | `.kiro/skills/` | `~/.kiro/steering/vibe-coding-sdd.md` | `~/.kiro/skills/` |
| Generic | `.vibe-coding-sdd/` | `.vibe-coding-sdd/skills/` | `~/.vibe-coding-sdd/` | `~/.vibe-coding-sdd/skills/` |

Because coding-agent configuration evolves, adapter mappings should remain small and versioned. The methodology under `core/` is the stable source of truth.

## npm publishing

See [RELEASE.md](RELEASE.md) for the one-time first publish and Trusted Publishing setup.

## Manual installation

If you do not want the installer, copy `UNIVERSAL_BOOTSTRAP_PROMPT.md` into your coding agent and ask it to configure itself using its current native Rules / Skills mechanism.
