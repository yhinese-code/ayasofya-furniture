import Link from "next/link";
import Image from "next/image";
import AddToCartClient from "@/app/components/AddToCartClient";
import { findProductBySlug } from "@/app/data/products";
import { WHATSAPP_NUMBER } from "@/app/config/storeConfig";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;

  const product = findProductBySlug(slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 text-gray-900">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <p className="mb-4 text-sm text-gray-600">المنتج غير موجود.</p>
          <Link
            href="/products"
            className="text-sm font-semibold text-amber-700 hover:underline"
          >
            الرجوع إلى جميع المنتجات
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold">{product.name}</h1>
          <Link
            href="/products"
            className="text-xs font-medium text-amber-700 hover:underline"
          >
            جميع المنتجات
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Product image */}
          <div className="relative h-64 overflow-hidden rounded-2xl bg-gray-200 md:h-80">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product info */}
          <div className="space-y-4">
            <p className="text-[13px] font-semibold text-amber-700">
              {product.type}
            </p>

            <h2 className="text-2xl font-bold">{product.name}</h2>

            <p className="text-sm text-gray-700">
              {product.shortDescription}
            </p>

            <p className="text-xs text-gray-500">{product.details}</p>

            {/* Highlighted action area */}
            <div className="mt-2 space-y-3 rounded-2xl bg-amber-50 p-4">
              <p className="text-lg font-bold text-amber-800">
                {product.price.toLocaleString("en-US")}{" "}
                <span className="text-sm font-normal text-gray-700">
                  دينار عراقي
                </span>
              </p>

              <AddToCartClient productName={product.name} />

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `مرحباً، أريد الاستفسار عن المنتج: ${product.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-800"
                >
                  اطلب عبر الواتساب
                </a>

                <Link
                  href="/products"
                  className="text-sm font-medium text-amber-800 underline-offset-4 hover:underline"
                >
                  الرجوع إلى قائمة المنتجات
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          لاحقاً سنضيف صور حقيقية، أبعاد المنتج، خيارات الألوان، وخدمات مثل
          التوصيل والتركيب.
        </p>
      </section>
    </main>
  );
}
