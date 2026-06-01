import Image from "next/image";
import fs from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

async function getRubricMarkdown() {
  try {
    const filePath = path.join(
      process.cwd(),
      "Document Lomba",
      "Rubric",
      "Rubrik-Tahap-1-Kualifikasi-Kids.md"
    );
    return await fs.readFile(filePath, "utf8");
  } catch {
    return "Rubrik belum tersedia.";
  }
}

const tracks = [
  {
    name: "Kids1",
    age: "TK - Kelas 1 SD",
    description:
      "Level dasar untuk peserta yang baru mulai mengenal logika, urutan instruksi, dan pola berpikir komputasional.",
    details: [
      "Babak kualifikasi lewat CBT logika/algoritma",
      "Babak final membuat project sederhana",
      "Fokus pada kreativitas, keberanian, dan ketelitian"
    ]
  },
  {
    name: "Kids2",
    age: "Kelas 2 - Kelas 3 SD",
    description:
      "Dirancang untuk peserta yang sudah mulai nyaman berpikir terstruktur dan siap tantangan lebih variatif.",
    details: [
      "Evaluasi logika dan penyelesaian masalah yang lebih beragam",
      "Final membuat project interaktif sederhana",
      "Mendorong konsistensi, fokus, dan ide yang orisinal"
    ]
  },
  {
    name: "Junior-I",
    age: "Kelas 4 - Kelas 5 SD",
    description:
      "Tantangan yang mendorong peserta berpikir lebih kritis, cepat, dan percaya diri saat merancang solusi.",
    details: [
      "Soal kualifikasi menekankan logika, analisis, dan strategi",
      "Final membuat project dengan alur yang lebih kompleks",
      "Memberi ruang menunjukkan problem solving terbaik"
    ]
  },
  {
    name: "Junior-II",
    age: "Kelas 6 SD - SMP",
    description:
      "Level tertinggi untuk peserta yang siap menyusun solusi lebih matang dan mempresentasikan hasil dengan percaya diri.",
    details: [
      "Kualifikasi fokus pada analisis kasus dan ketepatan solusi",
      "Final menantang peserta membuat project yang terstruktur",
      "Menguji akurasi, kreativitas, dan manajemen waktu"
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
  const rubricMarkdown = await getRubricMarkdown();
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
              <a className="btn btn--primary" href="#kategori">
                Lihat kategori
              </a>
              <a className="btn btn--secondary" href="#cta">
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
            <h2>Rubrik Penilaian (Kualifikasi)</h2>
          </div>
          <div className="panel markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {rubricMarkdown}
            </ReactMarkdown>
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
              <a className="btn btn--secondary" href="#kategori">
                Lihat kategori
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
