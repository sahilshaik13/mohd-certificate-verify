#!/usr/bin/env node
/**
 * Builds a QR code with the full certificate page embedded (data: URL).
 * No web hosting required — scanning opens the HTML in the phone browser.
 */
import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";
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

function buildMinimalHtml(c) {
  return `<!DOCTYPE html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>Certificate Verification</title><style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f4f4f4;font-family:Arial,sans-serif}.c{background:#fff;border:2px solid #004ae9;border-radius:15px;padding:24px;max-width:600px;width:90%;text-align:center;box-shadow:0 4px 8px rgba(0,0,0,.1)}h1{color:#004ae9;font-size:20px;margin:16px 0}.ok{width:64px;height:64px;margin:20px auto;background:green;color:#fff;border-radius:50%;line-height:64px;font-size:32px}table{margin:20px auto;width:85%;text-align:left;font-size:16px;border-collapse:collapse}td{padding:6px 4px}strong{color:#333}</style></head><body><div class=c><p style=margin:0;font-weight:bold>EduSkills Academy</p><div class=ok>&#10003;</div><h1>Your Certificate has been verified successfully</h1><table><tr><td><strong>Name:</strong></td><td>${c.holderName}</td></tr><tr><td><strong>Domain:</strong></td><td>${c.domain}</td></tr><tr><td><strong>Certificate Code:</strong></td><td>${c.certificateCode}</td></tr><tr><td><strong>Certificate Issue Date:</strong></td><td>${c.issueDate}</td></tr></table></div></body></html>`;
}

const html = buildMinimalHtml(certificate);
const qrPayload = `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;

const pngPath = path.join(dir, "mohd-abdul-rahman-certificate-qr.png");
const htmlPath = path.join(dir, "mohd-abdul-rahman-offline.html");
const jsonPath = path.join(dir, "mohd-abdul-rahman-certificate.json");

await writeFile(htmlPath, html, "utf8");

await QRCode.toFile(pngPath, qrPayload, {
  type: "png",
  width: 512,
  margin: 2,
  errorCorrectionLevel: "L",
});

const json = {
  schemaVersion: 2,
  certificateCode: certificate.certificateCode,
  status: "verified",
  hosting: "none",
  qr: {
    type: "data-uri",
    description:
      "Scan the PNG QR; payload is an embedded HTML page (not a hosted link).",
    payloadByteLength: Buffer.byteLength(qrPayload),
    imageFile: "mohd-abdul-rahman-certificate-qr.png",
  },
  page: {
    title: "Certificate Verification",
    headline: "Your Certificate has been verified successfully",
    holder: { name: certificate.holderName },
    domain: certificate.domain,
    issueDate: certificate.issueDate,
  },
  offlineHtmlFile: "mohd-abdul-rahman-offline.html",
};

await writeFile(jsonPath, `${JSON.stringify(json, null, 2)}\n`, "utf8");

console.log("Wrote:", pngPath);
console.log("Wrote:", htmlPath);
console.log("Wrote:", jsonPath);
console.log("QR payload bytes:", json.qr.payloadByteLength);
