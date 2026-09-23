# Release & npm Publishing

[中文发布说明](RELEASE.zh-CN.md)

## Goal

After the package is published to npm, users can install with:

```bash
npx vibe-coding-sdd init
```

## First publish (one-time)

The first npm publication requires an npm account with 2FA enabled.

1. Confirm the package name is available on npm.
2. Log in locally:
   ```bash
   npm login
   ```
3. From the repository root:
   ```bash
   npm test
   npm pack --dry-run
   npm publish --access public
   ```

After the first publish, configure npm Trusted Publishing for this package:

- Provider: GitHub Actions
- GitHub owner: `jarvis-xy`
- Repository: `vibe-coding-sdd`
- Workflow filename: `publish.yml`
- Allow direct publish: enabled

The repository already includes `.github/workflows/publish.yml`.

## Future releases

1. Bump `package.json` version.
2. Update `CHANGELOG.md`.
3. Create a GitHub Release/tag such as `v0.3.1`.
4. The publish workflow runs tests, validates the package, and publishes to npm using OIDC.

No long-lived npm token is required once Trusted Publishing is configured.

## Security

- The publish job uses GitHub-hosted runners.
- It requests `id-token: write` only for npm OIDC.
- The job has `contents: read` only.
- Tests and `npm pack --dry-run` run before publish.
- npm provenance is generated automatically when Trusted Publishing is active for a public repository/package.
