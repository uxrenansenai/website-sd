export const motionEase = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: motionEase } },
};

export const headingReveal = {
  hidden: { y: 28, clipPath: 'inset(0 0 100% 0)' },
  visible: { y: 0, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.78, ease: motionEase } },
};

export const imageReveal = {
  hidden: { opacity: 0.65, y: 16, scale: 1.04, clipPath: 'inset(0 0 100% 0)' },
  visible: { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.82, ease: motionEase } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.65 } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

export const reveal = {
  hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: 'easeOut' as const } },
};
