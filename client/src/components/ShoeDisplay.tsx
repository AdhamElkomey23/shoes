import { useRef, useState } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface ShoeDisplayProps {
  modelPath: string;
  isActive: boolean;
  selectedColor?: string;
  onDragRotate?: (deltaX: number) => void;
  onDraggingChange?: (isDragging: boolean) => void;
}

export function ShoeDisplay({ modelPath, isActive, onDragRotate, onDraggingChange }: ShoeDisplayProps) {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, modelPath);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMouseX, setPreviousMouseX] = useState(0);
  const manualRotationRef = useRef(-Math.PI / 2);
  const { gl } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = manualRotationRef.current;
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    setPreviousMouseX(e.clientX);
    gl.domElement.style.cursor = 'grabbing';
    if (onDraggingChange) onDraggingChange(true);
  };

  const handlePointerMove = (e: any) => {
    if (isDragging && meshRef.current) {
      const deltaX = e.clientX - previousMouseX;
      const rotationSpeed = 0.01;
      manualRotationRef.current += deltaX * rotationSpeed;
      meshRef.current.rotation.y = manualRotationRef.current;
      setPreviousMouseX(e.clientX);
      
      if (onDragRotate) {
        onDragRotate(deltaX);
      }
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    gl.domElement.style.cursor = 'grab';
    if (onDraggingChange) onDraggingChange(false);
  };

  return (
    <group 
      ref={meshRef} 
      position={[0, 0, 0]} 
      rotation={[0, manualRotationRef.current, 0]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <mesh>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial 
          map={texture} 
          transparent 
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
