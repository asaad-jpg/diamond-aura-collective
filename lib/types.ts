export type Category = "Hoodies";

export type Product = {
  id: string;
  name: string;
  category: Category;
  priceTRY: number;
  compareAtTRY?: number;
  description: string;
  images: string[];
  badges?: Array<"New" | "Free Shipping" | "Deal" | "Limited">;
};

export type DevConfig = {
  announcement: string;
  usdRate: number;
  instagramProfileUrl: string;
};

export type StoreState = {
  products: Product[];
  config: DevConfig;
};
