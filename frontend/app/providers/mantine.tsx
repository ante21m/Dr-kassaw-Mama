"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

const theme = createTheme({
  primaryColor: "medhin",
  colors: {
    medhin: [
      "#EEF6F4",
      "#D3E9E4",
      "#A6D3C8",
      "#78BCAC",
      "#4AA690",
      "#227E6B",
      "#0B4A5D",
      "#0A3D4C",
      "#063A34",
      "#042925",
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
