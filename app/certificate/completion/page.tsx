import { CertificateView } from "@/components/certificate-view";

type CertificateCompletionPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readParam(value: string | string[] | undefined, fallback: string) {
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }

  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  return fallback;
}

export default async function CertificateCompletionPage({
  searchParams
}: CertificateCompletionPageProps) {
  const params = (await searchParams) ?? {};
  const noPeserta = readParam(params.noPeserta, "-");
  const nama = readParam(params.nama, "Peserta");
  const partai = readParam(params.partai, "-");

  return (
    <CertificateView
      noPeserta={noPeserta}
      nama={nama}
      partai={partai}
      cleanPath="/certificate/completion"
      subtitle="Verifikasi certificate completion"
      badgeText="Certificate of Completion"
      description={
        "Kamu terverifikasi telah menyelesaikan rangkaian JTC Session 1 Online dan berhak atas certificate completion."
      }
      footerTitle="JTC Session 1 Online Completion"
      statusLabel="Jenis Sertifikat"
      statusValue="Completion"
    />
  );
}
