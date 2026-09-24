import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../styles/motion';
import { Sprite } from '../Sprite/Sprite';
import { Button } from '../Button/Button';

const stats = [
  { value: '100+', label: <>Projetos entregues<br /> e em produção</> },
  { value: '240+', label: <>Especialistas<br /> dedicados a cada projeto</> },
  { value: '20+', label: <>Anos de experiência<br /> no mercado digital</> },
];

export function About() {
  const reduced = useReducedMotion();
  return (
    <section className="about surface-light" id="sobre">
      <div className="page-container">
        <motion.div className="about__main" variants={reduced ? undefined : staggerContainer} initial={reduced ? undefined : 'hidden'} whileInView={reduced ? undefined : 'visible'} viewport={{ once: true, amount: 0.2 }}>
          <motion.div className="about__copy" variants={reduced ? undefined : fadeUp}>
            <span className="eyebrow">SOBRE</span>
            <h2>Somos<br /> parte de algo<br /> maior</h2>
            <p>O SENAI Soluções Digitais faz parte do SENAI/SC, uma das entidades que compõem a FIESC, Federação das Indústrias do Estado de Santa Catarina.</p>
            <p>Dentro desse ecossistema, contamos com um time remoto espalhado pelo Brasil, que trabalha em conjunto com diferentes áreas e parceiros para transformar tecnologia, inovação e conhecimento em soluções para desafios reais.</p>
            <p>Essa conexão nos aproxima de empresas, profissionais, especialistas, pesquisadores e dos desafios da indústria, criando um ambiente favorável para transformar ideias em soluções.</p>
            <Button variant="primary" href="https://fiesc.com.br/trabalhe-conosco" target="_blank" rel="noreferrer">Quero fazer parte desse time</Button>
          </motion.div>
          <motion.div className="about__photos" variants={reduced ? undefined : fadeUp}>
            <Sprite className="sprite--photo-building" label="Fachada do edifício da FIESC" />
            <Sprite className="sprite--photo-speaker" label="Profissional apresentando em evento" />
            <Sprite className="sprite--photo-team" label="Equipe SENAI Soluções Digitais" />
            <Sprite className="sprite--photo-audience" label="Público participando de evento" />
          </motion.div>
        </motion.div>
        <motion.div className="about__stats" variants={reduced ? undefined : staggerContainer} initial={reduced ? undefined : 'hidden'} whileInView={reduced ? undefined : 'visible'} viewport={{ once: true }}>
          {stats.map(stat => <motion.div variants={reduced ? undefined : fadeUp} key={stat.value}><strong>{stat.value}</strong><span>{stat.label}</span></motion.div>)}
        </motion.div>
      </div>
    </section>
  );
}
