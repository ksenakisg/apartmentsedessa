"use client";

import { useLang } from "../context/LanguageContext";
import { getWhatsAppUrl } from "../lib/contact";
import ApartmentGallery from "../components/ApartmentGallery";

type ApartmentKey = "ap1" | "ap2" | "ap3" | "ap4";

type EditorialApartment = {
  apKey: ApartmentKey;
  images: string[];
  airbnbUrl: string;
  category: { el: string; en: string };
  title: { el: string; en: string };
  description: { el: string; en: string };
  keyFacts: Array<{ value: string; label: { el: string; en: string } }>;
  amenities: Array<{ el: string; en: string }>;
};

export default function ApartmentsEditorialClient({ apartments }: { apartments: EditorialApartment[] }) {
  const { lang } = useLang();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col gap-16">
        {apartments.map((item, idx) => {
          const titleText = lang === "el" ? item.title.el : item.title.en;
          const href = getWhatsAppUrl(titleText, lang);
          const reverse = idx % 2 === 1;

          return (
            <div
              key={item.apKey}
              className={`flex flex-col ${
                reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-12 lg:gap-16 lg:items-center`}
            >
              <div className="w-full lg:w-1/2">
                <ApartmentGallery images={item.images} title={titleText} priority={idx === 0} />
                <a
                  href={item.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#7A7A7A] hover:text-[#C27B58] underline underline-offset-4 decoration-1 transition-colors mt-2 flex items-center justify-center gap-1"
                >
                  {lang === "el" ? "Δείτε όλες τις φωτογραφίες στο Airbnb ↗" : "View all photos on Airbnb ↗"}
                </a>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="max-w-xl">
                  <div className="text-xs tracking-[0.25em] uppercase text-[#B86B4B] font-sans font-semibold mb-3">
                    {lang === "el" ? item.category.el : item.category.en}
                  </div>

                  <h2 className="font-serif font-medium text-4xl lg:text-5xl text-[#2B302A] leading-tight">{titleText}</h2>

                  <div className="mt-5 flex flex-wrap items-start gap-x-8 gap-y-4">
                    {item.keyFacts.map((fact) => (
                      <div key={`${fact.value}-${fact.label.en}`} className="min-w-[62px]">
                        <p className="font-serif text-3xl leading-none text-[#2B302A]">{fact.value}</p>
                        <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-[#5A6059] font-semibold">
                          {lang === "el" ? fact.label.el : fact.label.en}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 text-[#5A6059] text-base leading-relaxed max-w-2xl">{item.description[lang]}</p>

                  <div className="mt-6">
                    <div className="text-xs tracking-[0.25em] uppercase text-[#B86B4B] font-sans font-semibold mb-3">
                      {lang === "el" ? "Παροχές" : "Amenities"}
                    </div>

                    <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">
                      {item.amenities.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#7A7A7A]">
                          <span className="mt-0.5 text-[#B86B4B]">•</span>
                          <span>{a[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex items-center justify-start">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-[#2B302A] px-7 py-3 text-sm font-semibold text-white hover:bg-[#1F2421] transition-colors"
                    >
                      Book now →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

