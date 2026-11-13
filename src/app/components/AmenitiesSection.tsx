"use client";

import { motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { t, tr } from "../data/translations";

export default function AmenitiesSection() {
  const { lang } = useLang();
  const amenities = t.amenities.map((a) => tr(a, lang));
  const groups = [
    {
      title: lang === "el" ? "Άνεση" : "Comfort",
      items: amenities.slice(0, 2),
    },
    {
      title: lang === "el" ? "Συνδεσιμότητα" : "Connectivity",
      items: amenities.slice(2, 4),
    },
    {
      title: lang === "el" ? "Καθημερινότητα" : "Essentials",
      items: [
        lang === "el" ? "Πλήρως εξοπλισμένη κουζίνα" : "Fully equipped kitchen",
        lang === "el" ? "Ποιοτικά λευκά είδη" : "Quality bed linen",
      ],
    },
  ];

  return (
    <section id="amenities" className="scroll-mt-24 px-4 sm:px-6 mt-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-[#B86B4B] font-sans font-semibold mb-3">
            {lang === "el" ? "Παροχές" : "Amenities"}
          </p>
          <h3 className="font-serif font-medium text-4xl lg:text-5xl text-[#2B302A]">{tr(t.amenitiesHeading, lang)}</h3>
          <p className="mt-4 text-[#5A6059] text-base leading-relaxed max-w-2xl">
            {lang === "el"
              ? "Επιλεγμένες παροχές για άνετη καθημερινή διαμονή, με καθαρή και ήρεμη αισθητική."
              : "Selected amenities for an easy everyday stay, with a calm and refined atmosphere."}
          </p>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-4">
            {groups.map((group) => (
              <article key={group.title} className="bg-[#FFFDF9] border border-[#E5E0D8] rounded-2xl p-5">
                <h4 className="font-serif text-2xl text-[#2B302A]">{group.title}</h4>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-[#5A6059] text-sm leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
