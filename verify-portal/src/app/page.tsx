import Link from "next/link";
import { verifyPublicUrl } from "@/lib/site-url";

const DEMO_CODE = "2026-0jdyhs6829";

export default async function Home() {
  const verifyUrl = await verifyPublicUrl(DEMO_CODE);

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-6 p-8 font-sans">
      <h1 className="text-2xl font-semibold">Certificate verify portal</h1>
      <p className="text-neutral-600">
        Certificate data lives in JSON. The QR code encodes only the public link
        so a phone scan opens the verification page instead of raw JSON.
      </p>

      <div className="rounded-lg border border-neutral-200 bg-white p-4">
        <p className="text-sm text-neutral-500">Link inside the QR code</p>
        <a href={verifyUrl} className="break-all text-blue-600 underline">
          {verifyUrl}
        </a>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-lg border border-neutral-200 bg-white p-6">
        <img
          src={`/api/qr/${DEMO_CODE}`}
          alt="QR code for certificate verification link"
          width={256}
          height={256}
        />
        <p className="text-center text-sm text-neutral-500">
          Scan to open the link above
        </p>
      </div>

      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
        <li>
          <Link href={`/verify/${DEMO_CODE}`} className="text-blue-600 underline">
            View certificate page
          </Link>
        </li>
        <li>
          <a
            href={`/api/certificates/${DEMO_CODE}`}
            className="text-blue-600 underline"
          >
            Download JSON (data only)
          </a>
        </li>
      </ul>
    </main>
  );
}
