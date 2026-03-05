"use client";

import { useI18n } from "@/lib/i18n";

const aboutImages = [
  "/logo/About_us1.jpg",
  "/logo/About_us2.jpg",
  "/logo/About_us3.jpg",
  "/logo/About_us4.jpg",
];

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="bg-section-alt py-20 pt-56 md:pt-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-stretch gap-12 lg:grid-cols-2">
          {/* Text content */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent text-center">
              {t.about.subtitle}
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-section-alt-foreground text-balance md:text-4xl lg:text-5xl text-center">
              {t.about.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-section-alt-foreground/60 md:text-lg" style={{ textAlign: 'justify' }}>
              {t.about.description}
            </p>
          </div>

          {/* Images - 2x2 grid */}
          <div className="lg:relative">
            <div className="grid grid-cols-2 gap-3 lg:absolute lg:inset-0">
              {aboutImages.map((src, idx) => (
                <div key={idx} className="group overflow-hidden rounded-lg">
                  <img
                    src={src}
                    alt={`Готель Тарас Бульба ${idx + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
