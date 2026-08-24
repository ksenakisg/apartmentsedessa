"use client";

import { useLang } from "../context/LanguageContext";
import Image from "next/image";

type Props = {
  onClose: () => void;
};

export default function HostModal({
  onClose,
}: Props) {
  const { lang } = useLang();

  const MARIA_PROFILE_URL =
    "https://www.airbnb.gr/users/profile/1470251636604256223?previous_page_name=PdpHomeMarketplace";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#FFFDF9] border border-[#E5E0D8] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
            {/* Left column: image, badge, stats */}
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-[150px] h-[150px] rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src="/images/host-maria.avif"
                  alt={lang === "el" ? "Μαρία" : "Maria"}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                  priority
                  quality={80}
                />
              </div>

              <span className="bg-[#FF385C] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                SUPERHOST
              </span>

              <div className="flex flex-col space-y-1">
                <div className="text-sm text-[#555]">
                  <span className="font-semibold text-[#2B302A]">4.97 ★</span>
                  <span className="ml-2">{lang === "el" ? "Βαθμολογία" : "Rating"}</span>
                </div>
                <div className="text-sm text-[#555]">
                  <span className="font-semibold text-[#2B302A]">200+</span>
                  <span className="ml-2">{lang === "el" ? "Κριτικές" : "Reviews"}</span>
                </div>
                <div className="text-sm text-[#555]">
                  <span className="font-semibold text-[#2B302A]">3</span>
                  <span className="ml-2">
                    {lang === "el" ? "Χρόνια Εμπειρίας" : "Years Experience"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right column: about text + actions */}
            <div className="flex flex-col">
              <h2 className="font-serif font-medium text-3xl text-[#2B302A]">
                {lang === "el" ? "Σχετικά με τη Μαρία" : "About Maria"}
              </h2>

              <div className="mt-4 text-[#5A6059]">
                <p className="leading-relaxed">
                  {lang === "el"
                    ? "Η Μαρία σας καλωσορίζει στα Central & Riverfront Apartments με αυθεντική φιλοξενία και προσοχή στη λεπτομέρεια. Στόχος της είναι μια πεντακάθαρη, ήρεμη διαμονή στην καρδιά της Έδεσσας — διαμερίσματα που νιώθεις να ηρεμούν δίπλα στον ποταμό."
                    : "Maria welcomes you to Central & Riverfront Apartments with genuine hospitality and an eye for detail. Her goal is a spotless, peaceful stay in the heart of Edessa — apartments that feel calm, central, and designed for unwinding by the river."}
                </p>
                <p className="mt-4 leading-relaxed">
                  {lang === "el"
                    ? "Είναι χαρούμενη να μοιραστεί δοκιμασμένες προτάσεις για φαγητό, βόλτες και ημερήσιες εξορμήσεις, αλλά και να σας βοηθήσει με ό,τι χρειάζεστε πριν και κατά τη διάρκεια της επίσκεψής σας."
                    : "She is happy to share trusted recommendations for food, walks, and day trips, and to help with anything you need before and during your visit."}
                </p>
              </div>

              {/* Bottom controls row */}
              <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="mt-6 flex items-center justify-between">
                  <a
                    href={MARIA_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:underline"
                  >
                    {lang === "el"
                      ? "Δείτε το προφίλ στο Airbnb ↗"
                      : "View Airbnb Profile ↗"}
                  </a>

                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-[#E5E0D8] bg-[#FAF5F0] px-5 py-2 text-sm font-semibold text-[#2B302A] hover:border-[#B86B4B] hover:text-[#B86B4B] transition-colors"
                  >
                    {lang === "el" ? "Κλείσιμο" : "Close"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

