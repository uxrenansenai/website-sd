import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, headingReveal, staggerContainer } from '../../styles/motion';
import { Button } from '../Button/Button';

export function Hero({ ready = true }: { ready?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <section className="hero hero--figma" id="topo" aria-labelledby="hero-title">
      <motion.img className="hero__blur hero__blur--left" src="/figma/hero-v2/blur.svg" alt="" aria-hidden="true" initial={reduced ? undefined : { opacity: 0 }} animate={reduced || ready ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.7 }} />
      <motion.img className="hero__blur hero__blur--right" src="/figma/hero-v2/blur.svg" alt="" aria-hidden="true" initial={reduced ? undefined : { opacity: 0 }} animate={reduced || ready ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.7, delay: 0.08 }} />
      <motion.img className="hero__decor hero__decor--left" src="/figma/hero-v2/logo-a.svg" alt="" aria-hidden="true" initial={reduced ? undefined : { opacity: 0, x: -28 }} animate={reduced || ready ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }} transition={{ duration: 0.85, ease: 'easeOut' }} />
      <motion.img className="hero__decor hero__decor--right" src="/figma/hero-v2/logo-b.svg" alt="" aria-hidden="true" initial={reduced ? undefined : { opacity: 0, x: 28 }} animate={reduced || ready ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }} transition={{ duration: 0.85, ease: 'easeOut', delay: 0.08 }} />
      <motion.div className="hero__content hero__content--figma page-container" variants={reduced ? undefined : staggerContainer} initial={reduced ? undefined : 'hidden'} animate={reduced ? undefined : ready ? 'visible' : 'hidden'}>
        <motion.h1 id="hero-title" className="hero__title--figma" variants={reduced ? undefined : headingReveal}>
          <span className="hero__title-line">Soluções que</span>
          <span className="hero__title-line hero__title-line--blue">transformam o</span>
          <span className="hero__title-line"><span className="hero__title-line--blue">futuro</span> da indústria</span>
        </motion.h1>
        <motion.p variants={reduced ? undefined : fadeUp}>Desenvolvemos soluções digitais para transformar desafios da indústria em novas possibilidades. De plataformas e aplicativos a experiências com IA, dados e tecnologias emergentes, dentro do ecossistema FIESC.</motion.p>
        <motion.div className="hero__actions" variants={reduced ? undefined : fadeUp}>
          <Button variant="primary-dark" href="#contato" showArrow={false}>Fale com nosso time</Button>
          <Button variant="text-link" href="#cases">Conheça nossos cases</Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
