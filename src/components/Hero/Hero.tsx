import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, scaleIn, staggerContainer } from '../../styles/motion';
import { Sprite } from '../Sprite/Sprite';
import { Button } from '../Button/Button';

const partners = ['ESCOLA SESI', 'FIESC', 'SESI', 'WEG', 'GOVERNO DE SANTA CATARINA', 'SENAI', '<LAB365>'];

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <>
      <section className="hero" id="topo" aria-labelledby="hero-title">
        <div className="hero__glow hero__glow--left" aria-hidden="true" />
        <div className="hero__glow hero__glow--right" aria-hidden="true" />
        <motion.div className="hero__content page-container" variants={reduced ? undefined : staggerContainer} initial={reduced ? undefined : 'hidden'} animate={reduced ? undefined : 'visible'}>
          <motion.div variants={reduced ? undefined : scaleIn}><Sprite className="sprite--hero-mark" label="Símbolo tridimensional azul do SENAI Soluções Digitais" /></motion.div>
          <motion.h1 id="hero-title" variants={reduced ? undefined : fadeUp}>Soluções que<br />{' '}<span>transformam o futuro</span> da<br /> indústria</motion.h1>
          <motion.p variants={reduced ? undefined : fadeUp}>Parte do ecossistema FIESC, o maior sistema industrial de Santa Catarina. Desenvolvemos soluções digitais para empresas que precisam de mais do que uma agência, precisam de um parceiro que entende a indústria por dentro.</motion.p>
          <motion.div className="hero__actions" variants={reduced ? undefined : fadeUp}>
            <Button variant="primary" href="#contato">Fale com nosso time</Button>
            <Button variant="secondary" href="#cases">Conheça nossos cases</Button>
          </motion.div>
        </motion.div>
      </section>
      <div className="partners" aria-label="Parceiros e instituições do ecossistema FIESC"><div className="partners__track page-container">{partners.map((name, i) => <div className="partners__item" key={name}><span>{name}</span>{i < partners.length - 1 && <b aria-hidden="true">✳</b>}</div>)}</div></div>
    </>
  );
}
