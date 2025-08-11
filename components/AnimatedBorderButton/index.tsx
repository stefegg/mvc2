"use client";

import type React from "react";
import styles from "./abd.module.css";

interface AnimatedBorderButtonProps {
  // Button props
  text: string;
  onClick?: () => void;
  disabled?: boolean;

  // AnimatedBorderDiv props
  className?: string;
  contentClassName?: string;
  initialColor?: string;
  hoverColor?: string;

  // Additional button styling
  buttonClassName?: string;
}

const AnimatedBorderButton = ({
  text,
  onClick,
  disabled = false,
  className = "",
  contentClassName = "",
  initialColor,
  hoverColor,
  buttonClassName,
}: AnimatedBorderButtonProps) => {
  const style = {
    "--initial-color": initialColor,
    "--hover-color": hoverColor,
  } as React.CSSProperties;

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <div className={`${styles.content} ${contentClassName}`}>
        <button
          className={`bg-transparent px-4 py-2 cursor-pointer ${
            buttonClassName || ""
          }`}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      </div>
    </div>
  );
};

export default AnimatedBorderButton;
