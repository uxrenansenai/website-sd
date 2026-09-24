import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, scaleIn, staggerContainer } from '../../styles/motion';
import { Button } from '../Button/Button';

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="hero" id="topo" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true" />
      <motion.div className="hero__content page-container" variants={reduced ? undefined : staggerContainer} initial={reduced ? undefined : 'hidden'} animate={reduced ? undefined : 'visible'}>
        <motion.div className="hero__mark-wrap" variants={reduced ? undefined : scaleIn}>
          <img className="hero__mark" src="/figma/hero/raw-3.png" alt="Símbolo tridimensional azul do SENAI Soluções Digitais" />
        </motion.div>
        <motion.h1 id="hero-title" variants={reduced ? undefined : fadeUp}>Soluções que <span>transformam o futuro</span> da indústria</motion.h1>
        <motion.p variants={reduced ? undefined : fadeUp}>Parte do ecossistema FIESC, o maior sistema industrial de Santa Catarina. Desenvolvemos soluções digitais para empresas que precisam de mais do que uma agência, precisam de um parceiro que entende a indústria por dentro.</motion.p>
        <motion.div className="hero__actions" variants={reduced ? undefined : fadeUp}>
          <Button variant="primary" href="#contato" showArrow={false}>Fale com nosso time</Button>
          <Button variant="secondary" href="#cases" showArrow={false}>Conheça nossos cases</Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
