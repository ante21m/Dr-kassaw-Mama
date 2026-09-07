"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

const theme = createTheme({
  primaryColor: "medhin",
  colors: {
    medhin: [
      "#EFF1FD",
      "#DDE1FC",
      "#B4B1FA",
      "#7E7BF5",
      "#3B37E0",
      "#15158B",
      "#15158B",
      "#12127C",
      "#0C0C5E",
      "#0C0C5E",
    ],
  },
  fontFamily: "Inter, system-ui, sans-serif",
  headings: { fontFamily: "var(--font-display), Georgia, serif", fontWeight: "500" },
  defaultRadius: "md",
});

export default function MantineProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
