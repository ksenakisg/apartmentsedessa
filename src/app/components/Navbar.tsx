"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { t, tr } from "../data/translations";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: lang === "el" ? "Αρχική" : "Home" },
    { href: "/apartments", label: tr(t.navApartments, lang) },
    { href: "/location", label: tr(t.navLocation, lang) },
    { href: "/attractions", label: tr(t.navAttractions, lang) },
    { href: "/faq", label: tr(t.navFaq, lang) },
    { href: "/contact", label: tr(t.navContact, lang) },
  ];

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F9F6F0]/80 backdrop-blur-md border-b border-[#E5E0D8]">
      <div className="max-w-6xl mx-auto px-4 py-3 grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center">
        {/* Mobile left: hamburger */}
        <div className="md:hidden flex items-center justify-start">
          <button
            type="button"
            aria-label={lang === "el" ? "Άνοιγμα μενού" : "Open menu"}
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center w-10 h-10"
          >
            <span className="relative block w-5 h-4">
              <span className="absolute left-0 top-0 w-full h-[2px] bg-[#2B302A] rounded-full" />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-[#2B302A] rounded-full" />
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#2B302A] rounded-full" />
            </span>
          </button>
        </div>

        {/* Logo/brand */}
        <div className="flex items-center justify-center md:justify-start">
          <Link href="/" className="whitespace-nowrap">
            <div className="leading-tight">
              <div className="font-serif text-sm font-medium tracking-wide text-zinc-900">
                Central &amp; Riverfront
              </div>
              <div className="font-sans text-[10px] tracking-[0.25em] text-[#C97B51] font-semibold block -mt-0.5">
                APARTMENTS
              </div>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex overflow-visible items-center justify-between gap-6 flex-wrap md:flex-nowrap w-full px-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative inline-block overflow-visible whitespace-nowrap text-[13px] font-medium tracking-wide text-zinc-800 hover:text-[#C97B51] transition-all duration-200"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-y-[-2px] group-hover:scale-[1.05]">
                {l.label}
              </span>
              <span
                className="absolute left-0 right-0 bottom-[-6px] h-[2px] bg-[#C97B51]/70 rounded-full transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>

        {/* Right side: Language switcher (mobile + desktop) */}
        <div className="flex justify-end md:hidden">
          <LanguageSwitcher />
        </div>
        <div className="hidden md:flex justify-end">
          <LanguageSwitcher />
        </div>
      </div>

      <MobileMenu isOpen={open} onClose={() => setOpen(false)} />
    </header>
  );
}
