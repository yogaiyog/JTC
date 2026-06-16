"use client";

import { useEffect, useMemo, useState } from "react";

type HeroTimelineItem = {
  title: string;
  date: string;
  start: string;
  end: string;
};

type HeroTimelineSummaryProps = {
  items: HeroTimelineItem[];
  initialNow: number;
};

function toStartDate(date: string) {
  return new Date(`${date}T00:00:00+07:00`);
}

function toEndDate(date: string) {
  return new Date(`${date}T23:59:59+07:00`);
}

function getCountdownParts(target: Date, now: Date) {
  const diffMs = Math.max(target.getTime() - now.getTime(), 0);
  const totalSeconds = Math.floor(diffMs / 1000);

  return [
    {
      label: "Hari",
      value: String(Math.floor(totalSeconds / 86400)).padStart(2, "0")
    },
    {
      label: "Jam",
      value: String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, "0")
    },
    {
      label: "Menit",
      value: String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0")
    },
    {
      label: "Detik",
      value: String(totalSeconds % 60).padStart(2, "0")
    }
  ];
}

export function HeroTimelineSummary({ items, initialNow }: HeroTimelineSummaryProps) {
  const [now, setNow] = useState(() => new Date(initialNow));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const visibleItems = useMemo(() => {
    const prepared = items
      .map((item) => ({
        ...item,
        startAt: toStartDate(item.start),
        endAt: toEndDate(item.end)
      }))
      .filter((item) => now.getTime() <= item.endAt.getTime());

    const nearestIndex = prepared.findIndex((item) => now.getTime() <= item.endAt.getTime());

    return prepared.map((item, index) => {
      const isCurrent = now.getTime() >= item.startAt.getTime() && now.getTime() <= item.endAt.getTime();
      const target = isCurrent ? item.endAt : item.startAt;

      return {
        ...item,
        isNearest: index === nearestIndex,
        countdownLabel: isCurrent ? "Berakhir dalam" : "Mulai dalam",
        countdownParts: getCountdownParts(target, now)
      };
    });
  }, [items, now]);

  if (visibleItems.length === 0) {
    return (
      <div className="hero-timeline" aria-label="Ringkasan timeline">
        <article className="hero-timeline-item">
          <div className="hero-timeline-item__content">
            <span>Semua fase sudah selesai</span>
            <strong>Pantau update timeline berikutnya dari tim JTC.</strong>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="hero-timeline" aria-label="Ringkasan timeline">
      {visibleItems.map((item, index) => (
        <article
          className={`hero-timeline-item${item.isNearest ? " hero-timeline-item--nearest" : ""}`}
          key={item.title}
        >
          <div className="hero-timeline-item__index">{String(index + 1).padStart(2, "0")}</div>
          <div className="hero-timeline-item__content">
            <span>{item.date}</span>
            <strong>{item.title}</strong>
            {item.isNearest ? (
              <div className="hero-timeline-item__countdown">
                <small>{item.countdownLabel}</small>
                <div className="hero-timeline-item__countdown-grid">
                  {item.countdownParts.map((part) => (
                    <div className="hero-timeline-item__countdown-box" key={part.label}>
                      <b>{part.value}</b>
                      <span>{part.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
