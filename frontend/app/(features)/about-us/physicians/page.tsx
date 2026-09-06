import type { Metadata } from "next";
import PhysiciansClient from "./physicians-client";

export const metadata: Metadata = {
  title: "Our Physicians",
  description:
    "Meet our team of experienced physicians at Dr. Kassaw Mamma Primary Hospital. Specialists in cardiology, neurology, orthopedics, pediatrics, and more.",
  openGraph: {
    title: "Our Physicians | Dr. Kassaw Mamma Primary Hospital",
    description:
      "Meet our team of experienced physicians at Dr. Kassaw Mamma Primary Hospital. Specialists in cardiology, neurology, orthopedics, pediatrics, and more.",
  },
};

export default function Page() {
  return <PhysiciansClient />;
}
