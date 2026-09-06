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
      "#0d0bc7",
      "#0d0bc7",
      "#0B09B5",
      "#070690",
      "#070690",
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
