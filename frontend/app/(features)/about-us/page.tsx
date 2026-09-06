import type { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Dr. Kassaw Mamma Primary Hospital — our history, mission, vision, and commitment to providing quality healthcare in Woldia, Ethiopia.",
  openGraph: {
    title: "About Us | Dr. Kassaw Mamma Primary Hospital",
    description:
      "Learn about Dr. Kassaw Mamma Primary Hospital — our history, mission, vision, and commitment to providing quality healthcare in Woldia, Ethiopia.",
  },
};

export default function Page() {
  return <AboutClient />;
}
