export function applyDaniPricing(actualTRY: number) {
  const actual = Math.max(0, Math.round(actualTRY));
  const sale = Math.max(0, Math.round(actual * (2 / 3))); // 33% off
  return { priceTRY: sale, compareAtTRY: actual };
}

export function isValidMoney(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n) && n >= 0;
}
