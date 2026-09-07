"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { useLocale } from "@/app/locale-provider";
import {
  Box, Container, Title, Text, Stack, Badge, Group,
  SimpleGrid
} from "@mantine/core";
import { ZoomIn, Building2, Stethoscope, Users, ScanLine, Image as ImageIcon } from "lucide-react";
import { imgVer } from "@/lib/imgver";
import { resolveImage } from "@/lib/resolveImage";
import { useGetGalleryQuery } from "@/app/store/api/galleryApi";
import Lightbox from "@/app/components/ui/Lightbox";

const categories = ["All", "Facilities", "Doctors", "Staff", "Equipment"] as const;

const isRealImage = (u: string) => !u.includes("placeholder");

const catIcon: Record<string, ReactNode> = {
  Facilities: <Building2 size={30} />,
  Doctors: <Stethoscope size={30} />,
  Staff: <Users size={30} />,
  Equipment: <ScanLine size={30} />,
};

const catKeys: Record<string, string> = {
  All: "galleryPage.all",
  Facilities: "galleryPage.facilities",
  Doctors: "galleryPage.doctors",
  Staff: "galleryPage.staff",
  Equipment: "galleryPage.equipment",
};

function catFromTitle(title: string): string {
  const t = title.toLowerCase();
  if (/(x-ray|xray|ct|scanner|ultrasound|laboratory|equipment|machin|scan|ecg)/.test(t)) return "Equipment";
  if (/(doctor|physician|consult|surgeon|medical team|nurse)/.test(t)) return "Doctors";
  if (/(staff|supporting|dedicated)/.test(t)) return "Staff";
  return "Facilities";
}

const rawImages = [
  { src: "/images/gallery-placeholder.png", cat: "Facilities", en: "Hospital Building", am: "የሆስፒታሉ ህንፃ" },
  { src: "/images/gallery-placeholder.png", cat: "Facilities", en: "Child & Maternal Wing", am: "የህፃናት እና የእናቶች ክፍል" },
  { src: "/images/gallery-placeholder.png", cat: "Facilities", en: "Hospital Exterior", am: "የሆስፒታሉ ውጭ እይታ" },
  { src: "/images/gallery-placeholder.png", cat: "Facilities", en: "Patient Waiting Area", am: "የታካሚ መቆያ ቦታ" },
  { src: "/images/gallery-placeholder.png", cat: "Facilities", en: "Facility Overview", am: "የተቋሙ አጠቃላይ እይታ" },
  { src: "/images/gallery-placeholder.png", cat: "Facilities", en: "Renovated Clinic Wing", am: "የታደሰው ክሊኒክ ክፍል" },
  { src: "/images/gallery-placeholder.png", cat: "Facilities", en: "Clinic Overview", am: "የክሊኒኩ አጠቃላይ እይታ" },
  { src: "/images/gallery-placeholder.png", cat: "Doctors", en: "Our Doctor Team", am: "የዶክተሮቻችን ቡድን" },
  { src: "/images/gallery-placeholder.png", cat: "Doctors", en: "Consultation", am: "ምክክር" },
  { src: "/images/gallery-placeholder.png", cat: "Doctors", en: "Medical Team", am: "የህክምና ቡድን" },
  { src: "/images/gallery-placeholder.png", cat: "Doctors", en: "Experienced Doctors", am: "ልምድ ያላቸው ዶክተሮች" },
  { src: "/images/gallery-placeholder.png", cat: "Staff", en: "Our Dedicated Staff", am: "ታታሪ ሰራተኞቻችን" },
  { src: "/images/gallery-placeholder.png", cat: "Staff", en: "Supporting Staff", am: "የድጋፍ ሰራተኞች" },
  { src: "/images/gallery-placeholder.png", cat: "Equipment", en: "Digital X-Ray Machine", am: "ዲጂታል ኤክስሬይ ማሽን" },
  { src: "/images/gallery-placeholder.png", cat: "Equipment", en: "CT Scanner", am: "ሲቲ ስካነር" },
  { src: "/images/gallery-placeholder.png", cat: "Equipment", en: "Ultrasound Device", am: "አልትራሳውንድ መሳሪያ" },
  { src: "/images/gallery-placeholder.png", cat: "Equipment", en: "Laboratory Equipment", am: "የላቦራቶሪ መሳሪያዎች" },
];

