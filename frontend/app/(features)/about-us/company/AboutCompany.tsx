"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale } from "@/app/locale-provider";
import { imgVer } from "@/lib/imgver";
import type { LeadershipData } from "@/app/data/site-fallbacks";
import { useLeadership } from "@/app/hooks/useLeadership";
import Lightbox from "@/app/components/ui/Lightbox";
import "../../../../app/(features)/about-us/about-us.css";

export default function AboutCompany() {
  const { t, locale } = useLocale();
  const { leadership } = useLeadership();

  const [activeLeader, setActiveLeader] = useState<LeadershipData | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [aboutPreview, setAboutPreview] = useState(false);
  const [leaderPreview, setLeaderPreview] = useState<LeadershipData | null>(null);

  const lname = (l: LeadershipData) => (locale === "am" ? l.nameAm || l.name : l.name);
  const lrole = (l: LeadershipData) => (locale === "am" ? l.roleAm || l.role : l.role);

  /* =========================
     AUTOPLAY CAROUSEL
  ========================= */
  useEffect(() => {
    if (paused) return;
    if (leadership.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) =>
        prev === leadership.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(timer);
  }, [paused, leadership.length]);

  /* =========================
     ESC KEY CLOSE
  ========================= */
  useEffect(() => {
    if (!activeLeader) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveLeader(null);
    };

    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [activeLeader]);

  return (
    <>
      {/* =========================
          ABOUT COMPANY
      ========================= */}
      <section className="about-company">
        <div className="about-company-container">
          {/* TEXT */}
          <div className="about-company-text fade-left">
            <h1>{t("about.title")}</h1>
            <p>{t("about.intro")}</p>
            <p>{t("about.history")}</p>
            <p>{t("about.today")}</p>
          </div>

          {/* IMAGE */}
          <div className="about-company-image fade-right" style={{ cursor: "zoom-in" }} onClick={() => setAboutPreview(true)}>
            <Image
              src={"/images/clinic1.jpg" + imgVer}
              alt="Dr. Kassaw Mamma Primary Hospital"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* =========================
          LEADERSHIP SECTION
      ========================= */}
      <section className="leadership">
        <h2>{t("leadership.title")}</h2>

        <div
          className="carousel-wrapper"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${index * 320}px)`,
            }}
          >
            {leadership.map((leader) => (
              <div
                key={leader.id}
                className="carousel-slide"
                onClick={() => setActiveLeader(leader)}
              >
                <div className="leader-card">
                  {/* SMART LEADER IMAGE */}
                  <div className="physician-image" style={{ cursor: "zoom-in" }} onClick={(e) => { e.stopPropagation(); setLeaderPreview(leader); }}>
                    <Image
                      src={(leader.image || "/leadership/leadership-placeholder.png") + imgVer}
                      alt={lname(leader)}
                      fill
                      sizes="(max-width: 768px) 70vw, 260px"
                      style={{ objectFit: "cover" }}
                      priority={leader.id === 1}
                    />
                  </div>

                  <h3>{lname(leader)}</h3>
                  <p>{lrole(leader)}</p>

                  <span className="view-profile-btn">
                    {t("leadership.viewProfile")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          PROFILE MODAL
      ========================= */}
      {activeLeader && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveLeader(null)}
        >
          <div
            className="modal modal-animate"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              className="modal-close"
              aria-label="Close profile"
              onClick={() => setActiveLeader(null)}
            >
              ✕
            </button>

            {/* IMAGE */}
            <div className="modal-image">
              <Image
                src={(activeLeader.image || "/leadership/leadership-placeholder.png") + imgVer}
                alt={lname(activeLeader)}
                fill
                sizes="(max-width: 768px) 80vw, 320px"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* TEXT */}
            <h3>{lname(activeLeader)}</h3>
            <span className="modal-role">
              {lrole(activeLeader)}
            </span>

            <div className="modal-content">
              <section>
                <h4>{t("leadership.about")}</h4>
                <p>{activeLeader.bio}</p>
              </section>

              {activeLeader.experience && (
                <section>
                  <h4>{t("leadership.experience")}</h4>
                  <p>{activeLeader.experience}</p>
                </section>
              )}

              {activeLeader.certificates && activeLeader.certificates.length > 0 && (
                <section>
                  <h4>{t("leadership.certificates")}</h4>
                  <ul>
                    {activeLeader.certificates.map(
                      (item, i) => (
                        <li key={i}>{item}</li>
                      )
                    )}
                  </ul>
                </section>
              )}

              {activeLeader.awards && activeLeader.awards.length > 0 && (
                <section>
                  <h4>{t("leadership.awards")}</h4>
                  <ul>
                    {activeLeader.awards.map(
                      (item, i) => (
                        <li key={i}>{item}</li>
                      )
                    )}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </div>
      )}

      {/* IMAGE LIGHTBOXES */}
      <Lightbox
        open={aboutPreview}
        src={"/images/clinic1.jpg" + imgVer}
        caption={t("about.title")}
        onClose={() => setAboutPreview(false)}
      />
      <Lightbox
        open={!!leaderPreview}
        src={leaderPreview ? (leaderPreview.image || "/leadership/leadership-placeholder.png") + imgVer : undefined}
        caption={leaderPreview ? lname(leaderPreview) : undefined}
        onClose={() => setLeaderPreview(null)}
      />
    </>
  );
}