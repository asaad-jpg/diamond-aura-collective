export type FxRates = {
  usdToTry: number; // 1 USD -> TRY
  tryToUsd: number; // 1 TRY -> USD
  fetchedAt: number;
};

function num(v: unknown) {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

export async function fetchFxRates(): Promise<FxRates> {
  const key = process.env.EXCHANGERATE_API_KEY;
  if (!key) throw new Error("Missing EXCHANGERATE_API_KEY env var");

  // ExchangeRate-API: base USD, then read TRY
  const url = `https://v6.exchangerate-api.com/v6/${key}/latest/USD`;

  const res = await fetch(url, { cache: "no-store" });
  const data = (await res.json().catch(() => null)) as any;

  // Typical success: { result:"success", conversion_rates:{ TRY: ... } }
  const usdToTry = num(data?.conversion_rates?.TRY);
  if (!usdToTry || usdToTry <= 0) {
    const msg = data?.["error-type"] || data?.result || "Bad FX response";
    throw new Error(`FX API error: ${msg}`);
  }

  return {
    usdToTry,
    tryToUsd: 1 / usdToTry,
    fetchedAt: Date.now(),
  };
}
