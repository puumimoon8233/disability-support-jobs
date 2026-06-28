import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "障害者支援IT Jobs",
  description: "ITを使って障害者支援に関われる企業・求人を探せるサービスです。",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
