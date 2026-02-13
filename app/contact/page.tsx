"use client";

import Link from "next/link";
import { useStoreData } from "@/lib/useStoreData";

export default function ContactPage() {
  const { state } = useStoreData();
  const instagramUrl = state.config.instagramProfileUrl;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-semibold text-white">Order & Contact</h1>

        <div className="mt-6 space-y-6">
          {/* Main CTA */}
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">📱 DM Us on Instagram</h2>
            <p className="mt-2 text-sm text-white/75">
              We handle all orders via Instagram direct messages. This keeps communication direct and ensures you get real-time updates on your order.
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black hover:opacity-90 transition"
            >
              @shopdiamondaura →
            </a>
          </div>

          {/* Order Process */}
          <div>
            <h2 className="text-lg font-semibold text-white">How Ordering Works</h2>
            <div className="mt-4 space-y-3 text-sm text-white/75">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="font-semibold text-white">1️⃣ Find Your Hoodie</div>
                <p className="mt-1">Browse our <Link href="/shop" className="text-white underline">shop</Link> and pick the hoodie(s) you want.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="font-semibold text-white">2️⃣ Message Us</div>
                <p className="mt-1">Send a DM on Instagram with: hoodie name, size needed, and any color preferences.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="font-semibold text-white">3️⃣ Confirm Order</div>
                <p className="mt-1">We'll confirm availability, total price, and payment method via DM.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="font-semibold text-white">4️⃣ Payment</div>
                <p className="mt-1">We accept payment via bank transfer or crypto (details sent via DM).</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="font-semibold text-white">5️⃣ Shipping</div>
                <p className="mt-1">We'll ship your order with tracking. Shipping time depends on location (typically 7-14 days worldwide).</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-lg font-semibold text-white">Frequently Asked Questions</h2>
            <div className="mt-4 space-y-3 text-sm text-white/75">
              <details className="rounded-2xl border border-white/10 bg-black/20 p-4 cursor-pointer group">
                <summary className="font-semibold text-white group-open:text-white/85">Do you ship internationally?</summary>
                <p className="mt-3 text-white/75">Yes! We ship worldwide. Shipping cost varies by location and will be confirmed before payment.</p>
              </details>

              <details className="rounded-2xl border border-white/10 bg-black/20 p-4 cursor-pointer group">
                <summary className="font-semibold text-white group-open:text-white/85">What sizes are available?</summary>
                <p className="mt-3 text-white/75">We offer: XS, S, M, L, XL, XXL. Each hoodie listing shows available sizes. Message us if you need a custom size.</p>
              </details>

              <details className="rounded-2xl border border-white/10 bg-black/20 p-4 cursor-pointer group">
                <summary className="font-semibold text-white group-open:text-white/85">Can I return or exchange?</summary>
                <p className="mt-3 text-white/75">Returns and exchanges are handled case-by-case. Contact us on Instagram with photos and we'll work it out with you.</p>
              </details>

              <details className="rounded-2xl border border-white/10 bg-black/20 p-4 cursor-pointer group">
                <summary className="font-semibold text-white group-open:text-white/85">How long does shipping take?</summary>
                <p className="mt-3 text-white/75">Typically 7-14 days depending on your location. We provide tracking for all orders.</p>
              </details>

              <details className="rounded-2xl border border-white/10 bg-black/20 p-4 cursor-pointer group">
                <summary className="font-semibold text-white group-open:text-white/85">Do you offer bulk discounts?</summary>
                <p className="mt-3 text-white/75">Yes! For orders of 3+ hoodies, message us for bulk pricing. We can work out special rates.</p>
              </details>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Contact Methods</h2>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              <p>
                <span className="font-semibold text-white">Primary:</span> DM on Instagram{" "}
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white underline">
                  @shopdiamondaura
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">Response Time:</span> Usually within 24 hours (sometimes sooner!)
              </p>
              <p>
                <span className="font-semibold text-white">Language:</span> English & Turkish
              </p>
            </div>
          </div>

          {/* Back Links */}
          <div className="flex gap-3 pt-4">
            <Link
              href="/shop"
              className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/5 transition"
            >
              ← Back to Shop
            </Link>
            <Link
              href="/policies"
              className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/5 transition"
            >
              Policies & Returns
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
