"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Role = "admin" | "pricer";

export default function AdminLoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("admin");
  const [key, setKey] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, key }),
      });

      const data = (await res.json().catch(() => null)) as any;

      if (!res.ok) {
        setErr(data?.error || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("dac_token", data.token);
      localStorage.setItem("dac_role", data.role);

      router.push("/admin/panel");
    } catch {
      setErr("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-xs tracking-[0.35em] text-white/60">DIAMOND AURA</div>
        <h1 className="mt-2 text-2xl font-semibold text-white">Admin Login</h1>

        <div className="mt-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setRole("admin")}
              className={[
                "rounded-2xl border px-4 py-3 text-sm transition",
                role === "admin" ? "border-white/30 bg-white/10" : "border-white/10 hover:bg-white/5",
              ].join(" ")}
            >
              Admin
            </button>
            <button
              onClick={() => setRole("pricer")}
              className={[
                "rounded-2xl border px-4 py-3 text-sm transition",
                role === "pricer" ? "border-white/30 bg-white/10" : "border-white/10 hover:bg-white/5",
              ].join(" ")}
            >
              Pricer (Dani)
            </button>
          </div>

          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder={role === "admin" ? "Admin key" : "Pricer key"}
            className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none"
            type="password"
          />

          {err && <div className="text-sm text-red-400">{err}</div>}

          <button
            onClick={login}
            disabled={loading}
            className="w-full rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-xs text-white/55">
            Works on mobile. This panel edits the live site globally.
          </div>
        </div>
      </div>
    </main>
  );
}
