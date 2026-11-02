import type { Metadata, Viewport } from "next";
import "./globals.css";

// The design references these families by name (e.g. "'Pixelify Sans'"), so they
// are loaded as a plain stylesheet rather than via next/font's hashed families.
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap";

export const metadata: Metadata = {
  title: "David Zhao — Pixel Portfolio",
  description:
    "An interactive pixel-art workspace overlooking the Toronto skyline. Click the laptop to explore.",
};

export const viewport: Viewport = {
  themeColor: "#241b36",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS_HREF} />
      </head>
      <body className="bg-background-dark antialiased">{children}</body>
    </html>
  );
}
