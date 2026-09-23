# 发布与 npm 上架

[English](RELEASE.md)

## 目标

发布到 npm 后，任何用户都可以直接：

```bash
npx vibe-coding-sdd init
```

## 第一次发布（只需要一次）

第一次创建 npm 包需要你的 npm 账号，并建议开启 2FA。

1. 在 npm 确认 `vibe-coding-sdd` 包名仍可用。
2. 本地登录：
   ```bash
   npm login
   ```
3. 在仓库根目录运行：
   ```bash
   npm test
   npm pack --dry-run
   npm publish --access public
   ```

第一次发布完成后，在 npm 包设置中配置 Trusted Publishing：

- Provider：GitHub Actions
- GitHub owner：`jarvis-xy`
- Repository：`vibe-coding-sdd`
- Workflow filename：`publish.yml`
- 允许 direct publish

仓库已经包含 `.github/workflows/publish.yml`。

## 以后发布新版本

1. 修改 `package.json` version。
2. 更新 `CHANGELOG.md`。
3. 在 GitHub 创建 Release / tag，例如 `v0.3.1`。
4. GitHub Actions 自动运行测试、检查包内容，并通过 OIDC 发布到 npm。

配置 Trusted Publishing 后，不需要在 GitHub 保存长期 npm token。

## 安全设计

- 使用 GitHub-hosted runner。
- 只给发布 Job `id-token: write`，用于 npm OIDC。
- Repository 权限只有 `contents: read`。
- 发布前强制执行测试和 `npm pack --dry-run`。
- 公开仓库 + Trusted Publishing 会由 npm 自动生成 provenance。
