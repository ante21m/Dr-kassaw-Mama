"use client";

import Link from "next/link";
import { useLocale } from "@/app/locale-provider";
import {
  Stack, Text, Title, SimpleGrid,
  Box, Container, Flex
} from "@mantine/core";
import {
  ArrowRight, Heart, Brain, Bone, Baby,
  Users, Building2,
  CalendarCheck, UserCheck
} from "lucide-react";
import "@/app/components/smart-home/doctor-card.css";

const deptsData = {
  en: {
    cardiology: ["ECG & Echocardiography", "Holter Monitoring", "Stress Testing", "Cardiac CT", "Heart Failure Management", "Hypertension Care"],
    neurology: ["EEG & EMG", "Brain CT/MRI", "Stroke Management", "Epilepsy Care", "Migraine Treatment", "Neuropathy Evaluation"],
    orthopedics: ["Fracture Treatment", "Joint Injections", "Sports Medicine", "Arthroscopy", "Spine Care", "Rehabilitation"],
    pediatrics: ["Well-Child Checkups", "Vaccinations", "Growth Monitoring", "Pediatric Nutrition", "Common Illness Care", "Developmental Screening"],
  },
  am: {
    cardiology: ["ኢሲጂ እና ኢኮካርዲዮግራፊ", "ሆልተር መቆጣጠሪያ", "የጭንቀት ምርመራ", "የልብ ሲቲ", "የልብ ድካም አያያዝ", "የደም ግፊት እንክብካቤ"],
    neurology: ["ኢኢጂ እና ኢኤምጂ", "የአንጎል ሲቲ/ኤምአርአይ", "የስትሮክ አያያዝ", "የሚጥል በሽታ እንክብካቤ", "ራስ ምታት ሕክምና", "የነርብ ግምገማ"],
    orthopedics: ["የስብራት ሕክምና", "የመገጣጠሚያ መርፌ", "የስፖርት ሕክምና", "አርትሮስኮፒ", "የአከርካሪ እንክብካቤ", "ማገገሚያ"],
    pediatrics: ["መደበኛ ምርመራ", "ክትባት", "የእድገት ክትትል", "የሕፃናት አመጋገብ", "የተለመዱ በሽታዎች ሕክምና", "የእድገት መመርመሪያ"],
  },
};

const depts = [
  { id: "cardiology", icon: Heart },
  { id: "neurology", icon: Brain },
  { id: "orthopedics", icon: Bone },
  { id: "pediatrics", icon: Baby },
];

export default function DepartmentsClient() {
  const { t, locale } = useLocale();
  const items = deptsData[locale as "en" | "am"] || deptsData.en;

  return (
    <Box bg="gray.0" mih="100vh">
      <Box
        py={72}
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
            background:
              "radial-gradient(ellipse at 18% 28%, rgba(21,21,139,0.5) 0%, transparent 65%), radial-gradient(ellipse at 82% 72%, rgba(127,217,196,0.07) 0%, transparent 50%)",
          }}
        />
        <Box className="bykm-grid-overlay" />
        <Box className="bykm-geo" style={{ top: -80, right: -80, width: 340, height: 340, transform: "rotate(12deg)" }} />
        <Box className="bykm-geo" style={{ bottom: -120, left: -60, width: 240, height: 240, transform: "rotate(-10deg)", opacity: 0.6 }} />

        <Container size={1300} pos="relative">
          <Stack align="center" gap={6} mb={48}>
            <div className="bykm-kicker-line">
              <span className="bykm-kicker-dash" />
              <span className="bykm-kicker">{t("nav.departments")}</span>
            </div>

            <Title order={1} c="white" ta="center" lh={1.12} fw={600} className="bykm-display" style={{ fontSize: "clamp(30px, 4.5vw, 46px)", marginTop: 14 }}>
              {t("departments.pageTitle")}
            </Title>
            <Text size="md" ta="center" maw={560} lh={1.65} style={{ color: "rgba(255,255,255,0.62)" }}>
              {t("departments.heroSubtitle")}
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
            {[
              { icon: <Building2 size={18} />, label: t("departments.statDepts"), sub: t("departments.statDeptsSub") },
              { icon: <Users size={18} />, label: t("departments.statDoctors"), sub: t("departments.statDoctorsSub") },
              { icon: <UserCheck size={18} />, label: t("departments.statPatients"), sub: t("departments.statPatientsSub") },
              { icon: <CalendarCheck size={18} />, label: t("departments.statYears"), sub: t("departments.statYearsSub") },
            ].map((s) => (
              <Flex key={s.label} gap="md" align="center" p="sm" px="md" className="bykm-stat-chip">
                <Box c="#F2B61D" style={{ flexShrink: 0 }}>{s.icon}</Box>
                <Box>
                  <Text c="white" fw={700} size="sm" lh={1.2}>{s.label}</Text>
                  <Text c="white" size="xs" style={{ opacity: 0.5 }}>{s.sub}</Text>
                </Box>
              </Flex>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <section style={{ padding: "80px 24px", background: "#F8F9FA" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="m-h2">{t("departments.exploreTitle")}</h2>
          </div>
          <div className="hgrid grid-3">
            {depts.map((dept, i) => {
              const num = String(i + 1).padStart(2, "0");
              const deptItems = items[dept.id as keyof typeof items] || [];
              return (
                <div key={dept.id} className="card">
                  {/* Image / icon placeholder */}
                  <div className="imageSection" style={{ minHeight: 200 }}>
                    <span className="avatarCircle" style={{ width: 96, height: 96 }}>
                      <span style={{ color: "#F2B61D", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <dept.icon size={30} />
                      </span>
                    </span>
                  </div>
                  {/* Body */}
                  <div className="infoSection">
                    <h3 className="doctorName" style={{ fontSize: 18 }}>
                      {t(`departments.${dept.id}`)}
                    </h3>
                    <p className="specialty" style={{ fontSize: 13 }}>
                      {t(`departments.${dept.id}Desc`)}
                    </p>
                    <Link href={`/services/${dept.id}`} className="viewProfileBtn">
                      {t("servicesPage.viewDetails")} <span className="arrow"><ArrowRight size={12} /></span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Box
        py={56}
        style={{
          background: "linear-gradient(135deg, #050A28 0%, #0A0B3B 50%, #15158B 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          pos="absolute"
          className="bykm-geo"
          style={{ top: -100, left: -100, width: 300, height: 300, transform: "rotate(12deg)" }}
        />
        <Box
          pos="absolute"
          className="bykm-geo"
          style={{ bottom: -60, right: -60, width: 200, height: 200, transform: "rotate(-8deg)", opacity: 0.7 }}
        />
        <Box className="bykm-grid-overlay" />

        <Container size="sm" ta="center" pos="relative">
          <div className="bykm-kicker-line">
            <span className="bykm-kicker-dash" />
            <span className="bykm-kicker">{t("departments.ctaBadge")}</span>
            <span className="bykm-kicker-dash" />
          </div>

          <Title order={3} c="white" fw={600} mt={14} mb={10} className="bykm-display" style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>
            {t("departments.ctaTitle")}
          </Title>

          <Text size="sm" mb="xl" maw={460} mx="auto" lh={1.6} style={{ color: "rgba(255,255,255,0.62)" }}>
            {t("departments.ctaSubtitle")}
          </Text>

          <Link href="/appointment" className="bykm-btn">
            <span>{t("departments.ctaButton")}</span>
            <ArrowRight size={15} />
          </Link>
        </Container>
      </Box>
    </Box>
  );
}
