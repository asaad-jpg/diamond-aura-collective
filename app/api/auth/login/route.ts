import { NextResponse } from "next/server";
import { signToken, type Role } from "@/lib/jwt";

export const runtime = "edge";

function safeEq(a: string, b: string) {
  // basic constant-ish compare
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { role?: Role; key?: string } | null;
  if (!body || (body.role !== "admin" && body.role !== "pricer") || typeof body.key !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const secret = process.env.AUTH_SECRET;
  const adminKey = process.env.ADMIN_KEY;
  const pricerKey = process.env.PRICER_KEY;

  if (!secret || !adminKey || !pricerKey) {
    return NextResponse.json({ error: "Server missing env vars" }, { status: 500 });
  }

  const expected = body.role === "admin" ? adminKey : pricerKey;
  if (!safeEq(body.key, expected)) {
    return NextResponse.json({ error: "Wrong key" }, { status: 401 });
  }

  const token = await signToken(body.role, secret, 60 * 60 * 24 * 7); // 7 days
  return NextResponse.json({ token, role: body.role });
}
