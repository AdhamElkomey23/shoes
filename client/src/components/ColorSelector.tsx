import { motion } from "framer-motion";
import { ColorVariant } from "@/data/shoes";

interface ColorSelectorProps {
  variants: ColorVariant[];
  selectedColor: string;
  onColorSelect: (variant: ColorVariant) => void;
}

export function ColorSelector({ variants, selectedColor, onColorSelect }: ColorSelectorProps) {
  return (
    <div className="flex flex-col items-start">
      <p className="text-white/80 text-sm font-semibold mb-3 tracking-wide">SELECT COLOR</p>
      <div className="flex gap-3">
        {variants.map((variant, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onColorSelect(variant)}
            className={`w-10 h-10 rounded-full border-2 transition-all ${
              selectedColor === variant.color
                ? "border-white shadow-lg"
                : "border-white/30 hover:border-white/60"
            }`}
            style={{ backgroundColor: variant.color }}
            title={variant.name}
          >
            {selectedColor === variant.color && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-full h-full rounded-full flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
