"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { t, tr } from "../data/translations";

export default function FAQAccordion() {
  const { lang } = useLang();
  const items = t.faq;

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 px-4 sm:px-6 mt-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <p className="text-xs tracking-[0.25em] uppercase text-[#B86B4B] font-sans font-semibold mb-3">
              {lang === "el" ? "Συχνές Ερωτήσεις" : "FAQ"}
            </p>
            <h3 className="font-serif font-medium text-4xl lg:text-5xl text-[#2B302A]">{tr(t.faqHeading, lang)}</h3>
          </div>

          <div className="flex flex-col gap-3">
            {items.map((it, idx) => {
              const isOpen = open === idx;

              return (
                <div key={idx} className="bg-[#FFFDF9] rounded-2xl border border-[#E5E0D8]">
                  <button
                    type="button"
                    onClick={() => setOpen((cur) => (cur === idx ? null : idx))}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-4 py-4 text-left"
                  >
                    <span className="font-serif text-xl text-[#2B302A]">{tr(it.question, lang)}</span>

                    <motion.span
                      className="w-9 h-9 rounded-full bg-[#F9F6F0] border border-[#E5E0D8] flex items-center justify-center text-[#2B302A]"
                      animate={{ rotate: isOpen ? 45 : 0, transition: { duration: 0.2 } }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        className="w-4 h-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-0">
                          <p className="text-[#5A6059] text-base leading-relaxed">{tr(it.answer, lang)}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
