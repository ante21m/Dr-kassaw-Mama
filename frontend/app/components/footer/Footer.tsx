"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTelegramPlane, FaYoutube, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useLocale } from "@/app/locale-provider";

function TiktokIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

const socialLinks = [
  { icon: FaFacebookF, href: "https://facebook.com/medhinprimaryhospital", label: "Facebook" },
  { icon: FaTelegramPlane, href: "https://t.me/Dr. Kassaw Mamma_Primary_Hospital", label: "Telegram" },
  { icon: FaYoutube, href: "https://youtube.com/@medhinprimaryhospital", label: "YouTube" },
  { icon: FaTwitter, href: "https://twitter.com/medhinprimaryhospital", label: "Twitter" },
  { icon: TiktokIcon, href: "https://www.tiktok.com/@medhin.hospital", label: "TikTok" },
];

const services = [
  { labelKey: "footer.serviceCardiology", href: "/services/cardiology" },
  { labelKey: "footer.serviceNeurology", href: "/services/neurology" },
  { labelKey: "footer.serviceOrthopedics", href: "/services/orthopedics" },
  { labelKey: "footer.servicePediatrics", href: "/services/pediatrics" },
  { labelKey: "footer.serviceEmergency", href: "/services/emergency" },
  { labelKey: "footer.serviceLaboratory", href: "/services/laboratory" },
];

const quickLinks = [
  { labelKey: "footer.linkAbout", href: "/about-us" },
  { labelKey: "footer.linkPhysicians", href: "/about-us/physicians" },
  { labelKey: "footer.linkDepartments", href: "/departments" },
  { labelKey: "footer.linkNews", href: "/news" },
  { labelKey: "footer.linkGallery", href: "/about-us/gallery" },
  { labelKey: "footer.linkContact", href: "/contact" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const { t } = useLocale();

  return (
    <footer style={{ background: "linear-gradient(180deg, #183588 0%, #15158B 55%, #0C0C5E 100%)", color: "rgba(255,255,255,0.7)", position: "relative", overflow: "hidden" }}>
      {/* Top gold accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(242,182,29,0.45), transparent)" }} />
      {/* Decorative glows */}
      <div style={{ position: "absolute", top: -140, right: -100, width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(242,182,29,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", bottom: -180, left: -100, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />
      {/* Dots grid overlay */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.3, backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />

      {/* Main */}
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "72px 24px 0", position: "relative", zIndex: 1 }}>
        <div className="hgrid footergrid">

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 11, overflow: "hidden", background: "#fff", padding: 3, border: "2px solid rgba(255,255,255,0.3)", boxShadow: "0 3px 12px rgba(0,0,0,0.28)", flexShrink: 0 }}><Image src="/images/km-logo.png" alt="Dr. Kassaw Mamma Logo" width={48} height={48} style={{ borderRadius: 8, objectFit: "contain" }} /></div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 500, color: "#fff", lineHeight: 1.2 }}>Dr. Kassaw Mamma Primary</div>
                <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Hospital</div>
              </div>
            </div>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.7, marginBottom: 20, color: "rgba(255,255,255,0.55)" }}>
              {t("footer.description")}
            </p>

            {/* Social */}
            <div style={{ display: "flex", gap: 10 }}>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.55)", transition: "all 0.22s", textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, #F2B61D, #FFC94D)"; e.currentTarget.style.borderColor = "#FFC94D"; e.currentTarget.style.color = "#0C0C5E"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 18px rgba(242,182,29,0.35)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)"; }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: "0.92rem", fontWeight: 700, color: "#fff", marginBottom: 20, letterSpacing: "0.03em", paddingLeft: 12, borderLeft: "3px solid #F2B61D", lineHeight: 1.25 }}>{t("footer.services")}</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {services.map(s => (
                <li key={s.href}>
                  <Link href={s.href} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.86rem", transition: "color 0.2s, transform 0.2s", display: "flex", alignItems: "center", gap: 6 }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#F2B61D"; e.currentTarget.style.transform = "translateX(3px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.transform = ""; }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#F2B61D", flexShrink: 0 }} />
                    {t(s.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: "0.92rem", fontWeight: 700, color: "#fff", marginBottom: 20, letterSpacing: "0.03em", paddingLeft: 12, borderLeft: "3px solid #F2B61D", lineHeight: 1.25 }}>{t("footer.quickLinks")}</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {quickLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.86rem", transition: "color 0.2s, transform 0.2s", display: "flex", alignItems: "center", gap: 6 }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#F2B61D"; e.currentTarget.style.transform = "translateX(3px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.transform = ""; }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#F2B61D", flexShrink: 0 }} />
                    {t(l.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: "0.92rem", fontWeight: 700, color: "#fff", marginBottom: 20, letterSpacing: "0.03em", paddingLeft: 12, borderLeft: "3px solid #F2B61D", lineHeight: 1.25 }}>{t("footer.findUs")}</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <FaMapMarkerAlt style={{ color: "#F2B61D", marginTop: 3, flexShrink: 0 }} size={14} />
                <span style={{ fontSize: "0.86rem", lineHeight: 1.6, color: "rgba(255,255,255,0.55)" }}>{t("footer.location")}</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <FaPhone style={{ color: "#F2B61D", flexShrink: 0 }} size={14} />
                <span style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.55)" }}>0973 245 788 / 0921 316 666</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <FaEnvelope style={{ color: "#F2B61D", flexShrink: 0 }} size={14} />
                <span style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.55)" }}>info@mammahospital.com</span>
              </div>
            </div>
            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", height: 140 }}>
              <iframe title="Map" src="https://www.google.com/maps?q=11.830075,39.599407&output=embed" loading="lazy" style={{ width: "100%", height: "100%", border: "none" }} />
            </div>
            <a href="https://maps.app.goo.gl/zN7ivPM9C7ZzyuJz7" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: "0.82rem", color: "#F2B61D", fontWeight: 600, textDecoration: "none", transition: "gap 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.gap = "10px"}
              onMouseLeave={e => e.currentTarget.style.gap = "6px"}>
              {t("footer.getDirections")} →
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ marginTop: 48, padding: "20px 0", borderTop: "1px solid rgba(242,182,29,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)" }}>© {new Date().getFullYear()} Dr. Kassaw Mamma Primary Hospital. {t("footer.rights")}</span>
          <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/privacy-policy" style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#F2B61D"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#F2B61D"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
