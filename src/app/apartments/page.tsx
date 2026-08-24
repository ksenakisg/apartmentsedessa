import ApartmentsEditorialClient from "./ApartmentsEditorialClient";
import { getApartmentImages } from "../lib/images";
import { apartments as APARTMENTS_DATA } from "../../data/apartments";

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

const APARTMENT_KEY_MAP: Record<string, ApartmentKey> = {
  "room-1": "ap1",
  "apartment-2": "ap2",
  "apartment-3": "ap3",
  "luxury-apartment": "ap4",
};

const editorialFromSource = (a: (typeof APARTMENTS_DATA)[number]) => {
  const apKey = APARTMENT_KEY_MAP[a.id] ?? "ap1";
  const images = getApartmentImages(apKey);

  const enTitle =
    a.id === "room-1"
      ? "Central & Riverfront Room 1"
      : a.id === "apartment-2"
        ? "Central & Riverfront Apartment 2"
        : a.id === "apartment-3"
          ? "Central & Riverfront Apartment 3"
          : "Luxury Apartment In The Center";

  const enCategory =
    a.id === "room-1"
      ? "STUDIO"
      : a.id === "apartment-2"
        ? "APARTMENT - 1 BEDROOM"
        : a.id === "apartment-3"
          ? "APARTMENT - 1 BEDROOM"
          : "LUXURY APARTMENT - 2 BEDROOMS";

  const enDescription =
    a.id === "room-1"
      ? "Warm and independent studio, 3 minutes from the center of Edessa. It has a fridge, an espresso machine, and welcome treats (no kitchen)."
      : a.id === "apartment-2"
        ? "Bright 1-bedroom apartment with a separate living room, armchair/sofa-bed, fully equipped kitchen, and a large balcony over the river."
        : a.id === "apartment-3"
          ? "Spacious apartment with a double sofa-bed in the living room, a full kitchen, espresso machine, and a balcony overlooking the garden."
          : "New luxury 2-bedroom apartment in a private building, with a spacious living room, full kitchen, outdoor area, and river view.";

  const capacityValue = a.capacity.replace(/[^0-9]/g, "") || "2";
  const bedroomsValue = a.category.includes("2 ΥΠΝΟΔΩΜΑΤΙΩΝ") ? "2" : "1";

  const viewHint =
    a.features.some((f) => f.includes("Θέα στο Ποτάμι") || f.includes("Θέα στο ποτάμι"))
      ? "RIVER"
      : a.features.some((f) => f.includes("Θέα Κήπος"))
        ? "GARDEN"
        : "CENTER";

  const featureToEn = (featureEl: string) => {
    const map: Record<string, string> = {
      "1 Διπλό Κρεβάτι": "Double bed",
      "1 Διπλό & 1 Πολυθρόνα-Κρεβάτι": "1 Double & 1 Armchair-Sofa Bed",
      "1 Διπλό & 2 Μονά Κρεβάτια": "1 Double & 2 Single Beds",
      "Ψυγείο & Μηχανή Espresso": "Fridge & Espresso machine",
      "Κεράσματα": "Welcome treats",
      "Διπλό Κρεβάτι": "Double bed",
      "Μικρή Κουζίνα": "Small kitchenette",
      "Μηχανή Espresso": "Espresso machine",
      "Μπαλκόνι στο Ποτάμι": "River balcony",
      "Δωρεάν Wi-Fi": "Free Wi-Fi",
      "Θέα στο Ποτάμι": "River view",
      "Θέα στο ποτάμι": "River View",
      "Θέα Κήπος": "Garden view",
      "Κήπος": "Garden",
      "Διπλός Καναπές-Κρεβάτι": "Double sofa-bed",
      "Υπαίθριος Χώρος": "Outdoor space",
      "Ευρύχωρο Σαλόνι": "Spacious living room",
      "Πλήρης Κουζίνα": "Full kitchen",
      "Smart TV": "Smart TV",
      "2 Υπνοδωμάτια": "2 Bedrooms",
      "1 Υπνοδωμάτιο": "1 Bedroom",
      "Πολυθρόνα-Κρεβάτι": "Armchair-Sofa bed",
      "A/C": "A/C",
      "Ιδιωτικό Parking (Μόνο για μηχανές)": "Private Parking (Motorcycles Only)",
    };
    return map[featureEl] ?? featureEl;
  };

  // Remove view-related items: they are already displayed in the stats header.
  const amenities = a.features
    .filter(
      (f) =>
        f !== "Θέα στο Ποτάμι" &&
        f !== "Θέα στο ποτάμι" &&
        f !== "Θέα Κήπος"
    )
    .map((f) => ({ el: f, en: featureToEn(f) }));

  return {
    apKey,
    images,
    airbnbUrl: a.airbnbUrl,
    category: { el: a.category, en: enCategory },
    title: { el: a.title, en: enTitle },
    description: { el: a.description, en: enDescription },
    keyFacts: [
      { value: capacityValue, label: { el: "ΑΤΟΜΑ", en: "ADULTS" } },
      {
        value: bedroomsValue,
        label: {
          el: bedroomsValue === "2" ? "ΥΠΝΟΔΩΜΑΤΙΑ" : "ΥΠΝΟΔΩΜΑΤΙΟ",
          en: bedroomsValue === "2" ? "BEDROOMS" : "BEDROOM",
        },
      },
      { value: viewHint, label: { el: "ΘΕΑ", en: "VIEW" } },
    ],
    amenities,
  } satisfies EditorialApartment;
};

const EDITORIAL_APARTMENTS: EditorialApartment[] = APARTMENTS_DATA.map(editorialFromSource);

export default function ApartmentsPage() {
  return (
    <>
      <ApartmentsEditorialClient apartments={EDITORIAL_APARTMENTS} />
    </>
  );
}

