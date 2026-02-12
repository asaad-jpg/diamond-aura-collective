export type Role = "admin" | "pricer";
export type Verified = { role: Role; exp: number };

function b64urlEncode(bytes: Uint8Array) {
  let str = "";
  bytes.forEach((b) => (str += String.fromCharCode(b)));
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function b64urlDecodeToBytes(s: string) {
  const pad = s.length % 4 ? "=".repeat(4 - (s.length % 4)) : "";
  const base64 = (s + pad).replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(base64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacSha256(secret: string, data: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return new Uint8Array(sig);
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a[i] ^ b[i];
  return out === 0;
}

export async function signToken(role: Role, secret: string, ttlSeconds = 60 * 60 * 24) {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const payload = { role, exp };

  const h = b64urlEncode(new TextEncoder().encode(JSON.stringify(header)));
  const p = b64urlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const data = `${h}.${p}`;

  const sig = await hmacSha256(secret, data);
  const s = b64urlEncode(sig);

  return `${data}.${s}`;
}

export async function verifyToken(token: string, secret: string): Promise<Verified | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [h, p, s] = parts;
  const data = `${h}.${p}`;

  const expected = await hmacSha256(secret, data);
  const got = b64urlDecodeToBytes(s);

  if (!timingSafeEqual(expected, got)) return null;

  try {
    const payloadJson = new TextDecoder().decode(b64urlDecodeToBytes(p));
    const payload = JSON.parse(payloadJson) as any;

    if (!payload || (payload.role !== "admin" && payload.role !== "pricer")) return null;
    if (typeof payload.exp !== "number") return null;

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp <= now) return null;

    return { role: payload.role, exp: payload.exp };
  } catch {
    return null;
  }
}
