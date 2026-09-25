import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, headingReveal, staggerContainer } from '../../styles/motion';
import { Button } from '../Button/Button';
import { AwsMap } from './AwsMap';

export function Aws() {
  const reduced = useReducedMotion();
  return (
    <section className="aws" id="aws" aria-labelledby="aws-title">
      <motion.div className="aws__inner page-container" variants={reduced ? undefined : staggerContainer} initial={reduced ? undefined : 'hidden'} whileInView={reduced ? undefined : 'visible'} viewport={{ once: true, amount: 0.25 }}>
        <motion.div className="aws__headline" variants={reduced ? undefined : staggerContainer}>
          <motion.span className="eyebrow" variants={reduced ? undefined : fadeUp}>AWS</motion.span>
          <motion.h2 id="aws-title" variants={reduced ? undefined : headingReveal}>
            <span className="aws__title-line aws__title-line--brand">
              <span>Soluções</span>
              <span className="aws__badge"><img src="/figma/aws/raw-2.png" alt="AWS" /></span>
              <span>em nuvem</span>
            </span>
            <span className="aws__title-line">prontas para escalar</span>
          </motion.h2>
        </motion.div>
        <motion.div className="aws__copy" variants={reduced ? undefined : fadeUp}>
          <p>Como parceiros AWS, combinamos infraestrutura em nuvem e expertise para modernizar, escalar e proteger produtos digitais.</p>
          <Button variant="primary-dark" href="#contato" showArrow={false}>Construa uma parceria</Button>
        </motion.div>
      </motion.div>
      <AwsMap />
    </section>
  );
}
