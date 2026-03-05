"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      setMenuOpen((e as CustomEvent<{ open: boolean }>).detail.open);
    };
    window.addEventListener("mobile-menu-toggle", handler);
    return () => window.removeEventListener("mobile-menu-toggle", handler);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed right-4 bottom-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-card shadow-lg transition-all duration-200 ease-out hover:bg-accent/80 active:scale-95 cursor-pointer md:right-5 md:h-11 md:w-11 ${
        visible && !menuOpen
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4 md:h-5 md:w-5" />
    </button>
  );
}
