# Private GitHub repo + QR (one-time)

Your QR points to:

**https://shaiksahil.github.io/mohd-certificate-verify**

(Private repo is fine — the **Pages site is still public**, so anyone can scan the QR.)

## Steps (on your machine)

```bash
gh auth login
cd /path/to/this/project
./scripts/setup-github-private.sh
```

That creates **`shaiksahil/mohd-certificate-verify`** (private), pushes `main`, and rebuilds:

`certificate-capture/mohd-abdul-rahman-certificate-qr.png`

If Pages is not live yet:

1. Open https://github.com/shaiksahil/mohd-certificate-verify/settings/pages  
2. **Build and deployment → Source: GitHub Actions**  
3. Re-run the **GitHub Pages** workflow under Actions.

## QR file

`certificate-capture/mohd-abdul-rahman-certificate-qr.png`
