import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jobethic.fr"),
  title: {
    default: "JOB'S ETHIC — Le moteur d'équilibre professionnel",
    template: "%s · JOB'S ETHIC",
  },
  description:
    "On ne cherche plus un job. On trouve la bonne collaboration. JOB'S ETHIC remplace le CV par un profil profond et matche sur la compatibilité réelle entre deux façons de travailler.",
  keywords: [
    "recrutement",
    "freelance",
    "matching",
    "profil profond",
    "IA éthique",
    "France",
    "assistant virtuel",
  ],
  authors: [{ name: "JOB'S ETHIC" }],
  creator: "JOB'S ETHIC",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://jobethic.fr",
    siteName: "JOB'S ETHIC",
    title: "JOB'S ETHIC — Le moteur d'équilibre professionnel",
    description:
      "On ne cherche plus un job. On trouve la bonne collaboration.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JOB'S ETHIC",
    description:
      "On ne cherche plus un job. On trouve la bonne collaboration.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0F0F" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
