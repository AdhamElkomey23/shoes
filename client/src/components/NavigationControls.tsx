import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

interface NavigationControlsProps {
  currentIndex: number;
  totalProducts: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
  children?: React.ReactNode;
}

export function NavigationControls({
  currentIndex,
  totalProducts,
  onPrevious,
  onNext,
  onDotClick,
  children,
}: NavigationControlsProps) {
  return (
    <>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
        {Array.from({ length: totalProducts }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white h-8"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between z-10">
        {children}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-gray-100 transition-all duration-300"
        >
          <ShoppingCart className="w-5 h-5" />
          ADD TO CART
        </motion.button>
      </div>
    </>
  );
}
