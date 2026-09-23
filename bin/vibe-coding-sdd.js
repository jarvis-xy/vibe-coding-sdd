#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline/promises');
const { stdin, stdout } = require('process');

const PKG_ROOT = path.resolve(__dirname, '..');
const VERSION = require(path.join(PKG_ROOT, 'package.json')).version;
const AGENTS = ['antigravity', 'claude-code', 'codex', 'kiro', 'generic'];
const LANGS = ['en', 'zh-CN'];
const SCOPES = ['global', 'project'];
const SKILLS = ['feature', 'bugfix', 'small-change', 'code-review', 'browser-qa'];
const START = '<!-- vibe-coding-sdd:start -->';
const END = '<!-- vibe-coding-sdd:end -->';

function printHelp() {
  console.log(`\nVibe Coding SDD v${VERSION}\n\nUsage:\n  vibe-coding-sdd init [options]\n  vibe-coding-sdd doctor [options]\n\nOptions:\n  --agent <name>    antigravity | claude-code | codex | kiro | generic\n  --scope <scope>   global | project (default: global)\n  --lang <lang>     en | zh-CN\n  --target <path>   project target directory (only for --scope project; default: current directory)\n  --yes             accept defaults / non-interactive\n  --force           overwrite conflicting Vibe Coding SDD skill files (backs them up first)\n  --dry-run         show what would change without writing\n  -h, --help        show help\n\nExamples:\n  npx --yes github:jarvis-xy/vibe-coding-sdd init\n  npx --yes github:jarvis-xy/vibe-coding-sdd init --agent antigravity --scope global --lang zh-CN --yes\n`);
}

function parseArgs(argv) {
  const out = { command: 'init', target: process.cwd(), yes: false, force: false, dryRun: false };
  const args = [...argv];
  if (args[0] && !args[0].startsWith('-')) out.command = args.shift();
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--agent') out.agent = args[++i];
    else if (a === '--scope') out.scope = args[++i];
    else if (a === '--lang') out.lang = args[++i];
    else if (a === '--target') out.target = path.resolve(args[++i]);
    else if (a === '--yes' || a === '-y') out.yes = true;
    else if (a === '--force') out.force = true;
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--help' || a === '-h') out.help = true;
    else throw new Error(`Unknown option: ${a}`);
  }
  return out;
}

function exists(p) { return fs.existsSync(p); }
function read(p) { return fs.readFileSync(p, 'utf8'); }
function ensureDir(p, dryRun) { if (!dryRun) fs.mkdirSync(p, { recursive: true }); }
function nowStamp() { return new Date().toISOString().replace(/[:.]/g, '-'); }

function writeFileSafe(dest, content, opts, log) {
  ensureDir(path.dirname(dest), opts.dryRun);
  if (exists(dest)) {
    const old = read(dest);
    if (old === content) { log.push(`unchanged  ${dest}`); return; }
    if (!opts.force) { log.push(`skipped    ${dest} (exists; use --force to replace)`); return; }
    const backup = `${dest}.bak-${nowStamp()}`;
    if (!opts.dryRun) fs.copyFileSync(dest, backup);
    log.push(`backup     ${backup}`);
  }
  if (!opts.dryRun) fs.writeFileSync(dest, content, 'utf8');
  log.push(`${opts.dryRun ? 'would-write' : 'written'}    ${dest}`);
}

function upsertMarkedBlock(dest, content, opts, log) {
  ensureDir(path.dirname(dest), opts.dryRun);
  const block = `${START}\n${content.trim()}\n${END}`;
  let next;
  if (!exists(dest)) {
    next = `${block}\n`;
  } else {
    const old = read(dest);
    const start = old.indexOf(START);
    const end = old.indexOf(END);
    if (start >= 0 && end > start) {
      next = old.slice(0, start) + block + old.slice(end + END.length);
    } else {
      next = old.replace(/\s*$/, '') + `\n\n${block}\n`;
    }
    if (next === old) { log.push(`unchanged  ${dest}`); return; }
  }
  if (!opts.dryRun) fs.writeFileSync(dest, next, 'utf8');
  log.push(`${opts.dryRun ? 'would-update' : 'updated'}    ${dest}`);
}

function copySkillTree(destRoot, opts, log) {
  for (const skill of SKILLS) {
    const src = path.join(PKG_ROOT, 'skills', skill, 'SKILL.md');
    const dest = path.join(destRoot, skill, 'SKILL.md');
    writeFileSafe(dest, read(src), opts, log);
  }
}

