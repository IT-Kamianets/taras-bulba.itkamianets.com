"use client";

import { useState, useRef } from "react";
import { CalendarDays, Users, ChevronDown } from "lucide-react";
import { useI18n, BOOKING_URL } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(2);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const guestsRef = useRef<HTMLDivElement>(null);
  const checkinRef = useRef<HTMLInputElement>(null);
  const checkoutRef = useRef<HTMLInputElement>(null);

  const formatDate = (val: string) => {
    if (!val) return null;
    const d = new Date(val);
    return d.toLocaleDateString(t.dateLocale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section id="hero" className="relative z-10 min-h-screen w-full">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/logo/hero.png"
          alt="Готельний комплекс Тарас Бульба"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-5 pt-24 pb-48 text-center md:pb-40 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="font-serif text-4xl font-bold leading-[1.15] tracking-tight text-primary-foreground whitespace-pre-line sm:text-5xl md:text-6xl lg:text-7xl">
            {t.hero.headline}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg lg:text-xl">
            {t.hero.subheadline}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-12 flex items-center justify-center gap-8 md:gap-16">
          <div className="text-center">
            <span className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl">{t.hero.statsRatingValue}</span>
            <span className="mt-1 block text-sm text-primary-foreground/60">{t.hero.statsRatingLabel}</span>
          </div>
          <div className="h-12 w-[2px] bg-primary-foreground/30" />
          <div className="text-center">
            <span className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl">{t.hero.statsRoomsValue}</span>
            <span className="mt-1 block text-sm text-primary-foreground/60">{t.hero.statsRoomsLabel}</span>
          </div>
          <div className="h-12 w-[2px] bg-primary-foreground/30" />
          <div className="text-center">
            <span className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl">{t.hero.statsFortressValue}</span>
            <span className="mt-1 block text-sm text-primary-foreground/60">{t.hero.statsFortressLabel}</span>
          </div>
        </div>
      </div>

      {/* Booking widget */}
      <div className="absolute right-0 bottom-0 left-0 z-20 translate-y-1/2">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="flex flex-col gap-0 rounded-lg border border-primary-foreground/20 bg-primary/90 backdrop-blur-md md:flex-row md:items-stretch">
            {/* Check-in */}
            <div
              className="group relative flex flex-1 cursor-pointer items-center gap-3 rounded-t-lg border-b border-primary-foreground/10 px-6 py-4 transition-colors hover:bg-primary-foreground/5 md:rounded-t-none md:rounded-l-lg md:border-b-0 md:border-r md:py-5"
              onClick={() => checkinRef.current?.showPicker()}
            >
              <CalendarDays className="h-5 w-5 shrink-0 text-accent" />
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">
                  {t.hero.checkin}
                </span>
                <span className="mt-0.5 block truncate text-sm font-medium text-primary-foreground">
                  {formatDate(checkin) || t.hero.selectDate}
                </span>
              </div>
              <input
                ref={checkinRef}
                type="date"
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
                className="absolute inset-0 cursor-pointer opacity-0"
                style={{ pointerEvents: 'none' }}
              />
            </div>

            {/* Check-out */}
            <div
              className="group relative flex flex-1 cursor-pointer items-center gap-3 border-b border-primary-foreground/10 px-6 py-4 transition-colors hover:bg-primary-foreground/5 md:border-b-0 md:border-r md:py-5"
              onClick={() => checkoutRef.current?.showPicker()}
            >
              <CalendarDays className="h-5 w-5 shrink-0 text-accent" />
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">
                  {t.hero.checkout}
                </span>
                <span className="mt-0.5 block truncate text-sm font-medium text-primary-foreground">
                  {formatDate(checkout) || t.hero.selectDate}
                </span>
              </div>
              <input
                ref={checkoutRef}
                type="date"
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
                className="absolute inset-0 cursor-pointer opacity-0"
                style={{ pointerEvents: 'none' }}
              />
            </div>

            {/* Guests */}
            <div className="relative flex-1" ref={guestsRef}>
              <div
                className="group flex h-full cursor-pointer items-center gap-3 border-b border-primary-foreground/10 px-6 py-4 transition-colors hover:bg-primary-foreground/5 md:border-b-0 md:border-r md:py-5"
                onClick={() => setGuestsOpen(!guestsOpen)}
              >
                <Users className="h-5 w-5 shrink-0 text-accent" />
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/50">
                    {t.hero.guests}
                  </span>
                  <span className="mt-0.5 block text-sm font-medium text-primary-foreground">
                    {guests} {t.hero.adults}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-primary-foreground/50 transition-transform ${guestsOpen ? "rotate-180" : ""}`}
                />
              </div>
              {guestsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setGuestsOpen(false)}
                  />
                  <div className="absolute left-0 right-0 top-full z-40 overflow-hidden rounded-b-lg border border-primary-foreground/20 bg-primary shadow-xl">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <button
                        key={n}
                        onClick={() => {
                          setGuests(n);
                          setGuestsOpen(false);
                        }}
                        className={`flex w-full cursor-pointer items-center px-6 py-3 text-sm font-medium transition-colors hover:bg-primary-foreground/10 ${
                          guests === n
                            ? "font-bold text-accent"
                            : "text-primary-foreground/70"
                        }`}
                      >
                        {n} {t.hero.adults}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* CTA - links to Booking.com */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-b-lg bg-accent px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-card transition-all hover:bg-accent/90 active:scale-95 md:rounded-b-none md:rounded-r-lg md:shrink-0 md:py-5"
            >
              {t.hero.search}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
