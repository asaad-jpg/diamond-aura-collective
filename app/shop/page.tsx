"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

import { formatPrice } from "@/lib/currency";
import { useStoreData } from "@/lib/useStoreData";

export default function ShopPage() {
  const { state } = useStoreData();
  const items = useMemo(
    () => state.products.filter((p) => p.category === "Hoodies"),
    [state.products]
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-white">Shop</h1>
        <p className="mt-2 text-white/70">All hoodies from Diamond Aura Collective</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
          No hoodies available yet. Check back soon!
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="group rounded-3xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <Image
                  src={p.images?.[0] || "/favicon.ico"}
                  alt={p.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
                {p.badges && p.badges.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {p.badges.slice(0, 2).map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-black"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <div className="text-xs tracking-widest text-white/60">DIAMOND AURA</div>
                <h3 className="mt-1 text-sm font-medium text-white line-clamp-2">{p.name}</h3>

                <div className="mt-3 flex items-baseline gap-2">
                  <div className="text-base font-semibold text-white">
                    {formatPrice(p.priceTRY)}
                  </div>

                  {p.compareAtTRY && (
                    <div className="text-xs text-white/60 line-through">
                      {formatPrice(p.compareAtTRY)}
                    </div>
                  )}
                </div>

                <div className="mt-4 rounded-xl bg-white/5 px-3 py-2 text-xs text-white/75 group-hover:bg-white/10 transition">
                  View Details →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-xl font-semibold text-white">How to Order</h2>
        <div className="mt-4 space-y-3 text-sm text-white/75">
          <p>📸 Find a hoodie you love above</p>
          <p>📱 Click "Order / Contact" to message us on Instagram</p>
          <p>💬 Tell us: Which hoodie(s), size(s), and color preferences</p>
          <p>💳 We'll confirm availability and payment details via DM</p>
          <p>📦 Shipping worldwide with tracking</p>
        </div>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black hover:opacity-90 transition"
        >
          Order on Instagram →
        </Link>
      </div>
    </main>
  );
}
