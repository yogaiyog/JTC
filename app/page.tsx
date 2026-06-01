import Image from "next/image";
import fs from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const registrationUrl =
  process.env.NEXT_PUBLIC_REGISTRATION_URL ??
  "https://docs.google.com/forms/d/e/1FAIpQLSfAEOa4r4wSEHkiNMPox2bEan6Ljok5Be_xa6SqrgGPmHMH2Q/viewform?usp=header";

const csWaUrl = process.env.NEXT_PUBLIC_CS_WA_URL ?? "6282112920756";

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

async function getRubricDocuments(): Promise<MarkdownDoc[]> {
  try {
    const rubricDir = path.join(process.cwd(), "Document Lomba", "Rubric");
    const entries = await fs.readdir(rubricDir, { withFileTypes: true });
    const filenames = entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".md"))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, "id"));

    const docs = await Promise.all(
      filenames.map(async (filename) => {
        const content = await fs.readFile(path.join(rubricDir, filename), "utf8");
        return {
          id: filename,
          title: toTitle(filename),
          content
        } satisfies MarkdownDoc;
      })
    );

    return docs;
  } catch {
    return [];
  }
}

const tracks = [
  {
    name: "Kids-I",
    age: "TK - Kelas 1 SD",
    description:
      "Fokus pada dasar logika dan interaksi sederhana. Peserta membuat karya yang punya menu, cara main, progres, dan ending.",
    details: [
      "Tahap 1: membuat game/aplikasi sederhana sesuai brief panitia",
      "Tahap 2 (Final): karya lebih rapi + presentasi singkat",
      "Platform: Scratch / Code.org / Roblox Studio"
    ]
  },
  {
    name: "Kids-II",
    age: "Kelas 2 - Kelas 3 SD",
    description:
      "Fokus pada aturan main yang jelas, skor/progres yang konsisten, dan tantangan (waktu/nyawa/rintangan) yang bisa diuji.",
    details: [
      "Tahap 1: karya interaktif dengan skor/progres",
      "Tahap 2 (Final): tantangan lebih terasa + presentasi singkat",
      "Platform: Scratch / Code.org / Roblox Studio"
    ]
  },
  {
    name: "Junior-I",
    age: "Kelas 4 - Kelas 5 SD",
    description:
      "Fokus pada kontrol, balancing, dan struktur state/scene. Karya dinilai dari gameplay yang konsisten dan rapi saat diuji.",
    details: [
      "Tahap 1: game dengan rintangan + menang/kalah yang tegas",
      "Tahap 2 (Final): game arcade yang mendorong high-score + design notes",
      "Platform: Scratch / Code.org / Roblox Studio"
    ]
  },
  {
    name: "Junior-II",
    age: "Kelas 6 SD - SMP",
    description:
      "Fokus pada sistem objektif bertahap, ancaman dinamis, dan fitur khusus (power-up/inventory/cooldown) yang terstruktur.",
    details: [
      "Tahap 1: misi + progres yang jelas dengan aturan konsisten",
      "Tahap 2 (Final): objective berurutan + dokumentasi singkat",
      "Platform: Scratch / Code.org / Roblox Studio"
    ]
  }
] as const;

const ticketLevels = [
  "Kids1",
  "Kids2",
  "Junior-I",
  "Junior-II"
] as const;

const ticketRows = [
  {
    ticket: "Early Bird",
    period: "1 - 30 November 2024",
    prices: ["Rp.100.000,-", "Rp.100.000,-", "Rp.100.000,-", "Rp.100.000,-"]
  },
  {
    ticket: "PreSale",
    period: "1 - 22 Desember 2024",
    prices: ["Rp.150.000,-", "Rp.150.000,-", "Rp.150.000,-", "Rp.150.000,-"]
  },
  {
    ticket: "Sale",
    period: "23 - 25 Desember 2024",
    prices: ["Rp.200.000,-", "Rp.200.000,-", "Rp.200.000,-", "Rp.200.000,-"]
  }
] as const;

const apps = [
  {
    image: "/scratch-icon-500x200-1.png",
    appName: "Scratch",
    description:
      "Boleh digunakan untuk membuat game, animasi, dan project interaktif berbasis block code.",
    extras: ["Interaktif", "Visual", "Ramah pemula"]
  },
  {
    image: "/app inventor.png",
    appName: "App Inventor",
    description:
      "Boleh digunakan untuk membuat aplikasi mobile sederhana dengan logika blok.",
    extras: ["Mobile app", "Logika blok", "Kreatif"]
  },
  {
    image: "/python_logo_icon_168886.webp",
    appName: "Python",
    description:
      "Boleh digunakan untuk peserta yang ingin membangun solusi berbasis coding teks.",
    extras: ["Coding teks", "Problem solving", "Lebih menantang"]
  }
] as const;

const benefits = [
  "Top 3 trophy untuk juara",
  "Sertifikat untuk finalis terbaik",
  "Merchandise untuk peserta pilihan",
  "Free beginner Scratch workshop",
  "Panduan lomba yang jelas dan terstruktur",
  "Komunitas belajar yang suportif"
] as const;

