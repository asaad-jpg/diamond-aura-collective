import { products as seedProducts, type Product } from "@/lib/products";
import { defaultConfig } from "@/lib/devStore";

export type StoreState = {
  products: Product[];
  config: typeof defaultConfig & {
    instagramProfileUrl: string;
  };
};

export const seedState: StoreState = {
  products: seedProducts,
  config: {
    ...defaultConfig,
    instagramProfileUrl: "https://www.instagram.com/shopdiamondaura/",
  },
};
