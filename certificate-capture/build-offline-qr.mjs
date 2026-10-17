#!/usr/bin/env node
/**
 * Builds a QR code with a normal https:// URL (required for phone cameras).
 * data: URIs in QR codes are not opened by most iOS/Android scanners.
 */
import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(
  path.join(dir, "..", "verify-portal", "package.json"),
);
const QRCode = require("qrcode");

const certificate = {
  certificateCode: "2026-0jdyhs6829",
  holderName: "Mohd Abdul Rahman",
  domain: "Java Full Stack",
  issueDate: "2026-03-03",
};

function resolvePublicUrl(config) {
  const explicit = config.publicUrl?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }
  const owner = config.githubOwner?.trim();
  const repo = config.githubRepo?.trim();
  const branch = config.githubBranch?.trim() || "main";
  if (owner && repo) {
    return `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/docs/index.html`;
  }
  throw new Error(
    "Set publicUrl or githubOwner/githubRepo in public-url.config.json",
  );
}

const config = JSON.parse(
  await readFile(path.join(dir, "public-url.config.json"), "utf8"),
);
const pageUrl = resolvePublicUrl(config);

const pngPath = path.join(dir, "mohd-abdul-rahman-certificate-qr.png");
const jsonPath = path.join(dir, "mohd-abdul-rahman-certificate.json");

await QRCode.toFile(pngPath, pageUrl, {
  type: "png",
  width: 512,
  margin: 2,
  errorCorrectionLevel: "M",
});

const json = {
  schemaVersion: 3,
  certificateCode: certificate.certificateCode,
  status: "verified",
  verifyUrl: pageUrl,
  qr: {
    type: "url",
    imageFile: "mohd-abdul-rahman-certificate-qr.png",
    note: "Phone cameras open https links only; data: URIs are not supported.",
  },
  page: {
    title: "Certificate Verification",
    headline: "Your Certificate has been verified successfully",
    holder: { name: certificate.holderName },
    domain: certificate.domain,
    issueDate: certificate.issueDate,
  },
  localHtmlFiles: [
    "Mohd-Abdul-Rahman-2026-0jdyhs6829-certificate-verification.html",
    "mohd-abdul-rahman-offline.html",
  ],
};

await writeFile(jsonPath, `${JSON.stringify(json, null, 2)}\n`, "utf8");

console.log("QR encodes (https):", pageUrl);
console.log("Wrote:", pngPath);
console.log("Wrote:", jsonPath);
if (!config.publicUrl?.trim()) {
  console.log(
    "\nNote: jsDelivr URL works after this repo is public on GitHub.",
  );
  console.log(
    "Or set publicUrl in public-url.config.json (e.g. GitHub Pages URL).",
  );
}
