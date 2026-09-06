import type { Metadata } from "next";
import ServicesClient from "./services-client";

export const metadata: Metadata = {
  title: "Our Medical Services",
  description:
    "Explore the full range of medical services at Dr. Kassaw Mamma Primary Hospital — emergency care, laboratory, imaging, surgery, and more.",
  openGraph: {
    title: "Our Medical Services | Dr. Kassaw Mamma Primary Hospital",
    description:
      "Explore the full range of medical services at Dr. Kassaw Mamma Primary Hospital — emergency care, laboratory, imaging, surgery, and more.",
  },
};

export default function Page() {
  return <ServicesClient />;
}