export default function GalleryClient() {
  const { t, locale } = useLocale();
  const lang = locale as "en" | "am";
  const [active, setActive] = useState<string>("All");
  const [selected, setSelected] = useState<{ src: string; title: string } | null>(null);

  const { data: apiImages } = useGetGalleryQuery();

  const images = (apiImages && apiImages.length > 0 ? apiImages : rawImages).map((img) => {
    if (apiImages && apiImages.length > 0) {
      const api = img as { title: string; titleAm?: string; image: string };
      const en = api.title;
      const title = lang === "am" ? api.titleAm || en : en;
      return { src: resolveImage(api.image) + imgVer, cat: catFromTitle(en), title };
    }
    const raw = img as { src: string; cat: string; en: string; am?: string };
    return { src: raw.src + imgVer, cat: raw.cat, title: lang === "am" ? raw.am || raw.en : raw.en };
  });

  const filtered = active === "All" ? images : images.filter((img) => img.cat === active);
  const availableCats = ["All", ...categories.filter((c) => c !== "All" && images.some((img) => img.cat === c))];

  return (
    <Box bg="gray.0" mih="100vh">
      {/* Hero */}
      <Box
        py={56}
        pos="relative"
        style={{
          background: "var(--bg-deep)",
          overflow: "hidden",
        }}
      >
        <Box
          pos="absolute"
          style={{
            inset: 0,
            background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.04) 0%, transparent 50%)",
          }}
        />
        <Box pos="absolute" style={{ top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
        <Box pos="absolute" style={{ bottom: -120, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.02)" }} />

        <Container size={1300} pos="relative">
          <Stack align="center" gap={6}>
            <Badge
              variant="white"
              size="lg"
              radius="xl"
              style={{ background: "rgba(255,255,255,0.1)", color: "#fff", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)", textTransform: "none" }}
            >
              {t("galleryPage.title")}
            </Badge>
            <Title order={1} c="white" ta="center" fw={800} style={{ fontSize: "clamp(28px, 4vw, 38px)" }}>
              {t("galleryPage.title")}
            </Title>
            <Text c="blue.2" size="md" ta="center" maw={500} lh={1.6}>
              {t("galleryPage.subtitle")}
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container size={1300} py={48}>
        {/* Filter pills */}
        <Group justify="center" gap="xs" mb="xl">
          {availableCats.map((cat) => (
            <Box
              key={cat}
              component="button"
              onClick={() => setActive(cat)}
              style={{
                padding: "6px 18px",
                borderRadius: 999,
                border: active === cat ? "none" : "1px solid var(--line)",
                background: active === cat ? "var(--primary)" : "transparent",
                color: active === cat ? "#fff" : "#4b5563",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {t(catKeys[cat])}
            </Box>
          ))}
        </Group>

        {/* Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
          {filtered.map((img, i) => (
            <Box
              key={i}
              style={{
                background: "#fff",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid var(--line)",
                cursor: "pointer",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                transition: "border-color .35s ease, box-shadow .35s ease, transform 0.3s ease",
              }}
              className="group"
              onClick={() => { setSelected(img); }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "0 18px 42px rgba(6,47,42,0.12)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <Box
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  background: "linear-gradient(135deg, var(--primary), var(--primary-700))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isRealImage(img.src) ? (
                  <>
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                      className="group-hover:scale-110"
                    />
                    <Box
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "rgba(21,21,139,0.9)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transform: "scale(0.8)", 
                        transition: "all 0.3s ease",
                        pointerEvents: "none",
                      }}
                      className="group-hover:opacity-100 group-hover:scale-100"
                    >
                      <ZoomIn size={16} />
                    </Box>
                  </>
                ) : (
                  <Box
                    style={{
                      width: 88,
                      height: 88,
                      borderRadius: "50%",
                      border: "3px solid rgba(255,255,255,0.2)",
                      background: "rgba(255,255,255,0.08)",
                      color: "#F2B61D",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.3s ease",
                    }}
                    className="group-hover:scale-105"
                  >
                    {catIcon[img.cat] || <ImageIcon size={30} />}
                  </Box>
                )}
              </Box>
              <Box py={20} px={16} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", fontWeight: 600 }}>
                  {t(catKeys[img.cat] || "galleryPage.all")}
                </Text>
                <Text mt={6} style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                  {img.title}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* Lightbox */}
      <Lightbox
        open={!!selected}
        src={selected?.src}
        caption={selected?.title}
        onClose={() => setSelected(null)}
      />
    </Box>
  );
}
