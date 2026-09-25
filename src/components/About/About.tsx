import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '../Button/Button';
import { CountUp } from './CountUp';

const aboutImages = {
  showcase: '/figma/about-v2/raw-1.png',
  building: '/figma/about-v2/raw-5.png',
  audience: '/figma/about-v2/raw-6.jpeg',
};

const stats = [
  { value: '20+', label: 'Anos de experiência no mercado digital' },
  { value: '240+', label: 'Especialistas dedicados aos projetos' },
  { value: '100+', label: 'Projetos entregues e operando em produção com alta disponibilidade' },
];

const mediaReveal = {
  hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)', y: 22, scale: 1.04 },
  visible: (delay = 0) => ({
    opacity: 1,
    clipPath: 'inset(0 0 0% 0)',
    y: 0,
    scale: 1,
    transition: { duration: 0.82, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const statReveal = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function About() {
  const reduced = useReducedMotion();
  const aboutRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const aboutVisible = useInView(aboutRef, { once: true, amount: 0.1 });
  const statsVisible = useInView(statsRef, { once: true, amount: 0.35 });

  return (
    <section ref={aboutRef} className="about surface-light" id="sobre" aria-labelledby="about-title">
      <div className="page-container">
        <header className="about__header">
          <span className="eyebrow">SOBRE</span>
          <h2 id="about-title">Somos parte de algo maior.</h2>
        </header>

        <div className="about__mosaic">
          <div className="about__left-column">
            <div className="about__narrative">
              <p>A SENAI Soluções Digitais faz parte do SENAI/SC, uma das entidades que compõem a FIESC - potência das indústrias do Estado de Santa Catarina. Dentro desse ecossistema, contamos com um time diverso e capacitado, que trabalha em conjunto com diferentes áreas e parceiros para transformar tecnologia, inovação e conhecimento em soluções para desafios reais.</p>
              <Button className="about__cta" variant="primary" href="#contato" showArrow={false}>Construa uma parceria</Button>
            </div>

            <div className="about__stats about__stats--left" ref={statsRef}>
              {stats.slice(0, 2).map((stat, index) => (
                <motion.div key={stat.value} custom={index} variants={reduced ? undefined : statReveal} initial={reduced ? undefined : 'hidden'} animate={statsVisible || reduced ? 'visible' : 'hidden'}>
                  <CountUp value={stat.value} index={index} active={statsVisible} />
                  <span>{stat.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div className="about__showcase" variants={reduced ? undefined : mediaReveal} custom={0.24} initial={reduced ? 'visible' : 'hidden'} animate={reduced || aboutVisible ? 'visible' : 'hidden'}>
              <video autoPlay={!reduced} muted loop playsInline preload="metadata" poster={aboutImages.showcase} aria-hidden="true" />
            </motion.div>
          </div>

          <div className="about__right-column">
            <motion.figure className="about__image about__image--building" variants={reduced ? undefined : mediaReveal} custom={0.08} initial={reduced ? 'visible' : 'hidden'} animate={reduced || aboutVisible ? 'visible' : 'hidden'}>
              <img src={aboutImages.building} alt="Edifício da FIESC com a identificação SENAI" />
            </motion.figure>
            <motion.figure className="about__image about__image--audience" variants={reduced ? undefined : mediaReveal} custom={0.16} initial={reduced ? 'visible' : 'hidden'} animate={reduced || aboutVisible ? 'visible' : 'hidden'}>
              <img src={aboutImages.audience} alt="Público reunido em evento do ecossistema SENAI" />
            </motion.figure>
            <motion.div className="about__stat about__stat--large" custom={2} variants={reduced ? undefined : statReveal} initial={reduced ? undefined : 'hidden'} animate={statsVisible || reduced ? 'visible' : 'hidden'}>
              <CountUp value={stats[2].value} index={2} active={statsVisible} />
              <span>{stats[2].label}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
