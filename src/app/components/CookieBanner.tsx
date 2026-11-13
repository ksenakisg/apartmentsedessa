"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useLang } from "../context/LanguageContext";

const PrivacyModal = dynamic(() => import("./PrivacyModal"), { ssr: false });

const LS_KEY = "cookies_accepted";

export default function CookieBanner() {
  const { lang } = useLang();
  const [accepted, setAccepted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(LS_KEY);
      if (v === "true") setAccepted(true);
    } catch {
      // If storage is blocked, we just keep the banner visible.
    }
  }, []);

  const acceptAll = () => {
    try {
      localStorage.setItem(LS_KEY, "true");
    } catch {
      // ignore
    }
    setAccepted(true);
  };

  const acceptEssential = () => {
    // For now we persist the same flag; can be split into granular consent later.
    acceptAll();
  };

  if (accepted) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-[#242721] text-[#F4EFEA] p-5 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md"
        >
          <p className="text-sm leading-relaxed">
            {lang === "el"
              ? "Χρησιμοποιούμε cookies για να σας προσφέρουμε την καλύτερη δυνατή εμπειρία περιήγησης και κράτησης."
              : "We use cookies to provide you with the best possible browsing and booking experience."}
          </p>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <motion.button
              type="button"
              onClick={acceptAll}
              className="bg-[#C97B51] hover:bg-[#B56A42] text-white text-xs font-semibold px-4 py-2 rounded-full transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {lang === "el" ? "Αποδοχή Όλων" : "Accept All"}
            </motion.button>
            <motion.button
              type="button"
              onClick={acceptEssential}
              className="bg-transparent text-zinc-400 hover:text-white text-xs px-3 py-2 rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {lang === "el" ? "Μόνο τα Απαραίτητα" : "Only Essential"}
            </motion.button>

            <motion.button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-zinc-300 hover:text-white text-xs font-semibold underline underline-offset-4 ml-auto sm:ml-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {lang === "el" ? "Πολιτική Απορρήτου & Όροι" : "Privacy Policy & Terms"}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {showModal && <PrivacyModal onClose={() => setShowModal(false)} />}
    </>
  );
}

