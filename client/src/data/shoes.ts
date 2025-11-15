export interface ColorVariant {
  name: string;
  color: string;
  meshColor: string;
}

export interface ShoeProduct {
  id: number;
  name: string;
  tagline: string;
  price: string;
  modelPath: string;
  color: string;
  variants: ColorVariant[];
}

export const shoeProducts: ShoeProduct[] = [
  {
    id: 1,
    name: "Air Jordan 1",
    tagline: "ICONIC STYLE. LEGENDARY PERFORMANCE",
    price: "$189.99",
    modelPath: "/shoes/shoe-red-white.png",
    color: "#DC2626",
    variants: [
      { name: "Chicago Red", color: "#DC2626", meshColor: "#DC2626" },
      { name: "Midnight Black", color: "#1F2937", meshColor: "#1F2937" },
      { name: "Royal Blue", color: "#3B82F6", meshColor: "#3B82F6" },
      { name: "Snow White", color: "#F3F4F6", meshColor: "#F3F4F6" }
    ]
  },
  {
    id: 2,
    name: "Air Jordan 1 Shadow",
    tagline: "CLASSIC COLORWAY. TIMELESS DESIGN",
    price: "$199.99",
    modelPath: "/shoes/shoe-black-white.png",
    color: "#1F2937",
    variants: [
      { name: "Shadow Black", color: "#1F2937", meshColor: "#1F2937" },
      { name: "Royal Purple", color: "#8B5CF6", meshColor: "#8B5CF6" },
      { name: "Crimson Red", color: "#DC2626", meshColor: "#DC2626" },
      { name: "Snow White", color: "#F3F4F6", meshColor: "#F3F4F6" }
    ]
  },
  {
    id: 3,
    name: "Air Jordan 1 Volt",
    tagline: "BOLD AND BRIGHT. STAND OUT",
    price: "$209.99",
    modelPath: "/shoes/shoe-yellow-green.png",
    color: "#84CC16",
    variants: [
      { name: "Volt Yellow", color: "#84CC16", meshColor: "#84CC16" },
      { name: "Neon Green", color: "#10B981", meshColor: "#10B981" },
      { name: "Electric Blue", color: "#0EA5E9", meshColor: "#0EA5E9" },
      { name: "Hot Pink", color: "#EC4899", meshColor: "#EC4899" }
    ]
  }
];