const timeline = [
  {
    title: "Pendaftaran dibuka",
    date: "2 Juni 2026",
    description:
      "Calon peserta mengisi formulir, memilih kategori sesuai jenjang, lalu menyiapkan data lomba."
  },
  {
    title: "Masuk grup informasi",
    date: "20 Juni 2026",
    description:
      "Peserta dan orang tua bergabung ke grup komunikasi untuk mendapatkan update, pengumuman, dan panduan teknis."
  },
  {
    title: "Technical meeting",
    date: "27 Juni 2026",
    description:
      "Panitia menjelaskan alur lomba, aturan, serta simulasi jalannya babak kualifikasi dan final."
  },
  {
    title: "Babak kualifikasi",
    date: "4 Juli 2026",
    description:
      "Peserta mengerjakan tes logika/algoritma sebagai tahap awal menuju babak final."
  },
  {
    title: "Babak final",
    date: "5 Juli 2026",
    description:
      "Finalis terbaik masuk ke sesi pembuatan project menggunakan aplikasi yang diizinkan untuk menunjukkan ide dan kemampuan terbaik mereka."
  }
] as const;

const faqs = [
  {
    question: "Apa itu JTC?",
    answer:
      "JTC adalah Junior Tech Competition, event lomba coding anak yang dirancang untuk melatih logika, kreativitas, dan problem solving."
  },
  {
    question: "Siapa yang bisa ikut?",
    answer:
      "Peserta dibagi ke empat level: Kids1, Kids2, Junior-I, dan Junior-II, sehingga lomba bisa diikuti sesuai jenjang."
  },
  {
    question: "Apa platform yang dipakai?",
    answer:
      "Kualifikasi menggunakan tes logika/algoritma, lalu final dapat menggunakan aplikasi yang diizinkan seperti Scratch, App Inventor, atau Python."
  },
  {
    question: "Apakah lombanya online?",
    answer:
      "Ya, landing page ini disiapkan untuk event online sehingga peserta dari mana pun bisa ikut dengan nyaman."
  }
] as const;

