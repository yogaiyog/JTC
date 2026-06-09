import { SiteHeader } from "@/components/site-header";
import { TimelineGantt } from "@/components/timeline-gantt";
import { timelinePhases } from "@/lib/timeline-data";

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function getDurationLabel(start: string, end: string) {
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  const duration = Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1;

  return `${duration} hari`;
}

export default function TimelinePage() {
  const lastPhase = timelinePhases[timelinePhases.length - 1];

  return (
    <main className="shell">
      <SiteHeader
        brandHref="/timeline"
        links={[
          { href: "/", label: "Beranda" },
          { href: "#chart", label: "Chart" },
          { href: "#detail", label: "Detail" }
        ]}
      />

      <section className="section training-hero">
        <div className="container">
          <div className="section-card timeline-hero">
            <div>
              <div className="eyebrow">Timeline Event JTC</div>
            </div>

            <div className="timeline-hero__stats">
              <div className="stat">
                <strong>{timelinePhases.length}</strong>
                <span>Total fase kerja</span>
              </div>
              <div className="stat">
                <strong>{formatDate(timelinePhases[0]?.start ?? "2026-06-10")}</strong>
                <span>Tanggal mulai</span>
              </div>
              <div className="stat">
                <strong>{formatDate(lastPhase?.end ?? "2026-09-15")}</strong>
                <span>Tanggal selesai</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="chart">
        <div className="container">
          <div className="section__header">
            <div>
              <h2>Gantt Chart</h2>
         </div>
          </div>

          <div className="section-card timeline-chart-card">
            <TimelineGantt />
          </div>
        </div>
      </section>

      <section className="section" id="detail">
        <div className="container">
          <div className="section__header">
            <div>
              <h2>Rincian Fase</h2>
          </div>
          </div>

          <div className="timeline-phase-list">
            {timelinePhases.map((phase, index) => (
              <article className="timeline-phase-card" key={phase.id}>
                <div className="timeline-phase-card__index">{String(index + 1).padStart(2, "0")}</div>
                <div className="timeline-phase-card__content">
                  <div className="timeline-phase-card__top">
                    <h3>{phase.title}</h3>
                    <span>{getDurationLabel(phase.start, phase.end)}</span>
                  </div>
                  <p>
                    {formatDate(phase.start)} - {formatDate(phase.end)}
                  </p>
                  <ul className="timeline-phase-card__activities">
                    {phase.activities.map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
