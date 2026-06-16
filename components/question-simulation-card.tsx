"use client";

import { useEffect, useMemo, useState } from "react";
import type { Question } from "@/lib/training-content";

type QuestionSimulationCardProps = {
  levelLabel: string;
  levelAge: string;
  question: Question;
  startedAt: number;
  initialNow: number;
  submitUrl: string;
};

const SIMULATION_DURATION_MS = 60 * 60 * 1000;

function getCountdownParts(targetMs: number, nowMs: number) {
  const diffMs = Math.max(targetMs - nowMs, 0);
  const totalSeconds = Math.floor(diffMs / 1000);

  return [
    {
      label: "Jam",
      value: String(Math.floor(totalSeconds / 3600)).padStart(2, "0")
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

export function QuestionSimulationCard({
  levelLabel,
  levelAge,
  question,
  startedAt,
  initialNow,
  submitUrl
}: QuestionSimulationCardProps) {
  const [nowMs, setNowMs] = useState(initialNow);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNowMs(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const targetMs = startedAt + SIMULATION_DURATION_MS;
  const isExpired = nowMs >= targetMs;
  const countdownParts = useMemo(() => getCountdownParts(targetMs, nowMs), [nowMs, targetMs]);

  return (
    <article className="question-card question-card--simulation">
      <div className="question-card__head">
        <div>
          <p className="question-card__label">Soal Simulasi</p>
          <h1 className="question-card__title">{question.title}</h1>
        </div>
        <span className="question-card__badge">
          {isExpired ? "Waktu Habis" : "Simulasi Aktif"}
        </span>
      </div>

      <div className="question-meta">
        <span className="pill">{levelLabel}</span>
        <span className="pill">{levelAge}</span>
      </div>

      <div className="question-card__timer">
        <small>{isExpired ? "Waktu pengerjaan berakhir" : "Sisa waktu pengerjaan"}</small>
        <div
          className="hero-timeline-item__countdown-grid question-card__timer-grid"
          aria-label="Hitung mundur simulasi 60 menit"
        >
          {countdownParts.map((part) => (
            <div className="hero-timeline-item__countdown-box" key={part.label}>
              <b>{part.value}</b>
              <span>{part.label}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="question-card__prompt">{question.prompt}</p>
      <ul className="question-card__list">
        {question.checklist.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="question-card__footer">
        <a className="btn btn--secondary" href="/latihan/simulasi-soal">
          Ganti Kategori
        </a>
        <a className="btn btn--primary" href={submitUrl} target="_blank" rel="noreferrer">
          Buka Form Submit
        </a>
      </div>
    </article>
  );
}
