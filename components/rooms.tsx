"use client";

import { useState } from "react";
import {
  Users,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Snowflake,
  Bath,
  ShowerHead,
  Tv,
  Wifi,
  Coffee,
  Refrigerator,
} from "lucide-react";
import { useI18n, BOOKING_URL } from "@/lib/i18n";

const tagIcons: Record<string, React.ElementType> = {
  ac: Snowflake,
  bathroom: ShowerHead,
  tv: Tv,
  wifi: Wifi,
  fridge: Refrigerator,
  kettle: Coffee,
  bath: Bath,
};

function RoomCarousel({ images, title }: { images: string[]; title: string }) {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i > 0 ? i - 1 : images.length - 1));
  const next = () => setIdx((i) => (i < images.length - 1 ? i + 1 : 0));

  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${title} ${i + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-primary/40 text-primary-foreground backdrop-blur-sm transition-all hover:bg-primary/60 active:scale-95"
        aria-label="Попереднє фото"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-primary/40 text-primary-foreground backdrop-blur-sm transition-all hover:bg-primary/60 active:scale-95"
        aria-label="Наступне фото"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-2 rounded-full transition-all ${
              i === idx ? "w-5 bg-accent" : "w-2 bg-white/50"
            }`}
            aria-label={`Фото ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Rooms() {
  const { t } = useI18n();

  return (
    <section id="rooms" className="bg-section-alt py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t.rooms.subtitle}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-section-alt-foreground text-balance md:text-4xl lg:text-5xl">
            {t.rooms.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {t.rooms.items.map((room, idx) => {
            const isLastOdd = idx === t.rooms.items.length - 1 && t.rooms.items.length % 2 !== 0;
            return (
            <div
              key={idx}
              className={`group flex flex-col overflow-hidden rounded-lg border border-primary-foreground/10 bg-primary transition-shadow hover:shadow-lg${isLastOdd ? ' md:col-span-2 md:max-w-[calc(50%-12px)] md:justify-self-center' : ''}`}
            >
              {/* Room carousel */}
              <RoomCarousel images={room.images} title={room.title} />

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-xl font-bold text-primary-foreground md:text-2xl">
                    {room.title}
                  </h3>
                  <span className="shrink-0 rounded-md bg-accent px-3 py-1 text-xs font-bold text-primary whitespace-nowrap">
                    {room.price}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-primary-foreground/60">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 shrink-0 text-accent" />
                    <span>{room.capacity}</span>
                  </div>
                  <span className="text-primary-foreground/40">{room.area}</span>
                  <div className="flex items-center gap-1.5">
                    <BedDouble className="h-3.5 w-3.5 shrink-0 text-accent" />
                    <span>{room.beds}</span>
                  </div>
                </div>

                {/* Tags with icons - flex-1 pushes button down */}
                <div className="mt-3 flex flex-1 flex-wrap content-start gap-1.5">
                  {room.tags.map((tagKey, tagIdx) => {
                    const Icon = tagIcons[tagKey];
                    return (
                      <span
                        key={tagIdx}
                        className="inline-flex h-7 items-center gap-1 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-3 text-xs text-primary-foreground/60"
                      >
                        {Icon && <Icon className="h-3 w-3 shrink-0 text-accent" />}
                        {t.rooms.tagLabels[tagKey] || tagKey}
                      </span>
                    );
                  })}
                </div>

                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 block w-full rounded-md bg-accent py-2.5 text-center text-xs font-semibold uppercase tracking-[0.15em] text-card transition-all hover:bg-accent/90 active:scale-95"
                >
                  {t.rooms.book}
                </a>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
