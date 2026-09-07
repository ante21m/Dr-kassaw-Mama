import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main style={{ background: "#F8F9FA", minHeight: "60vh" }}>
      <section style={{ background: "linear-gradient(135deg, #1A1AA0 0%, #15158B 45%, #12127C 100%)", color: "#fff", padding: "72px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", margin: 0, fontSize: "clamp(2rem, 4vw, 3rem)" }}>Privacy Policy</h1>
        <p style={{ color: "rgba(255,255,255,0.72)", margin: "14px 0 0" }}>Dr. Kassaw Mamma Primary Hospital</p>
      </section>

      <section style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div>
            <h2 style={{ color: "#10163A", fontSize: "1.3rem", margin: "0 0 10px" }}>Information We Collect</h2>
            <p style={{ color: "#4A5568", lineHeight: 1.8, margin: 0 }}>
              We collect personal information you provide when booking appointments, contacting us, or using our services,
              including your name, phone number, email address, and medical information relevant to your care.
            </p>
          </div>
          <div>
            <h2 style={{ color: "#10163A", fontSize: "1.3rem", margin: "0 0 10px" }}>How We Use Your Information</h2>
            <p style={{ color: "#4A5568", lineHeight: 1.8, margin: 0 }}>
              Your information is used solely to manage appointments, provide medical services, respond to inquiries,
              and improve our health services. We do not sell or share your personal data with third parties.
            </p>
          </div>
          <div>
            <h2 style={{ color: "#10163A", fontSize: "1.3rem", margin: "0 0 10px" }}>Data Security</h2>
            <p style={{ color: "#4A5568", lineHeight: 1.8, margin: 0 }}>
              We apply appropriate technical and organizational measures to protect your personal data against unauthorized
              access, alteration, disclosure, or destruction.
            </p>
          </div>
          <div>
            <h2 style={{ color: "#10163A", fontSize: "1.3rem", margin: "0 0 10px" }}>Contact</h2>
            <p style={{ color: "#4A5568", lineHeight: 1.8, margin: 0 }}>
              For privacy-related questions or requests, contact us at info@mammahospital.com.
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