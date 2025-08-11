// Color constants
export const COLORS = {
  NEO_TEAL: "#03DAc6",
  NEO_PURPLE: "#BB86FC", 
  NEO_BLUE: "#23d1f6",
  NEO_YELLOW: "#FFF700",
  NEO_RED: "#FF6B6B",
  GRAY_DISABLED: "#666666"
} as const;

// Button style combinations
export const BUTTON_STYLES = {
  PRIMARY: {
    active: "bg-neo-navy text-neo-blue",
    disabled: "bg-gray-700 text-gray-400"
  },
  READY: {
    initialColor: COLORS.NEO_TEAL,
    hoverColor: COLORS.NEO_YELLOW
  },
  RESET: {
    initialColor: COLORS.NEO_RED,
    hoverColor: COLORS.NEO_YELLOW
  },
  RANDOM: {
    initialColor: COLORS.NEO_YELLOW,
    hoverColor: COLORS.NEO_TEAL
  }
} as const;

// Common class combinations
export const COMMON_CLASSES = {
  BUTTON_PRIMARY_ACTIVE: "bg-neo-navy text-neo-blue",
  BUTTON_PRIMARY_DISABLED: "bg-gray-700 text-gray-400",
  TEXT_STATS: "text-sm text-neo-blue",
  TEXT_NAME: "text-neo-yellow",
  TEXT_TYPE: "text-neo-purple", 
  TEXT_ORIGIN: "text-neo-red text-sm"
} as const;