import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Dr. Kassaw Mamma Primary Hospital in Woldia, Ethiopia. Find our address, phone, email, hours, and directions.",
  openGraph: {
    title: "Contact Us | Dr. Kassaw Mamma Primary Hospital",
    description:
      "Get in touch with Dr. Kassaw Mamma Primary Hospital in Woldia, Ethiopia. Find our address, phone, email, hours, and directions.",
  },
};

export default function Page() {
  return <ContactClient />;
}
