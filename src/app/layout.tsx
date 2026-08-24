import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BackgroundGlow } from "./components/BackgroundGlow";
import Template from "./template";
import LanguageFlashWrapper from "./components/LanguageFlashWrapper";
import CookieBanner from "./components/CookieBanner";

const sans = Outfit({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const accent = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
  variable: "--font-accent",
  style: ["italic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apartmentsedessa.com"),
  title: {
    default: "Central & Riverfront Apartments | Edessa Stay",
    template: "%s | Central & Riverfront Apartments Edessa",
  },
  description:
    "Luxury accommodation and traditional hospitality in the heart of Edessa, right by the river.",
  keywords: [
    "Edessa apartments",
    "Edessa accommodation",
    "Central Riverfront Edessa",
    "Διαμονή Έδεσσα",
    "Διαμερίσματα Έδεσσα",
  ],
  alternates: {
    canonical: "https://apartmentsedessa.com",
    languages: {
      "el-GR": "https://apartmentsedessa.com",
      "en-US": "https://apartmentsedessa.com/en",
    },
  },
  openGraph: {
    title: "Central & Riverfront Apartments | Edessa",
    description:
      "Traditional hospitality with modern comfort in the heart of Edessa.",
    type: "website",
    locale: "el_GR",
    siteName: "Central & Riverfront Apartments",
    url: "https://apartmentsedessa.com",
    images: [
      {
        url: "https://apartmentsedessa.com/og/central-riverfront.jpg",
        width: 1200,
        height: 630,
        alt: "Central & Riverfront Apartments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Central & Riverfront Apartments | Edessa",
    description:
      "Traditional hospitality with modern comfort in the heart of Edessa.",
    images: ["https://apartmentsedessa.com/og/central-riverfront.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el" className={`${sans.variable} ${serif.variable} ${accent.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          type="image/png"
          sizes="16x16"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-[#F2E5DC] text-[#544B45] font-sans flex flex-col">
        <LanguageProvider>
          <div className="min-h-screen flex flex-col justify-between bg-[#F2E5DC]/90 relative z-10">
            <BackgroundGlow />
            <Navbar />
            <main className="flex-grow pt-16">
              <LanguageFlashWrapper>
                <Template>{children}</Template>
              </LanguageFlashWrapper>
            </main>
            <Footer />
            <CookieBanner />
          </div>
        </LanguageProvider>

        {/* Hotel / Accommodation structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              name: "Central & Riverfront Apartments Edessa",
              description:
                "Πολυτελή διαμερίσματα και Airbnb στην Έδεσσα, δίπλα στους Καταρράκτες και στο κέντρο της πόλης.",
              url: "https://apartmentsedessa.com",
              telephone: "+306900000000",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Αθηνών 12",
                addressLocality: "Έδεσσα",
                postalCode: "58200",
                addressCountry: "GR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "40.8017",
                longitude: "22.0439",
              },
              priceRange: "$$",
              currenciesAccepted: "EUR",
            }),
          }}
        />
      </body>
    </html>
  );
}
