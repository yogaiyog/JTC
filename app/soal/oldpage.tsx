import fs from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteHeader } from "@/components/site-header";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type MarkdownDoc = {
  id: string;
  title: string;
  content: string;
};

function toTitle(filename: string) {
  return filename
    .replace(/\.md$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function getSoalDocuments(): Promise<MarkdownDoc[]> {
  const soalDir = path.join(process.cwd(), "Document Lomba", "Soal");
  const entries = await fs.readdir(soalDir, { withFileTypes: true });
  const filenames = entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".md"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "id"));

  const docs = await Promise.all(
    filenames.map(async (filename) => {
      const content = await fs.readFile(path.join(soalDir, filename), "utf8");
      return {
        id: filename,
        title: toTitle(filename),
        content
      } satisfies MarkdownDoc;
    })
  );

  return docs;
}

export default async function SoalPage({ searchParams }: PageProps) {
  const password = process.env.SOAL_PASSWORD ?? "jtc";
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const provided = resolvedSearchParams?.p;
  const providedValue = Array.isArray(provided) ? provided[0] : provided;
  const isAllowed = providedValue === password;

  if (!isAllowed) {
    return (
      <main className="shell">
        <SiteHeader links={[{ href: "/", label: "Beranda" }]} />

        <section className="section">
          <div className="container">
            <div className="section__header">
              <h2>Halaman Soal</h2>
              <p>Masukkan password untuk membuka dokumen soal.</p>
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
              <p style={{ margin: "0.9rem 0 0", color: "var(--muted)" }}>
                Catatan: ini proteksi sederhana (bukan security kuat).
              </p>
            </article>
          </div>
        </section>
      </main>
    );
  }

  const docs = await getSoalDocuments();
  const passwordQuery = providedValue ? `&p=${encodeURIComponent(providedValue)}` : "";

  return (
    <main className="shell">
      <SiteHeader links={[{ href: "/", label: "Beranda" }]} />

      <section className="section">
        <div className="container">
          <div className="section__header">
            <h2>Dokumen Soal</h2>
            <p>Semua soal ditampilkan lengkap. Kamu juga bisa download versi PDF.</p>
          </div>

          <div className="doc-list">
            {docs.map((doc) => (
              <article className="panel" key={doc.id}>
                <div className="doc-head">
                  <h3 style={{ margin: 0 }}>{doc.title}</h3>
                  <a
                    className="btn btn--secondary doc-head__action"
                    href={`/api/pdf?type=soal&file=${encodeURIComponent(doc.id)}${passwordQuery}`}
                  >
                    Download PDF
                  </a>
                </div>
                <div className="markdown" style={{ marginTop: "0.85rem" }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {doc.content}
                  </ReactMarkdown>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
