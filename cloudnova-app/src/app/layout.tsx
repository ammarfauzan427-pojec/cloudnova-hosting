import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cloudnova.id"),
  title: "CloudNova Hosting — Solusi Web Hosting Cepat & Andal",
  description: "CloudNova Hosting menyediakan layanan shared hosting cepat, aman, dan terjangkau untuk website pribadi, blog, dan bisnis Anda.",
  keywords: ["CloudNova Hosting", "shared hosting", "web hosting murah", "hosting indonesia", "cpanel"],
  authors: [{ name: "CloudNova Hosting" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "CloudNova Hosting — Premium Web Hosting",
    description: "Solusi web hosting untuk membantu website Anda berjalan optimal.",
    url: "https://cloudnova.id",
    siteName: "CloudNova Hosting",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`scroll-smooth ${inter.variable}`}>
      <body className="bg-[#080D1B] text-[#F8FAFC] font-sans antialiased selection:bg-[#3478F6] selection:text-white">
        {children}
      </body>
    </html>
  );
}
