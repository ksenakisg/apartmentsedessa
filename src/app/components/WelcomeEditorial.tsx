"use client";

import { useLang } from "../context/LanguageContext";

export default function WelcomeEditorial() {
  const { lang } = useLang();

  return (
    <section className="px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-[#B86B4B] font-sans font-semibold mb-3">
          {lang === "el" ? "Καλωσορίσατε" : "Welcome"}
        </p>
        <h2 className="font-serif font-medium text-4xl lg:text-5xl text-[#2B302A] leading-tight">
          {lang === "el" ? (
            <>
              Η άνεση ενός σπιτιού. Η ποιότητα μιας ξεχωριστής διαμονής στην{" "}
              <span className="text-[#C97B51] italic">Edessa</span>.
            </>
          ) : (
            <>
              The comfort of home. Premium living in the heart of{" "}
              <span className="text-[#C97B51] italic">Edessa</span>.
            </>
          )}
        </h2>
        <p className="mt-5 text-[#5A6059] text-base leading-relaxed max-w-2xl mx-auto">
          {lang === "el"
            ? "Η διαμονή μας είναι φτιαγμένη για ησυχία, ρυθμό και αυθεντικές στιγμές στο κέντρο της πόλης."
            : "Our stays are designed for calm rhythm and authentic moments at the center of the city."}
        </p>
      </div>
    </section>
  );
}

