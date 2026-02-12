export type AdminRole = "admin" | "pricer";

export function getRoleFromRequest(req: Request): AdminRole | null {
  const key = req.headers.get("x-admin-key") || "";

  const adminKey = process.env.ADMIN_KEY || "";
  const pricerKey = process.env.PRICER_KEY || "";

  if (adminKey && key === adminKey) return "admin";
  if (pricerKey && key === pricerKey) return "pricer";
  return null;
}
