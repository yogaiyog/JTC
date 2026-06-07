"use client";

import { useState } from "react";
import type { Question, QuestionLevel } from "@/lib/training-content";

type QuestionRandomizerProps = {
  levels: QuestionLevel[];
};

function pickRandomQuestion(questions: Question[]) {
  return questions[Math.floor(Math.random() * questions.length)];
}

export function QuestionRandomizer({ levels }: QuestionRandomizerProps) {
  const [activeLevelId, setActiveLevelId] = useState<QuestionLevel["id"]>(levels[0].id);
  const [activeQuestion, setActiveQuestion] = useState<Question>(levels[0].questions[0]);

  const activeLevel = levels.find((level) => level.id === activeLevelId) ?? levels[0];

  function setLevel(levelId: QuestionLevel["id"]) {
    const nextLevel = levels.find((level) => level.id === levelId) ?? levels[0];
    setActiveLevelId(nextLevel.id);
    setActiveQuestion(pickRandomQuestion(nextLevel.questions));
  }

  function randomizeCurrentLevel() {
    setActiveQuestion(pickRandomQuestion(activeLevel.questions));
  }

  function randomizeAnyLevel() {
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    setActiveLevelId(randomLevel.id);
    setActiveQuestion(pickRandomQuestion(randomLevel.questions));
  }

  return (
    <section className="section-card question-randomizer">
      <div className="question-randomizer__top">
        <div>
          <span className="eyebrow">Bank Soal Acak</span>
          <h3>Latihan soal bisa diacak per jenjang</h3>
          <p>
            Pilih level yang ingin dilatih, lalu klik acak untuk mendapatkan
            tantangan baru.
          </p>
        </div>
        <div className="question-randomizer__actions">
          <button className="btn btn--primary" type="button" onClick={randomizeCurrentLevel}>
            Acak Level Ini
          </button>
          <button className="btn btn--secondary" type="button" onClick={randomizeAnyLevel}>
            Acak Semua Level
          </button>
        </div>
      </div>

      <div className="level-switcher" role="tablist" aria-label="Pilih level latihan">
        {levels.map((level) => (
          <button
            key={level.id}
            type="button"
            className={level.id === activeLevelId ? "level-pill is-active" : "level-pill"}
            onClick={() => setLevel(level.id)}
          >
            <strong>{level.label}</strong>
            <span>{level.age}</span>
          </button>
        ))}
      </div>

      <div className="question-meta">
        <span className="pill">{activeLevel.label}</span>
        <span className="pill">{activeLevel.questions.length} bank soal</span>
      </div>

      <article className="question-card">
        <div className="question-card__head">
          <div>
            <p className="question-card__label">Soal Terpilih</p>
            <h4>{activeQuestion.title}</h4>
          </div>
          <span className="question-card__badge">Acak aktif</span>
        </div>
        <p className="question-card__prompt">{activeQuestion.prompt}</p>
        <ul className="question-card__list">
          {activeQuestion.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <div className="grid-3 question-bank">
        {levels.map((level) => (
          <article className="track" key={level.id}>
            <div className="track__meta">
              <span className="pill">{level.label}</span>
              <span className="pill">{level.age}</span>
            </div>
            <p>{level.intro}</p>
            <ul className="track__list">
              {level.questions.map((question) => (
                <li key={question.id}>{question.title}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
