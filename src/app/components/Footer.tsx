"use client";

import { motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import Link from "next/link";

export default function Footer() {
  const { lang } = useLang();
  const year = 2026;

  const footerTranslations = {
    el: {
      tagline: "ΚΡΑΤΗΣΗ",
      heading: "Ξεκινήστε την περιπέτειά σας",
      subheading:
        "Κλείστε το κατάλυμά σας και αφήστε τη μαγευτική Έδεσσα να σας μάθει τον ρυθμό της.",
      ctaBtn: "Κάντε κράτηση →",
      description:
        "Παραδοσιακή φιλοξενία με στυλ, στην καρδιά της Έδεσσας.",
      menuTitle: "ΜΕΝΟΥ",
      menuHome: "Αρχική",
      menuApartments: "Διαμερίσματα",
      menuAttractions: "Εμπειρίες / Αξιοθέατα",
      menuContact: "Επικοινωνία",
      contactTitle: "ΕΠΙΚΟΙΝΩΝΙΑ",
      contactAddress: "Αθηνών 12, Έδεσσα, Πέλλα 582 00",
      contactPhone: "Τηλ: +30 6945 209 164",
      quote: "«Εκεί που ο χρόνος επιβραδύνει και η σύνδεση αρχίζει.»",
    },
    en: {
      tagline: "RESERVATION",
      heading: "Start your journey",
      subheading:
        "Book your stay and let enchanting Edessa introduce you to its rhythm.",
      ctaBtn: "Book Now →",
      description:
        "Traditional hospitality with style, in the heart of Edessa.",
      menuTitle: "MENU",
      menuHome: "Home",
      menuApartments: "Apartments",
      menuAttractions: "Experiences / Sightseeing",
      menuContact: "Contact",
      contactTitle: "CONTACT",
      contactAddress: "Athinon 12, Edessa, Pella 582 00",
      contactPhone: "Tel: +30 6945 209 164",
      quote: "“Where time slows down and connection begins.”",
    },
  } as const;

  const t = lang === "el" ? footerTranslations.el : footerTranslations.en;

  const phone = "+30 6945 209 164";
  const email = "dgjmaria@gmail.com";
  const address = "Αθηνών 12, Έδεσσα, Πέλλα 582 00";

  return (
    <footer
      className="bg-[#242721] text-[#F4EFEA] pt-16 pb-8 px-6 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top Call To Action */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.25em] text-[#D9A384] uppercase font-semibold block mb-3">
            {t.tagline}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif mb-4 text-white">
            {t.heading}
          </h2>
          <p className="text-[#D1C9BF] text-sm max-w-md mx-auto mb-8 leading-relaxed">
            {t.subheading}
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="inline-block bg-[#F4EFEA] text-[#242721] hover:bg-[#D9A384] hover:text-white transition-all duration-300 px-8 py-3.5 rounded-full text-sm font-medium shadow-lg"
          >
            {t.ctaBtn}
          </motion.a>
        </div>

        {/* 3-Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12 border-t border-white/10">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl text-white">
              Central &amp; Riverfront Apartments
            </h3>
            <p className="text-[#D1C9BF] text-sm leading-relaxed">
              {t.description}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-[#D9A384] uppercase">
              {t.menuTitle}
            </h4>
            <ul className="space-y-2 text-sm text-[#D1C9BF]">
              <motion.li
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="will-change-transform"
              >
                <Link
                  href="/"
                  className="hover:text-white transition-colors"
                >
                  {t.menuHome}
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="will-change-transform"
              >
                <Link
                  href="/apartments"
                  className="hover:text-white transition-colors"
                >
                  {t.menuApartments}
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="will-change-transform"
              >
                <Link
                  href="/attractions"
                  className="hover:text-white transition-colors"
                >
                  {t.menuAttractions}
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="will-change-transform"
              >
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  {t.menuContact}
                </Link>
              </motion.li>
            </ul>
          </div>

          {/* Col 3: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-[#D9A384] uppercase">
              {t.contactTitle}
            </h4>
            <div className="text-sm text-[#D1C9BF] space-y-1.5 leading-relaxed">
              <motion.p
                whileHover={{ x: 4, color: "#F4EFEA" }}
                transition={{ duration: 0.2 }}
              >
                {t.contactAddress}
              </motion.p>
              <motion.p
                whileHover={{ x: 4, color: "#F4EFEA" }}
                transition={{ duration: 0.2 }}
              >
                {t.contactPhone}
              </motion.p>
              <motion.p
                whileHover={{ x: 4, color: "#F4EFEA" }}
                transition={{ duration: 0.2 }}
              >
                {lang === "el" ? "Email:" : "Email:"} {email}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Centered Quote */}
        <div className="my-10 text-center">
          <p className="font-serif italic text-xl md:text-2xl text-[#E5DDD3] max-w-2xl mx-auto">
            {t.quote}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-[#A89F91] gap-4">
          <p>© {year} Central &amp; Riverfront Apartments. All rights reserved.</p>
          <p>Built by Ksenakis</p>
        </div>
      </div>
    </footer>
  );
}
