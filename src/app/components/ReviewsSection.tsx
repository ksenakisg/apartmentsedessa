"use client";

import { useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { t, tr } from "../data/translations";

const STAR_COUNT = 5;

function Stars({ rating }: { rating: number }) {
  const stars = Array.from({ length: STAR_COUNT }, (_, i) => i < rating);

  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${rating} out of 5`}>
      {stars.map((filled, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="w-4 h-4"
          fill={filled ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.82 4.73L6.18 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const { lang } = useLang();

  const reviews = useMemo(() => t.reviews, []);
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const n = reviews.length;

  const goTo = (index: number) => setActive((i) => (index + n) % n);
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section id="reviews" className="scroll-mt-24 px-4 sm:px-6 mt-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-[#0f172a]">{tr(t.reviewsHeading, lang)}</h3>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 sm:gap-5">
            {reviews.map((r, i) => (
              <motion.article
                key={i}
                className="bg-white rounded-xl border border-slate-100 p-4"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.05 } }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -1 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#0f172a]">{tr(r.name, lang)}</p>
                    <div className="mt-1 text-amber-500">
                      <Stars rating={r.rating} />
                    </div>
                  </div>
                  <span className="shrink-0 text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-full px-2 py-1">
                    {tr(r.source, lang)}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">“{tr(r.quote, lang)}”</p>
              </motion.article>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden">
            <div
              className="relative bg-white rounded-xl border border-slate-100 p-4 overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {n > 0 && (
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.article
                    key={active}
                    initial={{ opacity: 0, x: 14, scale: 0.99 }}
                    animate={{ opacity: 1, x: 0, scale: 1, transition: { duration: 0.25 } }}
                    exit={{ opacity: 0, x: -14, scale: 0.99, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#0f172a]">{tr(reviews[active].name, lang)}</p>
                        <div className="mt-1 text-amber-500">
                          <Stars rating={reviews[active].rating} />
                        </div>
                      </div>
                      <span className="shrink-0 text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-full px-2 py-1">
                        {tr(reviews[active].source, lang)}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600">“{tr(reviews[active].quote, lang)}”</p>
                  </motion.article>
                </AnimatePresence>
              )}

              {n > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous review"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/5 text-[#0f172a] flex items-center justify-center"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next review"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/5 text-[#0f172a] flex items-center justify-center"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-4">
                    {reviews.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Review ${i + 1}`}
                        className={[
                          "h-1.5 rounded-full transition-all duration-200",
                          i === active ? "w-10 bg-[#0f172a]" : "w-4 bg-[#0f172a]/30 hover:bg-[#0f172a]/50",
                        ].join(" ")}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
