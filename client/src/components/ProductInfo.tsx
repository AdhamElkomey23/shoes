import { motion, AnimatePresence } from "framer-motion";
import { ShoeProduct } from "@/data/shoes";

interface ProductInfoProps {
  product: ShoeProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="absolute top-32 left-8 z-10"
      >
        <motion.h1
          className="text-3xl md:text-4xl font-semibold text-white mb-2 tracking-wide"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)", fontFamily: "'Inter', sans-serif" }}
        >
          {product.name}
        </motion.h1>
        <motion.p
          className="text-sm md:text-base font-medium text-white/80 mb-3 tracking-wide"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)", fontFamily: "'Inter', sans-serif" }}
        >
          {product.tagline}
        </motion.p>
        <motion.p
          className="text-2xl md:text-3xl font-semibold text-white"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)", fontFamily: "'Inter', sans-serif" }}
        >
          {product.price}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
