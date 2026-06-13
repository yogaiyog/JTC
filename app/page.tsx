import Image from "next/image";
import fs from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteHeader } from "@/components/site-header";
import { timelinePhases } from "@/lib/timeline-data";

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
    name: "Junior-I",
    age: "Kelas 1 - 3 SD",
    description:
      "Fokus pada kesederhanaan, dasar alur interaksi yang lancar, kreativitas visual/cerita orisinal, serta keberanian anak dalam menjelaskan karyanya.",
    details: [
      "Range level: TK, Kelas 1, dan Kelas 2",
      "Tahap 1 (Kualifikasi): Membuat game/animasi interaktif responsif, bebas crash, dengan modifikasi visual khas buatan anak.",
      "Tahap 2 (Final): Pengembangan karya agar lebih rapi secara visual + sesi presentasi/tanya jawab langsung untuk menguji rasa percaya diri anak."
    ]
  },
  {
    name: "Junior-II",
    age: "Kelas 4 - 6 SD",
    description:
      "Fokus pada logika aturan main (kondisional dasar), kelengkapan fitur utama (skor/kondisi menang-kalah), mekanik tantangan yang seru, serta kerapian susunan kode.",
    details: [
      "Range level: Kelas 3, Kelas 4, dan Kelas 5",
      "Tahap 1 (Kualifikasi): Membuat karya dengan tantangan jelas (rintangan/waktu) dan susunan skrip/blok kode yang tertata rapi.",
      "Tahap 2 (Final): Optimalisasi fitur mekanik agar berfungsi konsisten + sesi demo teknis untuk menguji pemahaman mandiri anak terhadap kode mereka."
    ]
  },
  {
    name: "Junior-III",
    age: "Kelas 7 - 9 SMP",
    description:
      "Fokus pada efisiensi sistem logika (variabel/perulangan/fungsi), stabilitas aplikasi, keunikan konsep UI/UX, dan kemampuan argumentasi teknis.",
    details: [
      "Range level: Kelas 6, SMP Kelas 1, dan SMP Kelas 2",
      "Tahap 1 (Kualifikasi): Membangun aplikasi/game tuntas dengan struktur algoritma yang efisien dan desain antarmuka yang menarik.",
      "Tahap 2 (Final): Membangun logika sistem + presentasi mendalam dan penggunaan istilah teknis di depan juri."
    ]
  }
] as const;

const ticketLevels = [
  "Junior-I",
  "Junior-II",
  "Junior-III"
] as const;

function formatTimelineDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function formatTimelinePeriod(start: string, end: string) {
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  const sameDay = start === end;
  const sameMonth =
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth();

  if (sameDay) {
    return formatTimelineDate(start);
  }

  if (sameMonth) {
    return `${startDate.getDate()} - ${endDate.getDate()} ${endDate.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric"
    })}`;
  }

  return `${formatTimelineDate(start)} - ${formatTimelineDate(end)}`;
}

const ticketRows = [
  {
    ticket: "Early Bird",
    period: formatTimelinePeriod("2026-07-06", "2026-07-20"),
    prices: ["Rp.60.000,-", "Rp.60.000,-", "Rp.60.000,-"]
  },
  {
    ticket: "Presale",
    period: formatTimelinePeriod("2026-07-21", "2026-08-03"),
    prices: ["Rp.80.000,-", "Rp.80.000,-", "Rp.80.000,-"]
  },
  {
    ticket: "Regular Sale",
    period: formatTimelinePeriod("2026-08-04", "2026-08-17"),
    prices: ["Rp.100.000,-", "Rp.100.000,-", "Rp.100.000,-"]
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
    extras: ["Coding teks", "Problem solving"]
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

const heroTimeline = timelinePhases
  .filter((phase) =>
    [
      "pre-launch",
      "early-bird-registration",
      "presale-registration",
      "regular-sale-registration",
      "hari-h-lomba"
    ].includes(phase.id)
  )
  .map((phase) => ({
    title: phase.title,
    date: formatTimelinePeriod(phase.start, phase.end)
  }));

const timeline = timelinePhases
  .filter((phase) =>
    [
      "early-bird-registration",
      "presale-registration",
      "regular-sale-registration",
      "administrasi",
      "technical-meeting-1",
      "hari-h-lomba"
    ].includes(phase.id)
  )
  .map((phase) => ({
    title:
      phase.id === "administrasi"
        ? "Masuk Group WA Informasi"
        : phase.id === "technical-meeting-1"
          ? "Technical Meeting"
          : phase.title,
    date: formatTimelinePeriod(phase.start, phase.end),
    description: phase.activities.join(", ")
  }));

const faqs = [
  {
    question: "Apa itu JTC?",
    answer:
      "JTC adalah Junior Tech Competition, event lomba coding anak yang dirancang untuk melatih logika, kreativitas, dan problem solving."
  },
  {
    question: "Siapa yang bisa ikut?",
    answer:
      "Peserta dibagi ke tiga level: Junior-I untuk TK sampai Kelas 2, Junior-II untuk Kelas 3 sampai Kelas 5, dan Junior-III untuk Kelas 6 sampai SMP Kelas 2."
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
      <SiteHeader
        brandHref="#home"
        links={[
          { href: "#kategori", label: "Kategori" },
          { href: "#harga", label: "Harga" },
          // { href: "/timeline", label: "Timeline" },
          { href: "#rubrik", label: "Rubrik" },
          { href: "#faq", label: "FAQ" }
        ]}
      />

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
                  <h4 className="device__title">Timeline Summary</h4>
                </div>
                <div className="hero-timeline" aria-label="Ringkasan timeline">
                  {heroTimeline.map((item, index) => (
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
            <h2>Biaya pendaftaran</h2>
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
            <h2>Kategori</h2>
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
            <h2>Aplikasi yang bisa digunakan</h2>
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
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {doc.content}
                    </ReactMarkdown>
                      <div className="accordion__toolbar">
                      <a
                        className="btn btn--secondary accordion__download"
                        href={`/api/pdf?type=rubric&file=${encodeURIComponent(doc.id)}`}
                      >
                        Download PDF
                      </a>
                    </div>
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
        <h2>Siap Menjadi Digital Creator Masa Depan?</h2>
        <p>
          Jangan lewatkan kesempatan emas untuk menguji logika, mengasah kreativitas, 
          dan menyalurkan bakat coding anak di ajang Junior Tech Competition. Tunjukkan 
          karya digital terbaikmu!
        </p>
      </div>
      <div className="cta__actions">
        <a className="btn btn--secondary" href="#tracks">
          Lihat Kategori Lomba
        </a>
        <a
          className="btn btn--primary"
          href={registrationUrl}
          target="_blank"
          rel="noreferrer"
        >
          Daftar Kualifikasi Sekarang
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
