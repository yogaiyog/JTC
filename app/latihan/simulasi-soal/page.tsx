import { QuestionRandomizer } from "@/components/question-randomizer";
import { SiteHeader } from "@/components/site-header";
import { questionLevels, trainingVideos } from "@/lib/training-content";

const guidance = [
  "Pilih level Junior-I, Junior-II, atau Junior-III sesuai jenjang peserta.",
  "Klik tombol Mulai untuk mendapatkan soal.",
  "Durasi pengerjaan soal adalah 60 menit. Akan ada timer yang menghitung mundur.",
  "Baca target utama dan checklist soal sebelum mulai membuat project.",
  "Setelah selesai coba latihan mengupload project. di link yang disediakan di soal. Pastikan project bisa diakses (di Share) dan berjalan dengan baik.",
] as const;

export default function NgerjainSoalPage() {
  const simulationSubmitUrl =
    process.env.NEXT_PUBLIC_SIMULATION_SUBMIT_FORM_URL ??
    process.env.NEXT_PUBLIC_REGISTRATION_URL ??
    "https://docs.google.com/forms/";

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
              <span className="eyebrow">Simulasi Lomba</span>
              <h1 className="training-hero__title">Video panduan</h1>
              <p className="training-hero__text">
                Berikut ini video panduan pengerjaan soal dan sumbisi project untuk persiapan lomba. Setelah menonton, kamu bisa langsung coba acak soal dan buat project sesuai persyaratan yang diberikan.
              </p>
            </div>

            <div className="video-card">
              <div className="video-card__frame">
                <iframe
                  src={trainingVideos.ngerjainSoal}
                  title="Panduan latihan ngerjain soal"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="section">
        <div className="container">
          <div>
            <article className="panel training-panel">
              <h3>Cara latihan</h3>
              <ol className="training-list training-list--ordered">
                {guidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
            {/* <article className="panel training-panel">
              <h3>Tips singkat</h3>
              <ul className="training-list">
                <li>Mulai dari fungsi utama dulu, lalu lanjut ke tampilan.</li>
                <li>Pastikan tombol, skor, atau kondisi menang/kalah bisa diuji.</li>
                <li>Biasakan menjelaskan alur project dengan kata-kata sendiri.</li>
                <li>Ulangi acak soal untuk membangun variasi latihan.</li>
              </ul>
            </article> */}
          </div>

          <div style={{ marginTop: "1rem" }}>
            <QuestionRandomizer levels={questionLevels} submitUrl={simulationSubmitUrl} />
          </div>
        </div>
      </article>
    </main>
  );
}
