import { useState, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

export function useModelPreloader(modelPaths: string[]) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedModels, setLoadedModels] = useState<Map<string, any>>(new Map());

  useEffect(() => {
    const loader = new GLTFLoader();
    const totalModels = modelPaths.length;
    let loadedCount = 0;

    const loadModel = (path: string) => {
      return new Promise((resolve) => {
        loader.load(
          path,
          (gltf) => {
            loadedCount++;
            const currentProgress = (loadedCount / totalModels) * 100;
            setProgress(currentProgress);
            
            setLoadedModels((prev) => {
              const newMap = new Map(prev);
              newMap.set(path, gltf);
              return newMap;
            });
            
            resolve(gltf);
          },
          undefined,
          (error) => {
            console.error(`Error loading model ${path}:`, error);
            loadedCount++;
            const currentProgress = (loadedCount / totalModels) * 100;
            setProgress(currentProgress);
            resolve(null);
          }
        );
      });
    };

    Promise.all(modelPaths.map(loadModel)).then(() => {
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    });
  }, []);

  return { progress, isLoaded, loadedModels };
}
