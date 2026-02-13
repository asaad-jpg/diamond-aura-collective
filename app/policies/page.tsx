"use client";

import Link from "next/link";

export default function PoliciesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-semibold text-white">Policies & Returns</h1>

        <div className="mt-8 space-y-8">
          {/* Shipping Policy */}
          <section>
            <h2 className="text-xl font-semibold text-white">📦 Shipping Policy</h2>
            <div className="mt-4 space-y-3 text-sm text-white/75 leading-6">
              <p>
                <span className="font-semibold text-white">Processing Time:</span> Orders are processed and shipped within 1-3 business days after payment confirmation.
              </p>
              <p>
                <span className="font-semibold text-white">Shipping to Turkey:</span> 3-7 business days via Aras Cargo or UPS
              </p>
              <p>
                <span className="font-semibold text-white">International Shipping:</span> 7-14 business days depending on destination
              </p>
              <p>
                <span className="font-semibold text-white">Tracking:</span> All orders include tracking. Tracking number will be shared via Instagram DM.
              </p>
              <p>
                <span className="font-semibold text-white">Risk:</span> Buyer assumes shipping risk once package is handed to courier with tracking.
              </p>
            </div>
          </section>

          {/* Returns & Exchanges */}
          <section>
            <h2 className="text-xl font-semibold text-white">🔄 Returns & Exchanges</h2>
            <div className="mt-4 space-y-3 text-sm text-white/75 leading-6">
              <p>
                <span className="font-semibold text-white">Return Window:</span> 14 days from delivery date
              </p>
              <p>
                <span className="font-semibold text-white">Condition Required:</span> Items must be unworn, unwashed, and in original condition with all tags attached
              </p>
              <p>
                <span className="font-semibold text-white">Exchange:</span> If you need a different size or color, contact us via Instagram DM within 14 days
              </p>
              <p>
                <span className="font-semibold text-white">Refunds:</span> Returns are handled case-by-case. Refunds are issued after we receive and inspect the item (typically within 7-10 days).
              </p>
              <p>
                <span className="font-semibold text-white">Return Shipping:</span> Buyer covers return shipping cost. Send tracking via DM once shipped.
              </p>
              <p>
                <span className="font-semibold text-white">Non-Returnable Items:</span> Items worn, washed, altered, or damaged by buyer are not returnable. Discount codes are not refundable.
              </p>
            </div>
          </section>

          {/* Quality Guarantee */}
          <section>
            <h2 className="text-xl font-semibold text-white">✨ Quality Guarantee</h2>
            <div className="mt-4 space-y-3 text-sm text-white/75 leading-6">
              <p>
                All our hoodies are premium quality. We guarantee they meet our high standards before shipping.
              </p>
              <p>
                If you receive an item with a defect (stitching error, stain, tear, etc.), contact us immediately with photos. We'll replace or refund at no cost to you.
              </p>
            </div>
          </section>

          {/* Size & Fit */}
          <section>
            <h2 className="text-xl font-semibold text-white">👕 Size & Fit</h2>
            <div className="mt-4 space-y-3 text-sm text-white/75 leading-6">
              <p>
                <span className="font-semibold text-white">Available Sizes:</span> XS, S, M, L, XL, XXL
              </p>
              <p>
                <span className="font-semibold text-white">Fit:</span> Hoodies are designed with a relaxed, comfortable fit. True to size or size up for an oversized look.
              </p>
              <p>
                <span className="font-semibold text-white">Custom Sizes:</span> Contact us if you need custom sizing.
              </p>
              <p>
                <span className="font-semibold text-white">Measurements:</span> Detailed measurements available upon request. DM us on Instagram for specific sizing questions.
              </p>
            </div>
          </section>

          {/* Payment Methods */}
          <section>
            <h2 className="text-xl font-semibold text-white">💳 Payment Methods</h2>
            <div className="mt-4 space-y-3 text-sm text-white/75 leading-6">
              <p>
                <span className="font-semibold text-white">Bank Transfer:</span> We accept international bank transfers. Details provided after you confirm your order.
              </p>
              <p>
                <span className="font-semibold text-white">Cryptocurrency:</span> Bitcoin, Ethereum, and other major cryptocurrencies accepted. Message us for wallet addresses.
              </p>
              <p>
                <span className="font-semibold text-white">PayPal:</span> Available for select orders. Contact us to arrange.
              </p>
              <p>
                <span className="font-semibold text-white">Security:</span> All payments must be confirmed before items ship. We do not hold pre-orders without payment.
              </p>
            </div>
          </section>

          {/* Cancellations */}
          <section>
            <h2 className="text-xl font-semibold text-white">❌ Cancellations</h2>
            <div className="mt-4 space-y-3 text-sm text-white/75 leading-6">
              <p>
                <span className="font-semibold text-white">Before Shipping:</span> Free cancellation and full refund if requested before item is shipped.
              </p>
              <p>
                <span className="font-semibold text-white">After Shipping:</span> Cancellations not accepted after item has shipped. Please complete the return process instead.
              </p>
            </div>
          </section>

          {/* Privacy & Data */}
          <section>
            <h2 className="text-xl font-semibold text-white">🔐 Privacy & Data</h2>
            <div className="mt-4 space-y-3 text-sm text-white/75 leading-6">
              <p>
                We only collect personal information necessary to process your order (name, address, contact info).
              </p>
              <p>
                Your data is never shared with third parties or used for marketing without your consent.
              </p>
              <p>
                We take privacy seriously and comply with GDPR and local data protection regulations.
              </p>
            </div>
          </section>

          {/* Disputes */}
          <section>
            <h2 className="text-xl font-semibold text-white">⚖️ Dispute Resolution</h2>
            <div className="mt-4 space-y-3 text-sm text-white/75 leading-6">
              <p>
                In case of any disputes, we'll work directly with you to resolve the issue. Contact us via Instagram DM with:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Order number or date</li>
                <li>Description of the issue</li>
                <li>Photos (if applicable)</li>
              </ul>
              <p className="mt-3">
                We aim to resolve all disputes within 7 days. Your satisfaction is our priority.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="rounded-2xl border border-white/15 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Questions?</h2>
            <p className="mt-3 text-sm text-white/75">
              Any questions about these policies? DM us on{" "}
              <Link href="/contact" className="text-white underline">
                Instagram @shopdiamondaura
              </Link>{" "}
              and we'll help!
            </p>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <Link
            href="/contact"
            className="inline-flex rounded-2xl border border-white/15 px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/5 transition"
          >
            ← Back to Contact
          </Link>
        </div>
      </div>
    </main>
  );
}

