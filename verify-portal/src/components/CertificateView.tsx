import type { CertificateRecord } from "@/lib/certificates";

type Props = {
  record: CertificateRecord;
};

export function CertificateView({ record }: Props) {
  const { page } = record;
  const { theme } = page;

  return (
    <main
      className="flex min-h-screen items-center justify-center p-4"
      style={{ backgroundColor: theme.pageBackground }}
    >
      <div
        className="flex w-full max-w-[600px] flex-col items-center rounded-[15px] border-2 border-transparent p-[30px] text-center shadow-md"
        style={{
          backgroundColor: theme.cardBackground,
          borderImage: "linear-gradient(to right, blue, orange) 1",
        }}
      >
        <img
          src={page.logo.src}
          alt={page.logo.alt}
          className="mt-5 h-[50px]"
        />

        <div
          className="mt-[30px] mb-5 flex h-20 w-20 items-center justify-center rounded-full text-[36px] text-white shadow-sm"
          style={{ backgroundColor: theme.verifiedIconBackground }}
          aria-hidden
        >
          ✓
        </div>

        <h1
          className="mt-5 text-2xl font-normal"
          style={{ color: theme.headlineColor }}
        >
          {page.headline}
        </h1>

        <table className="mt-5 w-[80%] border-separate border-spacing-1 text-left">
          <tbody>
            <tr>
              <td className="p-0.5">
                <p className="my-2.5 text-lg">
                  <strong>Name:</strong>
                </p>
              </td>
              <td className="p-0.5">
                <p className="my-2.5 text-lg">{page.holder.name}</p>
              </td>
            </tr>
            <tr>
              <td className="p-0.5">
                <p className="my-2.5 text-lg">
                  <strong>Domain:</strong>
                </p>
              </td>
              <td className="p-0.5">
                <p className="my-2.5 text-lg">{page.domain}</p>
              </td>
            </tr>
            <tr>
              <td className="p-0.5">
                <p className="my-2.5 text-lg">
                  <strong>Certificate Code:</strong>
                </p>
              </td>
              <td className="p-0.5">
                <p className="my-2.5 text-lg">{record.certificateCode}</p>
              </td>
            </tr>
            <tr>
              <td className="p-0.5">
                <p className="my-2.5 text-lg">
                  <strong>Certificate Issue Date:</strong>
                </p>
              </td>
              <td className="p-0.5">
                <p className="my-2.5 text-lg">{page.issueDate}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
