"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Physician } from "@/app/data/about.config";
import { useLocale } from "@/app/locale-provider";
import { imgVer } from "@/lib/imgver";
import AppointmentModal from "@/app/components/AppointmentModal";
import Lightbox from "@/app/components/ui/Lightbox";
import { ArrowRight } from "lucide-react";
import "@/app/components/smart-home/doctor-card.css";

const initials = (fullName: string) =>
  fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const isRealImage = (u?: string) => !!u && !u.includes("placeholder");

export default function PhysicianCard({ physician }: { physician: Physician }) {
  const { t, locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);

  const name = locale === "am" && physician.name_am ? physician.name_am : physician.name;
  const specialty = locale === "am" && physician.specialty_am ? physician.specialty_am : physician.specialty;
  const hasImg = isRealImage(physician.image);

  return (
    <div className="card">
      {/* IMAGE / AVATAR */}
      <button
        onClick={() => { if (hasImg) setPreview(true); }}
        aria-label={name}
        style={{ display: "block", width: "100%", padding: 0, border: "none", background: "transparent", cursor: hasImg ? "zoom-in" : "default" }}
      >
        <div className="imageSection">
          {hasImg ? (
            <Image
              src={physician.image + imgVer}
              alt={name}
              fill
              sizes="(max-width: 600px) 85vw, (max-width: 1024px) 45vw, 280px"
              className="avatarImg"
            />
          ) : (
            <span className="avatarCircle">
              <span className="initial">{initials(name)}</span>
            </span>
          )}
        </div>
      </button>

      {/* BODY */}
      <div className="infoSection">
        {physician.available !== undefined && (
          <span className={`availChip ${physician.available ? "isAvail" : "isBusy"}`}>
            <span className="dot" />
            {physician.availabilityText}
          </span>
        )}

        {/* NAME */}
        <h3 className="doctorName">{name}</h3>

        {/* TITLE */}
        <p className="specialty">{specialty}</p>

        <Link
          href={`/about-us/physicians/${physician.id}`}
          className="viewProfileBtn"
        >
          {t("leadership.viewProfile")} <span className="arrow"><ArrowRight size={12} /></span>
        </Link>

        <button className="bookBtn" onClick={() => setOpen(true)}>
          {t("nav.book")}
        </button>
      </div>

      {/* MODAL */}
      <AppointmentModal
        open={open}
        onClose={() => setOpen(false)}
        doctor={physician.name}
      />

      {/* IMAGE LIGHTBOX */}
      {hasImg && (
        <Lightbox
          open={preview}
          src={physician.image + imgVer}
          caption={name}
          onClose={() => setPreview(false)}
        />
      )}
    </div>
  );
}