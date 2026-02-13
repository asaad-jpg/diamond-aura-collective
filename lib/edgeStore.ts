import { get } from "@vercel/edge-config";
import { seedState, type StoreState } from "@/lib/storeSeed";

const KEY = "diamond-aura-state";

// In-memory cache for development
let memoryCache: StoreState | null = null;

function isStoreState(v: unknown): v is StoreState {
  if (!v || typeof v !== "object") return false;
  const obj = v as Record<string, unknown>;
  if (!Array.isArray(obj.products)) return false;
  if (!obj.config || typeof obj.config !== "object") return false;
  if (typeof (obj.config as Record<string, unknown>).usdRate !== "number") return false;
  if (typeof (obj.config as Record<string, unknown>).announcement !== "string") return false;
  return true;
}

// READ (global) - try Edge Config first, then memory cache, then seed
export async function getState(): Promise<StoreState> {
  // Try memory cache first (fastest for local dev)
  if (memoryCache) {
    return memoryCache;
  }

  try {
    // Try to read from Edge Config (production)
    const data = (await get(KEY)) as unknown;
    if (isStoreState(data)) {
      memoryCache = data;
      return data;
    }
  } catch {
    // Edge Config read failed, continue to fallback
  }

  // Return seed as final fallback
  memoryCache = seedState;
  return seedState;
}

// WRITE (global) - try Edge Config, always cache in memory
export async function setState(next: StoreState): Promise<void> {
  // Always cache in memory (for local dev)
  memoryCache = next;

  const edgeConfigUrl = process.env.EDGE_CONFIG;

  if (!edgeConfigUrl) {
    console.log("ℹ️  EDGE_CONFIG not set. Changes saved locally only.");
    return;
  }

  try {
    // Try to write to Edge Config (production)
    const url = new URL(edgeConfigUrl);
    const edgeConfigId = url.pathname.split("/").pop();
    const token = url.searchParams.get("token");

    if (!edgeConfigId || !token) {
      console.warn("⚠️  Invalid EDGE_CONFIG format");
      return;
    }

    const res = await fetch(`https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ operation: "upsert", key: KEY, value: next }],
      }),
    });

    if (res.ok) {
      console.log("✅ Saved to Vercel Edge Config");
      return;
    }

    // If auth fails, just log and continue with memory cache
    const body = await res.json().catch(() => ({})) as Record<string, unknown>;
    console.warn(
      `⚠️  Edge Config authentication failed. Using local memory storage only. Details: ${JSON.stringify(body)}`
    );
  } catch (error) {
    console.warn("⚠️  Could not reach Edge Config. Using local memory storage only.", error);
  }
}
