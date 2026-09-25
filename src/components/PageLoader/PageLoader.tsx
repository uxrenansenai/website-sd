import { motion } from 'framer-motion';
import styles from './PageLoader.module.css';

export function PageLoader({ onFinished }: { onFinished: () => void }) {
  return (
    <motion.div
      className={styles.loader}
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.34, ease: 'easeInOut' } }}
    >
      <motion.img
        className={styles.symbol}
        src="/figma/header/logo.svg"
        alt=""
        initial={{ opacity: 0, scale: 0.84, filter: 'blur(10px)', clipPath: 'inset(100% 0 0 0)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', clipPath: 'inset(0 0 0 0)' }}
        transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={onFinished}
      />
    </motion.div>
  );
}
