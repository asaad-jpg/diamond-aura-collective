"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import type { Product } from "@/lib/products";

export type CartSize = "S" | "M" | "L" | "XL" | "XXL";

const SIZES: CartSize[] = ["S", "M", "L", "XL", "XXL"];
const IG_PROFILE = "https://www.instagram.com/shopdiamondaura/";

export default function CartDrawer({
  open,
  onClose,
  onRemove,
  onSetQty,
  onSetSize,
  lines,
  subtotalTRY,
}: {
  open: boolean;
  onClose: () => void;

  // handlers from your cart store hook
  onRemove: (id: string, size: CartSize) => void;
  onSetQty: (id: string, size: CartSize, qty: number) => void;
  onSetSize: (id: string, from: CartSize, to: CartSize) => void;

  // data
  lines: { product: Product; qty: number; size: CartSize; lineTotalTRY: number }[];
  subtotalTRY: number;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.button
            aria-label="Close cart overlay"
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-black/85 backdrop-blur"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="text-sm font-semibold text-white">Cart</div>
                <button
                  onClick={onClose}
                  className="rounded-xl border border-white/15 bg-white/5 p-2 text-white/85 hover:bg-white/10"
                  aria-label="Close cart"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-auto px-5 py-4">
                {lines.length === 0 ? (
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
                    Your cart is empty.
                    <div className="mt-2 text-xs text-white/55">Add a hoodie from the shop.</div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {lines.map((l) => (
                      <div
                        key={`${l.product.id}__${l.size}`}
                        className="rounded-3xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex gap-3">
                          <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                            <Image
                              src={l.product.images?.[0] || "/favicon.ico"}
                              alt={l.product.name || "Product image"}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium text-white">{l.product.name}</div>
                            <div className="mt-1 text-xs text-white/60">ID: {l.product.id}</div>

                            <div className="mt-3 flex items-center gap-2">
                              <div className="text-xs text-white/60">Size</div>
                              <select
                                value={l.size}
                                onChange={(e) =>
                                  onSetSize(l.product.id, l.size, e.target.value as CartSize)
                                }
                                className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white outline-none"
                              >
                                {SIZES.map((s) => (
                                  <option key={s} value={s} className="bg-black">
                                    {s}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <button
                            onClick={() => onRemove(l.product.id, l.size)}
                            className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          {/* Qty */}
                          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 p-1">
                            <button
                              onClick={() => onSetQty(l.product.id, l.size, Math.max(1, l.qty - 1))}
                              className="rounded-xl p-2 text-white/80 hover:bg-white/10"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <div className="w-8 text-center text-sm text-white">{l.qty}</div>
                            <button
                              onClick={() => onSetQty(l.product.id, l.size, l.qty + 1)}
                              className="rounded-xl p-2 text-white/80 hover:bg-white/10"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Line Total */}
                          <div className="text-sm font-semibold text-white">
                            ₺{l.lineTotalTRY.toFixed(0)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 px-5 py-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-white/70">Subtotal</div>
                  <div className="font-semibold text-white">₺{subtotalTRY.toFixed(0)}</div>
                </div>

                <div className="mt-3 grid gap-2">
                  <a
                    href={IG_PROFILE}
                    target="_blank"
                    rel="noreferrer"
                    className={[
                      "rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black text-center hover:opacity-90",
                      lines.length === 0 ? "pointer-events-none opacity-50" : "",
                    ].join(" ")}
                  >
                    Checkout on Instagram
                  </a>

                  <button
                    onClick={onClose}
                    className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/5"
                  >
                    Continue shopping
                  </button>
                </div>

                <div className="mt-3 text-xs text-white/55">
                  Cart saves on the customer’s device. Final order is confirmed on Instagram.
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
