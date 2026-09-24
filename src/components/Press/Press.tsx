import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../styles/motion';

const stories = [
  { publication: 'REVISTA EXAME', logo: '/figma/press/raw-2.png', title: 'Governo de Santa Catarina e SENAI lançam programa SCTech com inscrições gratuitas' },
  { publication: 'NSC TOTAL', logo: '/figma/press/raw-3.png', title: 'Parceria entre SENAI e empresas leva inovação digital ao chão de fábrica' },
  { publication: 'PORTAL DA INDÚSTRIA', logo: '/figma/press/raw-3.png', title: 'Indústria 4.0 chega às pequenas empresas com apoio do SENAI e BNDES' },
];

export function Press() {
  const reduced = useReducedMotion();
  return (
    <section className="press" id="midia" aria-labelledby="press-title">
      <motion.div className="page-container" variants={reduced ? undefined : staggerContainer} initial={reduced ? undefined : 'hidden'} whileInView={reduced ? undefined : 'visible'} viewport={{ once: true, amount: 0.18 }}>
        <motion.div className="press__heading" variants={reduced ? undefined : fadeUp}>
          <span className="eyebrow">NA MÍDIA</span>
          <h2 id="press-title">O que dizem sobre nós</h2>
          <p>Reconhecimento que vai além dos projetos. Veja como o mercado enxerga o trabalho da SENAI Soluções Digitais.</p>
        </motion.div>
        <div className="press__grid">
          {stories.map((story) => (
            <motion.article className="press__card" key={story.title} variants={reduced ? undefined : fadeUp}>
              <div className="press__image"><img src={story.logo} alt={`${story.publication}, publicação mencionada`} /></div>
              <h3>{story.title}</h3>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
