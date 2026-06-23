import "./globals.css";

export const metadata = {
  title: "Climate Control System India | Industrial Chillers & Panel AC Manufacturer in Pune",
  description:
    "Climate Control System India (CCSI) — Leading manufacturer of industrial water chillers, oil coolers, hydraulic oil coolers, panel air conditioners, refrigerated air dryers & dehumidifiers in Pune, India. Custom OEM solutions for engineering industries.",
  keywords:
    "industrial water chiller manufacturer pune, panel air conditioner manufacturer india, hydraulic oil cooler pune, refrigerated air dryer, industrial dehumidifier, OEM climate control, CCSI",
  openGraph: {
    title: "Climate Control System India | Precision Engineered Climate Solutions",
    description:
      "Pune-based manufacturer of industrial chillers, panel ACs, oil coolers & refrigeration equipment. Custom OEM solutions for engineering industries across India.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "#CCSI",
              name: "Climate Control System India",
              description:
                "Leading manufacturer of industrial water chillers, oil coolers, panel air conditioners, refrigerated air dryers and dehumidifiers in Pune, India.",
              url: "https://climatcontrolsystemindia.com",
              telephone: "+91-XXXXXXXXXX",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pune",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
                },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "18.5204",
                longitude: "73.8567",
              },
              founder: {
                "@type": "Person",
                name: "Mr. S. A. Suryawanshi",
              },
              foundingDate: "2021",
              priceRange: "$$",
              areaServed: "IN",
              sameAs: [],
              makesOffer: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Industrial Water Chillers",
                    category: "Refrigeration Equipment",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Panel Air Conditioners",
                    category: "Air Conditioning Equipment",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "Hydraulic Oil Coolers",
                    category: "Refrigeration Equipment",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
