import { CertificateView } from "@/components/certificate-view";

type CertificatePageProps = {
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

export default async function CertificatePage({
  searchParams
}: CertificatePageProps) {
  const params = (await searchParams) ?? {};
  const noPeserta = readParam(params.noPeserta, "-");
  const nama = readParam(params.nama, "Peserta");
  const partai = readParam(params.partai, "-");
  const juara = readParam(params.juara, "Finalis");

  return <CertificateView noPeserta={noPeserta} nama={nama} partai={partai} juara={juara} />;
}
