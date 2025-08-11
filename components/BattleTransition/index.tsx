"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { COLORS } from "@/constants/theme";

interface BattleTransitionProps {
  onComplete: () => void;
}

const BattleTransition = ({ onComplete }: BattleTransitionProps) => {
  const [currentExplosion, setCurrentExplosion] = useState(-1);
  const [showFlash, setShowFlash] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Explosion positions: top-right, bottom-left, middle, bottom-right, top-left
  const positions = [
    { top: "20%", right: "24%" },
    { bottom: "24%", left: "20%" },
    { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
    { bottom: "20%", right: "20%" },
    { top: "24%", left: "24%" },
  ];

  // Pre-generate shuffled colors to ensure uniqueness
  const explosionColors = useMemo(() => {
    const colors = [
      COLORS.NEO_TEAL,
      COLORS.NEO_PURPLE,
      COLORS.NEO_BLUE,
      COLORS.NEO_YELLOW,
      COLORS.NEO_RED,
    ];
    return colors.sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    const sequence = async () => {
      // Show explosions one by one
      for (let i = 0; i < positions.length; i++) {
        setCurrentExplosion(i);
        await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms between each explosion
      }

      // All explosions done, trigger white flash
      setShowFlash(true);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Flash duration

      // Hide flash and show results with fade-in
      setShowFlash(false);
      setShowResults(true);

      // Complete the transition immediately after flash
      setTimeout(() => {
        onComplete();
      }, 100); // Small delay to ensure smooth transition
    };

    sequence();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {positions.map((position, index) => {
        const isActive = currentExplosion >= index;
        const color = explosionColors[index];

        return (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              ...position,
              backgroundColor: color,
            }}
            initial={{
              width: 0,
              height: 0,
              opacity: 0,
            }}
            animate={
              isActive
                ? {
                    width: [0, 900],
                    height: [0, 900],
                    opacity: [0, 0.8, 0],
                  }
                : {
                    width: 0,
                    height: 0,
                    opacity: 0,
                  }
            }
            transition={{
              duration: 0.9,
              ease: "easeOut",
              times: [0, 0.7, 1],
            }}
          />
        );
      })}

      {showFlash && (
        <motion.div
          className="fixed inset-0 bg-white z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            times: [0, 0.2, 1],
            ease: "easeOut",
          }}
        />
      )}
    </div>
  );
};

export default BattleTransition;
