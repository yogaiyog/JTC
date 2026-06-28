import { CertificateView } from "@/components/certificate-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sertifikat JTC | Junior Tech Competition",
  description: "Halaman sertifikat digital untuk peserta Junior Tech Competition.",
  robots: {
    index: false,
    follow: false
  }
};

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
