# Private GitHub repo + QR (one-time)

Uses the GitHub account from `gh auth login` (e.g. **sahilshaik13**).

Your QR points to:

**https://sahilshaik13.github.io/mohd-certificate-verify**

(Private repo is fine — the **Pages site is still public**.)

## Steps

```bash
gh auth login
cd /path/to/this/project
./scripts/setup-github-private.sh
```

Optional override:

```bash
GITHUB_OWNER=sahilshaik13 GITHUB_REPO=mohd-certificate-verify ./scripts/setup-github-private.sh
```

Do **not** set `GITHUB_OWNER` to another user unless you have permission to create repos there.

If Pages is not live yet:

1. `https://github.com/sahilshaik13/mohd-certificate-verify/settings/pages`
2. **Build and deployment → Source: GitHub Actions**
3. Re-run **GitHub Pages** under Actions.

## QR file

`certificate-capture/mohd-abdul-rahman-certificate-qr.png`
