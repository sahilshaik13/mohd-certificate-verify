/** Public base URL for links encoded in QR codes (URL only, never JSON). */
export function getSiteBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://127.0.0.1:43124"
  );
}

export function verifyPath(certificateCode: string): string {
  return `/verify/${certificateCode}`;
}

export function verifyPublicUrl(certificateCode: string): string {
  return `${getSiteBaseUrl()}${verifyPath(certificateCode)}`;
}
