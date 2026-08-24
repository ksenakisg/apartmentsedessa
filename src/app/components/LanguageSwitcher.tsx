"use client";

import { useLang } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="inline-flex items-center bg-black/5 p-1 rounded-full border border-black/10 text-xs font-semibold"
    >
      <button
        onClick={() => setLang("el")}
        aria-pressed={lang === "el"}
        className={`px-3 py-1 rounded-full transition-all duration-200 ${
          lang === "el"
            ? "bg-[#242721] text-white shadow-sm"
            : "text-zinc-600 hover:text-black"
        }`}
      >
        GR
      </button>
      <button
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-3 py-1 rounded-full transition-all duration-200 ${
          lang === "en"
            ? "bg-[#242721] text-white shadow-sm"
            : "text-zinc-600 hover:text-black"
        }`}
      >
        EN
      </button>
    </div>
  );
}
