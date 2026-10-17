import { CertificateView } from "@/components/CertificateView";
import { getCertificate } from "@/lib/certificates";
import { verifyPublicUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const record = await getCertificate(code);
  const publicUrl = await verifyPublicUrl(code);
  return {
    title: record?.page.title ?? "Certificate not found",
    alternates: record ? { canonical: publicUrl } : undefined,
  };
}

export default async function VerifyPage({ params }: Props) {
  const { code } = await params;
  const record = await getCertificate(code);
  if (!record) {
    notFound();
  }

  return <CertificateView record={record} />;
}
