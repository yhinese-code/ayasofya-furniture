// src/app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { CartProvider } from "@/app/context/CartContext";

export const metadata: Metadata = {
  title: "آياصوفيا للأثاث",
  description: "معرض آياصوفيا للأثاث – غرف نوم، صالات، سفرات",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-50 text-gray-900">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
