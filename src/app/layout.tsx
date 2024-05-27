import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Header from "@/ui/header/Header";
import Footer from "@/ui/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HA LONG 2 - РЕСТОРАН ВЬЕТНАМСКОЙ КУХНИ",
  description:
    "HA LONG 2 – это уютный ресторан вьетнамской кухни в Екатеринбурге, где вы можете насладиться традиционными блюдами и атмосферой Вьетнама прямо здесь, в сердце Урала",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
