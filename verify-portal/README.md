# Certificate verify portal

Certificate **data** is JSON. What you put in a **QR code** is only the URL of the **static HTML file** in `public/`.

## Static hosting (no app server required)

Upload to any static host (S3, GitHub Pages, Netlify, etc.):

- `public/Mohd-Abdul-Rahman-2026-0jdyhs6829-certificate-verification.html`
- `public/academy_logo.png`

QR payload example:

`https://your-domain.example/Mohd-Abdul-Rahman-2026-0jdyhs6829-certificate-verification.html`

Set `NEXT_PUBLIC_SITE_URL` when using the optional Next app to generate the QR PNG locally.

## Optional local tooling

```bash
npm install
npm run dev
```

- HTML: http://127.0.0.1:43124/Mohd-Abdul-Rahman-2026-0jdyhs6829-certificate-verification.html
- JSON API: http://127.0.0.1:43124/api/certificates/2026-0jdyhs6829 (`verifyUrl` = HTML file URL)
- QR PNG: http://127.0.0.1:43124/api/qr/2026-0jdyhs6829

`/verify/<code>` redirects to the HTML file for convenience only.
