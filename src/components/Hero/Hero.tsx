import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { fadeUp, headingReveal, scaleIn, staggerContainer } from '../../styles/motion';
import { Button } from '../Button/Button';

export function Hero({ ready = true }: { ready?: boolean }) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [compact, setCompact] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentDesktopY = useTransform(scrollYProgress, [0, 1], [0, -42]);
  const contentMobileY = useTransform(scrollYProgress, [0, 1], [0, -14]);
  const markDesktopY = useTransform(scrollYProgress, [0, 1], [0, -52]);
  const markMobileY = useTransform(scrollYProgress, [0, 1], [0, -18]);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 900px)');
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <section className="hero" id="topo" aria-labelledby="hero-title" ref={sectionRef}>
      <div className="hero__glow" aria-hidden="true" />
      <motion.div className="hero__content page-container" variants={reduced ? undefined : staggerContainer} initial={reduced ? undefined : 'hidden'} animate={reduced ? undefined : ready ? 'visible' : 'hidden'} style={reduced ? undefined : { y: compact ? contentMobileY : contentDesktopY }}>
        <motion.div className="hero__mark-wrap" variants={reduced ? undefined : scaleIn} style={reduced ? undefined : { y: compact ? markMobileY : markDesktopY }}>
          <motion.div className="hero__mark-float" animate={reduced ? undefined : { y: [4, -8, 4], rotate: [-0.7, 0.7, -0.7] }} transition={reduced ? undefined : { duration: 6, ease: 'easeInOut', repeat: Infinity }}>
            <img className="hero__mark" src="/figma/hero/raw-3.png" alt="Símbolo tridimensional azul do SENAI Soluções Digitais" />
          </motion.div>
        </motion.div>
        <motion.h1 id="hero-title" variants={reduced ? undefined : headingReveal}>Soluções que <span>transformam o futuro</span> da indústria</motion.h1>
        <motion.p variants={reduced ? undefined : fadeUp}>Parte do ecossistema FIESC, o maior sistema industrial de Santa Catarina. Desenvolvemos soluções digitais para empresas que precisam de mais do que uma agência, precisam de um parceiro que entende a indústria por dentro.</motion.p>
        <motion.div className="hero__actions" variants={reduced ? undefined : fadeUp}>
          <Button variant="primary-dark" href="#contato" showArrow={false}>Fale com nosso time</Button>
          <Button variant="text-link" href="#cases">Conheça nossos cases</Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
