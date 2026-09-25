import { forwardRef, type KeyboardEvent } from 'react';
import { motion, type Variants } from 'framer-motion';

type ProjectCardProps = {
  title: string;
  category: string;
  description: string;
  active: boolean;
  reduced: boolean | null;
  screenImages: string[];
  onOpen?: () => void;
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
};

const imageReveal: Variants = {
  hidden: { opacity: 0.65, y: 16, scale: 1.04, clipPath: 'inset(0 0 100% 0)' },
  visible: { opacity: 1, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] } },
};

export const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(function ProjectCard({ title, category, description, active, reduced, screenImages, onOpen }, ref) {
  const interactive = Boolean(onOpen);
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!onOpen || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    onOpen();
  };

  return (
    <motion.article
      ref={ref}
      className="portfolio__case"
      key={title}
      variants={reduced ? undefined : staggerContainer}
      initial={reduced ? undefined : 'hidden'}
      animate={reduced ? undefined : 'visible'}
      whileTap={interactive && !reduced ? { scale: 0.995 } : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Abrir case ${title}` : undefined}
      onClick={onOpen}
      onKeyDown={onKeyDown}
    >
      <motion.div className="portfolio__copy" variants={reduced ? undefined : fadeUp}>
        {active ? <img className="portfolio__lab-logo" src="/figma/cases/raw-1.png" alt="SENAI Lab experience" /> : <span className="portfolio__category">{category}</span>}
        <h3>{title}</h3>
        <p>{description}</p>
      </motion.div>
      <motion.div className="portfolio__visual" variants={reduced ? undefined : imageReveal}>
        <div className="portfolio__characters"><img src={active ? '/figma/cases/raw-2.png' : '/figma/cases/raw-3.png'} alt="Avatares tridimensionais do SENAI Lab experience" /></div>
        <div className="portfolio__screens">{screenImages.map((src, index) => <img key={src} src={src} alt={`Tela ${index + 1} do SENAI Lab experience`} />)}</div>
      </motion.div>
    </motion.article>
  );
});
