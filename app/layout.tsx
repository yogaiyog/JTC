import type { Metadata } from "next";
import { Baloo_2, Manrope } from "next/font/google";
import "./globals.css";

const displayFont = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display"
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "JTC | Junior Tech Competition",
  description:
    "Landing page resmi untuk event lomba coding anak JTC - Junior Tech Competition.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico"
  },
  openGraph: {
    title: "JTC | Junior Tech Competition",
    description:
      "Kompetisi coding anak yang seru, edukatif, dan penuh tantangan kreatif.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
