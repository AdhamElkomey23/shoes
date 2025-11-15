import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect, useRef } from "react";
import { Environment } from "@react-three/drei";
import { ShoeDisplay } from "./ShoeDisplay";
import { ProductInfo } from "./ProductInfo";
import { NavigationControls } from "./NavigationControls";
import { shoeProducts } from "@/data/shoes";
import { motion, AnimatePresence } from "framer-motion";

const AUTO_TRANSITION_DELAY = 5000;

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentProduct = shoeProducts[currentIndex];

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % shoeProducts.length);
    }, AUTO_TRANSITION_DELAY);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % shoeProducts.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + shoeProducts.length) % shoeProducts.length
    );
  };

  const handleDotClick = (index: number) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700/20 via-gray-900/50 to-black" />

      <ProductInfo product={currentProduct} />

      <NavigationControls
        currentIndex={currentIndex}
        totalProducts={shoeProducts.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onDotClick={handleDotClick}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full h-full absolute inset-0"
        >
          <Canvas
            camera={{
              position: [0, 0, 8],
              fov: 45,
            }}
            gl={{
              antialias: true,
              alpha: true,
            }}
          >
            <color attach="background" args={["transparent"]} />

            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />

            <Suspense fallback={null}>
              <ShoeDisplay
                modelPath={currentProduct.modelPath}
                isActive={true}
              />

              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-8 right-8 z-10">
        <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.504-.41-1.143-.28-1.918.13-.775.476-1.6 1.036-2.478.56-.878 1.266-1.747 2.117-2.606.851-.859 1.833-1.574 2.945-2.145C7.267 4.406 8.39 4 9.511 4c1.456 0 2.464.504 3.024 1.512L24 7.8z"/>
        </svg>
      </div>
    </div>
  );
}
