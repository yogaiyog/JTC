import Image from "next/image";
import fs from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { HeroTimelineSummary } from "@/components/hero-timeline-summary";
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
     
      "Babak Final: Membuat game atau animasi interaktif yang lancar (bebas crash) dengan desain visual buatan sendiri.",
   ]
  },
  {
    name: "Junior-II",
    age: "Kelas 4 - 6 SD",
    description:
      "Fokus pada logika aturan main (kondisional dasar), kelengkapan fitur utama (skor/kondisi menang-kalah), mekanik tantangan yang seru, serta kerapian susunan kode.",
    details: [
      "Babak Kualifikasi & Final: Membuat karya dengan tantangan yang jelas (ada rintangan/batasan waktu) dan susunan kode yang rapi."
    ]
  },
  {
    name: "Junior-III",
    age: "Kelas 7 - 9 SMP",
    description:
      "Fokus pada efisiensi sistem logika (variabel/perulangan/fungsi), stabilitas aplikasi, keunikan konsep UI/UX, dan kemampuan argumentasi teknis.",
    details: [
      "Babak Kualifikasi & Final: Membuat aplikasi atau game utuh dengan logika pemrograman yang efisien serta tampilan yang menarik."]
  }
] as const;

const ticketLevels = [
  { name: "Junior-I", grade: "Kelas 1–3 SD" },
  { name: "Junior-II", grade: "Kelas 4–6 SD" },
  { name: "Junior-III", grade: "Kelas 7–9 SMP" }
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
    ticket: "Registrasi",
    period: formatTimelinePeriod("2026-07-06", "2026-08-17"),
    prices: ["Rp.120.000,-", "Rp.120.000,-", "Rp.120.000,-"]
  }
] as const;

