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
  title: "JTC | Junior Tech Competition - Lomba Coding Anak SD SMP 2026",
  description:
    "Junior Tech Competition (JTC) adalah lomba coding anak untuk SD dan SMP. Ikuti kompetisi coding seru dengan Scratch, Python, dan App Inventor. Kembangkan logika, kreativitas, dan problem solving putra-putri Anda.",
  keywords: [
    "lomba coding anak",
    "lomba coding",
    "kompetisi coding anak",
    "lomba programming anak",
    "lomba scratch anak",
    "lomba python anak",
    "coding competition for kids",
    "junior tech competition",
    "lomba coding SD",
    "lomba coding SMP",
    "kompetisi coding",
    "anak coding",
    "kursus coding anak",
    "lomba komputer anak"
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
    title: "JTC | Junior Tech Competition - Lomba Coding Anak TK sampai SMP",
    description:
      "Kompetisi coding anak yang seru, edukatif, dan penuh tantangan kreatif untuk TK sampai SMP.",
    type: "website",
    locale: "id_ID",
    siteName: "Junior Tech Competition",
    url: "https://juniortechcompetition.web.id"
  },
  twitter: {
    card: "summary_large_image",
    title: "JTC | Junior Tech Competition - Lomba Coding Anak TK sampai SMP",
    description:
      "Kompetisi coding anak yang seru, edukatif, dan penuh tantangan kreatif untuk TK sampai SMP.",
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
