import { SiteHeader } from "@/components/site-header";
import { trainingVideos } from "@/lib/training-content";

const submissionUrl =
  process.env.NEXT_PUBLIC_SUBMISSION_URL ??
  "https://docs.google.com/forms/d/e/1FAIpQLSfAEOa4r4wSEHkiNMPox2bEan6Ljok5Be_xa6SqrgGPmHMH2Q/viewform?usp=header";

const steps = [
  "Pastikan project sudah final, bisa dibuka, dan tidak error saat diuji.",
  "Siapkan file utama, link project, atau video demo sesuai arahan panitia.",
  "Isi formulir submit karya dengan data peserta yang lengkap dan benar.",
  "Cek ulang link/file yang dikirim, lalu simpan bukti submit untuk arsip."
] as const;

const checklist = [
  "Nama peserta dan level sudah sesuai.",
  "Judul karya jelas dan mudah dikenali.",
  "Link file dapat diakses oleh juri/panitia.",
  "Deskripsi singkat karya sudah ditulis."
] as const;

export default function SubmitKaryaPage() {
  return (
    <main className="shell">
      <SiteHeader
        links={[
          { href: "/", label: "Beranda" },
          { href: "/soal", label: "Soal" }
        ]}
      />

      <section className="section training-hero">
        <div className="container">
          <div className="section-card training-hero__panel">
            <div>
              <span className="eyebrow">Latihan Submit Karya</span>
              <h1 className="training-hero__title">Panduan singkat sebelum karya dikirim</h1>
              <p className="training-hero__text">
                Halaman ini membantu peserta membiasakan alur submit karya:
                cek project, rapikan file, lalu kirim dengan data yang lengkap.
              </p>
              <div className="hero__actions">
                <a className="btn btn--primary" href={submissionUrl} target="_blank" rel="noreferrer">
                  Buka Form Submit
                </a>
                <a className="btn btn--secondary" href="#cara-submit">
                  Lihat Cara Submit
                </a>
              </div>
            </div>

            <div className="video-card">
              <div className="video-card__frame">
                <iframe
                  src={trainingVideos.submitKarya}
                  title="Panduan submit karya"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="cara-submit">
        <div className="container">
          <div className="section__header">
            <h2>Cara submit karya</h2>
            <p>Urutan sederhana agar karya yang dikirim rapi dan mudah dicek juri.</p>
          </div>

          <div className="grid-2">
            <article className="panel training-panel">
              <h3>Langkah-langkah</h3>
              <ol className="training-list training-list--ordered">
                {steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>

            <article className="panel training-panel">
              <h3>Checklist sebelum kirim</h3>
              <ul className="training-list">
                {checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
