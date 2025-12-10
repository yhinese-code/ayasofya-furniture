import Link from "next/link";
import CartBadgeClient from "@/app/components/CartBadgeClient";
import { getAllProducts } from "@/app/data/products";
import { WHATSAPP_NUMBER } from "@/app/config/storeConfig";

const products = getAllProducts();

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold">جميع منتجات آياصوفيا (نموذج)</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-medium text-amber-700 hover:underline"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
            <Link href="/cart">
              <CartBadgeClient />
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <p className="mb-4 text-sm text-gray-600">
          هذه الصفحة مجرّد نموذج. لاحقاً سنربطها بقاعدة بيانات ونضيف تصفية حسب
          القسم والسعر.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.slug}
              className="flex flex-col rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Clickable area that goes to product detail */}
              <Link
                href={`/products/${product.slug}`}
                className="flex-1 space-y-3 block"
              >
                <div className="mb-3 h-32 rounded-xl bg-gray-200" />
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-amber-700">
                    {product.type}
                  </p>
                  <h2 className="text-sm font-semibold">{product.name}</h2>
                  <p className="text-xs text-gray-600">
                    {product.shortDescription}
                  </p>
                </div>
              </Link>

              {/* Price + WhatsApp */}
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-bold text-amber-800">
                  {product.price.toLocaleString("en-US")}{" "}
                  <span className="text-[11px] font-normal">دينار</span>
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `مرحباً، أريد الاستفسار عن: ${product.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-amber-700 px-3 py-1 text-[11px] font-semibold text-white hover:bg-amber-800"
                >
                  اطلب استفسار
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
