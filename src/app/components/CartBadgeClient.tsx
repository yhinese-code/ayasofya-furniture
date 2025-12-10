"use client";

import { useCart } from "@/app/context/CartContext";

export default function CartBadgeClient() {
  const { items } = useCart();
  const count = items.length;

  return (
    <div
      className="relative cursor-pointer transition-transform hover:scale-105"
      aria-label="سلة المشتريات"
    >
      {/* Cart icon */}
      <div className="flex items-center justify-center rounded-full border border-amber-600 px-3 py-2 text-amber-800 hover:bg-amber-50">
        🛒
      </div>

      {/* Count badge */}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white">
          {count}
        </span>
      )}
    </div>
  );
}
