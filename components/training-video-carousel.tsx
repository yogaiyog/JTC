"use client";

import { useState } from "react";
import type { TrainingVideo } from "@/lib/training-content";

type TrainingVideoCarouselProps = {
  videos: TrainingVideo[];
};

export function TrainingVideoCarousel({ videos }: TrainingVideoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (videos.length === 0) {
    return null;
  }

  const activeVideo = videos[activeIndex] ?? videos[0];

  function goToPrevious() {
    setActiveIndex((currentIndex) => (currentIndex - 1 + videos.length) % videos.length);
  }

  function goToNext() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % videos.length);
  }

  return (
    <div className="video-carousel" aria-label="Carousel video panduan">
      <div className="video-carousel__meta">
        <span className="eyebrow">
           {activeVideo.title}
        </span>
        <p>{activeVideo.description}</p>
      </div>

      <div className="video-card">
        <div className="video-card__frame">
          <iframe
            src={activeVideo.src}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      <div className="video-carousel__controls">
        <button
          className="video-carousel__arrow"
          type="button"
          onClick={goToPrevious}
          aria-label="Video sebelumnya"
        >
          ←
        </button>

        <div className="video-carousel__dots" aria-label="Pilih video">
          {videos.map((video, index) => (
            <button
              key={video.id}
              type="button"
              className={index === activeIndex ? "video-carousel__dot is-active" : "video-carousel__dot"}
              onClick={() => setActiveIndex(index)}
              aria-label={`Tampilkan ${video.title}`}
              aria-pressed={index === activeIndex}
            />
          ))}
        </div>

        <button
          className="video-carousel__arrow"
          type="button"
          onClick={goToNext}
          aria-label="Video selanjutnya"
        >
          →
        </button>
      </div>
    </div>
  );
}
