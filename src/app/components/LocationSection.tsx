"use client";

import { useLang } from "../context/LanguageContext";
import { motion } from "framer-motion";

export default function LocationSection() {
  const { lang } = useLang();

  const locationTranslations = {
    el: {
      subtitle: "ΤΟΠΟΘΕΣΙΑ",
      title: "Στην καρδιά της Έδεσσας, δίπλα στο ποτάμι",
      introText:
        "Η τοποθεσία των διαμερισμάτων συνδυάζει την ησυχία της φύσης με την άμεση πρόσβαση στο κέντρο της πόλης και τα σημαντικότερα αξιοθέατα.",
      cards: [
        { id: "01", title: "ΚΑΤΑΡΡΑΚΤΕΣ", desc: "7 λεπτά με τα πόδια (500m)" },
        {
          id: "02",
          title: "ΑΓΟΡΑ & ΕΣΤΙΑΣΗ",
          desc: "Supermarket, Φαρμακείο & Café στα 50 μέτρα",
        },
        { id: "03", title: "ΠΑΛΙΑ ΠΟΛΗ (ΒΑΡΟΡΙ)", desc: "5 λεπτά με τα πόδια" },
        {
          id: "04",
          title: "ΠΑΡΚΙΝΓΚ",
          desc: "Ιδιωτικό parking μηχανών / Ελεύθερο public parking αυτοκινήτων",
        },
      ],
      contactHeading: "Χρειάζεστε οποιαδήποτε διευκρίνιση;",
      supportText:
        "Αν χρειάζεστε οποιαδήποτε διευκρίνιση για την τοποθεσία ή την πρόσβαση:",
      callBtn: "Τηλέφωνο",
      whatsappBtn: "WhatsApp",
      viberBtn: "Viber",
    },
    en: {
      subtitle: "LOCATION",
      title: "In the heart of Edessa, right by the river",
      introText:
        "The location of the apartments combines natural tranquility with direct access to the city center and main attractions.",
      cards: [
        { id: "01", title: "WATERFALLS", desc: "7 minutes walk (500m)" },
        {
          id: "02",
          title: "MARKET & DINING",
          desc: "Supermarket, Pharmacy & Café within 50 meters",
        },
        { id: "03", title: "OLD TOWN (VAROSI)", desc: "5 minutes walk" },
        {
          id: "04",
          title: "PARKING",
          desc: "Private motorbike parking / Free public car parking",
        },
      ],
      contactHeading: "Need any location details or directions?",
      supportText: "Need any location details or directions?",
      callBtn: "Call Us",
      whatsappBtn: "WhatsApp",
      viberBtn: "Viber",
    },
  } as const;

  const t = lang === "el" ? locationTranslations.el : locationTranslations.en;

  return (
    <section id="location" className="scroll-mt-24 px-4 sm:px-6 mt-0 mb-6 lg:my-12 bg-[#F2E5DC]">
      <div id="topothesia" className="scroll-mt-24" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        }}
        viewport={{ once: true, amount: 0.35 }}
        className="max-w-6xl mx-auto py-10"
      >
        {/* MOBILE ONLY: reorder via dedicated layout */}
        <div className="md:hidden flex flex-col gap-6">
          {/* Order 1: Title Header */}
          <div className="mb-2">
            <p className="text-xs tracking-[0.25em] uppercase text-[#C97B51] font-sans font-semibold mb-3">
              {t.subtitle}
            </p>
            <h2 className="font-serif font-medium text-4xl text-[#2B302A] leading-tight">
              {t.title}
            </h2>
          </div>

          {/* Order 2: Map Container */}
          <div className="w-full rounded-3xl overflow-hidden shadow-xl border border-black/10 bg-[#FFFDF9] relative h-[380px]">
            <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md px-4 py-2 text-white text-[11px] font-semibold tracking-wider">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
              </svg>
              ΑΘΗΝΩΝ 12, ΕΔΕΣΣΑ
            </div>
            <iframe
              src="https://maps.google.com/maps?q=Central%20%26%20Riverfront%20Apartments-Edessa%2C%20Athinon%2012%2C%20Edessa%20582%2000&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              className="w-full h-full border-0"
              aria-label="Χάρτης τοποθεσίας"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Order 3: Points of Interest / Amenities Grid (single column) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-black/5">
              <div className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#C97B51] font-semibold mb-2">
                01
              </div>
              <div className="font-serif font-medium text-[#2B302A] text-lg">
                {t.cards[0].title}
              </div>
              <div className="mt-2 text-sm text-[#2B302A]/70">
                {t.cards[0].desc}
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-black/5">
              <div className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#C97B51] font-semibold mb-2">
                02
              </div>
              <div className="font-serif font-medium text-[#2B302A] text-lg">
                {t.cards[1].title}
              </div>
              <div className="mt-2 text-sm text-[#2B302A]/70">
                {t.cards[1].desc}
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-black/5">
              <div className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#C97B51] font-semibold mb-2">
                03
              </div>
              <div className="font-serif font-medium text-[#2B302A] text-lg">
                {t.cards[2].title}
              </div>
              <div className="mt-2 text-sm text-[#2B302A]/70">
                {t.cards[2].desc}
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-black/5">
              <div className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#C97B51] font-semibold mb-2">
                04
              </div>
              <div className="font-serif font-medium text-[#2B302A] text-lg">
                {t.cards[3].title}
              </div>
              <div className="mt-2 text-sm text-[#2B302A]/70">
                {t.cards[3].desc}
              </div>
            </div>
          </div>

          {/* Order 4: Support text */}
          <div className="mt-2 rounded-3xl bg-white/40 backdrop-blur-sm border border-black/5 p-4">
            <p className="font-serif text-lg text-[#2B302A]">
              {t.supportText}
            </p>

            {/* Order 4 buttons row */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+306945209164"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition-all hover:scale-[1.02] shadow-sm"
              >
                {t.callBtn}
              </a>
              <a
                href="https://wa.me/306945209164"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all hover:scale-[1.02] shadow-sm"
              >
                {t.whatsappBtn}
              </a>
              <a
                href="viber://chat?number=%2B306945209164"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-[#7360F2] text-white hover:bg-[#6250db] transition-all hover:scale-[1.02] shadow-sm"
              >
                {t.viberBtn}
              </a>
            </div>
          </div>
        </div>

        {/* DESKTOP ONLY: keep existing layout unchanged */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="mb-6">
              <p className="text-xs tracking-[0.25em] uppercase text-[#C97B51] font-sans font-semibold mb-3">
                {t.subtitle}
              </p>
              <h2 className="font-serif font-medium text-4xl lg:text-5xl text-[#2B302A] leading-tight">
                {t.title}
              </h2>
              <p className="mt-4 text-[#2B302A]/70 text-base leading-relaxed max-w-2xl">
                {t.introText}
              </p>
            </div>

            {/* Proximity cards (2x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-black/5">
                <div className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#C97B51] font-semibold mb-2">
                  01
                </div>
                <div className="font-serif font-medium text-[#2B302A] text-lg">
                  {t.cards[0].title}
                </div>
                <div className="mt-2 text-sm text-[#2B302A]/70">
                  {t.cards[0].desc}
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-black/5">
                <div className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#C97B51] font-semibold mb-2">
                  02
                </div>
                <div className="font-serif font-medium text-[#2B302A] text-lg">
                  {t.cards[1].title}
                </div>
                <div className="mt-2 text-sm text-[#2B302A]/70">
                  {t.cards[1].desc}
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-black/5">
                <div className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#C97B51] font-semibold mb-2">
                  03
                </div>
                <div className="font-serif font-medium text-[#2B302A] text-lg">
                  {t.cards[2].title}
                </div>
                <div className="mt-2 text-sm text-[#2B302A]/70">
                  {t.cards[2].desc}
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-black/5">
                <div className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#C97B51] font-semibold mb-2">
                  04
                </div>
                <div className="font-serif font-medium text-[#2B302A] text-lg">
                  {t.cards[3].title}
                </div>
                <div className="mt-2 text-sm text-[#2B302A]/70">
                  {t.cards[3].desc}
                </div>
              </div>
            </div>

            {/* Direct contact strip (bottom of section) */}
            <div className="mt-6 rounded-3xl bg-white/40 backdrop-blur-sm border border-black/5 p-4">
              <p className="font-serif text-lg text-[#2B302A]">
                {t.contactHeading}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href="tel:+306945209164"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition-all hover:scale-[1.02] shadow-sm"
                >
                  {t.callBtn}
                </a>
                <a
                  href="https://wa.me/306945209164?text="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all hover:scale-[1.02] shadow-sm"
                >
                  {t.whatsappBtn}
                </a>
                <a
                  href="viber://chat?number=%2B306945209164"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-[#7360F2] text-white hover:bg-[#6250db] transition-all hover:scale-[1.02] shadow-sm"
                >
                  {t.viberBtn}
                </a>
              </div>
            </div>
          </div>

          {/* Right column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 h-[500px] w-full rounded-3xl overflow-hidden shadow-xl border border-black/10 bg-[#FFFDF9] relative">
              <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md px-4 py-2 text-white text-[11px] font-semibold tracking-wider">
                ΑΘΗΝΩΝ 12, ΕΔΕΣΣΑ
              </div>
              <iframe
                src="https://maps.google.com/maps?q=Central%20%26%20Riverfront%20Apartments-Edessa%2C%20Athinon%2012%2C%20Edessa%20582%2000&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                className="w-full h-full border-0"
                aria-label="Χάρτης τοποθεσίας"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
