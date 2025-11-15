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
      <mesh position={[0, 0, -0.2]}>
        <circleGeometry args={[3.5, 64]} />
        <meshBasicMaterial 
          color="#8B5CF6"
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh position={[0, 0, -0.15]}>
        <circleGeometry args={[3, 64]} />
        <meshBasicMaterial 
          color="#A78BFA"
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh position={[0, 0, -0.1]}>
        <circleGeometry args={[2.5, 64]} />
        <meshBasicMaterial 
          color="#C4B5FD"
          transparent
          opacity={0.6}
        />
      </mesh>
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
