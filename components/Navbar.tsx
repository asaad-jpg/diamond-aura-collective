"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import CartDrawer from "@/components/cartDrawer";
import { useStoreData } from "@/lib/useStoreData";
import { useCart } from "@/lib/cartStore";

function NavItem({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "relative text-sm tracking-wide transition",
        active ? "text-white" : "text-white/75 hover:text-white",
      ].join(" ")}
    >
      <span>{label}</span>
      <span
        className={[
          "absolute left-0 -bottom-1 h-[1px] w-full transition-opacity",
          active ? "opacity-100 bg-white/70" : "opacity-0 bg-white/50 hover:opacity-100",
        ].join(" ")}
      />
    </Link>
  );
}

export default function Navbar() {
  const { state } = useStoreData();
  const cart = useCart(state.products);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const onOpenCart = () => setCartOpen(true);
    const listener = onOpenCart as EventListener;
    window.addEventListener("open-cart", listener);
    return () => window.removeEventListener("open-cart", listener);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, cartOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Link href="/" className="text-sm font-semibold tracking-[0.25em] text-white">
              DIAMOND AURA <span className="text-white/70">COLLECTIVE</span>
            </Link>
          </motion.div>

          <nav className="hidden items-center gap-7 md:flex">
            <NavItem href="/shop" label="Shop" />
            <NavItem href="/contact" label="Contact" />
            <NavItem href="/policies" label="Policies" />
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              className="relative inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-white/90 hover:bg-white/10"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>

            <button
              className="md:hidden inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-white/90 hover:bg-white/10"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu"
            >
              <span className="text-lg leading-none">{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.button
                aria-label="Close menu overlay"
                className="fixed inset-0 z-40 bg-black/60 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
              />

              <motion.div
                className="fixed left-0 right-0 top-[64px] z-50 md:hidden"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <div className="mx-auto max-w-6xl px-4">
                  <div className="rounded-3xl border border-white/10 bg-black/80 backdrop-blur p-4">
                    <div className="flex flex-col gap-4 py-2">
                      <NavItem href="/shop" label="Shop" onClick={() => setMenuOpen(false)} />
                      <NavItem href="/contact" label="Contact" onClick={() => setMenuOpen(false)} />
                      <NavItem href="/policies" label="Policies" onClick={() => setMenuOpen(false)} />

                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          setCartOpen(true);
                        }}
                        className="text-left text-sm tracking-wide text-white/75 hover:text-white"
                      >
                        Cart
                      </button>
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-white/70">
                      Add hoodies to cart, choose sizes, then checkout on Instagram.
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={cart.remove}
        onSetQty={cart.setQty}
        onSetSize={cart.setSize}
        lines={cart.lines}
        subtotalTRY={cart.subtotalTRY}
      />
    </>
  );
}
