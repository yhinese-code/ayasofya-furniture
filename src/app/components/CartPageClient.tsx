// src/app/components/CartPageClient.tsx
"use client";

import { useCart } from "@/app/context/CartContext";
import type { CartItem } from "@/app/context/CartContext";
import { WHATSAPP_NUMBER, STORE_NAME } from "@/app/config/storeConfig";

type GroupedItem = {
  item: CartItem;
  count: number;
};

export default function CartPageClient() {
  const { items, addItem, removeItem, clearCart } = useCart();

  const totalItems = items.length;

  // Group by slug so we keep item info + count
  const groupedMap = items.reduce<Record<string, GroupedItem>>(
    (acc, item) => {
      const key = item.slug;
      if (!acc[key]) {
        acc[key] = { item, count: 0 };
      }
      acc[key].count += 1;
      return acc;
    },
    {}
  );

  const groupedItems = Object.values(groupedMap);

  const handleWhatsAppOrder = () => {
    if (totalItems === 0) return;

    let message =
      `طلب جديد من موقع ${STORE_NAME} 🛋️\n\n` +
      "تفاصيل السلة:\n";

    groupedItems.forEach(({ item, count }) => {
      message += `• ${item.name}  × ${count}\n`;
    });

    message += `\nعدد القطع الكلي: ${totalItems}\n`;

    message +=
      "\nالرجاء تزويدنا بالمعلومات التالية:\n" +
      "• الاسم الثلاثي:\n" +
      "• رقم الهاتف:\n" +
      "• المحافظة / المدينة / المنطقة:\n" +
      "• أفضل وقت للتواصل:\n";

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="mx-auto max-w-4xl py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-right text-xl font-semibold">
          السلة (نموذج طلب عبر الواتساب)
        </h1>

        {totalItems > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="rounded-full border border-red-500 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
          >
            تفريغ السلة
          </button>
        )}
      </div>

      {totalItems === 0 ? (
        <div className="rounded-2xl bg-white p-6 text-right shadow-sm">
          <p className="text-sm text-gray-600">
            السلة فارغة حالياً. أضف بعض المنتجات من الصفحة الرئيسية أو من صفحة
            جميع المنتجات.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Items summary with controls */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-right text-sm font-semibold">
                المنتجات في السلة
              </h2>
              <p className="text-xs text-gray-500">
                عدد القطع: <span className="font-semibold">{totalItems}</span>
              </p>
            </div>

            <ul className="space-y-2 text-right text-sm">
              {groupedItems.map(({ item, count }) => (
                <li
                  key={item.slug}
                  className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2"
                >
                  <span className="text-gray-800">{item.name}</span>

                  <div className="flex items-center gap-2">
                    {/* decrease one */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.slug)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100"
                    >
                      −
                    </button>

                    <span className="min-w-[48px] text-center text-xs font-semibold text-amber-800">
                      × {count}
                    </span>

                    {/* add one */}
                    <button
                      type="button"
                      onClick={() => addItem(item)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-right text-xs text-gray-500">
              يمكن تعديل الكمية باستخدام الأزرار (+) و (−)، أو تفريغ السلة
              بالكامل باستخدام زر &quot;تفريغ السلة&quot; في الأعلى.
            </p>
          </div>

          {/* WhatsApp action box */}
          <div className="rounded-2xl bg-amber-50 p-6 text-right shadow-sm">
            <h2 className="mb-2 text-sm font-semibold text-amber-800">
              إرسال الطلب عبر الواتساب
            </h2>
            <p className="mb-4 text-xs text-gray-700">
              عند الضغط على الزر بالأسفل، سيتم فتح الواتساب مع رسالة تحتوي على
              تفاصيل السلة. يمكنك تعديل الرسالة قبل الإرسال، ثم إضافة اسمك
              ومعلومات العنوان.
            </p>

            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-800"
            >
              إرسال الطلب عبر الواتساب
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
