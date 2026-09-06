export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Dr. Kassaw Mamma Primary Hospital",
    description:
      "Dr. Kassaw Mamma Primary Hospital provides quality healthcare services in Woldia, Ethiopia. Expert doctors, modern diagnostics, 24/7 emergency care, and patient-centered treatment.",
    url: "https://medhinprimaryhospital.com",
    telephone: "+251-973245788",
    email: "info@medhinhospital.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Behind the Piassa Total Gas Station",
      addressLocality: "Weldiya",
      addressRegion: "Amhara",
      addressCountry: "ET",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.8289,
      longitude: 39.6015,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    medicalSpecialty: [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Pediatrics",
      "Emergency",
      "Radiology",
      "Surgery",
      "Laboratory",
    ],
    founder: {
      "@type": "Person",
      name: "Dr. Kassaw Aragie",
    },
    sameAs: [
      "https://facebook.com/medhinprimaryhospital",
      "https://t.me/medhinprimaryhospital",
      "https://youtube.com/@medhinprimaryhospital",
      "https://twitter.com/medhinprimaryhospital",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
