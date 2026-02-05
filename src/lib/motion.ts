import { Variants } from "framer-motion";

const EASE_STANDARD: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const DURATION_FAST = 0.25;
const DURATION_BASE = 0.4;
const DURATION_SLOW = 0.5;

// Fade in from bottom
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_STANDARD,
    },
  },
};

// Fade in from top
export const fadeInDown: Variants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_STANDARD,
    },
  },
};

// Fade in
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: DURATION_BASE,
      ease: "easeOut",
    },
  },
};

// Scale in
export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION_FAST,
      ease: EASE_STANDARD,
    },
  },
};

// Stagger container
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Fast stagger
export const staggerContainerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// Slow stagger for sections
export const staggerContainerSlow: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Card hover
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: DURATION_FAST,
      ease: EASE_STANDARD,
    },
  },
};

// Button hover
export const buttonHover = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: DURATION_FAST,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

// Slide in from left
export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_STANDARD,
    },
  },
};

// Slide in from right
export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_STANDARD,
    },
  },
};

// Page transition
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_BASE,
      ease: EASE_STANDARD,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: DURATION_FAST,
      ease: "easeIn",
    },
  },
};

// Expand/collapse (for accordions, modals, expandable cards)
export const expand: Variants = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: DURATION_BASE,
        ease: EASE_STANDARD,
      },
      opacity: {
        duration: DURATION_FAST,
        delay: 0.1,
        ease: "easeOut",
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: DURATION_FAST,
        ease: "easeIn",
      },
      opacity: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  },
};

// Modal/overlay animation
export const modal: Variants = {
  initial: {
    opacity: 0,
    scale: 0.96,
    y: 8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATION_BASE,
      ease: EASE_STANDARD,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 4,
    transition: {
      duration: DURATION_FAST,
      ease: "easeIn",
    },
  },
};

// Overlay backdrop
export const overlay: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: DURATION_FAST,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION_FAST,
      ease: "easeIn",
    },
  },
};

// Reduced motion variants
export const reducedMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.01 } },
};

// Create a viewport setting for scroll animations
export const viewport = {
  once: true,
  margin: "-50px",
};

export const viewportEager = {
  once: true,
  margin: "-100px",
};
