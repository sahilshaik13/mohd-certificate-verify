# Certificate verify portal

Store the full certificate page in JSON, serve it at a short URL, and put **only that URL** in the QR code.

## Flow

1. Edit `data/certificates/<code>.json` (page content).
2. Deploy this app and set `NEXT_PUBLIC_SITE_URL` to your public origin.
3. QR image at `/api/qr/<code>` encodes `https://your-domain/verify/<code>` — not the JSON.
4. JSON API at `/api/certificates/<code>` for integrations.

## Local run

```bash
npm install
npm run dev
```

Open http://127.0.0.1:43124 for the demo QR and links.
