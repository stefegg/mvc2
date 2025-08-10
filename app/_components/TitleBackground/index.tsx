"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TitleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeBackground = () => {
      if (containerRef.current) {
        const { innerWidth, innerHeight } = window;
        const scale = Math.max(innerWidth / 100, innerHeight / 100) * 1.5;
        containerRef.current.style.transform = `scale(${scale})`;
      }
    };

    resizeBackground();
    window.addEventListener("resize", resizeBackground);

    return () => {
      window.removeEventListener("resize", resizeBackground);
    };
  }, []);

  return (
    <>
      <div className={`fixed inset-0 z-0 overflow-hidden opacity-90`}>
        <motion.div
          ref={containerRef}
          className="w-[50%] h-[50%] origin-center"
          style={{
            position: "absolute",
            left: "27.5%",
            marginTop: "-50px",
            marginLeft: "-50px",
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient
                id="cosmicNumber2Gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#BB86FC">
                  <animate
                    attributeName="stop-color"
                    values="#BB86FC; #03DAc6; #BB86FC"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#03DAc6">
                  <animate
                    attributeName="stop-color"
                    values="#03DAc6; #23d1f6; #03DAc6"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#23d1f6">
                  <animate
                    attributeName="stop-color"
                    values="#23d1f6; #BB86FC; #23d1f6"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#glow)">
              <text
                x="50"
                y="70"
                fontSize="60"
                fontFamily="Arial, sans-serif"
                fontWeight="bold"
                textAnchor="middle"
                fill="url(#cosmicNumber2Gradient)"
                opacity="0.7"
              >
                2
              </text>
            </g>
          </svg>
        </motion.div>
      </div>
    </>
  );
};

export default TitleBackground;
