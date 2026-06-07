import { QuestionRandomizer } from "@/components/question-randomizer";
import { SiteHeader } from "@/components/site-header";
import { questionLevels, trainingVideos } from "@/lib/training-content";

const guidance = [
  "Pilih level Junior-I, Junior-II, atau Junior-III sesuai jenjang peserta.",
  "Klik tombol acak untuk mengambil satu soal latihan secara otomatis.",
  "Baca target utama dan checklist soal sebelum mulai membuat project.",
  "Setelah selesai, review lagi fungsi utama, skor, tampilan, dan cara presentasi."
] as const;

export default function NgerjainSoalPage() {
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
              <span className="eyebrow">Latihan Ngerjain Soal</span>
              <h1 className="training-hero__title">Bank soal latihan yang bisa di-random</h1>
              <p className="training-hero__text">
                Cocok untuk simulasi kualifikasi. Tinggal pilih level, acak soal,
                lalu kerjakan seperti sesi lomba sungguhan.
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

      <section className="section">
        <div className="container">
          <div className="grid-2">
            <article className="panel training-panel">
              <h3>Cara latihan</h3>
              <ol className="training-list training-list--ordered">
                {guidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
            <article className="panel training-panel">
              <h3>Tips singkat</h3>
              <ul className="training-list">
                <li>Mulai dari fungsi utama dulu, lalu lanjut ke tampilan.</li>
                <li>Pastikan tombol, skor, atau kondisi menang/kalah bisa diuji.</li>
                <li>Biasakan menjelaskan alur project dengan kata-kata sendiri.</li>
                <li>Ulangi acak soal untuk membangun variasi latihan.</li>
              </ul>
            </article>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <QuestionRandomizer levels={questionLevels} />
          </div>
        </div>
      </section>
    </main>
  );
}
