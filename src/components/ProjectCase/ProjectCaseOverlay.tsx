import { useEffect, useRef, useState, type FormEvent, type RefObject } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './ProjectCase.module.css';

export type ProjectCaseData = {
  title: string;
  category: string;
  logo: string;
  customization: string;
  classroom: string;
  avatars: string;
  tags: string[];
  sections: Array<{ title: string; text: string }>;
};

export const labExperienceCase: ProjectCaseData = {
  title: 'AudioXP',
  category: 'Realidade Virtual',
  logo: '/figma/cases/audioxp/1.png',
  customization: '/figma/cases/audioxp/2.png',
  classroom: '/figma/cases/audioxp/3.png',
  avatars: '/figma/cases/audioxp/4.png',
  tags: ['Realidade Virtual', 'App', 'Web'],
  sections: [
    { title: 'Contexto', text: 'Aplicativo educacional em Realidade Virtual e Mista (VR/MR) que permite explorar, de forma imersiva e interativa, a composição e o funcionamento do aparelho auditivo humano.' },
    { title: 'Desafio', text: 'Tornar o aprendizado sobre a audição mais visual, intuitivo e envolvente, permitindo compreender tanto o funcionamento do aparelho auditivo quanto os efeitos causados por diferentes níveis de dano auditivo.' },
    { title: 'Solução', text: 'Desenvolvimento de uma experiência imersiva com simulações interativas, identificação dos componentes do aparelho auditivo e alternância entre Realidade Mista e Realidade Virtual, acompanhada de tutorial para facilitar a ambientação e o uso da aplicação.' },
    { title: 'Impacto', text: 'Aproxima o conteúdo teórico de uma experiência prática e visual, facilitando a compreensão do funcionamento da audição e tornando mais tangível a relação entre danos auditivos e seus impactos na percepção sonora.' },
  ],
};

export const senaiLabExperienceCase: ProjectCaseData = {
  title: 'SENAI Lab experience',
  category: 'Realidade Virtual',
  logo: '/figma/cases/case-lab-1.png',
  customization: '/figma/cases/case-lab-3.png',
  classroom: '/figma/cases/case-lab-5.png',
  avatars: '/figma/cases/case-lab-7.png',
  tags: ['Realidade Virtual', 'EdTech', 'App'],
  sections: [
    { title: 'Contexto', text: 'Ambiente virtual imersivo desenvolvido para apoiar a Metodologia SENAI de Educação, criando uma sala de aula digital onde estudantes e docentes podem interagir, colaborar e desenvolver atividades de forma integrada.' },
    { title: 'Desafio', text: 'Ampliar as possibilidades da sala de aula tradicional, proporcionando um ambiente que favoreça a interação, colaboração e comunicação entre estudantes e professores, mesmo em experiências remotas ou virtuais.' },
    { title: 'Solução', text: 'Desenvolvimento de uma sala de aula virtual 3D, com avatares personalizáveis e espaços de interação. A plataforma permite conectar estudantes e docentes, discutir ideias e criar soluções em conjunto, utilizando texto, voz e emojis para comunicação.' },
    { title: 'Impacto', text: 'Cria uma experiência de aprendizagem mais imersiva, colaborativa e interativa, aproximando estudantes e professores em um ambiente virtual e ampliando as possibilidades de aplicação da metodologia educacional do SENAI.' },
  ],
};

export const ecommerceCase: ProjectCaseData = {
  title: 'E-Commerce',
  category: 'Web',
  logo: '/figma/cases/ecommerce/1.png',
  customization: '/figma/cases/ecommerce/2.png',
  classroom: '/figma/cases/ecommerce/3.png',
  avatars: '/figma/cases/ecommerce/4.png',
  tags: ['Web', 'Cloud', 'APIs'],
  sections: [
    { title: 'Contexto', text: 'E-commerce do SENAI/SESI responsável pela divulgação e comercialização de cursos presenciais e à distância, integrado aos sistemas corporativos da instituição para atender estudantes de todo o estado.' },
    { title: 'Desafio', text: 'Simplificar uma jornada de compra e matrícula que envolvia diferentes sistemas e etapas, tornando a experiência mais intuitiva, acessível, responsiva e integrada, sem perder a conexão com os processos internos da instituição.' },
    { title: 'Solução', text: 'Reestruturação da experiência digital com unificação do login e do fluxo de matrícula, reorganização da área principal do site e implementação de recursos de acessibilidade. A solução também incorporou recomendação de cursos com Inteligência Artificial e uma jornada simplificada para cursos gratuitos.' },
    { title: 'Impacto', text: 'A evolução da plataforma ampliou o alcance e facilitou o acesso aos cursos, alcançando 120 mil usuários ativos no último mês, mais de 40 mil acessos semanais via pesquisa orgânica e 150 mil matrículas efetivadas.' },
  ],
};

