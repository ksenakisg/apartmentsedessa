"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  images: string[];
  title: string;
  startIndex: number;
  onClose: () => void;
}

function preload(src: string) {
  if (typeof window === "undefined" || !src) return;
  const img = new window.Image();
  img.src = src;
}

export default function Lightbox({ images, title, startIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const n = images.length;

  const goTo = useCallback(
    (index: number) => {
      const next = (index + n) % n;
      setDirection(index >= current ? 1 : -1);
      setCurrent(next);
      preload(images[(next + 1) % n]);
      preload(images[(next - 1 + n) % n]);
    },
    [current, images, n]
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    preload(images[(current + 1) % n]);
    preload(images[(current - 1 + n) % n]);
  }, [current, images, n]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, onClose]);

  useEffect(() => {
    const saved = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = saved; };
  }, []);

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

  // Compute direction-based enter/exit x offsets as plain strings
  const enterX = direction > 0 ? "60%" : "-60%";
  const exitX  = direction > 0 ? "-60%" : "60%";

  const modal = (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — Lightbox`}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0 bg-black/90" />

      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={current}
            src={images[current]}
            alt={`${title} — φωτογραφία ${current + 1}`}
            className="max-h-[90vh] max-w-[95vw] object-contain select-none rounded-lg"
            draggable={false}
            initial={{ x: enterX, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: exitX, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </AnimatePresence>

        <motion.button
          onClick={onClose}
          aria-label="Κλείσιμο"
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.15 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        <span className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-sm tabular-nums">
          {current + 1} / {n}
        </span>

        {n > 1 && (
          <>
            <motion.button
              onClick={prev}
              aria-label="Προηγούμενη φωτογραφία"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={next}
              aria-label="Επόμενη φωτογραφία"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            <div className="absolute bottom-5 inset-x-0 flex justify-center gap-1.5">
              {images.slice(0, 10).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Φωτογραφία ${i + 1}`}
                  className={[
                    "rounded-full transition-all duration-200",
                    i === current ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70",
                  ].join(" ")}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );

  return createPortal(modal, document.body);
}
