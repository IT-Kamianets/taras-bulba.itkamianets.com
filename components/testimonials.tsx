"use client";

import { useI18n } from "@/lib/i18n";

function ReviewCard({ review }: { review: { name: string; text: string; rating: number } }) {
  return (
    <div className="flex w-72 md:w-80 shrink-0 flex-col rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 p-6 min-h-[200px]">
      <p className="line-clamp-5 text-sm leading-relaxed text-primary-foreground/70 flex-1">
        {`\u201C${review.text}\u201D`}
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-primary-foreground/10 pt-4">
        <p className="text-sm font-semibold text-primary-foreground">
          {review.name}
        </p>
        <span className="text-xs font-bold text-accent">
          {`${review.rating}/10`}
        </span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { t } = useI18n();

  return (
    <section id="reviews" className="overflow-hidden bg-primary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              {t.reviews.subtitle}
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl text-balance">
              {t.reviews.title}
            </h2>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-5xl font-bold text-primary-foreground md:text-6xl">
              {t.reviews.ratingValue}
            </span>
            <div>
              <span className="block text-sm font-medium text-primary-foreground">/ 10</span>
              <span className="block text-xs text-primary-foreground/60">{t.reviews.ratingLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mx-auto mt-12 max-w-7xl overflow-hidden px-5 lg:px-8"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
        }}
      >
        <div className="marquee-track flex gap-4">
          {[...t.reviews.testimonials, ...t.reviews.testimonials].map((review, i) => (
            <ReviewCard key={`r-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
