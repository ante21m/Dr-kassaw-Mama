import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Dr. Kassaw Mama Primary Hospital — Quality Healthcare in Woldia",
  description:
    "Dr. Kassaw Mama Primary Hospital provides quality healthcare services in Woldia, Ethiopia. Expert doctors, modern diagnostics, 24/7 emergency care, and patient-centered treatment.",
  openGraph: {
    title: "Dr. Kassaw Mama Primary Hospital — Quality Healthcare in Woldia",
    description:
      "Dr. Kassaw Mama Primary Hospital provides quality healthcare services in Woldia, Ethiopia. Expert doctors, modern diagnostics, 24/7 emergency care, and patient-centered treatment.",
  },
};

export default function Page() {
  return <HomeClient />;
}
