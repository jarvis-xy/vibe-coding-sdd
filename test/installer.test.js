const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const cli = path.join(root, 'bin', 'vibe-coding-sdd.js');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'vibe-coding-sdd-test-'));
const globalHome = fs.mkdtempSync(path.join(os.tmpdir(), 'vibe-coding-sdd-home-'));

function run(args, env = {}) {
  const r = spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8', env: { ...process.env, ...env } });
  if (r.status !== 0) throw new Error(`${r.stdout}\n${r.stderr}`);
  return r.stdout;
}

// Global is the default install scope for the reusable methodology.
run(['init', '--agent', 'codex', '--lang', 'en', '--yes'], { HOME: globalHome });
if (!fs.existsSync(path.join(globalHome, '.codex', 'AGENTS.md'))) throw new Error('Default global Codex AGENTS.md not created');
if (!fs.existsSync(path.join(globalHome, '.codex', 'skills', 'feature', 'SKILL.md'))) throw new Error('Default global Codex feature skill not installed');

// Explicit project scope remains available for repository-local overrides/context.
run(['init', '--agent', 'codex', '--scope', 'project', '--lang', 'en', '--target', tmp, '--yes']);
if (!fs.existsSync(path.join(tmp, 'AGENTS.md'))) throw new Error('AGENTS.md not created');
if (!fs.existsSync(path.join(tmp, '.codex', 'skills', 'feature', 'SKILL.md'))) throw new Error('Codex feature skill not installed');
if (!fs.existsSync(path.join(tmp, '.vibe-coding-sdd', 'templates', 'specs', 'feature-spec.md'))) throw new Error('Templates not installed');

const before = fs.readFileSync(path.join(tmp, 'AGENTS.md'), 'utf8');
run(['init', '--agent', 'codex', '--scope', 'project', '--lang', 'en', '--target', tmp, '--yes']);
const after = fs.readFileSync(path.join(tmp, 'AGENTS.md'), 'utf8');
if (before !== after) throw new Error('Repeated install should be idempotent for marked rule block');

const dry = fs.mkdtempSync(path.join(os.tmpdir(), 'vibe-coding-sdd-dry-'));
run(['init', '--agent', 'kiro', '--scope', 'project', '--lang', 'zh-CN', '--target', dry, '--yes', '--dry-run']);
if (fs.existsSync(path.join(dry, '.kiro'))) throw new Error('Dry run wrote files');

const homeProjectAttempt = spawnSync(process.execPath, [cli, 'init', '--agent', 'codex', '--scope', 'project', '--lang', 'en', '--target', globalHome, '--yes'], { encoding: 'utf8', env: { ...process.env, HOME: globalHome } });
if (homeProjectAttempt.status === 0) throw new Error('Project install into home directory should be rejected');

console.log('installer tests passed');
