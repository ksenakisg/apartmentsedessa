export type Attraction = {
  id: string;
  title: { gr: string; en: string };
  description: { gr: string; en: string };
  image: string;
  mapUrl: string;
  badge?: string | null;
};

export const attractions: Attraction[] = [
  {
    id: "karanos-waterfalls",
    title: { gr: "Καταρράκτες Έδεσσας (Κάρανος)", en: "Edessa Waterfalls (Karanos)" },
    description: {
      gr: "Ο μεγαλύτερος καταρράκτης στην Ελλάδα και το σήμα κατατεθέν της πόλης.",
      en: "The tallest waterfall in Greece and the city's landmark.",
    },
    badge: "ΣΤΟ ΚΕΝΤΡΟ ΤΗΣ ΠΟΛΗΣ",
    image: "/local-guide/lg-01.jpg",
    mapUrl: "https://maps.google.com/?cid=6638714539778552662",
  },
  {
    id: "varosi-district",
    title: { gr: "Συνοικία Βαρόσι", en: "Varosi District" },
    description: {
      gr: "Η ιστορική παλιά πόλη με την παραδοσιακή μακεδονική αρχιτεκτονική.",
      en: "The historic old town with traditional Macedonian architecture.",
    },
    badge: "ΣΤΟ ΚΕΝΤΡΟ ΤΗΣ ΠΟΛΗΣ",
    image: "/local-guide/lg-04.jpg",
    mapUrl: "https://maps.google.com/?cid=2272117687680050815",
  },
  {
    id: "kioupri-bridge",
    title: { gr: "Γέφυρα Κιουπρί", en: "Kioupri Bridge" },
    description: {
      gr: "Ένα εντυπωσιακό βυζαντινό τοξωτό γεφύρι περιτριγυρισμένο από αιωνόβια πλατάνια.",
      en: "A magnificent Byzantine stone bridge surrounded by plane trees.",
    },
    badge: "ΣΤΟ ΚΕΝΤΡΟ ΤΗΣ ΠΟΛΗΣ",
    image: "/local-guide/lg-06.jpg",
    mapUrl: "https://maps.google.com/?cid=11358676936818113981",
  },
  {
    id: "little-waterfalls-park",
    title: { gr: "Πάρκο Μικρών Καταρρακτών", en: "Little Waterfalls Park" },
    description: {
      gr: "Ένας κρυμμένος παράδεισος με μικρούς καταρράκτες στο κέντρο της πόλης.",
      en: "A hidden paradise with small waterfalls in the city center.",
    },
    badge: "ΣΤΟ ΚΕΝΤΡΟ ΤΗΣ ΠΟΛΗΣ",
    image: "/local-guide/lg-07.jpg",
    mapUrl: "https://maps.google.com/?cid=669381312429071121",
  },
  {
    id: "ancient-edessa",
    title: { gr: "Αρχαία Έδεσσα (Λόγγος)", en: "Ancient Edessa (Loggos)" },
    description: {
      gr: "Ανακαλύψτε τα ερείπια της αρχαίας πόλης στην κοιλάδα κάτω από την Έδεσσα.",
      en: "Explore the ruins of the ancient city in the valley.",
    },
    image: "/local-guide/lg-09.jpg",
    mapUrl: "https://maps.google.com/?cid=15931994329513923642",
  },
  {
    id: "pozar-baths",
    title: { gr: "Λουτρά Πόζαρ", en: "Pozar Thermal Baths" },
    description: {
      gr: "Φυσικές ιαματικές θερμές πηγές (37°C) σε απόσταση 30 χλμ. από την Έδεσσα.",
      en: "Natural thermal springs (37°C) 30km from Edessa.",
    },
    image: "/local-guide/lg-12.jpg",
    mapUrl: "https://maps.google.com/?cid=15154887121550460930",
  },
  {
    id: "foe-restaurant",
    title: { gr: "ΦΟΕ Coffee Bar Restaurant", en: "Foe Coffee Bar Restaurant" },
    description: {
      gr: "Η κορυφαία πρότασή μας για φαγητό και ποτό σε ένα μοναδικό περιβάλλον.",
      en: "Our premium recommendation for dining and drinks.",
    },
    image: "/local-guide/lg-13.jpg",
    mapUrl: "https://maps.google.com/?cid=2713703486957395316",
  },
  {
    id: "pella-museum",
    title: { gr: "Αρχαιολογικό Μουσείο Πέλλας", en: "Archaeological Museum of Pella" },
    description: {
      gr: "Μουσείο παγκόσμιας κλάσης με θησαυρούς από την εποχή του Μεγάλου Αλεξάνδρου.",
      en: "World-class museum with treasures of Alexander the Great.",
    },
    image: "/local-guide/lg-15.jpg",
    mapUrl: "https://maps.google.com/?cid=16501146871793556050",
  },
  {
    id: "psilos-vrachos",
    title: { gr: "Ψηλός Βράχος", en: "The High Rock (Psilos Vrachos)" },
    description: {
      gr: "Η καλύτερη πανοραμική θέα προς τον κάμπο της Πέλλας.",
      en: "The best panoramic view of the Pella valley.",
    },
    badge: "ΣΤΟ ΚΕΝΤΡΟ ΤΗΣ ΠΟΛΗΣ",
    image: "/local-guide/lg-18.jpg",
    mapUrl: "https://maps.google.com/?cid=10653296982302040168",
  },
  {
    id: "agra-wetland",
    title: { gr: "Υδροβιότοπος Άγρα-Νησίου-Βρυτών", en: "Idroviotopos (Agra-Nissi-Vryta)" },
    description: {
      gr: "Ένας γαλήνιος υδροβιότοπος, ιδανικός για παρατήρηση πουλιών και φύση.",
      en: "A serene wetland sanctuary ideal for birdwatching and nature.",
    },
    image: "/local-guide/agra.jpg",
    mapUrl: "https://maps.google.com/?cid=6746424110693064364",
  },
  {
    id: "kaimaktsalan",
    title: { gr: "Χιονοδρομικό Κέντρο Καϊμάκτσαλαν", en: "Kaimaktsalan Ski Center" },
    description: {
      gr: "Ένα από τα υψηλότερα χιονοδρομικά κέντρα στην Ελλάδα με την εκκλησία του Προφήτη Ηλία στην κορυφή.",
      en: "One of the highest and most popular ski resorts in Greece with historic Prophet Elias church.",
    },
    image: "/local-guide/lg-21.jpg",
    mapUrl: "https://maps.google.com/?cid=8627568016373430504",
  },
  {
    id: "lake-vegoritida",
    title: { gr: "Λίμνη Βεγορίτιδα", en: "Lake Vegoritida" },
    description: {
      gr: "Εντυπωσιακή φυσική λίμνη, ιδανική για θαλάσσια σπορ και χαλάρωση.",
      en: "A stunning natural lake, perfect for birdwatching, water sports, or enjoying mountain scenery.",
    },
    image: "/local-guide/lg-23.jpg",
    mapUrl: "https://maps.google.com/?cid=10401578729331349855",
  },
];

