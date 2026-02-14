"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { formatPrice } from "@/lib/currency";
import type { Size } from "@/lib/cartTypes";
import { useCart } from "@/lib/cartStore";
import { useStoreData } from "@/lib/useStoreData";

const SIZES: Size[] = ["S", "M", "L", "XL", "XXL"];
const IG_PROFILE = "https://www.instagram.com/shopdiamondaura/";

function safeId(v: unknown): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v) && typeof v[0] === "string") return v[0];
  return "";
}

export default function ProductPage() {
  const params = useParams();
  const id = safeId((params as Record<string, unknown>)?.id);

  const { state: storeState } = useStoreData();
  const items = storeState.products;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [size, setSize] = useState<Size>("M");

  // IMPORTANT: use the same products array the page uses (so ids match)
  const cart = useCart(items);

  const product = useMemo(() => items.find((p) => p.id === id), [items, id]);

  useEffect(() => {
    setActiveIndex(0);
    setSize("M");
  }, [id]);

  const images = useMemo(() => (product?.images?.length ? product.images : []), [product]);
  const mainImg = images.length ? images[Math.min(activeIndex, images.length - 1)] : null;

  const next = () => {
    if (!images.length) return;
    setActiveIndex((i) => (i + 1) % images.length);
  };

  const prev = () => {
    if (!images.length) return;
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  };

  const addToCart = () => {
    if (!product) return;
    cart.add(product.id, size, 1);
  };

  const openCart = () => {
    window.dispatchEvent(new Event("open-cart"));
  };

  if (!id) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <Link href="/shop" className="text-sm opacity-70 hover:opacity-100">
          ← Back to shop
        </Link>
        <h1 className="mt-6 text-2xl font-semibold">Invalid product link</h1>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <Link href="/shop" className="text-sm opacity-70 hover:opacity-100">
          ← Back to shop
        </Link>
        <h1 className="mt-6 text-2xl font-semibold">Product not found</h1>
        <p className="mt-2 text-sm text-white/70">ID: {id}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/shop" className="text-sm opacity-70 hover:opacity-100">
        ← Back to shop
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Carousel */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/30">
            {mainImg ? (
              <>
                <Image
                  src={mainImg}
                  alt={product.name || "Product image"}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />

                {images.length > 1 && (
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-white/90 hover:bg-black/60"
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                )}

                {images.length > 1 && (
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-white/90 hover:bg-black/60"
                    aria-label="Next image"
                  >
                    →
                  </button>
                )}

                {images.length > 1 && (
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={[
                          "h-2 w-2 rounded-full border border-white/40",
                          i === activeIndex ? "bg-white" : "bg-white/20",
                        ].join(" ")}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
                No images found for this hoodie.
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {images.map((src, i) => {
                const active = i === activeIndex;
                return (
                  <button
                    key={src + i}
                    onClick={() => setActiveIndex(i)}
                    className={[
                      "relative h-20 w-20 flex-none overflow-hidden rounded-2xl border transition",
                      active ? "border-white/40" : "border-white/10 hover:border-white/25",
                    ].join(" ")}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image src={src} alt={`${product.name} ${i + 1}`} fill className="object-cover" unoptimized />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs tracking-widest opacity-60">DIAMOND AURA</div>
              <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
              <div className="mt-2 text-sm opacity-70">{product.category}</div>
              <div className="mt-2 text-xs text-white/55">Product ID: {product.id}</div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="text-xl font-semibold">{formatPrice(product.priceTRY)}</div>
            {typeof product.compareAtTRY === "number" && (
              <div className="text-sm opacity-60 line-through">{formatPrice(product.compareAtTRY)}</div>
            )}
          </div>

          {!!product.badges?.length && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.badges.map((b) => (
                <span key={b} className="text-[11px] rounded-full border border-white/15 px-3 py-1 opacity-80">
                  {b}
                </span>
              ))}
            </div>
          )}

          <p className="mt-6 text-sm opacity-85 leading-6">{product.description}</p>

          {/* Size */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold">Select size</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={[
                    "rounded-2xl border px-4 py-2 text-sm transition",
                    size === s
                      ? "border-white/35 bg-white text-black"
                      : "border-white/15 bg-black/20 text-white/85 hover:bg-white/5",
                  ].join(" ")}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => {
                addToCart();
                openCart();
              }}
              className="rounded-2xl bg-white text-black px-5 py-3 text-sm font-medium hover:opacity-90 text-center"
            >
              Add to Cart
            </button>

            <button
              onClick={openCart}
              className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium hover:bg-white/5 text-center"
            >
              View Cart
            </button>

            <a
              className="sm:col-span-2 rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium hover:bg-white/5 text-center"
              href={IG_PROFILE}
              target="_blank"
              rel="noreferrer"
            >
              Checkout on Instagram
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
