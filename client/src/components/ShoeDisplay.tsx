import { useRef, useState, useEffect } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

interface ShoeDisplayProps {
  modelPath: string;
  isActive: boolean;
  selectedColor?: string;
  onDragRotate?: (deltaX: number) => void;
  onDraggingChange?: (isDragging: boolean) => void;
}

export function ShoeDisplay({ modelPath, isActive, selectedColor, onDragRotate, onDraggingChange }: ShoeDisplayProps) {
  const meshRef = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, modelPath);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMouseX, setPreviousMouseX] = useState(0);
  const manualRotationRef = useRef(-Math.PI / 2); // Face left initially
  const { gl } = useThree();

  useEffect(() => {
    if (meshRef.current && selectedColor) {
      meshRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            const material = mesh.material as THREE.MeshStandardMaterial;
            if (material.color) {
              material.color.set(selectedColor);
              material.needsUpdate = true;
            }
          }
        }
      });
    }
  }, [selectedColor]);

  useFrame((state, delta) => {
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
      position={[0, -1, 0]} 
      scale={2.5}
      rotation={[0, manualRotationRef.current, 0]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <primitive object={gltf.scene.clone()} />
    </group>
  );
}
