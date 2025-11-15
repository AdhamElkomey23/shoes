import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

interface ShoeDisplayProps {
  modelPath: string;
  isActive: boolean;
}

export function ShoeDisplay({ modelPath, isActive }: ShoeDisplayProps) {
  const meshRef = useRef<THREE.Group>(null);
  const gltf = useLoader(GLTFLoader, modelPath);

  useFrame((state, delta) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={meshRef} position={[0, -1, 0]} scale={2.5}>
      <primitive object={gltf.scene.clone()} />
    </group>
  );
}
