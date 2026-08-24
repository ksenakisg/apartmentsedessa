"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { useMemo } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: Props) {
  const { lang } = useLang();

  const translations = {
    GR: {
      ctaTitle: "ΚΑΝΤΕ ΚΡΑΤΗΣΗ ΣΤΗΝ ΚΑΛΥΤΕΡΗ ΤΙΜΗ",
      callBtn: "Τηλέφωνο",
      links: {
        home: "Αρχική",
        apartments: "Διαμερίσματα",
        location: "Τοποθεσία",
        attractions: "Αξιοθέατα",
        faq: "Συχνές Ερωτήσεις",
        contact: "Επικοινωνία",
      },
      whatsAppBtn: "WhatsApp",
    },
    EN: {
      ctaTitle: "BOOK AT THE BEST PRICE",
      callBtn: "Call Us",
      links: {
        home: "Home",
        apartments: "Apartments",
        location: "Location",
        attractions: "Attractions",
        faq: "FAQ",
        contact: "Contact",
      },
      whatsAppBtn: "WhatsApp",
    },
  } as const;

  const activeLangKey = lang === "el" ? "GR" : "EN";
  const tActive = translations[activeLangKey];

  const links = useMemo(
    () => [
      { href: "/", label: tActive.links.home },
      { href: "/apartments", label: tActive.links.apartments },
      { href: "/location", label: tActive.links.location },
      { href: "/attractions", label: tActive.links.attractions },
      { href: "/faq", label: tActive.links.faq },
      { href: "/contact", label: tActive.links.contact },
    ],
    [tActive]
  );

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  } as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 w-screen h-screen bg-[#1C1D18] text-[#EAE6DF] z-[9999] p-8 flex flex-col justify-between overflow-y-auto isolate top-0 left-0 right-0 bottom-0"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between">
            <Link href="/" onClick={onClose} className="whitespace-nowrap">
              <div className="leading-tight">
                <div className="font-serif text-lg font-medium tracking-wide text-[#EAE6DF]">
                  Central &amp; Riverfront
                </div>
                <div className="font-sans text-[10px] tracking-[0.25em] text-[#C97B51] font-semibold block -mt-1">
                  APARTMENTS
                </div>
              </div>
            </Link>

            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ rotate: 90 }}
              aria-label={lang === "el" ? "Κλείσιμο μενού" : "Close menu"}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              ✕
            </motion.button>
          </div>

          {/* Middle Navigation */}
          <div className="flex-1 flex items-center">
            <div className="w-full">
              <motion.div
                initial={false}
                animate={{}}
                transition={{ staggerChildren: 0.06, delayChildren: 0.03 }}
                className="space-y-5 text-left font-serif text-2xl md:text-3xl"
              >
                {links.map((l) => (
                  <motion.div key={l.href} variants={itemVariants}>
                    <Link
                      href={l.href}
                      onClick={onClose}
                      className="block text-[#EAE6DF] hover:text-[#C97B51] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* No language switcher inside the menu body (only in header) */}
            </div>
          </div>

          {/* Bottom Quick Contact Section */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <p className="text-xs uppercase tracking-widest text-zinc-400 font-sans">
              {tActive.ctaTitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/306945209164"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] py-3 px-4 rounded-xl text-sm font-medium hover:bg-[#25D366] hover:text-white transition-all"
              >
                {tActive.whatsAppBtn}
              </a>
              <a
                href="tel:+306945209164"
                className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white py-3 px-4 rounded-xl text-sm font-medium hover:bg-white hover:text-black transition-all"
              >
                {tActive.callBtn}: +30 6945 209 164
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

