import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, scaleIn, staggerContainer } from '../../styles/motion';
import { Sprite } from '../Sprite/Sprite';

export function Aws() {
  const reduced = useReducedMotion();
  return (
    <section className="aws" id="aws">
      <motion.div className="aws__inner page-container" variants={reduced ? undefined : staggerContainer} initial={reduced ? undefined : 'hidden'} whileInView={reduced ? undefined : 'visible'} viewport={{ once: true, amount: 0.3 }}>
        <motion.div variants={reduced ? undefined : scaleIn}><Sprite className="sprite--aws" label="Selo AWS Partner Select Tier Services" /></motion.div>
        <motion.div className="aws__copy" variants={reduced ? undefined : fadeUp}>
          <span className="eyebrow">SOLUÇÕES AWS</span>
          <h2>Somos parceiros<br /> da AWS</h2>
          <h3>Tecnologia em nuvem para transformar sua operação</h3>
          <p>Combinamos sua tecnologia de nuvem com mais de 20 anos de experiência no desenvolvimento de soluções para a indústria. Assim, ajudamos empresas a modernizar sistemas, migrar para a nuvem e criar produtos digitais preparados para crescer com segurança, escala e eficiência.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
