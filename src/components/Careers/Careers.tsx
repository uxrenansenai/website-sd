import { motion, useReducedMotion } from 'framer-motion';

import { Button } from '../Button/Button';
import styles from './Careers.module.css';

const opportunitiesUrl = 'https://fiesc.com.br/trabalhe-conosco';
const glassdoorUrl = 'https://www.glassdoor.com.br/Avalia%C3%A7%C3%B5es/SENAI-Solu%C3%A7%C3%B5es-Digitais-Avalia%C3%A7%C3%B5es-E10249394.htm';
const linkedinUrl = 'https://www.linkedin.com/company/senai-solu%C3%A7%C3%B5es-digitais/home/';
const instagramUrl = 'https://www.instagram.com/senaisolucoesdigitais.sc/';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: 'easeOut' as const } },
};

const revealHeadline = {
  hidden: { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.74, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.11 } },
};

const dividerReveal = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, delay: 0.18, ease: 'easeOut' as const } },
};

export function Careers() {
  const reduced = useReducedMotion();
  const initial = reduced ? undefined : 'hidden';
  const animate = reduced ? undefined : 'visible';

  return (
    <section className={styles.section} id="trabalhe-conosco" aria-labelledby="careers-title">
      <motion.div
        className="page-container"
        variants={reduced ? undefined : stagger}
        initial={initial}
        whileInView={animate}
        viewport={{ once: true, amount: 0.28 }}
      >
        <div className={styles.upperContent}>
          <div className={styles.headingBlock}>
            <motion.p className={styles.eyebrow} variants={reduced ? undefined : fadeUp}>Trabalhe conosco</motion.p>
            <div className={styles.headlineMask}>
              <motion.h2 id="careers-title" variants={reduced ? undefined : revealHeadline}>
                Nossa história<br />continua com você.
              </motion.h2>
            </div>
          </div>

          <motion.div className={styles.rightBlock} variants={reduced ? undefined : fadeUp}>
            <p>Faça parte de um time que transforma desafios reais em produtos digitais, tecnologia e inovação para a indústria.</p>
            <Button variant="primary-dark" href={opportunitiesUrl} target="_blank" rel="noopener noreferrer" showArrow={false}>
              Conheça nossas oportunidades
            </Button>
          </motion.div>
        </div>

        <motion.div className={styles.touchpoints} variants={reduced ? undefined : dividerReveal}>
          <a className={`${styles.glassdoor} ${styles.touchpoint}`} href={glassdoorUrl} target="_blank" rel="noopener noreferrer" aria-label="Avaliações da SENAI Soluções Digitais no Glassdoor">
            <span>Avaliações no Glassdoor</span>
            <span className={styles.touchpointDivider} aria-hidden="true" />
            <span className={styles.underlined}>Ver avaliações</span>
          </a>

          <div className={styles.socials}>
            <a className={styles.touchpoint} href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn SENAI Soluções Digitais">
              <img src="/figma/careers/linkedin.svg" alt="" aria-hidden="true" />
              <span>Acompanhe nosso time</span>
            </a>
            <a className={styles.touchpoint} href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram SENAI Soluções Digitais">
              <img src="/figma/careers/instagram.svg" alt="" aria-hidden="true" />
              <span>Veja nosso dia a dia</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
