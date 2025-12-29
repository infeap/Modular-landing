import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "@/components/AnalyticsProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Modular - Produktivitetsverktyg för installationsbranschen",
  description: "Modular är en modulär applikation för elektriker och installatörer med dokumentmallar, kabeldimensionering, effektberäkningar och mycket mer. Få early access nu!",
  keywords: ["elektriker", "installation", "kabeldimensionering", "effektberäkning", "dokumentmallar", "modular", "el"],
  authors: [{ name: "Modular Team" }],
  openGraph: {
    title: "Modular - Produktivitetsverktyg för installationsbranschen",
    description: "Modular är en modulär applikation för elektriker och installatörer med dokumentmallar, kabeldimensionering, effektberäkningar och mycket mer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
