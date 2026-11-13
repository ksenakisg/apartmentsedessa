 "use client";

import { motion } from "framer-motion";
import HeroVideo from "./components/HeroVideo";
import WelcomeEditorial from "./components/WelcomeEditorial";
import Link from "next/link";
import { useLang } from "./context/LanguageContext";

export default function Home() {
  const { lang } = useLang();
  const isEnglish = lang === "en";

  const navCards = [
    {
      title: isEnglish ? "Home" : "Αρχική",
      subtitle: isEnglish ? "Back to top" : "Επιστροφή στην κορυφή",
      href: "/",
      onClick: (e: any) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    {
      title: isEnglish ? "Apartments" : "Διαμερίσματα",
      subtitle: isEnglish ? "Discover our rooms" : "Ανακαλύψτε τα δωμάτιά μας",
      href: "/apartments",
    },
    {
      title: isEnglish ? "Location" : "Τοποθεσία",
      subtitle: isEnglish ? "In the heart of the city" : "Στο κέντρο της πόλης",
      href: "/location",
    },
    {
      title: isEnglish ? "Attractions" : "Αξιοθέατα",
      subtitle: isEnglish ? "Stories and routes in Edessa" : "Ιστορίες και διαδρομές στην Έδεσσα",
      href: "/attractions",
    },
    {
      title: isEnglish ? "FAQ" : "Συχνές Ερωτήσεις",
      subtitle: isEnglish ? "Quick answers for your stay" : "Γρήγορες απαντήσεις για τη διαμονή σας",
      href: "/faq",
    },
    {
      title: isEnglish ? "Contact" : "Επικοινωνία",
      subtitle: isEnglish ? "Reach out for anything you need" : "Μιλήστε μας για ό,τι χρειάζεστε",
      href: "/contact",
    },
  ];

  return (
    <div className="min-h-screen pb-16">
      {/* HOMEPAGE ONLY: TOP-LEFT SOFT AMBIENT GLOW */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[130px] pointer-events-none transition-opacity duration-500"
          style={{ backgroundColor: "rgba(201, 123, 81, 0.18)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Hero section (Video banner) */}
        <HeroVideo />
      </motion.div>

      {/* Welcome editorial text */}
      <WelcomeEditorial />

      {/* Direct route CTAs (hide on mobile to reduce clutter) */}
      <section className="hidden md:block px-4 sm:px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          {navCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`group rounded-2xl bg-[#FFFDF9] border border-[#E5E0D8] p-8 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C97B51]/20 hover:border-[#C97B51]/40 active:scale-95`}
              onClick={card.onClick}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-2xl text-[#2B302A] mb-2">{card.title}</h3>
                <motion.span
                  className="text-[#C27B58] font-serif italic"
                  initial={false}
                  animate={undefined}
                >
                  <span className="block transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-[1.08]">
                    →
                  </span>
                </motion.span>
              </div>
              <p className="text-sm text-[#5A6059] leading-relaxed">{card.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
