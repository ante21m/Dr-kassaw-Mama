"use client";

import { FaAmbulance, FaBaby, FaFlask, FaXRay, FaDesktop, FaBrain, FaCut, FaHeartbeat, FaStethoscope } from "react-icons/fa";
import { useLocale } from "@/app/locale-provider";
import Link from "next/link";
import "./smart-home/doctor-card.css";

const services = [
  { key: "emergency", icon: <FaAmbulance size={20} />, color: "#ef4444", bg: "#fef2f2" },
  { key: "delivery", icon: <FaBaby size={20} />, color: "#ec4899", bg: "#fdf2f8" },
  { key: "laboratory", icon: <FaFlask size={20} />, color: "#8b5cf6", bg: "#f5f3ff" },
  { key: "xray", icon: <FaXRay size={20} />, color: "#f97316", bg: "#fff7ed" },
  { key: "ultrasound", icon: <FaDesktop size={20} />, color: "#06b6d4", bg: "#ecfeff" },
  { key: "ct-scan", icon: <FaBrain size={20} />, color: "#14b8a6", bg: "#f0fdfa" },
  { key: "surgical", icon: <FaCut size={20} />, color: "var(--primary)", bg: "var(--primary-50)" },
  { key: "ecg", icon: <FaHeartbeat size={20} />, color: "#F2B61D", bg: "var(--primary-100)" },
  { key: "ent", icon: <FaCut size={20} />, color: "#0ea5e9", bg: "#f0f9ff" },
  { key: "gynecology", icon: <FaBaby size={20} />, color: "#d946ef", bg: "#fdf4ff" },
  { key: "maxillofacial", icon: <FaCut size={20} />, color: "#f59e0b", bg: "#fffbeb" },
  { key: "general", icon: <FaStethoscope size={20} />, color: "var(--primary)", bg: "var(--primary-50)" },
];

const taglines = [
  "Immediate Response",
  "Safe & Compassionate",
  "Accurate & Fast",
  "Digital Precision",
  "3D/4D Imaging",
  "Advanced Scanning",
  "Expert Precision",
  "Heart Monitoring",
  "ENT & Sinus Care",
  "Women's Health",
  "Facial & Oral Surgery",
  "24/7 Comprehensive Care",
];

export default function MedicalServices() {
  const { t } = useLocale();

  return (
    <section style={{ padding: "96px 0", background: "var(--bg)" }}>
      <div className="m-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="m-eyebrow" style={{ justifyContent: "center" }}>Our Departments</div>
          <h2 className="m-h2" style={{ marginBottom: 12 }}>
            {t("medicalServices.title")}
          </h2>
          <p className="m-lede" style={{ maxWidth: 560, margin: "0 auto" }}>
            Advanced care with modern technology and dedicated specialists across every department.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {services.map((service, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <Link
                key={service.key}
                href={`/services/${service.key}`}
                className="card"
                style={{ textDecoration: "none" }}
              >
                {/* Image / icon placeholder */}
                <div className="imageSection" style={{ minHeight: 200 }}>
                  <span className="avatarCircle" style={{ width: 96, height: 96 }}>
                    <span style={{ color: "#F2B61D", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {service.icon}
                    </span>
                  </span>
                </div>

                {/* Body */}
                <div className="infoSection">
                  <span className="hospitalLabel">{taglines[i]}</span>
                  <h3 className="doctorName" style={{ fontSize: 18 }}>{t(`services.${service.key}.title`)}</h3>
                  <p className="specialty" style={{ fontSize: 13 }}>{t(`services.${service.key}.description`)}</p>
                  <span className="viewProfileBtn">
                    {t("servicesPage.viewDetails")} <span className="arrow">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
