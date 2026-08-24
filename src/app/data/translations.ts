export type Lang = "el" | "en";

export const t = {
  // ── Hero ──────────────────────────────────────────────────────────────────
  heroHeadline: {
    el: "Central & Riverfront Apartments",
    en: "Central & Riverfront Apartments",
  },
  heroSubtitle: {
    el: "Απευθείας κρατήσεις χωρίς προμήθειες. Επικοινωνήστε μαζί μας άμεσα.",
    en: "Direct bookings, commission-free. Reach us instantly.",
  },

  // ── CTA buttons ───────────────────────────────────────────────────────────
  bookWhatsApp: {
    el: "Κράτηση via WhatsApp",
    en: "Book via WhatsApp",
  },
  bookViber: {
    el: "Κράτηση via Viber",
    en: "Book via Viber",
  },
  bookWhatsAppShort: {
    el: "Κράτηση (WhatsApp)",
    en: "Book (WhatsApp)",
  },
  bookViberShort: {
    el: "Κράτηση (Viber)",
    en: "Book (Viber)",
  },

  // ── Navigation labels ────────────────────────────────────────────────────
  navApartments: { el: "Διαμερίσματα", en: "Apartments" },
  navLocation: { el: "Τοποθεσία", en: "Location" },
  navAmenities: { el: "Παροχές", en: "Amenities" },
  navAttractions: { el: "Αξιοθέατα", en: "Attractions" },
  navReviews: { el: "Κριτικές", en: "Reviews" },
  navFaq: { el: "Συχνές Ερωτήσεις", en: "FAQ" },
  navContact: { el: "Επικοινωνία", en: "Contact" },

  // ── Grid heading ──────────────────────────────────────────────────────────
  ourApartments: {
    el: "Τα διαμερίσματά μας",
    en: "Our Apartments",
  },

  // ── Apartment specs ───────────────────────────────────────────────────────
  specs: {
    ap1: {
      rooms: { el: "1 Δωμάτιο", en: "1 Room" },
      guests: { el: "Έως 2 Άτομα", en: "Up to 2 Guests" },
      view: { el: "Θέα στο Ποτάμι", en: "River View" },
    },
    ap2: {
      rooms: { el: "1 Υπνοδωμάτιο", en: "1 Bedroom" },
      guests: { el: "3 Άτομα", en: "3 Guests" },
      view: { el: "Θέα στο Ποτάμι", en: "River View" },
    },
    ap3: {
      rooms: { el: "1 Υπνοδωμάτιο", en: "1 Bedroom" },
      guests: { el: "4 Άτομα", en: "4 Guests" },
      view: { el: "Θέα Κήπος", en: "Garden View" },
    },
    ap4: {
      rooms: { el: "2 Υπνοδωμάτια", en: "2 Bedrooms" },
      guests: { el: "5 Άτομα", en: "5 Guests" },
      view: { el: "Κέντρο", en: "City Centre" },
    },
  },

  // ── Location section ─────────────────────────────────────────────────────
  locationHeading: { el: "Τοποθεσία", en: "Location" },
  locationDescription: {
    el: "Βρισκόμαστε στο κέντρο, κοντά σε ό,τι χρειάζεστε — με εύκολη πρόσβαση και ήσυχο περιβάλλον.",
    en: "We’re in the city centre, close to everything you need — with easy access and a calm setting.",
  },

  // ── Amenities section ────────────────────────────────────────────────────
  amenitiesHeading: { el: "Παροχές", en: "Amenities" },
  amenities: [
    { el: "Γρήγορο Wi‑Fi", en: "Fast Wi‑Fi" },
    { el: "Κλιματισμός", en: "Air conditioning" },
    { el: "Άνετα κρεβάτια", en: "Comfortable beds" },
    { el: "Θέα & φωτεινοί χώροι", en: "Views & bright spaces" },
  ],

  // ── Reviews / Social proof ───────────────────────────────────────────────
  reviewsHeading: {
    el: "Τι λένε οι επισκέπτες μας",
    en: "Guest reviews",
  },
  reviews: [
    {
      name: { el: "Μαρία Κ.", en: "Maria K." },
      source: { el: "Airbnb Superhost", en: "Airbnb Superhost" },
      rating: 5,
      quote: {
        el: "Καθαρό, ήσυχο και σε τέλεια τοποθεσία. Η θέα στο ποτάμι ήταν πραγματικά υπέροχη.",
        en: "Spotless, quiet, and perfectly located. The river view was genuinely wonderful.",
      },
    },
    {
      name: { el: "Νίκος Π.", en: "Nikos P." },
      source: { el: "Booking.com", en: "Booking.com" },
      rating: 5,
      quote: {
        el: "Άμεση επικοινωνία και πολύ καλή εμπειρία. Όλα ήταν όπως περιγραφόταν.",
        en: "Fast communication and a great stay. Everything matched the description.",
      },
    },
    {
      name: { el: "Elena S.", en: "Elena S." },
      source: { el: "Airbnb Superhost", en: "Airbnb Superhost" },
      rating: 5,
      quote: {
        el: "Μοντέρνο και προσεγμένο. Ιδανικό για ζευγάρια και μικρές αποδράσεις.",
        en: "Modern and thoughtfully put together. Perfect for couples and short getaways.",
      },
    },
  ],

  // ── FAQ ───────────────────────────────────────────────────────────────────
  faqHeading: {
    el: "Συχνές ερωτήσεις",
    en: "FAQ",
  },
  faq: [
    {
      question: { el: "Στάθμευση", en: "Parking" },
      answer: {
        el: "Προσφέρουμε δωρεάν στάθμευση για μοτοσικλέτες. Για αυτοκίνητα, υπάρχει άφθονη δωρεάν στάθμευση στον δρόμο μπροστά από το κτίριο.",
        en: "We offer free parking for motorcycles. For cars, there is plenty of free street parking in front of the building.",
      },
    },
    {
      question: { el: "Τοποθεσία & κέντρο", en: "Location & city center" },
      answer: {
        el: "Βρίσκεστε στην καρδιά της Έδεσσας. Η κεντρική πεζοδρομική με καφέ και μπαρ απέχει 3 λεπτά με τα πόδια, ενώ οι Καταρράκτες μόλις 7 λεπτά.",
        en: "You're in the heart of Edessa. The central pedestrian area with cafes and bars is just 3 minutes on foot, while the Waterfalls are only 7 minutes away.",
      },
    },
    {
      question: { el: "Τρόποι πληρωμής", en: "Payment methods" },
      answer: {
        el: "Για απευθείας κρατήσεις δεχόμαστε μετρητά ή τραπεζική κατάθεση. Καλέστε μας για την καλύτερη προσφορά.",
        en: "For direct bookings we accept cash or bank transfer. Call us for the best offer.",
      },
    },
    {
      question: {
        el: "Μπορώ να αφήσω τις αποσκευές πριν το check-in ή μετά το check-out;",
        en: "Can I leave my luggage before check-in or after check-out?",
      },
      answer: {
        el: "Φυσικά! Η αποθήκευση αποσκευών επιτρέπεται για τη διευκόλυνσή σας.",
        en: "Of course! Luggage storage is available for your convenience.",
      },
    },
    {
      question: { el: "Είναι ασφαλές το κατάλυμα;", en: "Is the place safe?" },
      answer: {
        el: "Η ασφάλειά σας είναι προτεραιότητά μας. Το κατάλυμα διαθέτει εξωτερικές κάμερες ασφαλείας.",
        en: "Your safety is our priority. The property has outdoor security cameras.",
      },
    },
    {
      question: { el: "Υπάρχει εξωτερικός χώρος;", en: "Is there outdoor space?" },
      answer: {
        el: "Ιδιωτικό κήπο διαθέτει αποκλειστικά το Central & Riverfront Room 1. Όλα τα υπόλοιπα καταλύματα προσφέρουν δικά τους ιδιωτικά μπαλκόνια με θέα στη φύση και το ποτάμι.",
        en: "The garden is exclusive to Central & Riverfront Room 1. All other apartments offer their own private balconies with views of the river and surrounding nature.",
      },
    },
  ],

  // ── WhatsApp / Viber pre-filled messages ──────────────────────────────────
  waMessage: {
    el: (title: string) => `Γεια σας, ενδιαφέρομαι για διαθεσιμότητα στο ${title}.`,
    en: (title: string) => `Hello, I am interested in availability for ${title}.`,
  },
  waMessageGeneral: {
    el: "Γεια σας, ενδιαφέρομαι για τα διαμερίσματά σας.",
    en: "Hello, I am interested in your apartments.",
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footerTagline: {
    el: "Απευθείας κρατήσεις για τα Central & Riverfront Apartments δίπλα στο ποτάμι.",
    en: "Direct bookings for Central & Riverfront Apartments by the river.",
  },
  footerContact: {
    el: "Επικοινωνία",
    en: "Contact",
  },
  footerLocation: {
    el: "Τοποθεσία",
    en: "Location",
  },
  footerCity: {
    el: "Κέντρο Πόλης",
    en: "City Centre",
  },
  footerCountry: {
    el: "Ελλάδα",
    en: "Greece",
  },
  footerCopyright: {
    el: (year: number) => `© ${year} Central & Riverfront Apartments. Όλα τα δικαιώματα διατηρούνται.`,
    en: (year: number) => `© ${year} Central & Riverfront Apartments. All rights reserved.`,
  },
} as const;

/** Convenience: pull the correct string for a given lang */
export function tr<T extends { el: string; en: string }>(entry: T, lang: Lang): string {
  return entry[lang];
}
