"use client";

import { useState, useEffect } from "react";
import { useI18n, BOOKING_URL, LOCALES } from "@/lib/i18n";

export default function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.amenities, href: "#amenities" },
    { label: t.nav.rooms, href: "#rooms" },
    { label: t.nav.restaurant, href: "#restaurant" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.reviews, href: "#reviews" },
    { label: t.nav.location, href: "#location" },
    { label: t.nav.contacts, href: "#footer" },
  ];

  useEffect(() => {
    const sectionIds = ["about", "amenities", "rooms", "restaurant", "gallery", "reviews", "location", "footer"];
    const handleScroll = () => {
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActiveSection("#footer");
        return;
      }
      const scrollY = window.scrollY + window.innerHeight / 3;
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollY >= top && scrollY < bottom) {
            current = "#" + id;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("mobile-menu-toggle", { detail: { open: mobileOpen } }));
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-primary/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-5 pb-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium uppercase tracking-[0.25em] text-primary-foreground/80 transition-colors hover:text-primary-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-4 rounded-md border border-primary-foreground/60 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-primary-foreground hover:text-primary active:scale-95"
          >
            {t.nav.book}
          </a>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-primary-foreground/10 bg-primary/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8 lg:py-3.5">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 text-primary-foreground">
            <img src="/logo/logo.png" alt="Taras Bulba" className="h-9 w-auto md:h-14" />
            <span className="font-serif text-sm font-bold tracking-[0.15em] text-primary-foreground md:text-lg lg:text-xl">
              {t.brandName}
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-5 xl:gap-6 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={`text-[11px] font-medium uppercase tracking-[0.15em] transition-colors pb-1 ${
                    activeSection === link.href
                      ? "text-primary-foreground"
                      : "text-primary-foreground/60 hover:text-primary-foreground"
                  }`}
                >
                  {link.label}
                </a>
                {activeSection === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent animate-in fade-in duration-200" />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 lg:gap-3">
            {/* Desktop lang switcher */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="cursor-pointer rounded-md border border-primary-foreground/60 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-all hover:bg-primary-foreground hover:text-primary"
              >
                {LOCALES.find((l) => l.code === locale)?.label}
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                  <div className="absolute left-1/2 top-full z-50 mt-2 min-w-[120px] -translate-x-1/2 overflow-hidden rounded-md border border-primary-foreground/20 bg-primary shadow-xl">
                    {LOCALES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLocale(l.code); setLangOpen(false); }}
                        className={`flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-primary-foreground/10 ${
                          locale === l.code ? "font-bold text-accent" : "text-primary-foreground/70"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Desktop book button */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md border border-primary-foreground/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-all hover:bg-primary-foreground hover:text-primary active:scale-95 lg:inline-flex"
            >
              {t.nav.book}
            </a>

            {/* Mobile lang switcher */}
            <div className="relative lg:hidden">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="cursor-pointer rounded-md border border-primary-foreground/40 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary-foreground/10"
              >
                {LOCALES.find((l) => l.code === locale)?.label}
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-[60]" onClick={() => setLangOpen(false)} />
                  <div className="absolute left-1/2 top-full z-[70] mt-1 min-w-[100px] -translate-x-1/2 overflow-hidden rounded-md border border-primary-foreground/20 bg-primary shadow-xl">
                    {LOCALES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLocale(l.code); setLangOpen(false); }}
                        className={`flex w-full cursor-pointer items-center px-3 py-2 text-xs transition-colors hover:bg-primary-foreground/10 ${
                          locale === l.code ? "font-bold text-accent" : "text-primary-foreground/70"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Animated hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative flex h-10 w-10 cursor-pointer items-center justify-center text-primary-foreground lg:hidden"
              aria-label="Toggle menu"
            >
              <span className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-200 ${mobileOpen ? "scale-0 opacity-0" : ""}`} />
              <span className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45" : "translate-y-1.5"}`} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
