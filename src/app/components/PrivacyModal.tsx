"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";

type Props = {
  onClose: () => void;
};

export default function PrivacyModal({ onClose }: Props) {
  const { lang } = useLang();

  return (
    <AnimatePresence initial={false}>
      <motion.div
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-3xl bg-[#FFFDF9] border border-[#E5E0D8] rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-[#B86B4B] font-sans font-semibold mb-3">
                  {lang === "el" ? "ΝΟΜΙΚΑ" : "LEGAL"}
                </p>
                <h2 className="font-serif font-medium text-3xl text-[#2B302A]">
                  {lang === "el"
                    ? "Πολιτική Απορρήτου & Όροι"
                    : "Privacy Policy & Terms"}
                </h2>
              </div>

              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ rotate: 90, scale: 1.1 }}
                className="rounded-full border border-[#E5E0D8] bg-[#FAF5F0] px-4 py-2 text-sm font-semibold text-[#2B302A] hover:border-[#B86B4B] transition-colors"
                aria-label={lang === "el" ? "Κλείσιμο" : "Close"}
              >
                ✕
              </motion.button>
            </div>

            <div className="mt-6 space-y-6 max-h-[70vh] overflow-auto pr-1">
              <section>
                <h3 className="font-serif text-xl text-[#2B302A]">
                  {lang === "el" ? "Πολιτική Απορρήτου (GDPR)" : "Privacy Policy (GDPR)"}
                </h3>
                <p className="mt-2 text-[#5A6059] leading-relaxed">
                  {lang === "el"
                    ? "Προστατεύουμε τα προσωπικά σας δεδομένα κατά την επικοινωνία και/ή τη διαδικασία κράτησης. Συλλέγουμε μόνο τα απαραίτητα στοιχεία (όνομα, τηλέφωνο, email) ώστε να ανταποκριθούμε στο αίτημά σας."
                    : "We protect your personal data during communication and/or the booking process. We collect only the necessary information (name, phone number, email) to respond to your request."}
                </p>
              </section>

              <section>
                <h3 className="font-serif text-xl text-[#2B302A]">
                  {lang === "el"
                    ? "Πολιτική Ακυρώσεων & Check-in/Check-out"
                    : "Cancellation & Check-in/Check-out Policy"}
                </h3>
                <p className="mt-2 text-[#5A6059] leading-relaxed">
                  {lang === "el"
                    ? "Check-in: 14:00. Check-out: 11:00. Οι ακριβείς οδηγίες άφιξης και αποχώρησης κοινοποιούνται πριν από την άφιξή σας. Για ακυρώσεις, ισχύουν οι όροι όπως συμφωνούνται κατά την κράτηση."
                    : "Check-in: 14:00. Check-out: 11:00. Arrival and departure instructions are shared before your stay. For cancellations, the applicable terms apply as agreed during booking."}
                </p>
              </section>

              <section>
                <h3 className="font-serif text-xl text-[#2B302A]">
                  {lang === "el" ? "Χρήση Cookies" : "Cookies"}
                </h3>
                <p className="mt-2 text-[#5A6059] leading-relaxed">
                  {lang === "el"
                    ? "Χρησιμοποιούμε cookies για να λειτουργούν βασικές λειτουργίες του ιστότοπου και για να βελτιώσουμε την εμπειρία περιήγησης και κράτησης. Μπορείτε να αποδεχθείτε όλα ή μόνο τα απαραίτητα μέσα από το banner συγκατάθεσης."
                    : "We use cookies to make basic website features work and to improve your browsing and booking experience. You can accept all cookies or only the essential ones via the consent banner."}
                </p>
              </section>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-xs text-[#8C7A6B]">
                {lang === "el" ? "Τελευταία ενημέρωση: σήμερα" : "Last updated: today"}
              </p>

              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center justify-center rounded-full bg-[#C97B51] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#B56A42] transition-all active:scale-95"
              >
                {lang === "el" ? "Κατανόησα" : "Got it"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

