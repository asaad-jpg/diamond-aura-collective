"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

import { formatPrice } from "@/lib/currency";
import { useStoreData } from "@/lib/useStoreData";

export default function Home() {
  const { state } = useStoreData();
  const items = state.products.filter((p) => p.category === "Hoodies");
  const featured = useMemo(() => items.slice(0, 4), [items]);

  return (
    <main className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="pt-14 pb-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10">
          <p className="text-xs tracking-[0.35em] text-white/70">
            LUXURY STREETWEAR • HOODIES ONLY
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Diamond Aura <span className="text-white/70">Collective</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/75">
            Limited hoodie drops built for clean fits. Minimal, premium, and always in stock for a short time.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black hover:opacity-90"
            >
              Shop Hoodies
            </Link>
            <Link
              href="/contact"
              className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/5"
            >
              Order / Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="pb-14">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">New Hoodies</h2>
            <p className="text-sm text-white/70">Featured picks from the current drop.</p>
          </div>
        </div>

        {featured.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            No hoodies yet. Add products in <span className="text-white">/dev</span>.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="rounded-3xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                  <Image
                    src={p.images?.[0] || "/favicon.ico"}
                    alt={p.name || "Product image"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="mt-3">
                  <div className="text-xs tracking-widest text-white/60">DIAMOND AURA</div>
                  <div className="mt-1 text-sm font-medium text-white">{p.name}</div>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="text-sm font-semibold text-white">
                      {formatPrice(p.priceTRY)}
                    </div>

                    {p.compareAtTRY && (
                      <div className="text-xs text-white/60 line-through">
                        {formatPrice(p.compareAtTRY)}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link
            href="/shop"
            className="inline-flex rounded-2xl border border-white/15 px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/5"
          >
            View all hoodies →
          </Link>
        </div>
      </section>
    </main>
  );
}
