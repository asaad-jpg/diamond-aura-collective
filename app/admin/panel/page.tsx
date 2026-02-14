"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { StoreState } from "@/lib/storeSeed";
import { formatPrice } from "@/lib/currency";

type Role = "admin" | "pricer";

function isChristianId(id: string) {
  const s = id.toLowerCase();
  return s.includes("christian") || s.includes("cross");
}

export default function AdminPanelPage() {
  const [role, setRole] = useState<Role | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [state, setState] = useState<StoreState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("dac_token");
    const r = localStorage.getItem("dac_role") as Role | null;
    setToken(t);
    setRole(r);
  }, []);

  const logout = () => {
    localStorage.removeItem("dac_token");
    localStorage.removeItem("dac_role");
    location.href = "/admin";
  };

  const fetchState = async () => {
    setErr(null);
    setOk(null);
    setLoading(true);
    try {
      const res = await fetch("/api/store");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = (await res.json()) as StoreState;
      setState(data);
    } catch {
      setErr("Failed to load store");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
  }, [token]);

  const canEditAll = role === "admin";
  const canEditPrices = role === "pricer" || role === "admin";

  const products = state?.products ?? [];

  const save = async () => {
    if (!state || !token) return;
    setSaving(true);
    setErr(null);
    setOk(null);

    try {
      const res = await fetch("/api/store", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(state),
      });

      const data = (await res.json().catch(() => ({}))) as any;
      if (!res.ok) {
        setErr(data?.error || "Save failed");
        setSaving(false);
        return;
      }

      setOk("✅ Saved globally - Discord notified 🎉");
      await fetchState();
    } catch {
      setErr("Network error");
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (!token) return;
    setSaving(true);
    setErr(null);
    setOk(null);

    try {
      const res = await fetch("/api/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: "reset" }),
      });

      const data = (await res.json().catch(() => ({}))) as any;
      if (!res.ok) {
        setErr(data?.error || "Reset failed");
        setSaving(false);
        return;
      }

      setOk("Reset done ✅");
      await fetchState();
    } catch {
      setErr("Network error");
    } finally {
      setSaving(false);
    }
  };

  const headerRight = useMemo(() => {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={fetchState}
          className="rounded-2xl border border-white/15 px-4 py-2 text-sm text-white/90 hover:bg-white/5"
        >
          Refresh
        </button>
        {canEditAll && (
          <button
            onClick={reset}
            disabled={saving}
            className="rounded-2xl border border-white/15 px-4 py-2 text-sm text-white/90 hover:bg-white/5 disabled:opacity-50"
          >
            Reset
          </button>
        )}
        <button
          onClick={save}
          disabled={saving || !canEditPrices}
          className="rounded-2xl bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          onClick={logout}
          className="rounded-2xl border border-white/15 px-4 py-2 text-sm text-white/90 hover:bg-white/5"
        >
          Logout
        </button>
      </div>
    );
  }, [saving, canEditAll, canEditPrices, token, state]);

  if (!token || !role) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80">
          Not logged in. <Link className="underline" href="/admin">Go to login</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs tracking-[0.35em] text-white/60">DIAMOND AURA</div>
          <h1 className="mt-2 text-2xl font-semibold text-white">Admin Panel</h1>
          <div className="mt-1 text-sm text-white/70">
            Role: <span className="text-white">{role}</span>
          </div>
        </div>

        {headerRight}
      </div>

      {err && <div className="mt-4 text-sm text-red-400">{err}</div>}
      {ok && <div className="mt-4 text-sm text-green-400">{ok}</div>}

      {loading || !state ? (
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
          Loading...
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {/* Config (admin only) */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white">Config</div>
              {!canEditAll && <div className="text-xs text-white/60">Admin only</div>}
            </div>

            <div className="mt-4 grid gap-3">
              <label className="text-xs text-white/60">Announcement</label>
              <input
                disabled={!canEditAll}
                value={state.config.announcement}
                onChange={(e) => {
                  if (!state) return;
                  setState({ ...state, config: { ...state.config, announcement: e.target.value } });
                }}
                className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none disabled:opacity-50"
              />

              <label className="text-xs text-white/60">Instagram profile URL</label>
              <input
                disabled={!canEditAll}
                value={state.config.instagramProfileUrl}
                onChange={(e) => {
                  if (!state) return;
                  setState({ ...state, config: { ...state.config, instagramProfileUrl: e.target.value } });
                }}
                className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none disabled:opacity-50"
              />

              <label className="text-xs text-white/60">USD Rate (TRY per 1 USD)</label>
              <input
                type="number"
                disabled={!canEditAll}
                value={state.config.usdRate}
                onChange={(e) => {
                  if (!state) return;
                  setState({ ...state, config: { ...state.config, usdRate: Number(e.target.value || 0) } });
                }}
                className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none disabled:opacity-50"
              />
            </div>
          </div>

          {/* Products */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white">Products</div>
              <div className="text-xs text-white/60">
                {role === "pricer"
                  ? "Pricer can only set ORIGINAL price (compareAtTRY). Discount is applied automatically."
                  : "Admin can edit everything."}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {products.map((p, idx) => {
                const christian = isChristianId(p.id);
                return (
                  <div key={p.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{p.name}</div>
                        <div className="mt-1 text-xs text-white/60">ID: {p.id}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-white/60">Live</div>
                        <div className="text-sm font-semibold text-white">
                          {formatPrice(p.priceTRY)}
                        </div>
                        {typeof p.compareAtTRY === "number" && (
                          <div className="text-xs text-white/60 line-through">
                            {formatPrice(p.compareAtTRY)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {/* Original price input for pricer */}
                      <div>
                        <div className="text-xs text-white/60">
                          {role === "pricer" ? "Original price (TRY)" : "compareAtTRY (optional)"}
                        </div>
                        <input
                          disabled={!canEditPrices || (role === "pricer" && christian)}
                          value={String(p.compareAtTRY ?? p.priceTRY)}
                          onChange={(e) => {
                            const v = Number(e.target.value || 0);
                            if (!state) return;
                            const next = [...state.products];
                            next[idx] = {
                              ...next[idx],
                              compareAtTRY: Number.isFinite(v) ? v : next[idx].compareAtTRY,
                            };
                            setState({ ...state, products: next });
                          }}
                          className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none disabled:opacity-50"
                        />
                        {role === "pricer" && christian && (
                          <div className="mt-1 text-[11px] text-white/50">
                            Christian items: no discount display (locked for pricer).
                          </div>
                        )}
                      </div>

                      {canEditAll && (
                        <div>
                          <div className="text-xs text-white/60">priceTRY (admin only)</div>
                          <input
                            disabled={!canEditAll}
                            value={String(p.priceTRY)}
                            onChange={(e) => {
                              const v = Number(e.target.value || 0);
                              if (!state) return;
                              const next = [...state.products];
                              next[idx] = {
                                ...next[idx],
                                priceTRY: Number.isFinite(v) ? v : next[idx].priceTRY,
                              };
                              setState({ ...state, products: next });
                            }}
                            className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none disabled:opacity-50"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-xs text-white/55">
              Pricer flow: Dani types “original” price → server sets sale price automatically (33% off) and keeps
              compareAt crossed out. Christian/cross stays full price.
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
