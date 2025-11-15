import { useState, useEffect } from "react";

export function useModelPreloader(modelPaths: string[]) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading progress for smooth UX
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 200);
          return 100;
        }
        return prev + 20;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return { progress, isLoaded };
}
