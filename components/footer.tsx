"use client";

import { Phone, Instagram } from "lucide-react";
import { useI18n, BOOKING_URL } from "@/lib/i18n";

const navLeft = [
  { label: "about", href: "#about" },
  { label: "amenities", href: "#amenities" },
  { label: "rooms", href: "#rooms" },
  { label: "restaurant", href: "#restaurant" },
] as const;

const navRight = [
  { label: "gallery", href: "#gallery" },
  { label: "reviews", href: "#reviews" },
  { label: "location", href: "#location" },
  { label: "contacts", href: "#footer" },
] as const;

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer id="footer" className="bg-primary py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 border-b border-primary-foreground/10 pb-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-16">
          {/* Brand column */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <img
                src="/logo/logo.png"
                alt="Логотип"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="font-serif text-lg font-bold tracking-[0.15em] text-primary-foreground">
                {t.brandName}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/50 text-center md:text-left">
              {t.footer.brandDesc}
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-md border border-primary-foreground/40 px-6 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-all hover:bg-primary-foreground hover:text-primary active:scale-95"
            >
              {t.nav.book}
            </a>
          </div>

          {/* Navigation column */}
          <div className="flex flex-col items-center">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/40">
              {t.footer.navHeading}
            </h4>
            <div className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5">
              {navLeft.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                >
                  {t.nav[item.label]}
                </a>
              ))}
              {navRight.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                >
                  {t.nav[item.label]}
                </a>
              ))}
            </div>
          </div>

          {/* Contacts column */}
          <div className="flex flex-col items-center">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/40">
              {t.footer.addressHeading}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <a
                  href="tel:+380673811554"
                  className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                >
                  {t.footer.hotelPhoneLabel}: {t.footer.hotelPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <a
                  href="tel:+380677677340"
                  className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                >
                  {t.footer.restaurantPhoneLabel}: {t.footer.restaurantPhone}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a
                href="https://instagram.com/tarasbulba.hotel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/60 transition-all hover:border-primary-foreground/50 hover:text-primary-foreground"
                aria-label="Instagram готелю"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/tarasbulbakp/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/60 transition-all hover:border-primary-foreground/50 hover:text-primary-foreground"
                aria-label="Instagram ресторану"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-xs text-primary-foreground/30">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/IT-Kamianets/taras-bulba.itkamianets.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/50 transition-all hover:bg-primary-foreground/20 hover:text-primary-foreground"
              aria-label="GitHub"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <span className="text-xs text-primary-foreground/30">
              Designed by Valtser V. O.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
