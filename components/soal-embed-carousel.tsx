"use client";

import { useState } from "react";

type SoalEmbedCarouselProps = {
  embeds: string[];
};

export function SoalEmbedCarousel({ embeds }: SoalEmbedCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!embeds || embeds.length === 0) {
    return null;
  }

  if (embeds.length === 1) {
    return (
      <div
        className="soal-showcase-card__embed"
        dangerouslySetInnerHTML={{ __html: embeds[0] }}
      />
    );
  }

  const goToPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + embeds.length) % embeds.length);
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % embeds.length);
  };

  return (
    <div className="soal-carousel" aria-label="Carousel contoh proyek">
      <div className="soal-carousel__frame">
        <div
          className="soal-showcase-card__embed"
          dangerouslySetInnerHTML={{ __html: embeds[activeIndex] }}
        />
      </div>

      <div className="soal-carousel__controls">
        <button
          className="soal-carousel__arrow"
          type="button"
          onClick={goToPrevious}
          aria-label="Contoh sebelumnya"
        >
          ←
        </button>

        <div className="soal-carousel__dots" aria-label="Pilih contoh proyek">
          {embeds.map((_, index) => (
            <button
              key={index}
              type="button"
              className={index === activeIndex ? "soal-carousel__dot is-active" : "soal-carousel__dot"}
              onClick={() => setActiveIndex(index)}
              aria-label={`Tampilkan Contoh ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              Contoh {index + 1}
            </button>
          ))}
        </div>

        <button
          className="soal-carousel__arrow"
          type="button"
          onClick={goToNext}
          aria-label="Contoh selanjutnya"
        >
          →
        </button>
      </div>
    </div>
  );
}
