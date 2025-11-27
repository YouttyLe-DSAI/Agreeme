// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // <-- Import Inter
import "./globals.css";

// Cấu hình font Inter
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgreeMe",
  description: "AI Contract Analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Thêm class inter.className vào body */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}