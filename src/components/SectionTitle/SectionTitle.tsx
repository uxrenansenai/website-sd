import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../styles/motion';

type Props = { eyebrow: string; title: React.ReactNode; description?: string; dark?: boolean; className?: string };

export function SectionTitle({ eyebrow, title, description, dark = false, className = '' }: Props) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={`section-title ${dark ? 'section-title--dark' : ''} ${className}`} variants={reduced ? undefined : staggerContainer} initial={reduced ? undefined : 'hidden'} whileInView={reduced ? undefined : 'visible'} viewport={{ once: true, amount: 0.3 }}>
      <motion.span className="eyebrow" variants={reduced ? undefined : fadeUp}>{eyebrow}</motion.span>
      <motion.h2 variants={reduced ? undefined : fadeUp}>{title}</motion.h2>
      {description && <motion.p variants={reduced ? undefined : fadeUp}>{description}</motion.p>}
    </motion.div>
  );
}
