"use client";

import type React from "react";
import styles from "./abd.module.css";

interface AnimatedBorderDivProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  initialColor?: string;
  hoverColor?: string;
}

const AnimatedBorderDiv = ({
  children,
  className = "",
  contentClassName = "",
  initialColor,
  hoverColor,
}: AnimatedBorderDivProps) => {
  const style = {
    "--initial-color": initialColor,
    "--hover-color": hoverColor,
  } as React.CSSProperties;

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <div className={`${styles.content} ${contentClassName}`}>{children}</div>
    </div>
  );
};
export default AnimatedBorderDiv;
