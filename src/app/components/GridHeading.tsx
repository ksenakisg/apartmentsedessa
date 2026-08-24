"use client";

import { useLang } from "../context/LanguageContext";
import { t, tr } from "../data/translations";

export default function GridHeading() {
  const { lang } = useLang();
  return (
    <h2 className="font-serif text-base sm:text-lg font-semibold text-[#2B302A] mb-4 sm:mb-5">
      {tr(t.ourApartments, lang)}
    </h2>
  );
}
