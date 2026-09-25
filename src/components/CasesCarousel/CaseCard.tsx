import { motion, type Variants } from 'framer-motion';
import type { Ref } from 'react';
import type { CaseItem } from './casesData';
import styles from './CasesCarousel.module.css';

type Props = { item: CaseItem; reduced: boolean; direction: 1 | -1; onOpen?: () => void; cardRef?: Ref<HTMLElement> };

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};
const tagVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (index: number) => ({ opacity: 1, y: 0, transition: { delay: index * 0.06, duration: 0.3 } }),
};

export function CaseCard({ item, reduced, direction, onOpen, cardRef }: Props) {
  const isLab = item.visual === 'lab';
  const isEdtechLab = item.visual === 'edtechLab';
  const isAudio = item.visual === 'audio';
  const isCommerce = item.visual === 'commerce';
  const isEcommerce = item.visual === 'ecommerce';
  const isHabilita = item.visual === 'habilita';
  const isLogosGrid = item.visual === 'logosGrid';
  return (
    <motion.article
      ref={cardRef}
      className={`${styles.card} ${styles[`card--${item.visual}`]} ${isAudio && item.background ? styles.cardAudioCustom : ''} ${isEcommerce && item.background ? styles.cardEcommerceCustom : ''}`}
      style={item.background ? { backgroundImage: `url(${item.background})` } : undefined}
      initial={reduced ? { opacity: 1 } : { opacity: 0, x: direction * 54, scale: 0.985 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -54, scale: 0.985, transition: { duration: 0.38, ease: [0.4, 0, 1, 1] } }}
      role={onOpen ? 'button' : undefined} tabIndex={onOpen ? 0 : undefined}
      aria-label={onOpen ? `Abrir case ${item.title}` : undefined} onClick={onOpen}
      onKeyDown={event => { if (!onOpen || (event.key !== 'Enter' && event.key !== ' ')) return; event.preventDefault(); onOpen(); }}
    >
      <motion.div className={styles.copy} variants={reduced ? undefined : contentVariants} initial={reduced ? undefined : 'hidden'} animate={reduced ? undefined : 'visible'}>
        {isLab || isEdtechLab ? <img className={styles.labLogo} src={item.logo ?? '/figma/cases-v2/raw-2.png'} alt="SENAI Lab experience" /> : isAudio ? <img className={styles.audioLogo} src={item.logo ?? '/figma/cases-v2/raw-10.png'} alt="AudioXP" /> : isEcommerce || isHabilita ? null : <span className={styles.category}>{item.category}</span>}
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className={styles.tags} aria-label="Tecnologias do projeto">{item.tags.map((tag, index) => <motion.span key={tag} custom={index} variants={reduced ? undefined : tagVariants} initial={reduced ? undefined : 'hidden'} animate={reduced ? undefined : 'visible'}>{tag}</motion.span>)}</div>
      </motion.div>
      <div className={styles.visual} aria-hidden="true">
        {(isLab || isEdtechLab) && <img src={item.image} alt="" />}
        {isAudio && <><img className={styles.audioBackground} src={item.background ?? '/figma/cases-v2/raw-11.png'} alt="" /><img className={styles.audioIllustration} src={item.illustration ?? item.image} alt="" /></>}
        {isCommerce && <><img className={styles.commercePerson} src="/figma/cases-v2/raw-13.png" alt="" /><img className={styles.commerceDevices} src={item.image} alt="" /></>}
        {!isLab && !isEdtechLab && !isAudio && !isCommerce && !isEcommerce && !isHabilita && !isLogosGrid && <img className={styles.genericImage} src={item.image} alt="" />}
        {isLogosGrid && item.logos?.map(logo => <div className={styles.logoTile} key={logo}><img src={logo} alt="" /></div>)}
      </div>
    </motion.article>
  );
}
