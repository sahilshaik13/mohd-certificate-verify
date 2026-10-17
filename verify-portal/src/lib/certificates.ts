import { readFile } from "node:fs/promises";
import path from "node:path";

export type CertificatePage = {
  title: string;
  headline: string;
  logo: { src: string; alt: string };
  holder: { name: string };
  domain: string;
  issueDate: string;
  theme: {
    pageBackground: string;
    cardBackground: string;
    headlineColor: string;
    verifiedIconBackground: string;
  };
};

export type CertificateRecord = {
  schemaVersion: number;
  certificateCode: string;
  /** Filename under `public/` (static HTML). */
  htmlFile: string;
  status: string;
  page: CertificatePage;
  source?: Record<string, string>;
};

const dataDir = path.join(process.cwd(), "data", "certificates");

export async function getCertificate(
  code: string,
): Promise<CertificateRecord | null> {
  const safe = code.replace(/[^a-zA-Z0-9-]/g, "");
  if (!safe || safe !== code) {
    return null;
  }

  try {
    const raw = await readFile(path.join(dataDir, `${safe}.json`), "utf8");
    return JSON.parse(raw) as CertificateRecord;
  } catch {
    return null;
  }
}
