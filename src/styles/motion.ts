export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.65 } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};

export const reveal = {
  hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: 'easeOut' as const } },
};
