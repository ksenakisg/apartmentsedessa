"use client";

import Link from "next/link";
import { useLang } from "./context/LanguageContext";

export default function NotFound() {
  const { lang } = useLang();

  const translations404 = {
    el: {
      code: "404",
      title: "Η σελίδα δεν βρέθηκε",
      description: "Η σελίδα που ψάχνετε δεν υπάρχει ή έχει μετακινηθεί.",
      homeBtn: "Επιστροφή στην Αρχική",
    },
    en: {
      code: "404",
      title: "Page Not Found",
      description:
        "The page you are looking for does not exist or has been moved.",
      homeBtn: "Back to Home",
    },
  } as const;

  const t = lang === "el" ? translations404.el : translations404.en;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl rounded-3xl bg-[#FFFDF9] border border-[#E5E0D8] shadow-sm p-8 md:p-10">
        <p className="text-xs tracking-[0.25em] uppercase text-[#B86B4B] font-sans font-semibold mb-4">
          {t.code}
        </p>
        <h1 className="font-serif font-medium text-4xl md:text-5xl text-[#2B302A]">
          {t.title}
        </h1>
        <p className="mt-4 text-[#5A6059] text-base leading-relaxed">
          {t.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#C97B51] px-6 py-3 text-sm font-semibold text-white hover:bg-[#B56A42] transition-all active:scale-95"
          >
            {t.homeBtn}
          </Link>
          <span className="text-sm text-[#8C7A6B]">Central &amp; Riverfront Apartments</span>
        </div>
      </div>
    </div>
  );
}

