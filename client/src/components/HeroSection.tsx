import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect, useRef } from "react";
import { Environment } from "@react-three/drei";
import { ShoeDisplay } from "./ShoeDisplay";
import { ProductInfo } from "./ProductInfo";
import { NavigationControls } from "./NavigationControls";
import { LoadingProgress } from "./LoadingProgress";
import { ParticleField } from "./ParticleField";
import { ColorSelector } from "./ColorSelector";
import { RotationIndicator } from "./RotationIndicator";
import { shoeProducts, type ColorVariant } from "@/data/shoes";
import { motion, AnimatePresence } from "framer-motion";
import { useModelPreloader } from "@/hooks/useModelPreloader";

const AUTO_TRANSITION_DELAY = 5000;

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [selectedColors, setSelectedColors] = useState<Record<number, string>>({});
  const [isDragging, setIsDragging] = useState(false);
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

      <NavigationControls
        currentIndex={currentIndex}
        totalProducts={shoeProducts.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onDotClick={handleDotClick}
      >
        <ColorSelector
          variants={currentProduct.variants}
          selectedColor={currentColor}
          onColorSelect={handleColorSelect}
        />
      </NavigationControls>

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
            <ambientLight color="#3B0F70" intensity={0.15} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />

            <Suspense fallback={null}>
              <ParticleField />
              
              <ShoeDisplay
                modelPath={currentProduct.modelPath}
                isActive={true}
                selectedColor={currentColor}
                onDraggingChange={setIsDragging}
              />

              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </motion.div>
      </AnimatePresence>

      <RotationIndicator isDragging={isDragging} />
    </div>
  );
}
