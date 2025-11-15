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

  const aspect = texture.image.width / texture.image.height;
  const height = 4;
  const width = height * aspect;

  return (
    <group 
      ref={meshRef} 
      position={[0, 0, 0]} 
      rotation={[0, 0, 0]}
    >
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
