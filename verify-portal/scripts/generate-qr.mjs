#!/usr/bin/env node
import QRCode from "qrcode";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const code = process.argv[2] ?? "2026-0jdyhs6829";
const base =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://127.0.0.1:43124";

const raw = await readFile(
  path.join(root, "data", "certificates", `${code}.json`),
  "utf8",
);
const record = JSON.parse(raw);
const url = `${base}/${record.htmlFile}`;
const out = path.join(root, `qr-${code}.png`);

await QRCode.toFile(out, url, { width: 512, margin: 2 });
console.log("QR encodes:", url);
console.log("Saved:", out);
