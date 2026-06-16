"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Question, QuestionLevel } from "@/lib/training-content";

type QuestionRandomizerProps = {
  levels: QuestionLevel[];
  submitUrl: string;
};

function pickRandomQuestion(questions: Question[]) {
  return questions[Math.floor(Math.random() * questions.length)];
}

export function QuestionRandomizer({ levels, submitUrl }: QuestionRandomizerProps) {
  const router = useRouter();
  const [activeLevelId, setActiveLevelId] = useState<QuestionLevel["id"]>(levels[0].id);

  const activeLevel = levels.find((level) => level.id === activeLevelId) ?? levels[0];

  function startSimulation() {
    const question = pickRandomQuestion(activeLevel.questions);
    const startedAt = Date.now();
    const params = new URLSearchParams({
      level: activeLevel.id,
      question: question.id,
      startedAt: String(startedAt),
      submitUrl
    });

    router.push(`/latihan/simulasi-soal/simulasi?${params.toString()}`);
  }

  return (
    <section className="section-card question-randomizer">
      <div className="question-randomizer__top">
      </div>

      <div className="level-switcher" role="tablist" aria-label="Pilih level latihan">
        {levels.map((level) => (
          <button
            key={level.id}
            type="button"
            className={level.id === activeLevelId ? "level-pill is-active" : "level-pill"}
            onClick={() => setActiveLevelId(level.id)}
          >
            <strong>{level.label}</strong>
            <span>{level.age}</span>
          </button>
        ))}
      </div>

      {/* <div className="question-meta">
        <span className="pill">{activeLevel.label}</span>
        <span className="pill">{activeLevel.questions.length} bank soal</span>
      </div> */}

      {/* <article className="question-card question-card--placeholder"> */}
        {/* <div className="question-card__head"> */}
          {/* <div>
            <p className="question-card__label">Kategori Dipilih</p>
            <h4>{activeLevel.label}</h4>
          </div> */}
          {/* <span className="question-card__badge">Siap Mulai</span> */}
        {/* </div> */}
        {/* <p className="question-card__prompt">{activeLevel.intro}</p> */}
        {/* <ul className="question-card__list">
          <li>Pastikan peserta sudah memilih kategori yang sesuai jenjang.</li>
          <li>Tekan tombol mulai untuk membuka soal acak di halaman simulasi.</li>
          <li>Timer 60 menit akan berjalan otomatis di halaman soal.</li>
        </ul> */}
      {/* </article> */}

      <div className="question-randomizer__actions question-randomizer__actions--center">
        <button className="btn btn--primary question-randomizer__start" type="button" onClick={startSimulation}>
          Mulai Simulasi
        </button>
      </div>
    </section>
  );
}
