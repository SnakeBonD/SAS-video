import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAS Video — SnakeBonD AI Studio",
  description: "Image-to-video creative studio by SnakeBonD.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
