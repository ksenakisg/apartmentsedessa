"use client";

import Image from "next/image";
import { useState, useRef, useCallback, lazy, Suspense } from "react";
import { motion } from "framer-motion";

const Lightbox = lazy(() => import("./Lightbox"));

export default function ApartmentGallery({
  images,
  title,
  priority,
}: {
  images: string[];
  title: string;
  priority?: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(() => images.map(() => false));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const n = images.length;

  const goTo = useCallback((index: number) => setCurrent((index + n) % n), [n]);
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    goTo(current - 1);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    goTo(current + 1);
  };

  const markLoaded = (i: number) =>
    setLoaded((prevLoaded) => {
      const c = [...prevLoaded];
      c[i] = true;
      return c;
    });

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) dx < 0 ? goTo(current + 1) : goTo(current - 1);
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const single = n <= 1;

  return (
    <>
      <div
        role="button"
        tabIndex={n > 0 ? 0 : -1}
        aria-label={`Άνοιγμα γκαλερί: ${title}`}
        className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#FFFDF9] select-none cursor-zoom-in"
        onClick={() => n > 0 && setLightboxIndex(current)}
        onKeyDown={(e) => e.key === "Enter" && n > 0 && setLightboxIndex(current)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={single ? undefined : onTouchStart}
        onTouchEnd={single ? undefined : onTouchEnd}
      >
        {n === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              className="w-10 h-10 text-[#B8AEA1]"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-xs text-[#B8AEA1]">No images</span>
          </div>
        ) : (
          <>
            {images.map((src, i) => (
              <div
                key={src}
                className={[
                  "absolute inset-0 transition-opacity duration-300",
                  i === current ? "opacity-100 z-10" : "opacity-0 z-0",
                ].join(" ")}
              >
                {!loaded[i] && <div className="absolute inset-0 bg-[#EDE6DD] animate-pulse" />}

                <div
                  className="absolute inset-0 transition-transform duration-500 ease-out"
                  style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
                >
                  <Image
                    src={src}
                    alt={`${title} - photo ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={priority && i === 0}
                    onLoad={() => markLoaded(i)}
                  />
                </div>
              </div>
            ))}

            {!single && (
              <>
                <motion.button
                  onClick={prev}
                  aria-label="Previous photo"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-[#2B302A]/10 text-[#2B302A] hover:bg-[#2B302A]/15 transition-colors backdrop-blur-sm"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                <motion.button
                  onClick={next}
                  aria-label="Next photo"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-[#2B302A]/10 text-[#2B302A] hover:bg-[#2B302A]/15 transition-colors backdrop-blur-sm"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>

                <span className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded-full bg-[#2B302A]/10 text-[#2B302A] text-xs font-medium backdrop-blur-sm tabular-nums">
                  {current + 1}/{n}
                </span>

                <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center gap-2">
                  {images.slice(0, 10).map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        goTo(i);
                      }}
                      aria-label={`Photo ${i + 1}`}
                      className={[
                        "rounded-full transition-all duration-200",
                        i === current ? "w-5 h-1.5 bg-[#B86B4B]/80" : "w-1.5 h-1.5 bg-[#2B302A]/20 hover:bg-[#B86B4B]/60",
                      ].join(" ")}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {lightboxIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox
            images={images}
            title={title}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        </Suspense>
      )}
    </>
  );
}

