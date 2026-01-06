export type Category = "top" | "bottom" | "shoes" | "outer" | "accessory";

export type ClothingItem = {
  id: string;
  name: string;
  category: Category;
  layer: number; // render order
  src: string;   // path to png
};

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "top", label: "Viršus" },
  { key: "bottom", label: "Apačia" },
  { key: "shoes", label: "Batai" },
  { key: "outer", label: "Viršutinis" },
  { key: "accessory", label: "Aksesuaras" },
];

// Minimalus starter set (pritaikyk pagal savo failus)
export const CLOTHES: ClothingItem[] = [
  { id: "top_tshirt", name: "Marškinėliai", category: "top", layer: 30, src: "/src/assets/clothes/top/tshirt.png" },
  { id: "bottom_jeans", name: "Džinsai", category: "bottom", layer: 20, src: "/src/assets/clothes/bottom/jeans.png" },
  { id: "shoes_sneakers", name: "Sportbačiai", category: "shoes", layer: 10, src: "/src/assets/clothes/shoes/sneakers.png" },
  // optional
  // { id: "outer_jacket", name: "Striukė", category: "outer", layer: 40, src: "/src/assets/clothes/outer/jacket.png" },
  // { id: "acc_bag", name: "Rankinė", category: "accessory", layer: 50, src: "/src/assets/clothes/accessory/bag.png" },
];

export const layerSort = (a: ClothingItem, b: ClothingItem) => a.layer - b.layer;

export const clothesById = Object.fromEntries(CLOTHES.map(c => [c.id, c])) as Record<string, ClothingItem>;
