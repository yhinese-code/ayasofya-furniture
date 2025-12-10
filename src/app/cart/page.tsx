"use client";
import Link from "next/link";
import CartPageClient from "@/app/components/CartPageClient";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold">سلة المشتريات</h1>
          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/" className="text-amber-700 hover:underline">
              الصفحة الرئيسية
            </Link>
            <Link href="/products" className="text-amber-700 hover:underline">
              جميع المنتجات
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <CartPageClient />
      </section>
    </main>
  );
}
