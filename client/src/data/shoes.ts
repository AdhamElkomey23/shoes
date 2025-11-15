export interface ShoeProduct {
  id: number;
  name: string;
  tagline: string;
  price: string;
  modelPath: string;
  color: string;
}

export const shoeProducts: ShoeProduct[] = [
  {
    id: 1,
    name: "Air Velocity",
    tagline: "BUILT FOR SPEED. DESIGNED TO LEAD",
    price: "$189.99",
    modelPath: "/models/shoe-blue-runner.glb",
    color: "#3B82F6"
  },
  {
    id: 2,
    name: "Court Master",
    tagline: "DOMINATE THE GAME. OWN THE COURT",
    price: "$219.99",
    modelPath: "/models/shoe-green-basketball.glb",
    color: "#10B981"
  },
  {
    id: 3,
    name: "Urban Flow",
    tagline: "STYLE MEETS COMFORT. EVERYDAY EXCELLENCE",
    price: "$159.99",
    modelPath: "/models/shoe-orange-lifestyle.glb",
    color: "#F97316"
  }
];