export const habilitaCase: ProjectCaseData = {
  title: 'Habilita',
  category: 'Big Data & Analytics',
  logo: '/figma/cases/habilita/1.png',
  customization: '/figma/cases/habilita/2.png',
  classroom: '/figma/cases/habilita/3.png',
  avatars: '/figma/cases/habilita/4.png',
  tags: ['IA', 'Big Data', 'Analytics'],
  sections: [
    { title: 'Contexto', text: 'Programa da FIESC voltado à identificação e resolução de lacunas (gaps) nas funções de trabalhadores da indústria, oferecendo uma visão clara e estruturada para apoiar o processo de diagnóstico e o desenvolvimento profissional do setor.' },
    { title: 'Desafio', text: 'Agilizar o processo de diagnóstico de competências e a construção de trilhas de aprendizagem eficazes, superando o tempo elevado de elaboração manual e garantindo um acompanhamento dinâmico e contínuo das necessidades das indústrias.' },
    { title: 'Solução', text: 'Uso de Inteligência Artificial para automatizar a geração de cards de diagnóstico de lacunas e sugerir trilhas de aprendizagem personalizadas — incluindo matriz curricular, quantidade ideal de módulos e carga horária recomendada. A plataforma permite customização total dos conteúdos e atualizações dinâmicas suportadas pela IA.' },
    { title: 'Impacto', text: 'Redução drástica no tempo de produção dos cards de diagnóstico, otimização dos processos de desenvolvimento e aceleração na tomada de decisões, entregando trilhas continuamente alinhadas à realidade e às transformações de cada empresa.' },
  ],
};

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] as const } },
};

const imageReveal = {
  hidden: { opacity: 0.5, scale: 1.04, clipPath: 'inset(0 0 100% 0)' },
  visible: { opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

type Props = {
  project: ProjectCaseData;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
};

export function ProjectCaseOverlay({ project, onClose, returnFocusRef }: Props) {
  const reduced = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [interests, setInterests] = useState<string[]>(['Inteligência Artificial', 'Nuvem / AWS']);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.classList.add('project-overlay-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return; }
      if (event.key !== 'Tab' || !overlayRef.current) return;
      const elements = Array.from(overlayRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'));
      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      document.documentElement.classList.remove('project-overlay-open');
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      window.requestAnimationFrame(() => {
        const target = returnFocusRef.current;
        if (target && document.contains(target)) target.focus();
      });
    };
  }, [onClose, returnFocusRef]);

  function toggleInterest(value: string) {
    setInterests(current => current.includes(value) ? current.filter(item => item !== value) : [...current, value]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = 'mailto:solucoesdigitais@sc.senai.br?subject=Projeto%20pelo%20site';
  }

  return (
    <motion.div ref={overlayRef} className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="project-case-title" data-lenis-prevent initial={reduced ? { opacity: 1 } : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduced ? { opacity: 0 } : { opacity: 0, transition: { duration: 0.28 } }}>
      <button ref={closeRef} className={styles.closeButton} type="button" onClick={onClose} aria-label="Voltar aos projetos"><img src="/figma/contact-v2/arrow-left.svg" alt="" /></button>
      <div className={styles.page}>
        <motion.section className={styles.media} variants={reduced ? undefined : reveal} initial={reduced ? undefined : 'hidden'} animate={reduced ? undefined : 'visible'}>
          <motion.div className={styles.topMedia} variants={reduced ? undefined : imageReveal}>
            <img className={styles.logo} src={project.logo} alt="Imagem principal do AudioXP" />
            <img className={styles.customization} src={project.customization} alt="Experiência visual do AudioXP" />
          </motion.div>
          <div className={styles.bottomMedia}>
            <motion.img variants={reduced ? undefined : imageReveal} src={project.classroom} alt="Identidade visual do AudioXP" />
            <motion.div className={styles.avatars} variants={reduced ? undefined : imageReveal}><img src={project.avatars} alt="Visualização do aparelho auditivo no AudioXP" /></motion.div>
          </div>
          <div className={styles.tags} aria-label="Tecnologias do projeto">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </motion.section>

        <section className={styles.editorial} aria-label="Detalhes do projeto">
          {project.sections.map(section => <motion.article key={section.title} variants={reduced ? undefined : reveal} initial={reduced ? undefined : 'hidden'} whileInView={reduced ? undefined : 'visible'} viewport={{ once: true, amount: 0.4 }}><h2>{section.title}</h2><p>{section.text}</p></motion.article>)}
        </section>

        <section className={styles.inquiry} aria-label="Formulário de projeto">
          <div className={styles.summary}><span className={styles.eyebrow}>PROJETOS</span><h2 id="project-case-title">Desenvolva seu projeto digital</h2><p>Conte-nos os detalhes do seu desafio técnico e estratégico. Nossa equipe de especialistas estruturará a melhor estratégia de engenharia, arquitetura em nuvem e inovação para sua operação.</p><span className={styles.progress} aria-hidden="true" /></div>
          <form className={styles.formCard} onSubmit={handleSubmit}>
            <h2>Sobre seu desafio</h2>
            <div className={styles.fields}>
              <label>Nome completo<input name="name" placeholder="Digite seu nome completo" required /></label>
              <label>E-mail corporativo<input name="email" type="email" placeholder="exemplo@empresa.com.br" required /></label>
              <label>Nome da Empresa<input name="company" placeholder="Sua empresa ou instituição" /></label>
              <fieldset><legend>Tecnologias de interesse</legend><div className={styles.chips}>{['Inteligência Artificial', 'Mobile', 'Web', 'Nuvem / AWS', 'Dados', 'Realidade Estendida', 'Ainda não sei'].map(item => <button key={item} type="button" className={interests.includes(item) ? styles.chipActive : styles.chip} onClick={() => toggleInterest(item)} aria-pressed={interests.includes(item)}>{item}</button>)}</div></fieldset>
              <label>Mensagem / Descrição do desafio<textarea name="message" placeholder="Escreva os objetivos e contexto do seu projeto" rows={4} /></label>
            </div>
            <div className={styles.formActions}><button className={styles.backAction} type="button" onClick={onClose}><span aria-hidden="true"><img src="/figma/contact-v2/arrow-left.svg" alt="" /></span>Voltar</button><button className={styles.submit} type="submit">ENVIAR PROPOSTA</button></div>
          </form>
        </section>
      </div>
    </motion.div>
  );
}
