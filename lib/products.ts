export type Category = "Hoodies" | "Limited";

export type Product = {
  id: string;
  name: string;
  category: Category;
  priceTRY: number;          // ALWAYS from store-data.json - NEVER from code
  compareAtTRY?: number;     // ALWAYS from store-data.json - NEVER from code
  description?: string;
  image?: string;            // single image (from store-data.json)
  images?: string[];         // array of images (backwards compat)
  badges?: Array<"New" | "Free Shipping" | "Deal" | "Limited">;
  featured?: boolean;
};

// IMPORTANT: These are PLACEHOLDER values ONLY for TypeScript compilation
// REAL prices are ONLY in store-data.json - never in code
const PLACEHOLDER_PRICE = 0; // Placeholder - real prices in store-data.json
const PLACEHOLDER_COMPARE = 0; // Placeholder - real prices in store-data.json

function makeProduct(p: Omit<Product, "compareAtTRY">): Product {
  // Return as-is with placeholder prices
  // Prices will be overwritten from store-data.json at runtime
  return { ...p, priceTRY: PLACEHOLDER_PRICE, compareAtTRY: PLACEHOLDER_COMPARE };
}

export const products: Product[] = [
  // IMPORTANT: These products are ONLY for file structure and images
  // Prices (priceTRY, compareAtTRY) must ALWAYS come from store-data.json
  makeProduct({
    id: "green-graphic-hoodie",
    name: "Emerald Graphic Hoodie",
    category: "Hoodies",
    priceTRY: PLACEHOLDER_PRICE,
    description: "Premium hoodie",
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587446/WhatsApp_Image_2026-02-09_at_12.49.28_AM_wg7elj.jpg",
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587567/WhatsApp_Image_2026-02-09_at_12.49.28_AM_1_qhch54.jpg"
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  makeProduct({
    id: "tokyo-car-hoodie-black",
    name: "Tokyo Car Hoodie (Black)",
    category: "Hoodies",
    priceTRY: PLACEHOLDER_PRICE,
    description: "Premium hoodie",
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587536/WhatsApp_Image_2026-02-09_at_12.48.55_AM_pxyvvy.jpg",
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587536/WhatsApp_Image_2026-02-09_at_12.48.55_AM_1_qkyb3q.jpg"
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  makeProduct({
    id: "washed-grey-gym-hoodie",
    name: "Washed Grey Gym Hoodie",
    category: "Hoodies",
    priceTRY: PLACEHOLDER_PRICE,
    description: "Premium hoodie",
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587518/WhatsApp_Image_2026-02-09_at_12.48.51_AM_fhya37.jpg",
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587446/WhatsApp_Image_2026-02-09_at_12.48.51_AM_1_zgzzdi.jpg"
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  makeProduct({
    id: "drake-hoodie-black",
    name: "Drake Hoodie (Black)",
    category: "Hoodies",
    priceTRY: PLACEHOLDER_PRICE,
    description: "Premium hoodie",
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587446/WhatsApp_Image_2026-02-09_at_12.48.00_AM_tepziq.jpg"
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  makeProduct({
    id: "dark-rose-hoodie-black",
    name: "Dark Rose Hoodie (Black)",
    category: "Hoodies",
    priceTRY: PLACEHOLDER_PRICE,
    description: "Premium hoodie",
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587446/WhatsApp_Image_2026-02-09_at_12.49.54_AM_1_ieshon.jpg",
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587446/WhatsApp_Image_2026-02-09_at_12.49.54_AM_kkwu7e.jpg"
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  makeProduct({
    id: "christian-cross-hoodie-grey",
    name: "Christian Cross Zip Hoodie",
    category: "Hoodies",
    priceTRY: PLACEHOLDER_PRICE,
    description: "Premium hoodie",
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587446/WhatsApp_Image_2026-02-09_at_12.47.55_AM_mdisyd.jpg",
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587447/WhatsApp_Image_2026-02-09_at_12.47.55_AM_1_nrgdhp.jpg"
    ],
    badges: ["New", "Limited"],
  }),

  makeProduct({
    id: "cat-graphic-hoodie",
    name: "Cat Graphic Hoodie",
    category: "Hoodies",
    priceTRY: PLACEHOLDER_PRICE,
    description: "Premium hoodie",
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657592/WhatsApp_Image_2026-02-09_at_5.01.14_PM_2_lenwlh.jpg",
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657592/WhatsApp_Image_2026-02-09_at_5.01.14_PM_3_s4hqlc.jpg"
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  makeProduct({
    id: "christian-hoodie-stitched",
    name: "Christian Hoodie (Stitched)",
    category: "Hoodies",
    priceTRY: PLACEHOLDER_PRICE,
    description: "Premium hoodie",
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657593/WhatsApp_Image_2026-02-09_at_5.01.14_PM_1_ug2qqu.jpg",
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657593/WhatsApp_Image_2026-02-09_at_5.01.14_PM_kyuuwm.jpg"
    ],
    badges: ["New", "Limited"],
  }),

  makeProduct({
    id: "berserk-anime-hoodie",
    name: "Berserk Anime Hoodie",
    category: "Hoodies",
    priceTRY: PLACEHOLDER_PRICE,
    description: "Premium hoodie",
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657597/WhatsApp_Image_2026-02-09_at_5.01.15_PM_7_f9hzns.jpg"
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  makeProduct({
    id: "griffith-berserk-hoodie",
    name: "Griffith Berserk Hoodie (Under Sleeves)",
    category: "Hoodies",
    priceTRY: PLACEHOLDER_PRICE,
    description: "Premium hoodie",
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657596/WhatsApp_Image_2026-02-09_at_5.01.15_PM_6_stfd3e.jpg",
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657593/WhatsApp_Image_2026-02-09_at_5.01.15_PM_1_iwithz.jpg"
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  makeProduct({
    id: "dark-japanese-hoodie",
    name: "Dark Japanese Hoodie",
    category: "Hoodies",
    priceTRY: PLACEHOLDER_PRICE,
    description: "Premium hoodie",
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657595/WhatsApp_Image_2026-02-09_at_5.01.15_PM_5_mveibp.jpg",
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657596/WhatsApp_Image_2026-02-09_at_5.01.15_PM_4_axjdxv.jpg"
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  makeProduct({
    id: "christian-hoodie-darkish",
    name: "Christian Hoodie (Dark)",
    category: "Hoodies",
    priceTRY: PLACEHOLDER_PRICE,
    description: "Premium hoodie",
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657593/WhatsApp_Image_2026-02-09_at_5.01.15_PM_2_pomkvv.jpg",
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657601/WhatsApp_Image_2026-02-09_at_5.01.15_PM_3_ogtiyp.jpg"
    ],
    badges: ["New", "Limited"],
  }),

  makeProduct({
    id: "dark-souls-hoodie",
    name: "Dark Souls Hoodie",
    category: "Hoodies",
    priceTRY: PLACEHOLDER_PRICE,
    description: "Premium hoodie",
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657596/WhatsApp_Image_2026-02-09_at_5.01.15_PM_6_stfd3e.jpg"
    ],
    badges: ["New", "Deal", "Limited"],
  }),
];
