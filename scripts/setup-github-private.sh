#!/usr/bin/env bash
set -euo pipefail

REPO="${GITHUB_REPO:-mohd-certificate-verify}"
BRANCH="${GITHUB_BRANCH:-main}"

if ! command -v gh >/dev/null; then
  echo "Install GitHub CLI: https://cli.github.com/"
  exit 1
fi

if ! gh auth status -h github.com >/dev/null 2>&1; then
  echo "Log in first: gh auth login"
  exit 1
fi

# Default to the account you are logged into (avoids creating under another user/org).
OWNER="${GITHUB_OWNER:-$(gh api user -q .login)}"
if [[ -z "$OWNER" ]]; then
  echo "Could not detect GitHub user. Set GITHUB_OWNER."
  exit 1
fi

echo "Using GitHub account: $OWNER"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if gh repo view "$OWNER/$REPO" >/dev/null 2>&1; then
  echo "Repo $OWNER/$REPO already exists."
  if ! git remote get-url github >/dev/null 2>&1; then
    git remote add github "https://github.com/$OWNER/$REPO.git"
  fi
else
  gh repo create "$REPO" --private --source=. --remote=github --push
fi

git push github "$BRANCH" 2>/dev/null || git push -u github "$BRANCH"

PAGES_URL="https://${OWNER}.github.io/${REPO}"

echo "If this is a new repo, enable Pages once:"
echo "  https://github.com/$OWNER/$REPO/settings/pages"
echo "  Source: GitHub Actions"
gh workflow run "GitHub Pages" -R "$OWNER/$REPO" 2>/dev/null || true

CONFIG="$ROOT/certificate-capture/public-url.config.json"
node -e "
const fs=require('fs');
const p='$CONFIG';
const j=JSON.parse(fs.readFileSync(p,'utf8'));
j.githubOwner='$OWNER';
j.githubRepo='$REPO';
j.githubBranch='$BRANCH';
j.publicUrl='$PAGES_URL';
fs.writeFileSync(p, JSON.stringify(j,null,2)+'\n');
"

export PATH="${PATH}:$HOME/.nvm/versions/node/v22.19.0/bin"
(cd "$ROOT/verify-portal" && npm run build-offline-qr)

echo ""
echo "Done. QR: $ROOT/certificate-capture/mohd-abdul-rahman-certificate-qr.png"
echo "Scan opens: $PAGES_URL"
