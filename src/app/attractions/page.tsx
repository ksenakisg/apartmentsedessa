"use client";

import { useLang } from "../context/LanguageContext";
import { attractions } from "../../data/attractions";
import Image from "next/image";

export default function AttractionsPage() {
  const { lang } = useLang();
  return (
    <>
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden bg-[#F2E5DC]">
        <div className="relative h-[420px] sm:h-[470px]">
          {/* Reuse first attraction image as hero background (keeps asset dependency simple) */}
          <Image
            src={attractions[0]?.image ?? "/local-guide/placeholder.jpg"}
            alt="Edessa hero"
            fill
            sizes="100vw"
            priority
            className="absolute inset-0 object-cover"
            quality={80}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full max-w-6xl mx-auto px-4 flex items-center">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-white/90 font-sans font-semibold">
                {lang === "el" ? "ΕΞΕΡΕΥΝΗΣΤΕ" : "EXPLORE"}
              </p>
              <h1 className="mt-4 font-serif font-medium text-white text-4xl sm:text-5xl leading-tight">
                {lang === "el"
                  ? "Η Έδεσσα & η ορεινή Πέλλα σας περιμένουν"
                  : "Edessa & Mountainous Pella Await You"}
              </h1>
              <p className="mt-4 text-white/90 text-base leading-relaxed">
                {lang === "el"
                  ? "Μια αυθεντική βάση από την οποία ανακαλύπτετε τους πιο εντυπωσιακούς καταρράκτες, τοπία και θερμά λουτρά της Μακεδονίας."
                  : "An authentic base from which to discover the most breathtaking waterfalls, landscapes, and thermal baths of Macedonia."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Header */}
      <section className="bg-[#F2E5DC] px-4 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-[#C97B51] font-sans font-semibold">
            {lang === "el"
              ? "Ο ΠΑΡΑΔΕΙΣΟΣ ΕΞΩ ΑΠΟ ΤΗΝ ΠΟΡΤΑ ΣΑΣ"
              : "PARADISE RIGHT OUTSIDE YOUR DOOR"}
          </p>
          <h2 className="mt-5 font-serif font-medium text-[#2B2B2B] text-3xl sm:text-4xl leading-snug">
            {lang === "el" ? (
              <>
                Καταρράκτες, τρεχούμενα νερά &amp;{" "}
                <span className="text-[#C97B51] italic">ιαματικά λουτρά</span>
              </>
            ) : (
              <>
                Waterfalls, flowing waters &amp;{" "}
                <span className="text-[#C97B51] italic">thermal baths</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-[#2B2B2B] text-base leading-relaxed max-w-2xl mx-auto">
            {lang === "el"
              ? "Από την καρδιά της πόλης μέχρι τις ορεινές αποδράσεις: μια διαδρομή γεμάτη φύση, τρεχούμενα νερά και στιγμές που αξίζει να κρατήσετε."
              : "From the heart of the city to the mountain escapes: a route full of nature, flowing water, and moments worth keeping."}
          </p>
        </div>
      </section>

      {/* Zig-Zag Content */}
      <section className="bg-[#F2E5DC] px-4 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {attractions.map((item, idx) => {
            const isReverse = idx % 2 === 1;

            return (
              <article
                key={item.id}
                className="mt-8 first:mt-0 flex flex-col md:flex-row md:items-stretch gap-8"
              >
                <div
                  className={[
                    "md:flex-1",
                    isReverse ? "md:order-2" : "md:order-1",
                  ].join(" ")}
                >
                  <div className="relative h-[360px] sm:h-[420px]">
                    <div className="absolute inset-0 rounded-3xl overflow-hidden">
                      <Image
                        src={item.image}
                        alt={lang === "el" ? item.title.gr : item.title.en}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        loading="lazy"
                        className="object-cover"
                        quality={80}
                      />
                    </div>
                    {item.badge && (
                      <div className="absolute top-5 left-5">
                        <span className="inline-flex items-center rounded-full bg-black/50 text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider">
                          {lang === "el" ? item.badge : "CITY CENTER"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={[
                    "md:flex-1 flex flex-col justify-center",
                    isReverse ? "md:order-1" : "md:order-2",
                  ].join(" ")}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-[#C97B51] font-sans font-semibold">
                    {item.id.replace(/-/g, " ").toUpperCase()}
                  </p>
                  <h3 className="mt-4 font-serif font-medium text-[#2B2B2B] text-3xl leading-snug">
                    {lang === "el" ? item.title.gr : item.title.en}
                  </h3>
                  <p className="mt-4 text-zinc-800/80 text-base leading-relaxed">
                    {lang === "el" ? item.description.gr : item.description.en}
                  </p>

                  <a
                    href={item.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2B2B2B] hover:text-[#C97B51] transition-colors"
                  >
                    {lang === "el" ? "Δείτε στο χάρτη ↗" : "View on Map ↗"}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

