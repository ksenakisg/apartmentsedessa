"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";

export default function LanguageFlashWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang } = useLang();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lang}
        initial={{ opacity: 0, scale: 0.98, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -6 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

