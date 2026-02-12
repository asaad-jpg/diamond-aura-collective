import type { Product } from "@/lib/products";

export type SiteConfig = {
  announcement: string;
  instagramOrderUrl: string;
  usdRate: number; // TRY per 1 USD
};

const CONFIG_KEY = "dac_config_v1";
const PRODUCTS_KEY = "dac_products_v1";

export const defaultConfig: SiteConfig = {
  announcement: "FREE SHIPPING ON SELECT DROPS • LIMITED STOCK • DIAMOND AURA COLLECTIVE",
  instagramOrderUrl: "https://instagram.com/",
  usdRate: 32.5,
};

export function loadConfig(): SiteConfig {
  if (typeof window === "undefined") return defaultConfig;
  const raw = localStorage.getItem(CONFIG_KEY);
  return raw ? (JSON.parse(raw) as SiteConfig) : defaultConfig;
}

export function saveConfig(cfg: SiteConfig) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
}

export function loadProducts(fallback: Product[]): Product[] {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(PRODUCTS_KEY);
  return raw ? (JSON.parse(raw) as Product[]) : fallback;
}

export function saveProducts(items: Product[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(items));
}

export function resetAll() {
  localStorage.removeItem(CONFIG_KEY);
  localStorage.removeItem(PRODUCTS_KEY);
}
