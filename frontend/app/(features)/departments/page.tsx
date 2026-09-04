import type { Metadata } from "next";
import DepartmentsClient from "./departments-client";

export const metadata: Metadata = {
  title: "Our Departments",
  description:
    "Explore our specialized medical departments at Dr. Kassaw Mama Primary Hospital — Cardiology, Neurology, Orthopedics, Pediatrics, and more.",
  openGraph: {
    title: "Our Departments | Dr. Kassaw Mama Primary Hospital",
    description:
      "Explore our specialized medical departments at Dr. Kassaw Mama Primary Hospital — Cardiology, Neurology, Orthopedics, Pediatrics, and more.",
  },
};

export default function Page() {
  return <DepartmentsClient />;
}
