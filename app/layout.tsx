import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Glow Compass",
  description: "障害福祉×ITの仕事を横断して探せるまとめサイト",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-background text-text antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
