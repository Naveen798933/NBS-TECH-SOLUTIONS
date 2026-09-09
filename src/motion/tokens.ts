// src/motion/tokens.ts
export const easing = {
  standard: [0.22, 1, 0.36, 1] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
};

export const duration = {
  micro: 0.15,
  base: 0.4,
  scene: 0.7,
};

export const springConfig = {
  type: "spring" as const,
  stiffness: 260,
  damping: 24,
};

export const softSpringConfig = {
  type: "spring" as const,
  stiffness: 180,
  damping: 20,
};

export const transitionStandard = {
  duration: duration.base,
  ease: easing.standard,
};

export const transitionScene = {
  duration: duration.scene,
  ease: easing.standard,
};
