import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tim Kami | JTC Junior Tech Competition",
  description:
    "Kenali tim di balik Junior Tech Competition — para profesional yang berdedikasi menghadirkan kompetisi coding anak berkualitas.",
  openGraph: {
    title: "Tim Kami | JTC Junior Tech Competition",
    description:
      "Kenali tim di balik Junior Tech Competition.",
    type: "website"
  }
};

const teamMembers = [
  {
    name: "Meyla Muslimah",
    role: "Challenge & Assessment Specialist",
    photo: "/team/Meyla Muslimah.png",
    description:
      "4+ tahun pengalaman sebagai tutor coding. Merancang tantangan kompetisi dan sistem penilaian yang objektif."
  },
  {
    name: "Rifqi Ilmam Shadiq",
    role: "Marketing & Communications",
    photo: "/team/Rifqi Ilmam.png",
    description:
      "4+ tahun pengalaman di bidang marketing dan pendidikan coding. Mengelola strategi promosi dan komunikasi event."
  },
  {
    name: "Yoga Adi Saputra",
    role: "System Support Specialist",
    photo: "/team/Yoga Adi Saputra.png",
    description:
      "2+ tahun pengalaman sebagai software developer dan tutor coding. Mengembangkan serta menjaga keandalan sistem kompetisi."
  },
  {
    name: "Fauziah Nur Shabrina",
    role: "Operations Coordinator",
    photo: "/team/Shabrina.png",
    description:
      "Berpengalaman dalam administrasi dan koordinasi event. Memastikan operasional kompetisi berjalan lancar."
  }
] as const;

export default function TeamPage() {
  return (
    <main className="shell">
      <SiteHeader
        brandHref="/"
        links={[
          { href: "/#kategori", label: "Kategori" },
          { href: "/#harga", label: "Harga" },
          { href: "/#rubrik", label: "Rubrik" },
          { href: "/#faq", label: "FAQ" },
          { href: "/team", label: "Tim Kami" }
        ]}
      />
      <section className="hero team-hero-section" id="home">
        <div className="container hero__grid">
          <div>
            {/* <div className="eyebrow">Tim JTC</div> */}
            <h1>
              The Minds Behind<span>Junior Tech Competition</span>
            </h1>
            <p>
              Kenali para profesional yang bekerja keras mewujudkan Junior Tech
              Competition sebagai ajang kompetisi coding anak terbaik.
            </p>
          </div>

        
        </div>
      </section>



      <section className="section" id="anggota">
        <div className="container">
          <div className="team-grid">
            {teamMembers.map((member) => (
              <article className="team-card" key={member.name}>
                <div className="team-card__photo">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 960px) 50vw, 25vw"
                  />
                </div>
                <div className="team-card__body">
                  <span className="team-card__role">{member.role}</span>
                  <h3 className="team-card__name">{member.name}</h3>
                  <p className="team-card__desc">{member.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
