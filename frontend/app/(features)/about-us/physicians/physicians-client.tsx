"use client";

import PhysicianCarousel from "./PhysicianCarousel";
import { useLocale } from "@/app/locale-provider";
import "../about-us.css";

const MINT = "#F2B61D";

export default function PhysiciansClient() {
  const { t } = useLocale();

  return (
    <div className="physicians-page">
      {/* ══════════════ HERO ══════════════ */}
      <section className="physicians-hero bk-deep" style={{ background: "linear-gradient(135deg, #161691 0%, #15158B 45%, #12127C 100%)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 18% 28%, rgba(21,21,139,0.55) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 82% 72%, rgba(127,217,196,0.07) 0%, transparent 50%)" }} />
        <div className="bk-grid-overlay" />
        <div className="bk-geo" style={{ width: 360, height: 360, top: -90, right: -80, transform: "rotate(12deg)", opacity: 0.5 }} />
        <div className="bk-geo" style={{ width: 200, height: 200, bottom: 40, left: "34%", transform: "rotate(45deg)", opacity: 0.3 }} />
        <div className="physicians-hero-inner">
          <div className="bk-hero-grid">
            <div>
              <div className="bykm-kicker-line">
                <span className="bykm-kicker-dash" />
                <span className="bykm-kicker">Our Team</span>
              </div>
              <h1 className="bk-display">
                <span style={{ background: "linear-gradient(90deg, #ffffff 35%, rgba(127,217,196,0.85))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  {t("about.physicians")}
                </span>
              </h1>
              <p className="physicians-hero-desc">{t("about.physiciansDesc")}</p>
            </div>
            <div style={{ paddingTop: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
              <div style={{ width: 168, height: 168, borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), var(--primary-900))", border: "4px solid rgba(255,255,255,0.16)", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#F2B61D", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 58, lineHeight: 1 }}>DR</span>
              </div>
              <div className="bk-glass-card">
                <div className="bk-glass-bar" />
                <p style={{ margin: 0, fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(255,255,255,0.68)", maxWidth: 340, textAlign: "center" }}>
                  {t("homePhysicians.teamSubtitle")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ TEAM / CAROUSEL ══════════════ */}
      <section className="physicians-list-section">
        <div className="physicians-list-container">
          <div className="physicians-section-head">
            <div className="bykm-kicker-line">
              <span className="bykm-kicker-dash bykm-kicker-dash--primary" />
              <span className="bykm-kicker bykm-kicker--primary">Specialists</span>
            </div>
            <h2 className="bk-display">{t("staff.title")}</h2>
          </div>
          <PhysicianCarousel />
        </div>
      </section>
    </div>
  );
}
