export type Category = "Hoodies";

export type Product = {
  id: string;
  name: string;
  category: Category;
  priceTRY: number;          // the REAL price shown
  compareAtTRY?: number;     // crossed-out "original" price
  description: string;
  images: string[];
  badges?: Array<"New" | "Free Shipping" | "Deal" | "Limited">;
};

const IG_ORDER_NOTE = "Premium hoodie. Limited drop. Order via Instagram.";

const DISCOUNTED_PRICE = 2000;
const ORIGINAL_COMPARE_AT = 3000; // shows as crossed-out "original" for 33% off vibe

function isChristianId(id: string) {
  const s = id.toLowerCase();
  return s.includes("christian") || s.includes("cross");
}

function makeProduct(p: Omit<Product, "compareAtTRY">): Product {
  // Christian items: 2500, no compareAt (no discount display)
  if (isChristianId(p.id)) {
    return { ...p, priceTRY: 2500, compareAtTRY: undefined };
  }

  // Everything else: 2000 with crossed-out original
  return { ...p, priceTRY: DISCOUNTED_PRICE, compareAtTRY: ORIGINAL_COMPARE_AT };
}

export const products: Product[] = [
  // ===== Existing set (updated with discount logic) =====
  makeProduct({
    id: "green-graphic-hoodie",
    name: "Emerald Graphic Hoodie",
    category: "Hoodies",
    priceTRY: DISCOUNTED_PRICE,
    description: IG_ORDER_NOTE,
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587446/WhatsApp_Image_2026-02-09_at_12.49.28_AM_wg7elj.jpg", // front
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587567/WhatsApp_Image_2026-02-09_at_12.49.28_AM_1_qhch54.jpg", // back
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  makeProduct({
    id: "tokyo-car-hoodie-black",
    name: "Tokyo Car Hoodie (Black)",
    category: "Hoodies",
    priceTRY: DISCOUNTED_PRICE,
    description: IG_ORDER_NOTE,
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587536/WhatsApp_Image_2026-02-09_at_12.48.55_AM_pxyvvy.jpg", // front
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587536/WhatsApp_Image_2026-02-09_at_12.48.55_AM_1_qkyb3q.jpg", // back
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  makeProduct({
    id: "washed-grey-gym-hoodie",
    name: "Washed Grey Gym Hoodie",
    category: "Hoodies",
    priceTRY: DISCOUNTED_PRICE,
    description: IG_ORDER_NOTE,
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587518/WhatsApp_Image_2026-02-09_at_12.48.51_AM_fhya37.jpg", // front
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587446/WhatsApp_Image_2026-02-09_at_12.48.51_AM_1_zgzzdi.jpg", // back
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  makeProduct({
    id: "drake-hoodie-black",
    name: "Drake Hoodie (Black)",
    category: "Hoodies",
    priceTRY: DISCOUNTED_PRICE,
    description: IG_ORDER_NOTE,
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587446/WhatsApp_Image_2026-02-09_at_12.48.00_AM_tepziq.jpg",
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  makeProduct({
    id: "dark-rose-hoodie-black",
    name: "Dark Rose Hoodie (Black)",
    category: "Hoodies",
    priceTRY: DISCOUNTED_PRICE,
    description: IG_ORDER_NOTE,
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587446/WhatsApp_Image_2026-02-09_at_12.49.54_AM_1_ieshon.jpg", // front
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587446/WhatsApp_Image_2026-02-09_at_12.49.54_AM_kkwu7e.jpg", // back
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  // Christian (no discount display)
  makeProduct({
    id: "christian-cross-hoodie-grey",
    name: "Christian Cross Zip Hoodie",
    category: "Hoodies",
    priceTRY: 2500,
    description: "Premium hoodie. Higher-tier piece. Limited drop. Order via Instagram.",
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587446/WhatsApp_Image_2026-02-09_at_12.47.55_AM_mdisyd.jpg", // front
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770587447/WhatsApp_Image_2026-02-09_at_12.47.55_AM_1_nrgdhp.jpg", // back
    ],
    badges: ["New", "Limited"],
  }),

  // ===== New drop additions (your list) =====

  makeProduct({
    id: "cat-graphic-hoodie",
    name: "Cat Graphic Hoodie",
    category: "Hoodies",
    priceTRY: DISCOUNTED_PRICE,
    description: IG_ORDER_NOTE,
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657592/WhatsApp_Image_2026-02-09_at_5.01.14_PM_2_lenwlh.jpg", // front
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657592/WhatsApp_Image_2026-02-09_at_5.01.14_PM_3_s4hqlc.jpg", // back
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  // Christian stitched (still christian => 2500 no compareAt)
  makeProduct({
    id: "christian-hoodie-stitched",
    name: "Christian Hoodie (Stitched)",
    category: "Hoodies",
    priceTRY: 2500,
    description: "Premium stitched piece. Limited drop. Order via Instagram.",
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657593/WhatsApp_Image_2026-02-09_at_5.01.14_PM_1_ug2qqu.jpg", // front
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657593/WhatsApp_Image_2026-02-09_at_5.01.14_PM_kyuuwm.jpg", // back
    ],
    badges: ["New", "Limited"],
  }),

  makeProduct({
    id: "berserk-anime-hoodie",
    name: "Berserk Anime Hoodie",
    category: "Hoodies",
    priceTRY: DISCOUNTED_PRICE,
    description: IG_ORDER_NOTE,
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657597/WhatsApp_Image_2026-02-09_at_5.01.15_PM_7_f9hzns.jpg",
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  makeProduct({
    id: "griffith-berserk-hoodie",
    name: "Griffith Berserk Hoodie (Under Sleeves)",
    category: "Hoodies",
    priceTRY: DISCOUNTED_PRICE,
    description: IG_ORDER_NOTE,
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657596/WhatsApp_Image_2026-02-09_at_5.01.15_PM_6_stfd3e.jpg", // front
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657593/WhatsApp_Image_2026-02-09_at_5.01.15_PM_1_iwithz.jpg", // back
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  makeProduct({
    id: "dark-japanese-hoodie",
    name: "Dark Japanese Hoodie",
    category: "Hoodies",
    priceTRY: DISCOUNTED_PRICE,
    description: IG_ORDER_NOTE,
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657595/WhatsApp_Image_2026-02-09_at_5.01.15_PM_5_mveibp.jpg", // front
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657596/WhatsApp_Image_2026-02-09_at_5.01.15_PM_4_axjdxv.jpg", // back
    ],
    badges: ["New", "Deal", "Limited"],
  }),

  // Christian darkish (still christian => 2500 no compareAt)
  makeProduct({
    id: "christian-hoodie-darkish",
    name: "Christian Hoodie (Dark)",
    category: "Hoodies",
    priceTRY: 2500,
    description: "Premium hoodie. Higher-tier piece. Limited drop. Order via Instagram.",
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657593/WhatsApp_Image_2026-02-09_at_5.01.15_PM_2_pomkvv.jpg", // front
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657601/WhatsApp_Image_2026-02-09_at_5.01.15_PM_3_ogtiyp.jpg", // back
    ],
    badges: ["New", "Limited"],
  }),

  makeProduct({
    id: "dark-souls-hoodie",
    name: "Dark Souls Hoodie",
    category: "Hoodies",
    priceTRY: DISCOUNTED_PRICE,
    description: IG_ORDER_NOTE,
    images: [
      "https://res.cloudinary.com/dldyaqnbq/image/upload/v1770657598/WhatsApp_Image_2026-02-09_at_5.01.15_PM_w3xnbm.jpg",
    ],
    badges: ["New", "Deal", "Limited"],
  }),
];
