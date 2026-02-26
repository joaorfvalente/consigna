import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MainNav } from "@/components/MainNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Consignação IRS | Encontre a sua instituição",
  description: "Pesquise e escolha uma instituição elegível para consignar 1% do seu IRS em Portugal",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Consigna IRS",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover" as const,
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainNav />
        {children}
      </body>
    </html>
  );
}
