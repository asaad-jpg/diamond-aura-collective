export type Category = "Hoodies" | "Limited";

export type Product = {
  id: string;
  name: string;
  category: Category;
  priceTRY: number;
  compareAtTRY?: number;
  description?: string;
  image: string;
  images?: string[];
  badges?: Array<"New" | "Free Shipping" | "Deal" | "Limited">;
  featured?: boolean;
};

export type DevConfig = {
  announcement: string;
  usdRate: number;
  instagramProfileUrl?: string;
};

export type StoreState = {
  products: Product[];
  config: DevConfig;
};
