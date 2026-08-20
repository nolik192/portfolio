import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { profile } from "@/lib/data/profile";
import { contactLinks } from "@/lib/data/contact";
import { SITE_URL, jsonLdScript } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-archivo",
});

const DESCRIPTION = "Junior Software Engineer — backend, self-hosted infra, AI/automation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yury Bortsov",
    template: "%s — Yury Bortsov",
  },
  description: DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
  },
  sameAs: contactLinks.filter((link) => link.external).map((link) => link.href),
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="bg-background text-foreground font-sans min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd) }}
        />
        <MotionProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
