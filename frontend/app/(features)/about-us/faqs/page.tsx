import type { Metadata } from "next";
import FaqsClient from "./faqs-client";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about Dr. Kassaw Mama Primary Hospital in Woldia, Ethiopia.",
};

export default function Page() {
  return <FaqsClient />;
}
