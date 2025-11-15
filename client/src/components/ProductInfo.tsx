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
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
        className="absolute left-10 top-1/2 -translate-y-1/2 z-10 max-w-md"
      >
        <h1 className="text-6xl font-black text-white mb-2 tracking-widest leading-tight uppercase" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {product.name}
        </h1>
        <p className="text-xl text-white/90 mb-6 font-bold tracking-wider uppercase" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', letterSpacing: '0.15em' }}>
          {product.tagline}
        </p>
        <div className="text-4xl font-black text-white tracking-wider" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', letterSpacing: '0.1em' }}>
          ${product.price.toFixed(2)}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}