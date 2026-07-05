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
  title: "Junior Tech Competition 2026 | Lomba Coding Anak SD & SMP Nasional",
  description:
    "Ikuti Junior Tech Competition (JTC) 2026, kompetisi coding anak tingkat nasional untuk SD & SMP. Uji kemampuan Scratch, Python, dan App Inventor secara online. Daftar sekarang!",
  keywords: [
    "lomba coding anak",
    "kompetisi coding anak",
    "lomba programming anak",
    "lomba scratch sd smp",
    "lomba python anak",
    "junior tech competition",
    "lomba coding sd",
    "lomba coding smp",
    "belajar coding anak sd",
    "coding competition for kids"
  ],
  authors: [{ name: "JTC Team" }],
  creator: "JTC Team",
  publisher: "JTC",
  formatDetection: {
    telephone: false
  },
  alternates: {
    canonical: "https://juniortechcompetition.web.id"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico"
  },
  openGraph: {
    title: "Junior Tech Competition 2026 | Lomba Coding Anak SD & SMP Nasional",
    description:
      "Kompetisi coding online tingkat nasional untuk anak SD hingga SMP. Kembangkan logika, kreativitas, dan portfolio anak lewat Scratch, Python, dan App Inventor.",
    type: "website",
    locale: "id_ID",
    siteName: "Junior Tech Competition",
    url: "https://juniortechcompetition.web.id"
  },
  twitter: {
    card: "summary_large_image",
    title: "Junior Tech Competition 2026 | Lomba Coding Anak SD & SMP Nasional",
    description:
      "Kompetisi coding online tingkat nasional untuk anak SD hingga SMP. Kembangkan logika, kreativitas, dan portfolio anak lewat Scratch, Python, dan App Inventor.",
    creator: "@jtc"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "lUNZKSf5RX5vxFYjPoyfklHZBp-FJDPFicO5S0aD0Xs"
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
