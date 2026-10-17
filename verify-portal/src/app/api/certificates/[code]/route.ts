import { getCertificate } from "@/lib/certificates";
import { certificateHtmlPublicUrl } from "@/lib/site-url";
import { NextResponse } from "next/server";

type Props = { params: Promise<{ code: string }> };

/** Certificate webpage as JSON. `verifyUrl` is the static HTML file URL for QR codes. */
export async function GET(_request: Request, { params }: Props) {
  const { code } = await params;
  const record = await getCertificate(code);
  if (!record) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const verifyUrl = certificateHtmlPublicUrl(record);

  return NextResponse.json({
    ...record,
    verifyUrl,
  });
}
