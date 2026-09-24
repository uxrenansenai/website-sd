import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { fadeUp, staggerContainer } from '../../styles/motion';

const filters = ['Realidade Estendida', 'Web', 'Mobile', 'Inteligência Artificial', 'EdTech & HealthTech', 'Big Data & Analytics'];
const cases = [
  { title: 'SENAI Lab experience', category: 'Realidade Estendida', description: 'Sala de aula virtual estruturada para a prática da Metodologia SENAI de Educação. O usuário pode personalizar seu avatar e conectar-se com os docentes e colegas de turma para discutirem e criarem soluções juntos em um ambiente imersivo, utilizando texto, voz ou mesmo emojis para comunicação.' },
  { title: 'Experiências para a indústria', category: 'Web', description: 'Criamos plataformas digitais que aproximam pessoas, dados e operações, com experiências intuitivas para desafios reais da indústria.' },
  { title: 'Soluções digitais em movimento', category: 'Mobile', description: 'Aplicações feitas para conectar equipes e processos em qualquer lugar, com foco em desempenho e facilidade de uso.' },
  { title: 'Inteligência para evoluir', category: 'Inteligência Artificial', description: 'Dados e inteligência aplicados a decisões mais rápidas, automação de processos e novas possibilidades para a indústria.' },
  { title: 'Tecnologia que ensina e cuida', category: 'EdTech & HealthTech', description: 'Experiências digitais especializadas em educação e saúde, desenhadas para pessoas e organizações.' },
  { title: 'Dados que geram resultados', category: 'Big Data & Analytics', description: 'Transformamos grandes volumes de informação em clareza para apoiar decisões estratégicas.' },
];

const screenImages = ['/figma/cases/raw-5.png', '/figma/cases/raw-7.png', '/figma/cases/raw-10.png', '/figma/cases/raw-8.png'];

export function Portfolio() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const selected = cases[active];
  const select = (index: number) => setActive((index + cases.length) % cases.length);

  return (
    <section className="portfolio surface-light" id="cases" aria-labelledby="portfolio-title">
      <div className="page-container">
        <SectionTitle eyebrow="CASES" title={<span id="portfolio-title">Conheça nossas soluções</span>} />
        <div className="portfolio__filters" role="group" aria-label="Filtrar cases">
          {filters.map((filter, index) => <button key={filter} type="button" className={active === index ? 'is-active' : ''} aria-pressed={active === index} onClick={() => select(index)}>{filter}</button>)}
        </div>
        <div className="portfolio__carousel">
          <button className="round-arrow" type="button" aria-label="Case anterior" onClick={() => select(active - 1)}><ArrowLeft size={18} /></button>
          <motion.article className="portfolio__case" key={selected.title} variants={reduced ? undefined : staggerContainer} initial={reduced ? undefined : 'hidden'} animate={reduced ? undefined : 'visible'}>
            <motion.div className="portfolio__copy" variants={reduced ? undefined : fadeUp}>
              {active === 0 ? <img className="portfolio__lab-logo" src="/figma/cases/raw-1.png" alt="SENAI Lab experience" /> : <span className="portfolio__category">{selected.category}</span>}
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
            </motion.div>
            <motion.div className="portfolio__visual" variants={reduced ? undefined : fadeUp}>
              <div className="portfolio__characters"><img src={active === 0 ? '/figma/cases/raw-2.png' : '/figma/cases/raw-3.png'} alt="Avatares tridimensionais do SENAI Lab experience" /></div>
              <div className="portfolio__screens">{screenImages.map((src, index) => <img key={src} src={src} alt={`Tela ${index + 1} do SENAI Lab experience`} />)}</div>
            </motion.div>
          </motion.article>
          <button className="round-arrow" type="button" aria-label="Próximo case" onClick={() => select(active + 1)}><ArrowRight size={18} /></button>
        </div>
        <div className="portfolio__dots" role="group" aria-label="Selecionar case">{cases.map((item, index) => <button key={item.title} type="button" className={index === active ? 'is-active' : ''} aria-label={`Ver case ${index + 1}: ${item.title}`} aria-current={index === active ? 'true' : undefined} onClick={() => select(index)} />)}</div>
      </div>
    </section>
  );
}
