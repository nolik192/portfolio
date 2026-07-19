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

export const metadata: Metadata = {
  title: "Yury Bortsov",
  description: "Junior Software Engineer — backend, self-hosted infra, AI/automation.",
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
