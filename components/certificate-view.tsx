"use client";

import { useEffect } from "react";
import Image from "next/image";

type CertificateViewProps = {
  noPeserta: string;
  nama: string;
  partai: string;
  juara?: string;
  cleanPath?: string;
  badgeText?: string;
  subtitle?: string;
  description?: string;
  footerTitle?: string;
  statusLabel?: string;
  statusValue?: string;
};

export function CertificateView({
  noPeserta,
  nama,
  partai,
  juara,
  cleanPath = "/certificate",
  badgeText = "JTC Session 1 Online",
  subtitle = "Verifikasi sertifikat",
  description = "Kamu telah mengikuti JTC Session 1 Online.",
  footerTitle = "Junior Tech Competition Session 1 Online",
  statusLabel = "Status",
  statusValue
}: CertificateViewProps) {
  useEffect(() => {
    window.history.replaceState(window.history.state, "", cleanPath);
  }, [cleanPath]);

  const finalStatusValue = statusValue ?? juara ?? "Terverifikasi";

  return (
    <main className="certificate-page">
      <section className="certificate-shell">
        <article className="certificate-card">
          <div className="certificate-card__glow" />

          <div className="certificate-card__header">
            <div className="certificate-brand">
              <Image src="/logo.png" alt="Logo JTC" width={72} height={72} priority />
              <div>
                <p>Junior Tech Competition</p>
                <span>{subtitle}</span>
              </div>
            </div>

            <div className="certificate-badge">{badgeText}</div>
          </div>

          <div className="certificate-card__body">
            <p className="certificate-kicker">Selamat</p>
            <h2>{nama}</h2>
            <p className="certificate-description">
              {description}
            </p>

            <div className="certificate-award">{partai}</div>

            <div className="certificate-meta">
              <div className="certificate-meta__item">
                <span>No. Peserta</span>
                <strong>{noPeserta}</strong>
              </div>
              <div className="certificate-meta__item">
                <span>Partai / Kategori</span>
                <strong>{partai}</strong>
              </div>
              <div className="certificate-meta__item">
                <span>{statusLabel}</span>
                <strong>{finalStatusValue}</strong>
              </div>
            </div>
          </div>

          <div className="certificate-card__footer">
            <div>
              <span>Verifikasi sertifikat</span>
              <strong>{footerTitle}</strong>
            </div>

            <div className="certificate-signature">
              <span>Sampai jumpa di competisi lain nya</span>
              <strong>Panitia JTC</strong>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
