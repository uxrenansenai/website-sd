import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { fadeUp, headingReveal, imageReveal, staggerContainer } from '../../styles/motion';
import styles from './Press.module.css';

const stories = [
  {
    publication: 'OCP NEWS',
    logo: '/figma/press-v2/ocp-news.png',
    title: 'Governo de Santa Catarina e SENAI lançam programa SCTech com inscrições gratuitas',
    href: 'https://ocp.news/economia/governo-de-santa-catarina-e-senai-lancam-programa-sctech-com-inscricoes-gratuitas',
    ariaLabel: 'Ler reportagem da OCP News sobre o programa SCTech',
    logoClass: styles.logoOcp,
  },
  {
    publication: 'G1 · TECH SC',
    logo: '/figma/press-v2/g1.png',
    title: 'Tech SC destaca iniciativas do SENAI para transformação digital da indústria em Santa Catarina',
    href: 'https://g1.globo.com/sc/santa-catarina/techsc/noticia/2025/07/28/tech-sc-destaca-iniciativas-do-senai-para-transformacao-digital-da-industria-em-santa-catarina.ghtml',
    ariaLabel: 'Ler reportagem do G1 sobre transformação digital da indústria',
    logoClass: styles.logoG1,
  },
  {
    publication: 'SISTEMA INDÚSTRIA',
    logo: '/figma/press-v2/sistema-industria.svg',
    title: 'Chamada Smart Factory tem R$ 7 milhões para soluções digitais em MPMEs industriais',
    href: 'https://noticias.portaldaindustria.com.br/noticias/inovacao-e-tecnologia/chamada-smart-factory-tem-r-7-milhoes-para-solucoes-digitais-em-mpmes-industriais/',
    ariaLabel: 'Ler reportagem do Portal da Indústria sobre Smart Factory',
    logoClass: styles.logoSistema,
  },
];

export function Press() {
  const reduced = useReducedMotion();
  return (
    <section className={styles.section} id="midia" aria-labelledby="press-title">
      <div className={styles.backgroundGlow} aria-hidden="true"><img src="/figma/press-v2/blue-cloud-glow.svg" alt="" /></div>
      <motion.div className="page-container" initial={reduced ? undefined : 'hidden'} whileInView={reduced ? undefined : 'visible'} viewport={{ once: true, amount: 0.22 }}>
        <motion.header className={styles.heading} variants={reduced ? undefined : staggerContainer}>
          <motion.span className={styles.eyebrow} variants={reduced ? undefined : fadeUp}>NA MÍDIA</motion.span>
          <div className={styles.titleMask}>
            <motion.h2 id="press-title" variants={reduced ? undefined : headingReveal}>O que dizem sobre nós</motion.h2>
          </div>
          <motion.p variants={reduced ? undefined : fadeUp}>Reconhecimento que vai além dos projetos. Veja como o mercado enxerga o trabalho da SENAI Soluções Digitais.</motion.p>
        </motion.header>
        <motion.div className={styles.grid} variants={reduced ? undefined : staggerContainer}>
          {stories.map((story) => (
            <motion.a className={styles.card} key={story.title} href={story.href} target="_blank" rel="noopener noreferrer" aria-label={story.ariaLabel} variants={reduced ? undefined : fadeUp}>
              <motion.div className={styles.imagePanel} variants={reduced ? undefined : imageReveal}>
                <span className={styles.cardBlur} aria-hidden="true"><img src="/figma/press-v2/blur.svg" alt="" /></span>
                <img className={`${styles.logo} ${story.logoClass}`} src={story.logo} alt={`${story.publication}, veículo da reportagem`} />
              </motion.div>
              <div className={styles.cardBody}>
                <h3>{story.title}</h3>
                <span className={styles.readMore}>Ler matéria <ArrowUpRight size={17} aria-hidden="true" /></span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
