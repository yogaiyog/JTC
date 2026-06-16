import { SiteHeader } from "@/components/site-header";
import { WebContainerTerminal } from "@/components/webcontainer-terminal";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SoalRuntimePage({ searchParams }: PageProps) {
  const password = process.env.SOAL_PASSWORD ?? "jtc";
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const provided = resolvedSearchParams?.p;
  const providedValue = Array.isArray(provided) ? provided[0] : provided;
  const isAllowed = providedValue === password;

  if (!isAllowed) {
    return (
      <main className="shell">
        <SiteHeader links={[{ href: "/", label: "Beranda" }, { href: "/soal", label: "Soal" }]} />

        <section className="section">
          <div className="container">
            <div className="section__header">
              <h2>Runtime Junior-III</h2>
              <p>Masukkan password untuk membuka preview runtime Node.js.</p>
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
      <SiteHeader links={[{ href: "/", label: "Beranda" }, { href: "/soal", label: "Kembali ke Soal" }]} />

      <section className="section">
        <div className="container">
          <div className="section__header">
            <h2>Junior-III Terminal Base</h2>
          </div>

          <article className="section-card soal-runtime-card">
            <div className="soal-showcase-card__content">
              <p className="soal-showcase-card__level">Junior-III</p>
              <div className="soal-showcase-card__heading">
                <h3>Simulasi Pemesanan Makanan</h3>
                <p>
                  Coba jalankan flow terminal seperti program kasir: pilih menu, isi jumlah,
                  lalu tutup pesanan dengan `0` untuk melihat struk akhir.
                </p>
              </div>
            </div>

            <WebContainerTerminal />
          </article>
        </div>
      </section>
    </main>
  );
}
