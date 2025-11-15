import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect, useRef } from "react";
import { Environment } from "@react-three/drei";
import { ShoeDisplay } from "./ShoeDisplay";
import { ProductInfo } from "./ProductInfo";
import { NavigationControls } from "./NavigationControls";
import { LoadingProgress } from "./LoadingProgress";
import { ParticleField } from "./ParticleField";
import { ColorSelector } from "./ColorSelector";
import { shoeProducts, type ColorVariant } from "@/data/shoes";
import { motion, AnimatePresence } from "framer-motion";
import { useModelPreloader } from "@/hooks/useModelPreloader";

const AUTO_TRANSITION_DELAY = 5000;

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [selectedColors, setSelectedColors] = useState<Record<number, string>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const modelPaths = shoeProducts.map(p => p.modelPath);
  const { progress, isLoaded } = useModelPreloader(modelPaths);

  const currentProduct = shoeProducts[currentIndex];
  const currentColor = selectedColors[currentProduct.id] || currentProduct.color;

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!isPaused) {
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % shoeProducts.length);
      }, AUTO_TRANSITION_DELAY);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      resetTimer();
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, isPaused, isLoaded]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoomLevel((prev) => {
      const newZoom = prev - e.deltaY * 0.01;
      return Math.max(-3, Math.min(3, newZoom));
    });
  };

  if (!isLoaded) {
    return <LoadingProgress progress={progress} />;
  }

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

  const handleColorSelect = (variant: ColorVariant) => {
    setSelectedColors((prev) => ({
      ...prev,
      [currentProduct.id]: variant.color
    }));
  };

  return (
    <div 
      className="w-full h-screen relative overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: 'url(/nike-logo.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <ProductInfo product={currentProduct} />

      <ColorSelector
        variants={currentProduct.variants}
        selectedColor={currentColor}
        onColorSelect={handleColorSelect}
      />

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
          onWheel={handleWheel}
        >
          <Canvas
            camera={{
              position: [0, 0, 8 - zoomLevel],
              fov: 45,
            }}
            gl={{
              antialias: true,
              alpha: true,
            }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />

            <Suspense fallback={null}>
              <ParticleField />
              
              <ShoeDisplay
                modelPath={currentProduct.modelPath}
                isActive={true}
                selectedColor={currentColor}
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
