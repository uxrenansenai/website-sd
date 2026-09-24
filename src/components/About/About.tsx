import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, reveal, staggerContainer } from '../../styles/motion';
import { Button } from '../Button/Button';
import { CountUp } from './CountUp';

const stats = [
  { value: '20+', label: 'Anos de experiência no mercado digital' },
  { value: '240+', label: 'Especialistas dedicados a cada projeto', accent: true },
  { value: '100+', label: 'Projetos entregues e em produção' },
];

const partners = ['/figma/about/raw-3.png', '/figma/about/raw-4.png', '/figma/about/raw-5.png', '/figma/about/raw-7.png'];

export function About() {
  const reduced = useReducedMotion();
  const statsRef = useRef<HTMLDivElement>(null);
  const statsVisible = useInView(statsRef, { once: true, amount: 0.4 });
  return (
    <section className="about surface-light" id="sobre" aria-labelledby="about-title">
      <div className="page-container">
        <motion.div className="about__hero" variants={reduced ? undefined : reveal} initial={reduced ? undefined : 'hidden'} animate={reduced ? undefined : 'visible'}>
          <img src="/figma/about/raw-6.jpeg" alt="Ambiente industrial com robôs e linhas de produção" />
          <div className="about__hero-copy"><span className="eyebrow">SOBRE</span><h2 id="about-title">Somos parte de<br /> algo maior</h2></div>
        </motion.div>
        <motion.div className="about__details" variants={reduced ? undefined : staggerContainer} initial={reduced ? undefined : 'hidden'} whileInView={reduced ? undefined : 'visible'} viewport={{ once: true, amount: 0.2 }}>
          <motion.div className="about__copy" variants={reduced ? undefined : fadeUp}>
            <p>A SENAI Soluções Digitais faz parte do SENAI/SC, uma das entidades que compõem a FIESC - potência das indústrias do Estado de Santa Catarina. Dentro desse ecossistema, contamos com um time diverso e capacitado, que trabalha em conjunto com diferentes áreas e parceiros para transformar tecnologia, inovação e conhecimento em soluções para desafios reais.</p>
            <div className="about__actions"><Button variant="primary" href="#contato" showArrow={false}>Construa uma parceria</Button><a href="#contato">Conheça mais da nossa historia</a></div>
          </motion.div>
          <div className="about__stats" ref={statsRef}>{stats.map((stat, index) => <motion.div key={stat.value} variants={reduced ? undefined : fadeUp}><CountUp value={stat.value} index={index} active={statsVisible} accent={stat.accent} /><span>{stat.label}</span></motion.div>)}</div>
        </motion.div>
        <div className="about__partners"><strong>Nossos<br />Parceiros</strong>{partners.map(src => <img key={src} src={src} alt="" />)}</div>
      </div>
    </section>
  );
}
