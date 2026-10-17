import { getCertificate } from "@/lib/certificates";
import { certificateHtmlPublicUrl } from "@/lib/site-url";
import QRCode from "qrcode";
import { NextResponse } from "next/server";

type Props = { params: Promise<{ code: string }> };

/** PNG QR code encodes the static HTML file URL only (not JSON, not /verify/…). */
export async function GET(_request: Request, { params }: Props) {
  const { code } = await params;
  const record = await getCertificate(code);
  if (!record) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const url = certificateHtmlPublicUrl(record);
  const png = await QRCode.toBuffer(url, {
    type: "png",
    width: 512,
    margin: 2,
    errorCorrectionLevel: "M",
  });

  return new NextResponse(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
      "X-QR-Encodes": url,
    },
  });
}
