"use client";

import { useCart } from "@/app/context/CartContext";
import { findProductByName } from "@/app/data/products";
import { WHATSAPP_NUMBER } from "@/app/config/storeConfig";

function formatPrice(value: number) {
  return value.toLocaleString("en-US");
}

export default function CartPageClient() {
  const { items, removeOne, clearCart, addToCart } = useCart();

  const total = items.length;

  const grouped = items.reduce((acc: Record<string, number>, item) => {
    acc[item.name] = (acc[item.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const entries = Object.entries(grouped);

  const grandTotal = entries.reduce((sum, [name, count]) => {
    const info = findProductByName(name);
    const unitPrice = info?.price ?? 0;
    return sum + unitPrice * count;
  }, 0);

  const handleWhatsAppOrder = () => {
    if (total === 0) return;

    let message = "طلب جديد من موقع آياصوفيا للأثاث:\n\n";

    entries.forEach(([name, count]) => {
      const info = findProductByName(name);
      const unitPrice = info?.price ?? 0;
      if (unitPrice > 0) {
        const lineTotal = unitPrice * count;
        message += `- ${name} × ${count} (المجموع: ${formatPrice(
          lineTotal
        )} دينار)\n`;
      } else {
        message += `- ${name} × ${count}\n`;
      }
    });

    if (grandTotal > 0) {
      message += `\nالمجموع التقديري: ${formatPrice(
        grandTotal
      )} دينار عراقي\n`;
    }

    message += "\nالرجاء الرد لتأكيد الأسعار والتوصيل. شكراً لكم 🌟";

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.location.href = url;
  };

  if (total === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
        <p className="text-lg font-semibold text-gray-800">🛒 السلة فارغة</p>
        <p className="mt-2 text-sm text-gray-600">
          لم تقم بإضافة أي منتجات بعد.
        </p>
        <a
          href="/products"
          className="mt-4 inline-block rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-800"
        >
          تصفّح المنتجات
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-800">
            إجمالي العناصر في السلة:{" "}
            <span className="font-bold text-amber-800">{total}</span>
          </p>
          <p className="mt-1 text-xs text-gray-600">
            المجموع التقديري:{" "}
            <span className="font-semibold text-amber-800">
              {formatPrice(grandTotal)} د.ع
            </span>
          </p>
          <p className="mt-1 text-[11px] text-gray-500">
            الأسعار هنا كنموذج فقط، ويمكن تعديلها لاحقاً حسب قائمة الأسعار
            الحقيقية.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="mt-2 rounded-full border border-red-500 px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 md:mt-0"
        >
          مسح السلة بالكامل
        </button>
      </div>

      {/* Items */}
      <div className="grid gap-3 md:grid-cols-2">
        {entries.map(([name, count]) => {
          const info = findProductByName(name);
          const unitPrice = info?.price ?? 0;
          const lineTotal = unitPrice * count;

          return (
            <div
              key={name}
              className="flex flex-col justify-between rounded-2xl bg-white p-4 shadow-sm"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">{name}</p>
                <p className="mt-1 text-xs text-gray-600">
                  الكمية:{" "}
                  <span className="font-semibold text-amber-800">
                    {count}
                  </span>
                </p>
                {unitPrice > 0 && (
                  <p className="mt-1 text-xs text-gray-600">
                    سعر القطعة:{" "}
                    <span className="font-semibold text-amber-800">
                      {formatPrice(unitPrice)} د.ع
                    </span>
                    <br />
                    المجموع:{" "}
                    <span className="font-semibold text-amber-800">
                      {formatPrice(lineTotal)} د.ع
                    </span>
                  </p>
                )}
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => removeOne(name)}
                  className="rounded-full border border-amber-500 px-3 py-1 text-[11px] font-semibold text-amber-700 hover:bg-amber-50"
                >
                  − إزالة قطعة واحدة
                </button>
                <button
                  onClick={() => {
                    if (!info) return;
                    addToCart({ name, price: info.price });
                  }}
                  className="rounded-full bg-amber-600 px-3 py-1 text-[11px] font-semibold text-white hover:bg-amber-700"
                >
                  + إضافة قطعة
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* WhatsApp order */}
      <div className="pt-2">
        <button
          onClick={handleWhatsAppOrder}
          className="w-full rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 md:w-auto"
        >
          إرسال الطلب عبر الواتساب
        </button>

        <p className="mt-2 text-[11px] text-gray-500">
          عند الضغط على الزر سيتم فتح واتساب مع رسالة جاهزة تحتوي على تفاصيل
          الطلب (المنتجات + الكميات + المجموع التقديري)، ويمكن تعديلها قبل
          الإرسال.
        </p>
      </div>
    </div>
  );
}
