"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon, ViberIcon } from "./Icons";
import { getWhatsAppUrlGeneral, getViberUrl, getViberWebFallbackUrl } from "../lib/contact";
import { useLang } from "../context/LanguageContext";
import { t, tr } from "../data/translations";

export default function StickyBar() {
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  const { lang } = useLang();

  useEffect(() => {
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsMobile(touch);
  }, []);

  useEffect(() => {
    const footer = document.getElementById("contact");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const whatsappHref = getWhatsAppUrlGeneral(lang);
  const viberHref = isMobile ? getViberUrl() : getViberWebFallbackUrl();

  return (
    <div
      className={[
        "fixed bottom-0 inset-x-0 z-50 md:hidden",
        "border-t border-slate-200 bg-white/95 backdrop-blur-sm px-4 py-3 flex gap-3",
        "transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 text-sm font-semibold text-white active:opacity-80"
      >
        <WhatsAppIcon />
        {tr(t.bookWhatsAppShort, lang)}
      </a>
      <a
        href={viberHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#7360F2] py-3 text-sm font-semibold text-white active:opacity-80"
      >
        <ViberIcon />
        {tr(t.bookViberShort, lang)}
      </a>
    </div>
  );
}
