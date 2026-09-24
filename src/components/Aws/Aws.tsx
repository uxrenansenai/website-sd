import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../styles/motion';
import { Button } from '../Button/Button';
import { AwsMap } from './AwsMap';

export function Aws() {
  const reduced = useReducedMotion();
  return (
    <section className="aws" id="aws" aria-labelledby="aws-title">
      <motion.div className="aws__inner page-container" variants={reduced ? undefined : staggerContainer} initial={reduced ? undefined : 'hidden'} whileInView={reduced ? undefined : 'visible'} viewport={{ once: true, amount: 0.25 }}>
        <motion.div className="aws__headline" variants={reduced ? undefined : fadeUp}>
          <span className="eyebrow">SERVIÇOS</span>
          <h2 id="aws-title">Soluções <span className="aws__badge"><img src="/figma/aws/raw-2.png" alt="AWS" /></span> em nuvem<br />prontas para escalar</h2>
        </motion.div>
        <motion.div className="aws__copy" variants={reduced ? undefined : fadeUp}>
          <p>Como parceiros AWS, combinamos infraestrutura em nuvem e expertise para modernizar, escalar e proteger produtos digitais.</p>
          <Button variant="secondary" href="#contato" showArrow={false}>Construa uma parceria</Button>
        </motion.div>
      </motion.div>
      <AwsMap />
    </section>
  );
}
