"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { findProductByName } from "@/app/data/products";

type CartItem = {
  name: string;
  price: number; // د.ع
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeOne: (name: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "ayasofya-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage (handles old data with or without price)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return;

      const safeItems: CartItem[] = parsed
        .map((i: any) => {
          if (!i || typeof i.name !== "string") return null;

          if (typeof i.price === "number") {
            return { name: i.name, price: i.price } as CartItem;
          }

          const info = findProductByName(i.name);
          if (info) {
            return { name: i.name, price: info.price } as CartItem;
          }

          return null;
        })
        .filter((i): i is CartItem => i !== null);

      setItems(safeItems);
    } catch (err) {
      console.error("Failed to load cart from localStorage", err);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Failed to save cart to localStorage", err);
    }
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => [...prev, item]);
  };

  const removeOne = (name: string) => {
    setItems((prev) => {
      const index = prev.findIndex((i) => i.name === name);
      if (index === -1) return prev;
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeOne, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
