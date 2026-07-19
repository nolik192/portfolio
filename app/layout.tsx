import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-archivo",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bortsov.cc";
const DESCRIPTION = "Junior Software Engineer — backend, self-hosted infra, AI/automation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yury Bortsov",
    template: "%s — Yury Bortsov",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "Yury Bortsov",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Yury Bortsov",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yury Bortsov",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="bg-background text-foreground font-sans min-h-screen flex flex-col">
        <MotionProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
