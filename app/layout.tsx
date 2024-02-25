import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LinkToHomePage from "@/components/ui/link-to-homepage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MandalAi",
  description: "Relax and enjoy the MandalAi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <LinkToHomePage />
      </body>
    </html>
  );
}
