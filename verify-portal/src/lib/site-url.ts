import type { CertificateRecord } from "@/lib/certificates";

/** Public base URL for links encoded in QR codes (URL only, never JSON). */
export function getSiteBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://127.0.0.1:43124"
  );
}

/** Static certificate page path (served from `public/`, no app server route). */
export function certificateHtmlPath(record: CertificateRecord): string {
  return `/${record.htmlFile}`;
}

/** Full URL to the hosted HTML file — use this inside QR codes. */
export function certificateHtmlPublicUrl(record: CertificateRecord): string {
  return `${getSiteBaseUrl()}${certificateHtmlPath(record)}`;
}