export default async function Home() {
  const rubricDocs = await getRubricDocuments();
  return (
    <main className="shell">
      <header className="topbar">
        <div className="container topbar__inner">
          <a className="brand" href="#home" aria-label="JTC">
            <span className="brand__mark">J</span>
            <span>JTC</span>
          </a>
          <nav className="nav" aria-label="Navigasi utama">
            <a href="#kategori">Kategori</a>
            <a href="#harga">Harga</a>
            <a href="#aplikasi">Aplikasi</a>
            <a href="#benefit">Benefit</a>
            <a href="#alur">Alur</a>
            <a href="#rubrik">Rubrik</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="container hero__grid">
          <div>
            <div className="eyebrow">Junior Tech Competition</div>
            <h1>
      Battle of Young 
              <span>Digital Coders</span>
            </h1>
            <p>
              JTC adalah ajang perlombaan coding untuk peserta TK sampai SMP
              yang menguji logika, kreativitas, dan ketepatan problem solving
              melalui babak kualifikasi hingga final project.
            </p>

            <div className="hero__actions">
              <a
                className="btn btn--primary"
                href={csWaUrl}
                target="_blank"
                rel="noreferrer"
              >
                Hubungi Kami
              </a>
              <a
                className="btn btn--secondary"
                href={registrationUrl}
                target="_blank"
                rel="noreferrer"
              >
                Daftar sekarang
              </a>
            </div>
          </div>

          <div className="hero__panel">
            <div className="hero__graphic">
              <div className="device">
                <div className="device__top">
                </div>
                <div className="device__headline">
                  <h4 className="device__title">Ringkasan timeline</h4>
                </div>
                <div className="hero-timeline" aria-label="Ringkasan timeline">
                  {timeline.map((item, index) => (
                    <article className="hero-timeline-item" key={item.title}>
                      <div className="hero-timeline-item__index">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="hero-timeline-item__content">
                        <span>{item.date}</span>
                        <strong>{item.title}</strong>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="harga">
        <div className="container">
          <div className="section__header">
            <h2>Biaya pendaftaran lomba</h2>
          </div>
          <div className="table-wrap">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Tiket</th>
                  <th>Waktu</th>
                  {ticketLevels.map((level) => (
                    <th key={level}>{level}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ticketRows.map((row) => (
                  <tr key={row.ticket}>
                    <td>
                      <strong>{row.ticket}</strong>
                    </td>
                    <td>{row.period}</td>
                    {row.prices.map((price, index) => (
                      <td key={`${row.ticket}-${ticketLevels[index]}`}>{price}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" id="kategori">
        <div className="container">
          <div className="section__header">
            <h2>Kategori lomba</h2>
          </div>
          <div className="grid-3">
            {tracks.map((track) => (
              <article className="track" key={track.name}>
                <div className="track__meta">
                  <span className="pill">{track.age}</span>
                </div>
                <div>
                  <h3>{track.name}</h3>
                  <p>{track.description}</p>
                </div>
                <ul className="track__list">
                  {track.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="aplikasi">
        <div className="container">
          <div className="section__header">
            <h2>Aplikasi yang boleh digunakan</h2>
          </div>
          <div className="grid-3">
            {apps.map((item) => (
              <article className="app-card" key={item.appName}>
                <div className="app-card__image">
                  <Image
                    src={item.image}
                    alt={`${item.appName} sebagai aplikasi lomba`}
                    fill
                    sizes="(max-width: 960px) 100vw, 33vw"
                  />
                </div>
                <div className="app-card__body">
                  <div className="track__meta">
                    <span className="pill">Aplikasi diperbolehkan</span>
                    <span className="pill">{item.appName}</span>
                  </div>
                  <p>{item.description}</p>
                  <div className="badge-list" style={{ marginTop: "1rem" }}>
                    {item.extras.map((extra) => (
                      <span className="badge" key={extra}>
                        {extra}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="grid-2" style={{ marginTop: "1rem" }}>
            <article className="mini-card">
              <strong>Alternatif aplikasi</strong>
              <span>Selain daftar utama, Thunkable dan Roblox Studio juga bisa dipertimbangkan selama sesuai aturan panitia.</span>
            </article>
            <article className="mini-card">
              <strong>Catatan</strong>
              <span>Panitia berhak melakukan validasi agar aplikasi yang dipakai tetap sesuai ketentuan lomba.</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="benefit">
        <div className="container">
          <div className="section__header">
            <h2>Benefit peserta</h2>
          </div>
          <div className="grid-2">
            <div className="panel">
              <div className="badge-list" style={{ marginTop: 0 }}>
                {benefits.map((benefit) => (
                  <span className="badge" key={benefit}>
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
            <article className="panel panel--highlight">
              <h3 style={{ marginTop: 0 }}>Rangkaian hadiah dan pembelajaran</h3>
              <p style={{ marginBottom: "1rem" }}>
                Kami menempatkan apresiasi sebagai bagian penting dari
                pengalaman lomba, supaya anak merasa usahanya dihargai.
              </p>
              <div className="grid-2">
                <div className="mini-card">
                  <strong>Top 3 trophies</strong>
                  <span>Untuk menandai pencapaian terbaik peserta.</span>
                </div>
                <div className="mini-card">
                  <strong>E-certificate</strong>
                  <span>Bisa dipakai sebagai portofolio awal anak.</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="alur">
        <div className="container">
          <div className="section__header">
            <h2>Timeline Kompetisi</h2>
          </div>
          <div className="timeline">
            {timeline.map((item, index) => (
              <article className="timeline-item" key={item.title}>
                <div className="timeline-item__index">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="timeline-item__content">
                  <span>{item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="rubrik">
        <div className="container">
          <div className="section__header">
            <h2>Rubrik Penilaian</h2>
          </div>
          <div className="accordion-list">
            {rubricDocs.length === 0 ? (
              <article className="panel">
                <h3 style={{ marginTop: 0 }}>Rubrik belum tersedia</h3>
                <p style={{ marginBottom: 0 }}>
                  Belum ada file rubrik di folder <code>Document Lomba/Rubric</code>.
                </p>
              </article>
            ) : (
              rubricDocs.map((doc, index) => (
                <details className="panel accordion" key={doc.id} open={index === 0}>
                  <summary className="accordion__summary">
                    <strong>{doc.title}</strong>
                    <span className="accordion__chev" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                        <path
                          d="M6.7 9.3a1 1 0 0 1 1.4 0L12 13.2l3.9-3.9a1 1 0 1 1 1.4 1.4l-4.6 4.6a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="markdown accordion__content">
                    <div className="accordion__toolbar">
                      <a
                        className="btn btn--secondary accordion__download"
                        href={`/api/pdf?type=rubric&file=${encodeURIComponent(doc.id)}`}
                      >
                        Download PDF
                      </a>
                    </div>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {doc.content}
                    </ReactMarkdown>
                  </div>
                </details>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <div className="section__header">
            <h2>FAQ</h2>
          </div>
          <div className="grid-2">
            {faqs.map((faq) => (
              <article className="faq-item" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="cta">
        <div className="container">
          <article className="cta">
            <div>
              <h2>Siap bikin anak tampil percaya diri lewat coding?</h2>
              <p>
                Landing page JTC ini sudah dibuat dengan struktur yang siap
                dipakai. Kalau kamu mau, kita bisa lanjut isi detail asli seperti
                tanggal lomba final, link formulir, dan kontak panitia.
              </p>
            </div>
            <div className="cta__actions">
              <a className="btn btn--primary" href="#home">
                Kembali ke atas
              </a>
              <a
                className="btn btn--secondary"
                href={registrationUrl}
                target="_blank"
                rel="noreferrer"
              >
                Daftar sekarang
              </a>
            </div>
          </article>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__inner">
          <span>JTC - Junior Tech Competition</span>
          <span>Built with Next.js + TypeScript</span>
        </div>
      </footer>
    </main>
  );
}
