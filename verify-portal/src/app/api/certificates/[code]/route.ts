import { getCertificate } from "@/lib/certificates";
import { verifyPublicUrl } from "@/lib/site-url";
import { NextResponse } from "next/server";

type Props = { params: Promise<{ code: string }> };

/** Full certificate webpage as JSON. QR codes should use `verifyUrl`, not this payload. */
export async function GET(_request: Request, { params }: Props) {
  const { code } = await params;
  const record = await getCertificate(code);
  if (!record) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const verifyUrl = await verifyPublicUrl(code);

  return NextResponse.json({
    ...record,
    verifyUrl,
  });
}
