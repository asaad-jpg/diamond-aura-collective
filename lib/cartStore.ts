"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import type { CartItem, Size } from "@/lib/cartTypes";

const CART_KEY = "dac_cart_v1";
const CART_EVENT = "dac-cart-updated";

function safeParse(json: string | null): CartItem[] {
  if (!json) return [];
  try {
    const v = JSON.parse(json);
    if (!Array.isArray(v)) return [];
    // minimal validation
    return v
      .map((x) => ({
        id: String(x?.id ?? ""),
        size: x?.size as Size,
        qty: Number(x?.qty ?? 0),
      }))
      .filter((x) => x.id && x.qty > 0);
  } catch {
    return [];
  }
}

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(CART_KEY));
}

function writeCart(next: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(CART_EVENT));
}

function sameCart(a: CartItem[], b: CartItem[]) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id) return false;
    if (a[i].size !== b[i].size) return false;
    if (a[i].qty !== b[i].qty) return false;
  }
  return true;
}

export function useCart(products: Product[]) {
  const [cart, setCart] = useState<CartItem[]>(() => readCart());
  const cartRef = useRef<CartItem[]>(cart);
  cartRef.current = cart;

  // Listen once, update only when changed (prevents loops)
  useEffect(() => {
    const sync = () => {
      const next = readCart();
      if (!sameCart(cartRef.current, next)) setCart(next);
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_KEY) sync();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(CART_EVENT, sync);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CART_EVENT, sync);
    };
  }, []);

  const byId = useMemo(() => {
    const m = new Map<string, Product>();
    for (const p of products) m.set(p.id, p);
    return m;
  }, [products]);

  const lines = useMemo(() => {
    return cart
      .map((ci) => {
        const p = byId.get(ci.id);
        if (!p) return null;
        const lineTotalTRY = Math.round((p.priceTRY || 0) * ci.qty);
        return { product: p, qty: ci.qty, size: ci.size, lineTotalTRY };
      })
      .filter(Boolean) as { product: Product; qty: number; size: Size; lineTotalTRY: number }[];
  }, [cart, byId]);

  const subtotalTRY = useMemo(() => {
    return lines.reduce((sum, l) => sum + l.lineTotalTRY, 0);
  }, [lines]);

  const add = (id: string, size: Size, qty = 1) => {
    const next = [...readCart()];
    const idx = next.findIndex((x) => x.id === id && x.size === size);
    if (idx >= 0) next[idx] = { ...next[idx], qty: next[idx].qty + qty };
    else next.push({ id, size, qty });
    writeCart(next);
    setCart(next);
  };

  const remove = (id: string, size: Size) => {
    const next = readCart().filter((x) => !(x.id === id && x.size === size));
    writeCart(next);
    setCart(next);
  };

  const setQty = (id: string, size: Size, qty: number) => {
    const q = Math.max(1, Math.floor(qty));
    const next = [...readCart()];
    const idx = next.findIndex((x) => x.id === id && x.size === size);
    if (idx < 0) return;
    next[idx] = { ...next[idx], qty: q };
    writeCart(next);
    setCart(next);
  };

  const setSize = (id: string, from: Size, to: Size) => {
    if (from === to) return;
    const next = [...readCart()];
    const fromIdx = next.findIndex((x) => x.id === id && x.size === from);
    if (fromIdx < 0) return;

    const fromItem = next[fromIdx];
    next.splice(fromIdx, 1);

    const toIdx = next.findIndex((x) => x.id === id && x.size === to);
    if (toIdx >= 0) next[toIdx] = { ...next[toIdx], qty: next[toIdx].qty + fromItem.qty };
    else next.push({ id, size: to, qty: fromItem.qty });

    writeCart(next);
    setCart(next);
  };

  const clear = () => {
    writeCart([]);
    setCart([]);
  };

  return { cart, lines, subtotalTRY, add, remove, setQty, setSize, clear };
}