function copyCommonBundle(destRoot, lang, opts, log) {
  const ruleName = lang === 'zh-CN' ? 'GLOBAL_RULES.zh-CN.md' : 'GLOBAL_RULES.md';
  const workflowName = lang === 'zh-CN' ? 'WORKFLOW.zh-CN.md' : 'WORKFLOW.md';
  writeFileSafe(path.join(destRoot, 'core', 'GLOBAL_RULES.md'), read(path.join(PKG_ROOT, 'core', ruleName)), opts, log);
  writeFileSafe(path.join(destRoot, 'core', 'WORKFLOW.md'), read(path.join(PKG_ROOT, 'core', workflowName)), opts, log);
  for (const sub of ['project-context', 'specs']) {
    const srcDir = path.join(PKG_ROOT, 'templates', sub);
    for (const name of fs.readdirSync(srcDir)) {
      writeFileSafe(path.join(destRoot, 'templates', sub, name), read(path.join(srcDir, name)), opts, log);
    }
  }
  writeFileSafe(path.join(destRoot, 'VERSION'), `${VERSION}\n`, opts, log);
}

function ruleText(lang) {
  const name = lang === 'zh-CN' ? 'GLOBAL_RULES.zh-CN.md' : 'GLOBAL_RULES.md';
  return read(path.join(PKG_ROOT, 'core', name));
}

function installProject(agent, target, lang, opts, log) {
  const bundle = path.join(target, '.vibe-coding-sdd');
  copyCommonBundle(bundle, lang, opts, log);
  const rules = ruleText(lang);

  if (agent === 'antigravity') {
    writeFileSafe(path.join(target, '.agents', 'rules', 'vibe-coding-sdd.md'), rules, opts, log);
    copySkillTree(path.join(target, '.agents', 'skills'), opts, log);
  } else if (agent === 'claude-code') {
    upsertMarkedBlock(path.join(target, 'CLAUDE.md'), rules, opts, log);
    copySkillTree(path.join(target, '.claude', 'skills'), opts, log);
  } else if (agent === 'codex') {
    upsertMarkedBlock(path.join(target, 'AGENTS.md'), rules, opts, log);
    copySkillTree(path.join(target, '.codex', 'skills'), opts, log);
  } else if (agent === 'kiro') {
    const steering = `---\ninclusion: always\n---\n\n${rules}`;
    writeFileSafe(path.join(target, '.kiro', 'steering', 'vibe-coding-sdd.md'), steering, opts, log);
    copySkillTree(path.join(target, '.kiro', 'skills'), opts, log);
  } else {
    writeFileSafe(path.join(bundle, 'GLOBAL_RULES.md'), rules, opts, log);
    copySkillTree(path.join(bundle, 'skills'), opts, log);
  }
}

function installGlobal(agent, lang, opts, log) {
  const home = os.homedir();
  const bundle = path.join(home, '.vibe-coding-sdd');
  copyCommonBundle(bundle, lang, opts, log);
  const rules = ruleText(lang);

  if (agent === 'antigravity') {
    upsertMarkedBlock(path.join(home, '.gemini', 'GEMINI.md'), rules, opts, log);
    copySkillTree(path.join(home, '.gemini', 'config', 'skills'), opts, log);
    // Antigravity CLI has a separate global skills location; installing to both keeps IDE and CLI aligned.
    copySkillTree(path.join(home, '.gemini', 'antigravity-cli', 'skills'), opts, log);
  } else if (agent === 'claude-code') {
    upsertMarkedBlock(path.join(home, '.claude', 'CLAUDE.md'), rules, opts, log);
    copySkillTree(path.join(home, '.claude', 'skills'), opts, log);
  } else if (agent === 'codex') {
    upsertMarkedBlock(path.join(home, '.codex', 'AGENTS.md'), rules, opts, log);
    copySkillTree(path.join(home, '.codex', 'skills'), opts, log);
  } else if (agent === 'kiro') {
    const steering = `---\ninclusion: always\n---\n\n${rules}`;
    writeFileSafe(path.join(home, '.kiro', 'steering', 'vibe-coding-sdd.md'), steering, opts, log);
    copySkillTree(path.join(home, '.kiro', 'skills'), opts, log);
  } else {
    writeFileSafe(path.join(bundle, 'GLOBAL_RULES.md'), rules, opts, log);
    copySkillTree(path.join(bundle, 'skills'), opts, log);
  }
}

