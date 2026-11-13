"use client";

import HostModal from "../components/HostModal";
import { useLang } from "../context/LanguageContext";
import { useState } from "react";
import { motion } from "framer-motion";

const PHONE = "+30 6945 209 164";
const PHONE_TEL = "tel:+306945209164";
const WHATSAPP_HREF =
  "https://wa.me/306945209164";
const EMAIL = "dgjmaria@gmail.com";
const ADDRESS_EL = "Αθηνών 12, Έδεσσα 58200";
const ADDRESS_EN = "Athinon 12, Edessa 582 00";
const EMERGENCY_TEL = "tel:+306945209164";

export default function ContactPage() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="min-h-[calc(100vh-64px)] flex flex-col">
        <div className="flex-1">
          <section className="px-4 sm:px-6 py-12 pb-16">
            <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-[#B86B4B] font-sans font-semibold mb-3">
            {lang === "el" ? "Επικοινωνία" : "Contact"}
          </p>
          <h1 className="font-serif font-medium text-4xl lg:text-5xl text-[#2B302A]">
            {lang === "el" ? "Μιλήστε απευθείας μαζί μας" : "Reach us directly"}
          </h1>
          <p className="mt-4 text-[#5A6059] text-base leading-relaxed max-w-2xl">
            {lang === "el"
              ? "Για διαθεσιμότητα και καλύτερη προσφορά, επικοινωνήστε απευθείας και θα απαντήσουμε άμεσα."
              : "For availability and the best direct offer, contact us and we will reply quickly."}
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.article
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-[#FFFDF9] border border-[#E5E0D8] rounded-2xl p-5 transition-all hover:shadow-xl hover:shadow-[#C97B51]/15 hover:border-[#C97B51]/40"
            >
              <p className="text-xs tracking-[0.25em] uppercase text-[#B86B4B] font-sans font-semibold mb-2">
                {lang === "el" ? "ΤΗΛΕΦΩΝΟ" : "PHONE"}
              </p>
              <a href={PHONE_TEL} className="font-sans text-2xl text-[#2B302A] hover:text-[#B86B4B] transition-colors">
                {PHONE}
              </a>
            </motion.article>

            <motion.article
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-[#FFFDF9] border border-[#E5E0D8] rounded-2xl p-5 transition-all hover:shadow-xl hover:shadow-[#C97B51]/15 hover:border-[#C97B51]/40"
            >
              <p className="text-xs tracking-[0.25em] uppercase text-[#B86B4B] font-sans font-semibold mb-2">
                WhatsApp
              </p>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#F4EFEA] border border-[#C97B51]/30 px-6 py-3 text-sm font-medium text-[#242721] hover:bg-[#C97B51] hover:text-white transition-all w-full"
                style={{ transform: "translateZ(0)" }}
              >
                {/* WhatsApp official icon */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="text-[#25D366] flex-shrink-0"
                >
                  <path
                    d="M20.52 3.48A11.92 11.92 0 0 0 12 0C5.37 0 .03 5.3 0 11.88c0 2.1.55 4.16 1.6 5.98L0 24l6.3-1.56A12 12 0 0 0 12 24c6.63 0 11.97-5.3 12-11.88 0-2.4-.74-4.66-2.48-8.64ZM12 21.78a9.8 9.8 0 0 1-4.92-1.35l-.36-.21-3.36.84.87-3.27-.23-.37A9.66 9.66 0 0 1 2.22 11.9c.02-5.4 4.46-9.75 9.99-9.75 5.5 0 9.98 4.33 9.98 9.65 0 5.41-4.47 9.99-10.17 10Z"
                    fill="currentColor"
                    opacity="0.95"
                  />
                  <path
                    d="M17.6 14.73c-.23-.12-1.37-.68-1.58-.76-.21-.08-.36-.12-.52.12-.16.24-.6.76-.73.92-.14.16-.27.18-.5.06-.23-.12-.99-.36-1.89-1.16-.7-.62-1.17-1.39-1.31-1.62-.14-.23-.02-.35.1-.46.1-.1.23-.27.34-.4.11-.13.14-.23.22-.38.08-.15.04-.29-.02-.41-.06-.12-.52-1.24-.7-1.69-.18-.45-.36-.39-.52-.39h-.45c-.16 0-.42.06-.64.29-.22.23-.83.8-.83 1.95 0 1.15.85 2.27.97 2.43.12.16 1.63 2.5 3.95 3.5.55.23.99.37 1.33.48.56.18 1.07.16 1.47.1.45-.07 1.37-.56 1.57-1.1.2-.54.2-1 .14-1.1-.06-.1-.23-.17-.46-.29Z"
                    fill="currentColor"
                  />
                </svg>
                {lang === "el" ? "Κάντε Κράτηση μέσω WhatsApp" : "Book via WhatsApp"}
              </a>
            </motion.article>

            <motion.article
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-[#FFFDF9] border border-[#E5E0D8] rounded-2xl p-5 transition-all hover:shadow-xl hover:shadow-[#C97B51]/15 hover:border-[#C97B51]/40"
            >
              <p className="text-xs tracking-[0.25em] uppercase text-[#B86B4B] font-sans font-semibold mb-2">
                {lang === "el" ? "EMAIL" : "EMAIL"}
              </p>
              <a href={`mailto:${EMAIL}`} className="font-sans text-2xl text-[#2B302A] hover:text-[#B86B4B] transition-colors">
                {EMAIL}
              </a>
            </motion.article>

            <motion.article
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-[#FFFDF9] border border-[#E5E0D8] rounded-2xl p-5 transition-all hover:shadow-xl hover:shadow-[#C97B51]/15 hover:border-[#C97B51]/40"
            >
              <p className="text-xs tracking-[0.25em] uppercase text-[#B86B4B] font-sans font-semibold mb-2">
                {lang === "el" ? "ΔΙΕΥΘΥΝΣΗ" : "ADDRESS"}
              </p>
              <p className="font-sans text-lg text-[#2B302A]">{lang === "el" ? ADDRESS_EL : ADDRESS_EN}</p>
            </motion.article>
          </div>

          {/* Emergency */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mt-6 bg-[#FFFDF9] border border-[#E5E0D8] rounded-2xl p-5 transition-all hover:shadow-xl hover:shadow-[#C97B51]/15 hover:border-[#C97B51]/40"
          >
            <p className="font-sans font-semibold text-xs tracking-[0.25em] uppercase text-[#B86B4B] mb-2">
              {lang === "el" ? "ΑΡΙΘΜΟΣ ΕΚΤΑΚΤΗΣ ΑΝΑΓΚΗΣ" : "EMERGENCY CONTACT"}
            </p>
            <p className="text-[#5A6059] text-base leading-relaxed">
              {lang === "el" ? "Σε περίπτωση που δεν απαντήσουμε άμεσα: " : "In case we don't reply promptly: "}
              <a
                href={EMERGENCY_TEL}
                className="font-semibold text-[#2B302A] hover:text-[#B86B4B] transition-colors"
              >
                +30 6974144390
              </a>
            </p>

          </motion.div>

          </div>

          {/* Meet Your Host (standalone centered black trigger) */}
          <div className="mt-8 flex items-center justify-center">
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center rounded-full bg-[#C97B51] px-6 py-3 text-sm font-semibold text-white hover:bg-[#B56A42] transition-all"
            >
              {lang === "el" ? "Γνωρίστε την Οικοδέσποινα" : "Meet Your Host"}
            </motion.button>
          </div>
          </section>
        </div>

        {/* Modal */}
        {open && (
          <HostModal onClose={() => setOpen(false)} />
        )}
      </div>
    </>
  );
}

