"use client";

import { useRef } from "react";
import { animate } from "motion";

interface FlashAnimationOptions {
  fadeInDuration?: number;
  fadeOutDuration?: number;
}

export const useFlashAnimation = (options: FlashAnimationOptions = {}) => {
  const { fadeInDuration = 0.3, fadeOutDuration = 0.6 } = options;
  const flashRef = useRef<HTMLDivElement>(null);

  const triggerFlash = () => {
    if (flashRef.current) {
      animate(flashRef.current, { opacity: 1 }, { duration: fadeInDuration }).then(
        () => {
          if (flashRef.current) {
            animate(flashRef.current, { opacity: 0 }, { duration: fadeOutDuration });
          }
        }
      );
    }
  };

  return {
    triggerFlash,
    flashRef
  };
};