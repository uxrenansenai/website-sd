import { useCallback, useEffect, useLayoutEffect, useRef, useState, type UIEvent } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { BrainCircuit, Orbit, CodeXml, Smartphone, ChartNoAxesCombined, GraduationCap } from 'lucide-react';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import styles from './Services.module.css';

const services = [
  {
    title: 'Inteligência Artificial',
    description: 'Soluções inteligentes para automatizar processos, explorar dados e criar novas experiências digitais.',
    tags: ['IA Generativa', 'Machine Learning', 'Automação', 'Visão Computacional'],
    code: 'AI',
    visualCaption: 'INTELLIGENCE SYSTEMS',
    Icon: BrainCircuit,
  },
  {
    title: 'Realidade Estendida',
    description: 'Experiências imersivas que combinam tecnologias digitais e ambientes reais para treinamento, educação e indústria.',
    tags: ['Realidade Virtual', 'Realidade Aumentada', '3D', 'Experiências Imersivas'],
    code: 'XR',
    visualCaption: 'IMMERSIVE EXPERIENCES',
    Icon: Orbit,
  },
  {
    title: 'Desenvolvimento Web',
    description: 'Plataformas e sistemas digitais desenvolvidos para desafios complexos e diferentes contextos de negócio.',
    tags: ['Plataformas Web', 'Sistemas Corporativos', 'Portais', 'Aplicações'],
    code: '</>',
    visualCaption: 'DIGITAL PLATFORMS',
    Icon: CodeXml,
  },
  {
    title: 'Desenvolvimento Mobile',
    description: 'Aplicativos e experiências móveis desenvolvidos para conectar pessoas, serviços e negócios.',
    tags: ['iOS', 'Android', 'Apps Corporativos', 'Produtos Digitais'],
    code: 'APP',
    visualCaption: 'CONNECTED PRODUCTS',
    Icon: Smartphone,
  },
  {
    title: 'Big Data & Analytics',
    description: 'Transformamos dados em informações relevantes para apoiar decisões e gerar novas oportunidades.',
    tags: ['Data Analytics', 'Dashboards', 'Business Intelligence', 'Engenharia de Dados'],
    code: 'DATA',
    visualCaption: 'DECISION INTELLIGENCE',
    Icon: ChartNoAxesCombined,
  },
  {
    title: 'EdTech & HealthTech',
    description: 'Tecnologia aplicada à educação e à saúde para criar experiências digitais mais eficientes e acessíveis.',
    tags: ['Educação Digital', 'Saúde Digital', 'Plataformas', 'Experiências de Aprendizagem'],
    code: 'EDU+',
    visualCaption: 'LEARNING & WELLBEING',
    Icon: GraduationCap,
  },
];

const mobileQuery = '(max-width: 760px)';

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia(mobileQuery).matches);
  const [travel, setTravel] = useState(0);
  const [mobileProgress, setMobileProgress] = useState(0);
  const stickyEnabled = !isMobile && !reducedMotion;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  useEffect(() => {
    const media = window.matchMedia(mobileQuery);
    const update = () => {
      const mobile = media.matches;
      setIsMobile(current => {
        if (current !== mobile) {
          setMobileProgress(0);
          railRef.current?.scrollTo({ left: 0 });
        }
        return mobile;
      });
    };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return;

    const measure = () => {
      const distance = stickyEnabled ? Math.max(0, track.scrollWidth - rail.clientWidth) : 0;
      setTravel(current => current === distance ? current : distance);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    observer.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [stickyEnabled]);

  const handleRailScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    if (stickyEnabled) return;
    const rail = event.currentTarget;
    const range = rail.scrollWidth - rail.clientWidth;
    setMobileProgress(range > 0 ? rail.scrollLeft / range : 0);
  }, [stickyEnabled]);

  // Keep the sticky passage short and let the whole rail travel through it continuously.
  const sectionHeight = stickyEnabled ? '180vh' : undefined;
  const progress = stickyEnabled ? scrollYProgress : mobileProgress;

  return (
    <section className={styles.section} id="servicos" ref={sectionRef} style={sectionHeight ? { height: sectionHeight } : undefined}>
      <div className={styles.sticky}>
        <div className={`${styles.intro} page-container`}>
          <SectionTitle
            dark
            className={styles.heading}
            eyebrow="SERVIÇOS"
            title={<>Tecnologia para transformar<br className={styles.desktopBreak} /> desafios em soluções.</>}
          />
        </div>

        <div className={styles.rail} ref={railRef} onScroll={handleRailScroll} role="region" aria-label="Soluções e serviços" tabIndex={stickyEnabled ? undefined : 0}>
          <motion.div className={styles.track} ref={trackRef} style={{ x: stickyEnabled ? x : 0 }}>
            {services.map(({ title, description, tags, code, visualCaption, Icon }, index) => (
              <motion.article
                className={styles.card}
                data-service-card
                aria-labelledby={`service-title-${index}`}
                key={title}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.035 }}
              >
                <div className={styles.copy}>
                  <span className={styles.number}>{String(index + 1).padStart(2, '0')}<span aria-hidden="true"> / 06</span></span>
                  <h3 id={`service-title-${index}`}>{title}</h3>
                  <p>{description}</p>
                  <ul className={styles.tags} aria-label={`Especialidades em ${title}`}>
                    {tags.map(tag => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
                <div className={styles.visual} aria-hidden="true">
                  <span className={styles.visualCode}>{code}</span>
                  <Icon className={styles.visualIcon} strokeWidth={1.1} />
                  <span className={styles.visualCaption}>{visualCaption}</span>
                  <span className={styles.visualOrbit} />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <div className={`${styles.progress} page-container`} aria-label="Progresso pelos serviços">
          <div className={styles.progressTrack} aria-hidden="true"><motion.span style={{ scaleX: progress }} /></div>
          <span className={styles.progressHint}>{isMobile ? 'ARRASTE PARA EXPLORAR' : 'ROLE PARA EXPLORAR'}</span>
        </div>
      </div>
    </section>
  );
}
