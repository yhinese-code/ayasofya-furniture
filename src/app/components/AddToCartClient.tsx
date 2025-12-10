"use client";

import { useCart } from "@/app/context/CartContext";
import { findProductByName } from "@/app/data/products";

type AddToCartProps = {
  productName: string;
};

export default function AddToCartClient({ productName }: AddToCartProps) {
  const { items, addToCart, removeOne } = useCart();

  const thisProductCount = items.filter(
    (item) => item.name === productName
  ).length;

  const totalCount = items.length;

  const handleAdd = () => {
    const info = findProductByName(productName);
    if (!info) return;
    addToCart({ name: productName, price: info.price });
  };

  const handleRemove = () => {
    if (thisProductCount === 0) return;
    removeOne(productName);
  };

  return (
    <div className="mt-4 space-y-2">
      <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2">
        <button
          onClick={handleRemove}
          disabled={thisProductCount === 0}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-400 text-sm font-bold text-amber-700 disabled:opacity-40"
        >
          −
        </button>

        <span className="min-w-[2rem] text-center text-sm font-semibold text-amber-900">
          {thisProductCount}
        </span>

        <button
          onClick={handleAdd}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white hover:bg-amber-700"
        >
          +
        </button>
      </div>

      <p className="text-xs text-gray-600">
        عدد القطع من هذا المنتج في السلة:{" "}
        <span className="font-semibold text-amber-800">
          {thisProductCount}
        </span>
      </p>

      <p className="text-[11px] text-gray-500">
        إجمالي عدد العناصر في السلة:{" "}
        <span className="font-semibold text-amber-800">{totalCount}</span>
      </p>
    </div>
  );
}
