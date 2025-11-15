import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

interface NavigationControlsProps {
  currentIndex: number;
  totalProducts: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

export function NavigationControls({
  currentIndex,
  totalProducts,
  onPrevious,
  onNext,
  onDotClick,
}: NavigationControlsProps) {
  return (
    <>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {Array.from({ length: totalProducts }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
        <button
          onClick={onPrevious}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20"
          aria-label="Previous product"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={onNext}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20"
          aria-label="Next product"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-8 right-8 px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-gray-100 transition-all duration-300 z-10"
      >
        <ShoppingCart className="w-5 h-5" />
        ADD TO CART
      </motion.button>
    </>
  );
}
