import { get } from "@vercel/edge-config";
import { seedState, type StoreState } from "@/lib/storeSeed";

const KEY = "diamond-aura-state";

function isStoreState(v: unknown): v is StoreState {
  if (!v || typeof v !== "object") return false;
  const obj = v as any;
  if (!Array.isArray(obj.products)) return false;
  if (!obj.config || typeof obj.config !== "object") return false;
  if (typeof obj.config.usdRate !== "number") return false;
  if (typeof obj.config.announcement !== "string") return false;
  return true;
}

// READ (global)
export async function getState(): Promise<StoreState> {
  const data = (await get(KEY)) as unknown;
  return isStoreState(data) ? data : seedState;
}

// WRITE (global) via Vercel REST API
export async function setState(next: StoreState): Promise<void> {
  const edgeConfigId = process.env.EDGE_CONFIG_ID;
  const vercelToken = process.env.VERCEL_API_TOKEN;

  if (!edgeConfigId) throw new Error("Missing EDGE_CONFIG_ID env var");
  if (!vercelToken) throw new Error("Missing VERCEL_API_TOKEN env var");

  const res = await fetch(`https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${vercelToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [{ operation: "upsert", key: KEY, value: next }],
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to write Edge Config: ${res.status} ${res.statusText} ${text}`);
  }
}
