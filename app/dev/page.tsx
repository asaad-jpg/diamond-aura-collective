import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="pt-14 pb-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10">
          {/* subtle glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

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

          {/* mini trust row */}
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs tracking-widest text-white/60">QUALITY</div>
              <div className="mt-1 text-sm text-white/85">Heavyweight premium feel</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs tracking-widest text-white/60">DROPS</div>
              <div className="mt-1 text-sm text-white/85">Limited stock releases</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs tracking-widest text-white/60">ORDER</div>
              <div className="mt-1 text-sm text-white/85">Fast ordering via IG</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / CTA */}
      <section className="pb-14">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold text-white">New Hoodies</h2>
          <Link href="/shop" className="text-sm text-white/70 hover:text-white">
            View all
          </Link>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* placeholders for now; real cards come next */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-white/5 p-4"
            >
              <div className="aspect-square rounded-2xl border border-white/10 bg-black/30" />
              <div className="mt-3">
                <div className="h-3 w-24 rounded bg-white/10" />
                <div className="mt-2 h-3 w-32 rounded bg-white/10" />
                <div className="mt-3 h-3 w-16 rounded bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
