# Certificate verification

## Why the old QR did not work on your phone

Most phone cameras **cannot open `data:` links** from a QR code. They only reliably open normal **`https://`** URLs.

The QR is now built with an **https** link to your certificate page.

## Make the QR work (free, no server to run)

You do **not** need to run Next.js or any server. You only need the HTML on a **public https URL** once.

### Option A — GitHub (recommended)

1. Create/sync this project to a **public** GitHub repository.
2. In GitHub: **Settings → Pages → Build and deployment → GitHub Actions** (workflow in `.github/workflows/pages.yml` is included).
3. After the workflow runs, set in `public-url.config.json`:
   ```json
   "publicUrl": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
   ```
4. Rebuild the QR:
   ```bash
   cd verify-portal && npm run build-offline-qr
   ```
5. Scan **`mohd-abdul-rahman-certificate-qr.png`**.

### Option B — jsDelivr (public GitHub repo, no Pages setup)

1. Push to a **public** GitHub repo.
2. Edit `public-url.config.json` (`githubOwner`, `githubRepo`) if needed.
3. Run `npm run build-offline-qr` from `verify-portal`.
4. Default QR URL: `https://cdn.jsdelivr.net/gh/OWNER/REPO@main/docs/index.html`

### No GitHub at all — open the file on the phone (no QR)

Send yourself **`Mohd-Abdul-Rahman-2026-0jdyhs6829-certificate-verification.html`** (WhatsApp, email, Drive, USB). Open it in **Chrome/Safari** — full page with logo, no hosting.

QR codes **always** need a reachable https link; they cannot replace sharing the HTML file when you refuse any hosting.

## Files

| File | Purpose |
|------|---------|
| `mohd-abdul-rahman-certificate-qr.png` | Scan after https URL is live |
| `public-url.config.json` | URL encoded in the QR |
| `mohd-abdul-rahman-certificate.json` | Metadata + `verifyUrl` |
| `../docs/index.html` | Page deployed to GitHub Pages |
