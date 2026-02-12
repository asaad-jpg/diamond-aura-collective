// app/api/store/route.ts
import { NextResponse } from "next/server";
import { getRoleFromRequest } from "@/lib/auth";
import { getState, setState } from "@/lib/edgeStore";
import { seedState, type StoreState } from "@/lib/storeSeed";

export const runtime = "nodejs"; // IMPORTANT: don't run this as edge locally

function isChristianProductId(id: string) {
  const s = id.toLowerCase();
  return s.includes("christian") || s.includes("cross");
}

function applyPricerRules(next: StoreState): StoreState {
  const products = next.products.map((p) => {
    const original =
      typeof p.compareAtTRY === "number" ? p.compareAtTRY : p.priceTRY;

    const isChristian = isChristianProductId(p.id);

    // Christian items: no discount, no compareAt displayed
    if (isChristian) {
      return {
        ...p,
        priceTRY: Math.round(original),
        compareAtTRY: undefined,
      };
    }

    // Everything else: price = 33% off, compareAt = original
    const discounted = Math.round(original * 0.67);
    return {
      ...p,
      priceTRY: discounted,
      compareAtTRY: Math.round(original),
    };
  });

  return { ...next, products };
}

export async function GET() {
  try {
    const state = await getState();
    return NextResponse.json(state);
  } catch (e: any) {
    return NextResponse.json(
      { error: "GET failed", details: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const role = await getRoleFromRequest(req);
    if (!role) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json().catch(() => null)) as StoreState | null;
    if (!body || !Array.isArray(body.products) || !body.config) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const next = role === "pricer" ? applyPricerRules(body) : body;

    await setState(next);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      {
        error: "PUT failed",
        details: e?.message ?? String(e),
        hint:
          "Usually missing EDGE_CONFIG_ID / VERCEL_API_TOKEN, or server not restarted after .env.local changes.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const role = await getRoleFromRequest(req);
    if (role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = (await req.json().catch(() => ({}))) as {
      action?: string;
    };
    if (action !== "reset") {
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }

    await setState(seedState);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: "POST failed", details: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
