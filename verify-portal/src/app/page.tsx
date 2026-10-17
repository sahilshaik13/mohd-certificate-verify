import { getCertificate } from "@/lib/certificates";
import { certificateHtmlPath, certificateHtmlPublicUrl } from "@/lib/site-url";

const DEMO_CODE = "2026-0jdyhs6829";

export default async function Home() {
  const record = await getCertificate(DEMO_CODE);
  if (!record) {
    return <main className="p-8">Certificate data missing.</main>;
  }

  const verifyUrl = certificateHtmlPublicUrl(record);
  const htmlPath = certificateHtmlPath(record);

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-6 p-8 font-sans">
      <h1 className="text-2xl font-semibold">Certificate verify portal</h1>
      <p className="text-neutral-600">
        JSON stores the certificate fields. The QR code encodes only the hosted
        HTML file URL so a scan opens the certificate page—not JSON and not a
        dynamic server route.
      </p>

      <div className="rounded-lg border border-neutral-200 bg-white p-4">
        <p className="text-sm text-neutral-500">Link inside the QR code</p>
        <a href={htmlPath} className="break-all text-blue-600 underline">
          {verifyUrl}
        </a>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-lg border border-neutral-200 bg-white p-6">
        <img
          src={`/api/qr/${DEMO_CODE}`}
          alt="QR code for certificate HTML link"
          width={256}
          height={256}
        />
        <p className="text-center text-sm text-neutral-500">
          Scan to open the HTML certificate page
        </p>
      </div>

      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
        <li>
          <a href={htmlPath} className="text-blue-600 underline">
            Open static HTML certificate
          </a>
        </li>
        <li>
          <a
            href={`/api/certificates/${DEMO_CODE}`}
            className="text-blue-600 underline"
          >
            Download JSON (data + verifyUrl)
          </a>
        </li>
      </ul>
    </main>
  );
}
