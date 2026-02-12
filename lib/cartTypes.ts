export type Size = "S" | "M" | "L" | "XL" | "XXL";

export type CartItem = {
  id: string;       // product id
  size: Size;
  qty: number;
};
