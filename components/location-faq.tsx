"use client";

import { useI18n } from "@/lib/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MapPin,
  Car,
  Clock,
  ScrollText,
  Droplets,
  CalendarClock,
  PawPrint,
} from "lucide-react";

const faqIcons = [Car, Clock, ScrollText, Droplets, CalendarClock, PawPrint];

export default function LocationFaq() {
  const { t } = useI18n();

  const half = Math.ceil(t.location.faq.length / 2);
  const leftFaq = t.location.faq.slice(0, half);
  const rightFaq = t.location.faq.slice(half);

  return (
    <section id="location" className="bg-section-alt py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {t.location.subtitle}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-section-alt-foreground text-balance md:text-4xl lg:text-5xl">
            {t.location.title}
          </h2>
        </div>

        {/* Maps - 2 columns */}
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {/* Hotel map */}
          <div>
            <div className="mb-3 text-center">
              <div className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold uppercase tracking-[0.15em] text-section-alt-foreground">
                  {t.location.hotelLabel}
                </span>
              </div>
            </div>
            <div className="aspect-[16/10] overflow-hidden rounded-lg border border-section-alt-foreground/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1295.3!2d26.5711259!3d48.6744594!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4733c75f22392d9f%3A0xf40badd22dbbc5de!2z0KLQsNGA0LDRgSDQkdGD0LvRjNCx0LA!5e0!3m2!1suk!2sua!4v1709560000000!5m2!1suk!2sua"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Готель Тарас Бульба на карті"
                className="h-full w-full"
              />
            </div>
            <p className="mt-2 text-center text-sm text-section-alt-foreground/60">
              {t.location.hotelAddress}
            </p>
          </div>

          {/* Restaurant map */}
          <div>
            <div className="mb-3 text-center">
              <div className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold uppercase tracking-[0.15em] text-section-alt-foreground">
                  {t.location.restaurantLabel}
                </span>
              </div>
            </div>
            <div className="aspect-[16/10] overflow-hidden rounded-lg border border-section-alt-foreground/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1295.3!2d26.5710575!3d48.6743071!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4733c79625582fa7%3A0xabcf210fd0dd6df8!2z0KDQtdGB0YLQvtGA0LDQvSAi0KLQsNGA0LDRgSDQkdGD0LvRjNCx0LAi!5e0!3m2!1suk!2sua!4v1709560000001!5m2!1suk!2sua"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ресторан Тарас Бульба на карті"
                className="h-full w-full"
              />
            </div>
            <p className="mt-2 text-center text-sm text-section-alt-foreground/60">
              {t.location.restaurantAddress}
            </p>
          </div>
        </div>

        {/* Important information - 2 independent columns */}
        <div className="mt-16">
          <h3 className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.2em] text-section-alt-foreground">
            {t.location.importantInfo}
          </h3>
          <div className="grid gap-x-8 md:grid-cols-2">
            {/* Left column */}
            <div className="flex flex-col gap-3">
              {leftFaq.map((item, idx) => {
                const Icon = faqIcons[idx] || ScrollText;
                return (
                  <Accordion key={idx} type="single" collapsible className="w-full">
                    <AccordionItem
                      value={`faq-${idx}`}
                      className="border-0"
                    >
                      <AccordionTrigger className="rounded-md bg-primary/60 px-4 py-3 text-left text-sm font-semibold text-section-alt-foreground hover:no-underline hover:bg-primary/80 transition-colors [&[data-state=open]]:rounded-b-none">
                        <span className="flex items-center gap-2.5">
                          <Icon className="h-4 w-4 shrink-0 text-accent" />
                          {item.title}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="rounded-b-md bg-primary/40 px-4 pb-4 pt-2 text-sm leading-relaxed text-section-alt-foreground/70">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-3 max-md:mt-3">
              {rightFaq.map((item, idx) => {
                const Icon = faqIcons[half + idx] || ScrollText;
                return (
                  <Accordion key={idx} type="single" collapsible className="w-full">
                    <AccordionItem
                      value={`faq-r-${idx}`}
                      className="border-0"
                    >
                      <AccordionTrigger className="rounded-md bg-primary/60 px-4 py-3 text-left text-sm font-semibold text-section-alt-foreground hover:no-underline hover:bg-primary/80 transition-colors [&[data-state=open]]:rounded-b-none">
                        <span className="flex items-center gap-2.5">
                          <Icon className="h-4 w-4 shrink-0 text-accent" />
                          {item.title}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="rounded-b-md bg-primary/40 px-4 pb-4 pt-2 text-sm leading-relaxed text-section-alt-foreground/70">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
