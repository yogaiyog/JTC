"use client";

import { useEffect, useRef } from "react";
import { timelinePhases } from "@/lib/timeline-data";

type FrappeTask = {
  id: string;
  name: string;
  start: string;
  end: string;
  progress: number;
  custom_class?: string;
};

function toTaskDates(start: string, end: string) {
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T23:59:59`);

  return {
    startDate,
    endDate
  };
}

function buildTasks(): FrappeTask[] {
  return timelinePhases.map((phase, index) => ({
    id: phase.id,
    name: `${String(index + 1).padStart(2, "0")}. ${phase.title}`,
    start: phase.start,
    end: phase.end,
    progress: phase.progress,
    custom_class: index % 3 === 0 ? "bar--cyan" : index % 3 === 1 ? "bar--gold" : "bar--coral"
  }));
}

export function TimelineGantt() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let ganttInstance: { destroy?: () => void } | undefined;

    async function renderChart() {
      if (!containerRef.current) {
        return;
      }

      const { default: Gantt } = await import("frappe-gantt");

      if (cancelled || !containerRef.current) {
        return;
      }

      containerRef.current.innerHTML = "";

      ganttInstance = new Gantt(containerRef.current, buildTasks(), {
        container_height: 620,
        bar_height: 28,
        padding: 18,
        column_width: 48,
        view_mode: "Day",
        view_mode_select: true,
        today_button: true,
        readonly: true,
        readonly_dates: true,
        readonly_progress: true,
        infinite_padding: false,
        language: "id",
        popup_on: "click",
        scroll_to: timelinePhases[0]?.start,
        popup: ({ task, set_title, set_subtitle, set_details }) => {
          const matched = timelinePhases.find((phase) => phase.id === task.id);

          if (!matched) {
            return false;
          }

          const { startDate, endDate } = toTaskDates(matched.start, matched.end);

          set_title(task.name.replace(/^\d+\.\s/, ""));
          set_subtitle(
            `${startDate.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })} - ${endDate.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}`
          );
          const duration = Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1;
          set_details(
            `Durasi ${duration} hari\nAktivitas: ${matched.activities.slice(0, 3).join(", ")}${
              matched.activities.length > 3 ? ", ..." : ""
            }`
          );

          return undefined;
        }
      });
    }

    void renderChart();

    return () => {
      cancelled = true;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      ganttInstance?.destroy?.();
    };
  }, []);

  return <div ref={containerRef} className="timeline-chart" aria-label="Timeline JTC dalam bentuk chart gantt" />;
}
