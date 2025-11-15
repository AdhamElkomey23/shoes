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
  const manualRotationRef = useRef(0);
  const { gl } = useThree();

  return (
    <group 
      ref={meshRef} 
      position={[0, 0, 0]} 
      rotation={[0, 0, 0]}
    >
      <mesh>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial 
          map={texture} 
          transparent={false}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[4.5, 4.5]} />
        <meshBasicMaterial color="#ffffff" opacity={0.3} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
