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
    name: "Air Velocity",
    tagline: "BUILT FOR SPEED. DESIGNED TO LEAD",
    price: "$189.99",
    modelPath: "/models/shoe-blue-runner.glb",
    color: "#3B82F6",
    variants: [
      { name: "Electric Blue", color: "#3B82F6", meshColor: "#3B82F6" },
      { name: "Midnight Black", color: "#1F2937", meshColor: "#1F2937" },
      { name: "Crimson Red", color: "#DC2626", meshColor: "#DC2626" },
      { name: "Snow White", color: "#F3F4F6", meshColor: "#F3F4F6" }
    ]
  },
  {
    id: 2,
    name: "Court Master",
    tagline: "DOMINATE THE GAME. OWN THE COURT",
    price: "$219.99",
    modelPath: "/models/shoe-green-basketball.glb",
    color: "#10B981",
    variants: [
      { name: "Neon Green", color: "#10B981", meshColor: "#10B981" },
      { name: "Royal Purple", color: "#8B5CF6", meshColor: "#8B5CF6" },
      { name: "Classic Black", color: "#111827", meshColor: "#111827" },
      { name: "Gold", color: "#F59E0B", meshColor: "#F59E0B" }
    ]
  },
  {
    id: 3,
    name: "Urban Flow",
    tagline: "STYLE MEETS COMFORT. EVERYDAY EXCELLENCE",
    price: "$159.99",
    modelPath: "/models/shoe-orange-lifestyle.glb",
    color: "#F97316",
    variants: [
      { name: "Sunset Orange", color: "#F97316", meshColor: "#F97316" },
      { name: "Ocean Blue", color: "#0EA5E9", meshColor: "#0EA5E9" },
      { name: "Forest Green", color: "#059669", meshColor: "#059669" },
      { name: "Pink Blush", color: "#EC4899", meshColor: "#EC4899" }
    ]
  }
];
