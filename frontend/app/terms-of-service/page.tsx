import Link from "next/link";

export default function TermsOfService() {
  return (
    <main style={{ background: "#F8F9FA", minHeight: "60vh" }}>
      <section style={{ background: "linear-gradient(135deg, #1A1AA0 0%, #15158B 45%, #12127C 100%)", color: "#fff", padding: "72px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", margin: 0, fontSize: "clamp(2rem, 4vw, 3rem)" }}>Terms of Service</h1>
        <p style={{ color: "rgba(255,255,255,0.72)", margin: "14px 0 0" }}>Dr. Kassaw Mamma Primary Hospital</p>
      </section>

      <section style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div>
            <h2 style={{ color: "#10163A", fontSize: "1.3rem", margin: "0 0 10px" }}>Acceptance of Terms</h2>
            <p style={{ color: "#4A5568", lineHeight: 1.8, margin: 0 }}>
              By accessing this website and booking appointments through it, you agree to be bound by these Terms of Service
              and our Privacy Policy. If you do not agree, please do not use our services.
            </p>
          </div>
          <div>
            <h2 style={{ color: "#10163A", fontSize: "1.3rem", margin: "0 0 10px" }}>Appointments & Information</h2>
            <p style={{ color: "#4A5568", lineHeight: 1.8, margin: 0 }}>
              Appointment bookings are subject to availability and confirmation by the hospital. Please provide accurate
              contact information so we can reach you regarding your visit.
            </p>
          </div>
          <div>
            <h2 style={{ color: "#10163A", fontSize: "1.3rem", margin: "0 0 10px" }}>Medical Advice Disclaimer</h2>
            <p style={{ color: "#4A5568", lineHeight: 1.8, margin: 0 }}>
              Content on this website is for informational purposes only and does not replace professional medical advice.
              Always consult a qualified healthcare provider for medical concerns.
            </p>
          </div>
          <div>
            <h2 style={{ color: "#10163A", fontSize: "1.3rem", margin: "0 0 10px" }}>Contact</h2>
            <p style={{ color: "#4A5568", lineHeight: 1.8, margin: 0 }}>
              Questions about these terms may be directed to info@mammahospital.com.
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link href="/" style={{ color: "#15158B", fontWeight: 600, textDecoration: "none" }}>← Back to Home</Link>
        </div>
      </section>
    </main>
  );
}