const apps = [
  {
    image: "/scratch-icon-500x200-1.webp",
    appName: "Scratch",
    description:
      "Scratch digunakan untuk membuat game, animasi, dan project interaktif berbasis block code.",
    extras: ["Junior-I", "Junior-II", "Junior-III"]
  },
  {
    image: "/python_logo_icon_168886.webp",
    appName: "Python",
    description:
      "Python digunakan untuk peserta yang ingin membangun solusi berbasis coding teks.",
    extras: ["Junior-III"]
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

const heroTimelineBase = timelinePhases
  .filter((phase) =>
    [
      "pre-launch",
      "registration",
      "hari-h-lomba"
    ].includes(phase.id)
  )
  .map((phase) => ({
    title: phase.title,
    date: formatTimelinePeriod(phase.start, phase.end),
    start: phase.start,
    end: phase.end
  }));

const heroTimeline = heroTimelineBase;

const timeline = timelinePhases
  .filter((phase) =>
    [
      "registration",
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
    question: "Siapa yang bisa ikut lomba coding ini?",
    answer:
      "Lomba coding anak JTC terbuka untuk semua siswa SD dan SMP. Terdapat tiga kategori lomba: Junior-I untuk SD Kelas 1-3, Junior-II untuk SD Kelas 4-6, dan Junior-III untuk SMP Kelas 7-9. Setiap kategori menyesuaikan tingkat kesulitan dengan usia peserta."
  },
  {
    question: "Platform coding apa yang dipakai saat lomba?",
    answer:
      "Kualifikasi menggunakan tes logika/algoritma, lalu final dapat menggunakan aplikasi yang diizinkan seperti Scratch, App Inventor, atau Python."
  },
  {
    question: "Apakah lomba coding ini dilakukan secara online?",
    answer:
      "Ya, JTC disiapkan untuk event online sehingga peserta dari mana pun bisa ikut dengan nyaman."
  }
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Junior Tech Competition (JTC) 2026",
  description:
    "Lomba coding anak untuk SD hingga SMP. Kompetisi programming yang menguji logika, kreativitas, dan problem solving melalui Scratch, Python, dan App Inventor.",
  startDate: "2026-08-30",
  endDate: "2026-08-30",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  location: {
    "@type": "VirtualLocation",
    url: "https://juniortechcompetition.web.id"
  },
  offers: {
    "@type": "Offer",
    price: "120000",
    priceCurrency: "IDR",
    availability: "https://schema.org/InStock",
    validFrom: "2026-07-06",
    url: "https://juniortechcompetition.web.id"
  },
  image: "https://juniortechcompetition.web.id/logo.png",
  organizer: {
    "@type": "Organization",
    name: "Junior Tech Competition",
    url: "https://juniortechcompetition.web.id"
  },
  audience: {
    "@type": "Audience",
    audienceType: "children"
  }
};

export default async function Home() {
  const initialNow = Date.now();
  const rubricDocs = await getRubricDocuments();
  return (
    <main className="shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <div className="eyebrow">JTC Online 1.0</div>
          <h1>
  Junior Tech Competition<span>Lomba Coding Anak Nasional</span> 
</h1>
             <p>
               JTC adalah <strong>lomba coding anak</strong> untuk SD sampai
               SMP. Kompetisi coding ini menguji logika, kreativitas, dan
               problem solving melalui Scratch, Python, dan App Inventor,
               mulai dari babak kualifikasi hingga final project.
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
                <HeroTimelineSummary items={heroTimeline} initialNow={initialNow} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="harga">
        <div className="container">
          <div className="section__header">
            <h2>Biaya Pendaftaran Kompetisi Coding</h2>
          </div>
          <div className="pricing-list">
            {ticketLevels.map((level, index) => (
              <div className="pricing-item" key={level.name}>
                <div className="pricing-item__header">
                  <strong>{level.name}</strong>
                  <span className="pricing-item__price">{ticketRows[0].prices[index]}</span>
                </div>
                <div className="pricing-item__grade">{level.grade}</div>
                <div className="pricing-item__period">{ticketRows[0].period}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="kategori">
        <div className="container">
          <div className="section__header">
            <h2>Kategori Lomba Programming Anak SD & SMP</h2>
          </div>
          {/* <p style={{ marginBottom: "2rem", maxWidth: "70ch" }}>
            JTC menyediakan tiga kategori lomba coding yang disesuaikan dengan
            jenjang pendidikan. Setiap kategori dalam kompetisi coding anak ini
            memiliki tingkat kesulitan dan materi lomba programming yang
            berbeda, dari pengenalan logika dasar hingga pemrograman teks
            menggunakan Python.
          </p> */}
          <div className="grid-3">
            {tracks.map((track) => (
              <article className="track" key={track.name}>
                <div className="track__meta">
                  <span className="track__age">{track.age}</span>
                </div>
                <div className="track__body">
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
<h2>Platform & Bahasa Programming yang Diperlombakan</h2>
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
        </div>
      </section>

      <section className="section" id="benefit">
        <div className="container">
          <div className="section__header">
       <h2>Keuntungan & Fasilitas Peserta JTC 2026</h2>
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
           <h3 style={{ marginTop: 0 }}>Rangkaian Hadiah Juara & Komunitas Belajar</h3>
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
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="rubrik">
        <div className="container">
          <div className="section__header">
           <h2>Rubrik & Kriteria Penilaian Juri</h2>
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
                        href="/rulebook_junior_tech_competition.pdf"
                        download
                      >
                        Download Rulebook PDF
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
      <h2>Pertanyaan Umum Seputar Lomba Coding Anak (FAQ)</h2>
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
        <a className="btn btn--secondary" href="#home">
          Kembali ke atas
        </a>
        <a
          className="btn btn--primary"
          href={registrationUrl}
          target="_blank"
          rel="noreferrer"
        >
          Daftar Sekarang
        </a>

    </article>
  </div>
</section>


      <footer className="footer">
        <div className="container footer__inner">
          <span>JTC - Junior Tech Competition</span>
        </div>
      </footer>
    </main>
  );
}
