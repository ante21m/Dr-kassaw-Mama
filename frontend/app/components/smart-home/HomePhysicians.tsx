"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/app/locale-provider";
import { useRouter } from "next/navigation";
import { imgVer } from "@/lib/imgver";
import { usePhysicians } from "@/app/hooks/usePhysicians";
import { FaArrowRight, FaTimes, FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import "./doctor-card.css";

const GAP = 28;
const MIN_COL = 280;

export default function HomePhysicians() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const { physicians } = usePhysicians();
  const displayDoctors = physicians.slice(0, 4);

  const [lightbox, setLightbox] = useState<{ src: string; name: string } | null>(null);
  const [measure, setMeasure] = useState({ w: 0, cols: 3 });
  const [page, setPage] = useState(0);
  const [hovering, setHovering] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const cols = Math.max(1, Math.floor((w + GAP) / (MIN_COL + GAP)));
      setMeasure({ w, cols });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cols = Math.min(4, measure.w > 0 ? measure.cols : 3);
  const totalRows = Math.ceil(displayDoctors.length / cols);
  const needsCarousel = totalRows > 2;
  const maxPage = Math.max(0, Math.ceil(displayDoctors.length / cols) - 1);

  useEffect(() => { setPage(0); }, [cols]);

  useEffect(() => {
    if (!needsCarousel || hovering) return;
    const id = setInterval(() => {
      setPage((p) => (p >= maxPage ? 0 : p + 1));
    }, 4500);
    return () => clearInterval(id);
  }, [needsCarousel, hovering, maxPage]);

  const initials = (fullName: string) =>
    fullName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  const isRealImage = (u?: string) => !!u && !u.includes("placeholder");

  const cardW = cols > 0 ? (measure.w - (cols - 1) * GAP) / cols : MIN_COL;

  const renderCard = (doc: (typeof displayDoctors)[number]) => {
    const name = locale === "am" ? doc.name_am || doc.name : doc.name;
    const specialty = locale === "am" ? doc.specialty_am || doc.specialty : doc.specialty;
    const hasImg = isRealImage(doc.image);
    return (
      <div key={doc.id} className="group card">
        {/* Image / avatar */}
        <button
          onClick={() => { if (hasImg) setLightbox({ src: (doc.image || "") + imgVer, name }); }}
          aria-label={name}
          className="imageSectionBtn"
          style={{ display: "block", width: "100%", padding: 0, border: "none", background: "transparent", cursor: hasImg ? "zoom-in" : "default" }}
        >
          <div className="imageSection">
            {hasImg ? (
              <>
                <Image
                  src={doc.image + imgVer}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="avatarImg"
                />
                <span className="zoomBadge"><FaSearch size={14} /></span>
              </>
            ) : (
              <span className="avatarCircle">
                <span className="initial">{initials(name || doc.name)}</span>
              </span>
            )}
          </div>
        </button>

        {/* Info */}
        <div className="infoSection">
          <h3 className="doctorName">{name}</h3>
          <p className="specialty">{specialty}</p>
          <Link
            href={`/about-us/physicians/${doc.id}`}
            className="viewProfileBtn"
            onClick={(e) => { e.stopPropagation(); }}
          >
            {t("leadership.viewProfile")} <span className="arrow"><FaArrowRight size={11} /></span>
          </Link>
        </div>
      </div>
    );
  };

  const prev = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setPage((p) => Math.max(0, p - 1)); };
  const next = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setPage((p) => Math.min(maxPage, p + 1)); };

  const arrowStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.9)",
    color: "var(--primary)",
    border: "1px solid var(--line)",
    borderRadius: "50%",
    boxShadow: "0 6px 20px rgba(6,47,42,0.15)",
    cursor: "pointer",
    zIndex: 5,
    transition: "background .25s ease, color .25s ease",
  };

  return (
    <section style={{ padding: "96px 24px", background: "#F8F9FA" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-block", background: "var(--primary-100)", color: "var(--primary)", padding: "4px 14px", borderRadius: 999, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 12 }}>
            {t("homePhysicians.teamEyebrow")}
          </div>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800, color: "var(--bg-deep)", marginBottom: 8 }}>{t("staff.title")}</h2>
          <p style={{ fontSize: "0.93rem", color: "var(--ink-soft)", maxWidth: 500, margin: "0 auto" }}>{t("homePhysicians.teamSubtitle")}</p>
        </div>

        <div ref={gridRef} style={{ position: "relative" }}>
          {needsCarousel ? (
            <div
              style={{ overflow: "hidden" }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <div style={{ display: "flex", transition: "transform .55s ease", transform: `translateX(${-page * cols * (cardW + GAP)}px)` }}>
                {displayDoctors.map((doc, i) => (
                  <div key={doc.id} style={{ flex: `0 0 ${cardW}px`, marginRight: i < displayDoctors.length - 1 ? GAP : 0 }}>
                    {renderCard(doc)}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: GAP }}>
              {displayDoctors.map((doc) => renderCard(doc))}
            </div>
          )}

          {needsCarousel && (
            <>
              <button
                onClick={prev}
                aria-label="Previous"
                style={{ ...arrowStyle, left: -20, opacity: page === 0 ? 0.35 : 1, pointerEvents: page === 0 ? "none" : "auto" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; e.currentTarget.style.color = "var(--primary)"; }}
              >
                <FaChevronLeft size={15} />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                style={{ ...arrowStyle, right: -20, opacity: page === maxPage ? 0.35 : 1, pointerEvents: page === maxPage ? "none" : "auto" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; e.currentTarget.style.color = "var(--primary)"; }}
              >
                <FaChevronRight size={15} />
              </button>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
                {Array.from({ length: maxPage + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    aria-label={`Page ${i + 1}`}
                    style={{ width: i === page ? 26 : 8, height: 8, borderRadius: 999, border: "none", cursor: "pointer", background: i === page ? "var(--primary)" : "var(--primary-100)", transition: "all .3s ease" }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/about-us/physicians" className="bykm-outline-btn">
            {t("homePhysicians.viewAll")} <FaArrowRight size={12} />
          </Link>
        </div>
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            style={{ position: "absolute", top: 24, right: 24, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.12)", color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .25s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.25)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
          >
            <FaTimes size={18} />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.name}
            style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 8, boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}
          />
        </div>
      )}
    </section>
  );
}