"use client";

import { Wifi, ParkingCircle, Flame, PawPrint, ConciergeBell, UtensilsCrossed } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const icons = [Flame, Wifi, UtensilsCrossed, PawPrint, ConciergeBell, ParkingCircle];

export default function Amenities() {
  const { t } = useI18n();

  return (
    <section id="amenities" className="bg-primary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t.amenities.subtitle}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl text-balance">
            {t.amenities.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-primary-foreground/10 bg-primary-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
          {t.amenities.items.map((item, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={idx}
                className="flex flex-col items-center bg-primary px-6 py-10 text-center transition-colors hover:bg-primary-foreground/5"
              >
                <Icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/60">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