async function choose(rl, label, values, defaultIndex = 0) {
  console.log(`\n${label}`);
  values.forEach((v, i) => console.log(`  ${i + 1}. ${v}${i === defaultIndex ? ' (default)' : ''}`));
  const answer = (await rl.question('> ')).trim();
  if (!answer) return values[defaultIndex];
  const idx = Number(answer) - 1;
  if (Number.isInteger(idx) && values[idx]) return values[idx];
  if (values.includes(answer)) return answer;
  throw new Error(`Invalid choice: ${answer}`);
}

async function normalizeOptions(opts) {
  if (opts.agent && !AGENTS.includes(opts.agent)) throw new Error(`Invalid --agent: ${opts.agent}`);
  if (opts.scope && !SCOPES.includes(opts.scope)) throw new Error(`Invalid --scope: ${opts.scope}`);
  if (opts.lang && !LANGS.includes(opts.lang)) throw new Error(`Invalid --lang: ${opts.lang}`);

  if (opts.yes) {
    return { ...opts, agent: opts.agent || 'generic', scope: opts.scope || 'global', lang: opts.lang || 'en' };
  }
  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    const agent = opts.agent || await choose(rl, 'Which coding agent?', AGENTS, 0);
    const scope = opts.scope || await choose(rl, 'Install scope? (global is recommended for the SDD methodology)', SCOPES, 0);
    const lang = opts.lang || await choose(rl, 'Rule language?', LANGS, 0);
    return { ...opts, agent, scope, lang };
  } finally {
    rl.close();
  }
}

function doctor(opts) {
  const target = path.resolve(opts.target || process.cwd());
  const home = os.homedir();
  const rows = [
    ['Antigravity project rule', path.join(target, '.agents', 'rules', 'vibe-coding-sdd.md')],
    ['Claude Code project rule', path.join(target, 'CLAUDE.md')],
    ['Codex project rule', path.join(target, 'AGENTS.md')],
    ['Kiro project rule', path.join(target, '.kiro', 'steering', 'vibe-coding-sdd.md')],
    ['Antigravity global rule', path.join(home, '.gemini', 'GEMINI.md')],
    ['Claude Code global rule', path.join(home, '.claude', 'CLAUDE.md')],
    ['Codex global rule', path.join(home, '.codex', 'AGENTS.md')],
    ['Kiro global rule', path.join(home, '.kiro', 'steering', 'vibe-coding-sdd.md')]
  ];
  console.log(`Vibe Coding SDD doctor v${VERSION}\n`);
  for (const [name, p] of rows) {
    let installed = false;
    if (exists(p)) {
      const c = read(p);
      installed = p.endsWith('vibe-coding-sdd.md') || c.includes(START) || c.includes('# Vibe Coding SDD');
    }
    console.log(`${installed ? '✓' : '·'} ${name}: ${p}`);
  }
}

async function main() {
  try {
    const raw = parseArgs(process.argv.slice(2));
    if (raw.help) return printHelp();
    if (raw.command === 'doctor') return doctor(raw);
    if (raw.command !== 'init') throw new Error(`Unknown command: ${raw.command}`);

    const opts = await normalizeOptions(raw);
    if (opts.scope === 'project' && path.resolve(opts.target) === path.resolve(os.homedir())) {
      throw new Error('Refusing to install project scope into your home directory. Use --scope global, or cd into a real project / pass --target <project-path>.');
    }
    const log = [];
    if (opts.scope === 'global') installGlobal(opts.agent, opts.lang, opts, log);
    else installProject(opts.agent, path.resolve(opts.target), opts.lang, opts, log);

    console.log(`\nVibe Coding SDD v${VERSION}`);
    console.log(`Agent: ${opts.agent}`);
    console.log(`Scope: ${opts.scope}`);
    console.log(`Language: ${opts.lang}`);
    if (opts.dryRun) console.log('Mode: dry-run');
    console.log('');
    log.forEach(line => console.log(line));
    console.log(`\n${opts.dryRun ? 'Dry run complete.' : 'Installation complete.'}`);
    console.log('Run `vibe-coding-sdd doctor` (or the same npx command with `doctor`) to inspect installation locations.');
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exitCode = 1;
  }
}

main();
