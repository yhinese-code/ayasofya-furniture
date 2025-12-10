// src/app/context/CartContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  slug: string;
  name: string;
  price?: number;
  image?: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;          // add one
  addToCart: (item: CartItem) => void;        // alias for compatibility
  removeItem: (slug: string) => void;         // remove ONE of that item
  removeOne: (slug: string) => void;          // alias
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "ayasofya-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage on first mount (browser only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (err) {
      console.error("Failed to read cart from localStorage", err);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Failed to write cart to localStorage", err);
    }
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => [...prev, item]);
  };

  // Remove ONE occurrence of an item by slug
  const removeOne = (slug: string) => {
    setItems((prev) => {
      const index = prev.findIndex((it) => it.slug === slug);
      if (index === -1) return prev;
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  const clearCart = () => setItems([]);

  const value: CartContextValue = {
    items,
    addItem,
    addToCart: addItem,   // alias so old code still works
    removeItem: removeOne,
    removeOne,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
