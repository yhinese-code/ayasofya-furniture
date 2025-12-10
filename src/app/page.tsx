// src/app/page.tsx

import Link from "next/link";
import CartBadgeClient from "@/app/components/CartBadgeClient";
import { getFeaturedProducts } from "@/app/data/products";
import {
  WHATSAPP_NUMBER,
  STORE_NAME,
  STORE_TAGLINE,
} from "@/app/config/storeConfig";

const featuredProducts = getFeaturedProducts();

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-700 px-2 py-1 text-[11px] font-bold text-white">
              AYASOFYA
            </span>
            <span className="text-sm font-semibold">{STORE_NAME}</span>
          </div>

          {/* Nav */}
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            <Link href="/" className="text-amber-800">
              الرئيسية
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-amber-800"
            >
              جميع المنتجات
            </Link>
            <a
              href="https://www.facebook.com/Ayasofya.fu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-amber-800"
            >
              فيسبوك
            </a>
          </nav>

          {/* Cart badge links to /cart */}
          <Link href="/cart">
            <CartBadgeClient />
          </Link>
        </div>
      </header>

     {/* FULL WIDTH HERO IMAGE (NO BORDERS, NO MARGINS) */}
<section className="w-full">
  <div className="w-full">
    <img
      src="/hero-ayasofya.jpg"
      alt="معرض آياصوفيا للأثاث"
      className="w-full h-auto object-cover"
    />
  </div>
</section>

      {/* HERO TEXT UNDER IMAGE */}
      <section className="mx-auto max-w-7xl space-y-6 px-4 py-14 text-right">
        <p className="text-xs font-semibold text-amber-700">
          آياصوفيا للأثاث – بابل / كربلاء
        </p>

        <h1 className="text-3xl font-bold md:text-4xl">{STORE_TAGLINE}</h1>

        <p className="max-w-3xl text-sm text-gray-600 md:ml-auto">
          هذا الموقع نموذج أولي لعرض غرف نوم، غرف جلوس، سفرات وعروض خاصة من معرض
          آياصوفيا للأثاث. قريباً سيتم ربطه بقاعدة بيانات كاملة ونظام طلبات
          متكامل لخدمة الزبائن بشكل أفضل.
        </p>

        <div className="flex flex-wrap justify-end gap-3">
          <Link
            href="/products"
            className="rounded-full bg-amber-700 px-6 py-2 text-sm font-semibold text-white hover:bg-amber-800"
          >
            عرض جميع المنتجات
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-amber-700 px-6 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-50"
          >
            تواصل عبر الواتساب
          </a>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold">نماذج من المنتجات</h3>
          <p className="text-xs text-gray-500">
            هذه المنتجات مجرّد مثال، لاحقاً سنستبدلها ببيانات حقيقية من المعرض.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <div
              key={product.slug}
              className="flex flex-col rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Clicking the card opens product detail page */}
              <Link
                href={`/products/${product.slug}`}
                className="block flex-1 space-y-3"
              >
                <div className="mb-3 h-32 overflow-hidden rounded-xl bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-amber-700">
                    {product.type}
                  </p>
                  <h4 className="text-sm font-semibold">{product.name}</h4>
                  <p className="text-xs text-gray-600">
                    {product.shortDescription}
                  </p>
                </div>
              </Link>

              {/* Price + WhatsApp button */}
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

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 text-right text-[11px] text-gray-500">
          هذا الموقع تجريبي لآياصوفيا للأثاث، للاستخدام الداخلي والعرض فقط.
        </div>
      </footer>
    </main>
  );
}
