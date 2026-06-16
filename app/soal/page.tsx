import { SiteHeader } from "@/components/site-header";
import {
  URL_JUNIOR_I,
  URL_JUNIOR_II,
  URL_JUNIOR_III
} from "@/lib/url-contoh-karya";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type SoalShowcase = {
  level: string;
  title: string;
  description: string;
  checklist: string[];
  exampleEmbed?: string;
  runtimeHref?: string;
};

const soalShowcase: SoalShowcase[] = [
  {
    level: "Junior-I",
    title: "Hewan dan Suara",
    description: "Buat aplikasi pengenalan hewan.",
    checklist: [
      "Tampilkan minimal 3 hewan.",
      "Saat hewan ditekan, muncul suara atau teks nama hewan.",
      "Tambahkan tampilan yang ceria dan mudah dipahami."
    ],
    exampleEmbed: URL_JUNIOR_I
  },
  {
    level: "Junior-II",
    title: "Game Kumpulkan Koin",
    description: "Buat game untuk mengumpulkan koin sambil menghindari musuh.",
    checklist: [
      "Karakter bisa bergerak dengan kontrol yang jelas.",
      "Skor bertambah saat koin diambil.",
      "Permainan berakhir jika menyentuh musuh atau waktu habis."
    ],
    exampleEmbed: URL_JUNIOR_II
  },
  {
    level: "Junior-III",
    title: "Simulasi Pemesanan Makanan",
    description: "Buat aplikasi pemesanan makanan sederhana.",
    checklist: [
      "Pengguna bisa memilih menu, jumlah, dan melihat total harga.",
      "Tambahkan validasi agar jumlah pesanan tidak kosong.",
      "Tampilkan ringkasan pesanan sebelum selesai."
    ],
    exampleEmbed: URL_JUNIOR_III,
    runtimeHref: "/soal/runtime"
  }
];

export default async function SoalPage({ searchParams }: PageProps) {
  const password = process.env.SOAL_PASSWORD ?? "jtc";
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const provided = resolvedSearchParams?.p;
  const providedValue = Array.isArray(provided) ? provided[0] : provided;
  const isAllowed = providedValue === password;
  const passwordQuery = providedValue ? `?p=${encodeURIComponent(providedValue)}` : "";

  if (!isAllowed) {
    return (
      <main className="shell">
        <SiteHeader links={[{ href: "/", label: "Beranda" }]} />

        <section className="section">
          <div className="container">
            <div className="section__header">
              <h2>Halaman Soal</h2>
            </div>
            <article className="panel">
              <form method="get" className="grid-2" style={{ gap: "0.75rem" }}>
                <input
                  name="p"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  className="input"
                />
                <button className="btn btn--primary" type="submit">
                  Buka
                </button>
              </form>

            </article>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="shell">
      <SiteHeader links={[{ href: "/", label: "Beranda" }]} />

      <section className="section">
        <div className="container">
          <div className="section__header">
            <h2>Soal dan Contoh Project</h2>
          </div>

          <div className="soal-showcase-list">
            {soalShowcase.map((item) => (
              <article className="section-card soal-showcase-card" key={`${item.level}-${item.title}`}>
                <div className="soal-showcase-card__content">
                  <p className="soal-showcase-card__level">{item.level}</p>

                  <div className="soal-showcase-card__heading">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <ul className="soal-showcase-card__list">
                    {item.checklist.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div className="soal-showcase-card__example">
                  <div className="soal-showcase-card__example-head">
                    <span>Contoh Project</span>
                    <strong>{item.level}</strong>
                  </div>
                  {item.exampleEmbed ? (
                    <div
                      className="soal-showcase-card__embed"
                      dangerouslySetInnerHTML={{ __html: item.exampleEmbed }}
                    />
                  ) : null}
                  {item.runtimeHref ? (
                    <div className="webcontainer-card">
                      <div className="webcontainer-card__header">
                        <div>
                          <span className="webcontainer-card__eyebrow">Terminal Base</span>
                        </div>
                        <a
                          className="btn btn--secondary terminal-preview__reset"
                          href={`${item.runtimeHref}${passwordQuery}`}
                        >
                          Buka Terminal Base
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
