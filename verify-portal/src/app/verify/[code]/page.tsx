import { getCertificate } from "@/lib/certificates";
import { certificateHtmlPath } from "@/lib/site-url";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ code: string }> };

/** Legacy path: send visitors to the static HTML file. */
export default async function VerifyRedirectPage({ params }: Props) {
  const { code } = await params;
  const record = await getCertificate(code);
  if (!record) {
    redirect("/");
  }
  redirect(certificateHtmlPath(record));
}
