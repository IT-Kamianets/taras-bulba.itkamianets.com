"use client";

import { useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const galleryImages = [
  "/gallery/1.webp",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpeg",
  "/gallery/7.jpg",
  "/gallery/8.jpg",
  "/gallery/9.jpg",
  "/gallery/10.jpg",
  "/gallery/11.jpg",
  "/gallery/12.jpg",
  "/gallery/13.jpg",
  "/gallery/14.jpg",
  "/gallery/15.jpeg",
  "/gallery/16.jpeg",
  "/gallery/17.jpg",
  "/gallery/18.jpg",
  "/gallery/19.jpg",
  "/gallery/20.jpeg",
  "/gallery/21.jpg",
  "/gallery/22.jpeg",
  "/gallery/23.jpeg",
  "/gallery/24.jpeg",
  "/gallery/25.jpg",
  "/gallery/26.jpg",
  "/gallery/27.jfif",
  "/gallery/28.jpg",
  "/gallery/29.jpg",
  "/gallery/30.jfif",
];

const PER_PAGE = 10;
const totalPages = Math.ceil(galleryImages.length / PER_PAGE);

export default function Gallery() {
  const { t } = useI18n();
  const [page, setPage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("right");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  /* Touch / swipe refs */
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goTo = useCallback(
    (p: number, dir?: "left" | "right") => {
      let next = p;
      if (next < 0) next = totalPages - 1;
      if (next >= totalPages) next = 0;
      if (next === page || animating) return;
      setSlideDir(dir || (next > page ? "right" : "left"));
      setAnimating(true);
      setTimeout(() => {
        setPage(next);
        setTimeout(() => setAnimating(false), 50);
      }, 250);
    },
    [page, animating]
  );

  const currentImages = galleryImages.slice(
    page * PER_PAGE,
    page * PER_PAGE + PER_PAGE
  );

  const openLightbox = (globalIdx: number) => {
    setLightboxIdx(globalIdx);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIdx(null);
    document.body.style.overflow = "";
  };

  const lightboxPrev = () => {
    if (lightboxIdx !== null && lightboxIdx > 0) setLightboxIdx(lightboxIdx - 1);
  };

  const lightboxNext = () => {
    if (lightboxIdx !== null && lightboxIdx < galleryImages.length - 1)
      setLightboxIdx(lightboxIdx + 1);
  };

  /* ---- Swipe: gallery grid ---- */
  const handleGridTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };
  const handleGridTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleGridTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const dist = touchStartX.current - touchEndX.current;
    if (Math.abs(dist) > 50) {
      if (dist > 0) goTo(page + 1, "right");
      else goTo(page - 1, "left");
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  /* ---- Swipe: lightbox ---- */
  const handleLbTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };
  const handleLbTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleLbTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const dist = touchStartX.current - touchEndX.current;
    if (Math.abs(dist) > 50) {
      if (dist > 0) lightboxNext();
      else lightboxPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section id="gallery" className="bg-section-alt py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t.gallery.subtitle}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-section-alt-foreground text-balance md:text-4xl lg:text-5xl">
            {t.gallery.title}
          </h2>
        </div>

        {/* Gallery grid — swipeable on touch */}
        <div
          className="mt-12 touch-pan-y"
          onTouchStart={handleGridTouchStart}
          onTouchMove={handleGridTouchMove}
          onTouchEnd={handleGridTouchEnd}
        >
          <div
            className={`grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 md:gap-3 transition-all duration-300 ease-in-out ${
              animating
                ? slideDir === "right"
                  ? "opacity-0 translate-x-6"
                  : "opacity-0 -translate-x-6"
                : "opacity-100 translate-x-0"
            }`}
          >
            {currentImages.map((src, idx) => {
              const globalIdx = page * PER_PAGE + idx;
              return (
                <div
                  key={`${page}-${idx}`}
                  className="group cursor-pointer overflow-hidden"
                  onClick={() => openLightbox(globalIdx)}
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <img
                      src={src}
                      alt={`Галерея фото ${globalIdx + 1}`}
                      className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-primary/0 transition-all duration-500 group-hover:bg-primary/20">
                      <svg
                        className="h-8 w-8 text-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-80"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation: arrows + dots */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => goTo(page - 1, "left")}
            disabled={animating}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/40 text-primary-foreground backdrop-blur-sm transition-all hover:bg-primary/60 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer active:scale-95"
            aria-label="Попередня сторінка"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  page === i
                    ? "w-8 bg-accent"
                    : "w-2.5 bg-section-alt-foreground/30 hover:bg-section-alt-foreground/50"
                }`}
                aria-label={`Сторінка ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(page + 1, "right")}
            disabled={animating}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/40 text-primary-foreground backdrop-blur-sm transition-all hover:bg-primary/60 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer active:scale-95"
            aria-label="Наступна сторінка"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ===== Lightbox ===== */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
            aria-label="Закрити"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Desktop side arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              lightboxPrev();
            }}
            disabled={lightboxIdx === 0}
            className="absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed md:flex md:h-12 md:w-12 cursor-pointer"
            aria-label="Попереднє фото"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              lightboxNext();
            }}
            disabled={lightboxIdx === galleryImages.length - 1}
            className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed md:flex md:h-12 md:w-12 cursor-pointer"
            aria-label="Наступне фото"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image — swipeable on touch */}
          <img
            src={galleryImages[lightboxIdx]}
            alt={`Фото ${lightboxIdx + 1}`}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleLbTouchStart}
            onTouchMove={handleLbTouchMove}
            onTouchEnd={handleLbTouchEnd}
            className="max-h-[70vh] max-w-[90vw] select-none object-contain touch-none md:max-h-[85vh]"
          />

          {/* Mobile bottom controls: ← counter → */}
          <div
            className="mt-4 flex items-center gap-6 md:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={lightboxPrev}
              disabled={lightboxIdx === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Попереднє фото"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="min-w-[60px] text-center text-sm text-white">
              {lightboxIdx + 1} / {galleryImages.length}
            </span>
            <button
              onClick={lightboxNext}
              disabled={lightboxIdx === galleryImages.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Наступне фото"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Desktop counter */}
          <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm md:block">
            {lightboxIdx + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
