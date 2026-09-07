"use client";

import Link from "next/link";
import { services } from "./services.data";
import { iconMap } from "@/app/components/icon-map";
import { useLocale } from "@/app/locale-provider";
import {
  Stack, Text, Title, SimpleGrid,
  Box, Container, Flex
} from "@mantine/core";
import {
  ArrowRight, Clock, ShieldCheck, Users, Microscope
} from "lucide-react";
import "@/app/components/smart-home/doctor-card.css";

export default function ServicesClient() {
  const { t, locale } = useLocale();

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
              <span className="bykm-kicker">{t("medicalServices.title")}</span>
            </div>

            <Title order={1} c="white" ta="center" lh={1.12} fw={600} className="bykm-display" style={{ fontSize: "clamp(30px, 4.5vw, 46px)", marginTop: 14 }}>
              {t("servicesPage.title")}
            </Title>
            <Text size="md" ta="center" maw={520} lh={1.65} style={{ color: "rgba(255,255,255,0.62)" }}>
              {t("servicesPage.heroSubtitle")}
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
            {[
              { icon: <Clock size={18} />, label: t("servicesPage.stat24h"), sub: t("servicesPage.stat24hSub") },
              { icon: <Users size={18} />, label: t("servicesPage.statServices"), sub: t("servicesPage.statServicesSub") },
              { icon: <ShieldCheck size={18} />, label: t("servicesPage.statExperts"), sub: t("servicesPage.statExpertsSub") },
              { icon: <Microscope size={18} />, label: t("servicesPage.statEquipment"), sub: t("servicesPage.statEquipmentSub") },
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
            <h2 className="m-h2">{t("servicesPage.whatWeOffer")}</h2>
          </div>
          <div className="hgrid grid-3">
            {services.map((svc, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <div key={svc.id} className="card">
                  {/* Image / icon placeholder */}
                  <div className="imageSection" style={{ minHeight: 200 }}>
                    <span className="avatarCircle" style={{ width: 96, height: 96 }}>
                      <span style={{ color: "#F2B61D", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {iconMap[svc.icon]}
                      </span>
                    </span>
                  </div>
                  {/* Body */}
                  <div className="infoSection">
                    <span className="hospitalLabel">
                      {locale === "am" ? "ዶ/ር ካሳው ማማ ሆስፒታል" : "Dr. Kassaw Mamma Hospital"}
                    </span>
                    <h3 className="doctorName" style={{ fontSize: 18 }}>
                      {t(`services.${svc.id}.title`)}
                    </h3>
                    <p className="specialty" style={{ fontSize: 13 }}>
                      {t(`services.${svc.id}.description`)}
                    </p>
                    <Link href={`/services/${svc.id}`} className="viewProfileBtn">
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
            <span className="bykm-kicker">{t("servicesPage.ctaBadge")}</span>
            <span className="bykm-kicker-dash" />
          </div>

          <Title order={3} c="white" fw={600} mt={14} mb={10} className="bykm-display" style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>
            {t("servicesPage.ctaTitle")}
          </Title>

          <Text size="sm" mb="xl" maw={460} mx="auto" lh={1.6} style={{ color: "rgba(255,255,255,0.62)" }}>
            {t("servicesPage.ctaSubtitle")}
          </Text>

          <Link href="/appointment" className="bykm-btn">
            <span>{t("servicesPage.ctaButton")}</span>
            <ArrowRight size={15} />
          </Link>
        </Container>
      </Box>
    </Box>
  );
}
