"use client";

import { FaPhone } from "react-icons/fa";

export default function TopBar() {
  return (
    <div style={{ background: "#0d0bc7" }}>
      <div className="m-container" style={{ padding: "9px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <a href="tel:0973245788" style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.78rem", color: "var(--on-deep-soft)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
            <FaPhone size={10} style={{ color: "#F2B61D" }} /> 0973 245 788
          </a>
          <a href="tel:0921316666" style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.78rem", color: "var(--on-deep-soft)", textDecoration: "none", fontFamily: "var(--font-mono)" }}>
            <FaPhone size={10} style={{ color: "#F2B61D" }} /> 0921 316 666
          </a>
        </div>
        <div style={{ fontSize: "0.76rem", color: "var(--on-deep-soft)", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F2B61D" }} />
          24/7 Emergency Care
        </div>
      </div>
    </div>
  );
}
