"use client";

import { useI18n, MENU_URL } from "@/lib/i18n";

const restaurantImages = [
  "/logo/Restaurant1.jpg",
  "/logo/Restaurant2.jpg",
  "/logo/Restaurant3.jpg",
  "/logo/Restaurant4.jpg",
];

export default function Restaurant() {
  const { t } = useI18n();

  return (
    <section id="restaurant" className="bg-primary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-stretch gap-12 lg:grid-cols-2">
          {/* Images - 2x2 grid */}
          <div className="order-2 grid grid-cols-2 gap-3 lg:order-1">
            {restaurantImages.map((src, idx) => (
              <div key={idx} className="group overflow-hidden rounded-lg">
                <img
                  src={src}
                  alt={`Ресторан Тарас Бульба ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>

          {/* Text content */}
          <div className="order-1 flex flex-col justify-center lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent text-center">
              {t.restaurant.subtitle}
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-primary-foreground text-balance md:text-4xl lg:text-5xl text-center">
              {t.restaurant.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-primary-foreground/60 md:text-lg text-center">
              {t.restaurant.description}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-accent italic text-center">
              {t.restaurant.breakfast}
            </p>

            {/* Dish list with prices */}
            <div className="mt-10">
              {t.restaurant.dishes.map((dish, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border-b border-primary-foreground/10 py-4 last:border-b-0"
                >
                  <span className="font-serif text-2xl font-bold text-primary-foreground/20 md:text-3xl">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-base font-medium text-primary-foreground md:text-lg">
                    {dish.name}
                  </span>
                  <span className="text-sm font-semibold text-accent">
                    {dish.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href={MENU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-md border border-primary-foreground/40 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-primary-foreground hover:text-primary active:scale-95"
              >
                {t.restaurant.menuBtn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
