import { verifyToken, type Role } from "@/lib/jwt";

export async function getRoleFromRequest(req: Request): Promise<Role | null> {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice("Bearer ".length).trim() : "";
  if (!token) return null;

  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;

  const verified = await verifyToken(token, secret);
  return verified?.role ?? null;
}
