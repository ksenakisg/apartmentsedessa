"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import { t, tr } from "../data/translations";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroVideo() {
  const { lang } = useLang();

  return (
    <section className="w-full px-4 mt-6 max-w-6xl mx-auto">
      <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/apartments/ap1/01.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Bottom-weighted gradient only behind the text area */}
        <div
          className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-b from-transparent/0 to-black/50 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center justify-end h-full px-5 pb-12 text-center">
          <motion.h1
            className="font-serif font-medium text-4xl lg:text-5xl tracking-tight leading-tight text-white"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0 } }}
          >
            {tr(t.heroHeadline, lang)}
          </motion.h1>

          <motion.p
            className="mt-4 text-sm sm:text-lg text-white/80 leading-relaxed max-w-sm sm:max-w-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.15 } }}
          >
            {lang === "el" ? (
              <>
                Απευθείας κρατήσεις{" "}
                <span className="font-accent italic text-[#C27B58]">χωρίς προμήθειες</span>.
                {" "}
                Επικοινωνήστε μαζί μας{" "}
                <span className="font-accent italic text-[#C27B58]">άμεσα</span>.
              </>
            ) : (
              <>
                Direct bookings,{" "}
                <span className="font-accent italic text-[#C27B58]">commission-free</span>. Reach us{" "}
                <span className="font-accent italic text-[#C27B58]">instantly</span>.
              </>
            )}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.3 } }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.18 }}>
              <Link
                href="/apartments"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15 hover:border-white/50"
              >
                <span>{lang === "el" ? "Διαμερίσματα →" : "Apartments →"}</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.18 }}>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15 hover:border-white/50"
              >
                <span>{lang === "el" ? "Επικοινωνία →" : "Contact →"}</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
