import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Button } from '../Button/Button';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import styles from './Services.module.css';

const services = [
  { title: 'Inteligência Artificial', description: 'Desenvolvemos modelos preditivos, automação inteligente e soluções de visão computacional.', tags: ['IA generativa', 'Visão computacional', 'Machine learning'], visual: '/figma/services/svg-6.svg' },
  { title: 'Realidade Estendida', description: 'Experiências imersivas com AR, VR e simulações 3D para treinamento e engajamento.', tags: ['AR', 'VR', 'Simulações 3D'], visual: '/figma/services/svg-11.svg' },
  { title: 'Desenvolvimento Web', description: 'Plataformas web modernas e seguras para performance e escala.', tags: ['Front-end', 'Back-end', 'Plataformas'], visual: '/figma/services/svg-13.svg' },
  { title: 'Desenvolvimento Mobile', description: 'Apps nativos e multiplataforma para iOS e Android com foco em performance.', tags: ['iOS', 'Android', 'Multiplataforma'], visual: '/figma/services/svg-16.svg' },
  { title: 'Big Data & Analytics', description: 'Análise de grandes volumes de dados para insights estratégicos e dashboards.', tags: ['Analytics', 'Dashboards', 'Data Engineering'], visual: '/figma/services/svg-14.svg' },
  { title: 'EdTech & HealthTech', description: 'Soluções especializadas para educação e saúde com foco em gestão e cuidado.', tags: ['EdTech', 'HealthTech', 'Plataformas digitais'], visual: '/figma/services/svg-17.svg' },
];

type Metrics = { travel: number; centers: number[]; widths: number[]; first: number; last: number };
const emptyMetrics: Metrics = { travel: 0, centers: [], widths: [], first: 0, last: 0 };

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

function usePinnedLayout() {
  const [pinned, setPinned] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1101px), (min-width: 901px) and (hover: hover) and (pointer: fine)');
    const update = () => setPinned(query.matches && !reduced);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [reduced]);
  return pinned;
}

function ServiceCard({ service, index, progress, metrics, pinned, mobileActive, activeIndex }: {
  service: typeof services[number]; index: number; progress: MotionValue<number>; metrics: Metrics; pinned: boolean; mobileActive: boolean; activeIndex: number;
}) {
  const proximity = useTransform(progress, value => {
    if (!metrics.centers.length) return 0;
    const focal = metrics.first;
    const cardCenter = metrics.centers[index] - metrics.travel * value;
    const focusDistance = Math.abs(cardCenter - focal);
    const focusRadius = Math.max(metrics.widths[index] * 1.2, 360);
    return clamp01(1 - focusDistance / focusRadius);
  });
  const scale = useTransform(proximity, value => 0.94 + value * 0.12);
  const opacity = useTransform(proximity, value => 0.72 + value * 0.28);
  const glow = useTransform(proximity, value => 0.04 + value * 0.56);

  return (
    <motion.article className={`${styles.card} ${!pinned && mobileActive ? styles.cardActive : ''}`} style={pinned ? { scale, opacity, zIndex: index === activeIndex ? 3 : 1, transformOrigin: 'center center' } : undefined}>
      <motion.span className={styles.activeGlow} style={pinned ? { opacity: glow } : undefined} aria-hidden="true" />
      <div className={styles.visual}><img src={service.visual} alt="" /><span className={styles.visualShade} /></div>
      <div className={styles.content}><h3>{service.title}</h3><p>{service.description}</p><ul>{service.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div>
    </motion.article>
  );
}

export function Services() {
  const pinned = usePinnedLayout();
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<Metrics>(emptyMetrics);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, value => pinned ? -metrics.travel * value : 0);

  useEffect(() => {
    if (!pinned || metrics.centers.length === 0) return;
    const updateActiveIndex = (progress: number) => {
      const nextIndex = metrics.centers.reduce((closestIndex, center, index) => {
        const focalDistance = Math.abs(center - metrics.travel * progress - metrics.first);
        const closestDistance = Math.abs(metrics.centers[closestIndex] - metrics.travel * progress - metrics.first);
        return focalDistance < closestDistance ? index : closestIndex;
      }, 0);
      setActiveIndex(previous => previous === nextIndex ? previous : nextIndex);
    };
    updateActiveIndex(scrollYProgress.get());
    return scrollYProgress.on('change', updateActiveIndex);
  }, [metrics, pinned, scrollYProgress]);

  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return;
    const measure = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>('article'));
      // Use layout offsets instead of transformed bounds so scale never changes
      // the reserved spacing or the focal coordinates.
      const centers = cards.map(card => card.offsetLeft + card.offsetWidth / 2);
      const widths = cards.map(card => card.offsetWidth);
      const travel = Math.max(0, (centers.at(-1) ?? 0) - (centers[0] ?? 0));
      setMetrics({ travel, centers, widths, first: centers[0] ?? 0, last: (centers.at(-1) ?? 0) - travel });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    observer.observe(track);
    measure();
    return () => observer.disconnect();
  }, [pinned]);

  useEffect(() => {
    if (pinned || !railRef.current || !trackRef.current) return;
    const rail = railRef.current;
    const cards = Array.from(trackRef.current.querySelectorAll('article'));
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveIndex(cards.indexOf(visible.target as HTMLElement));
    }, { root: rail, threshold: [0.45, 0.6, 0.75] });
    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, [pinned]);

  return (
    <section className={`${styles.section} ${pinned ? styles.sectionPinned : ''}`} id="servicos" aria-labelledby="services-title" ref={sectionRef} style={pinned ? { '--service-travel': `${metrics.travel}px` } as CSSProperties : undefined}>
      <div className={styles.sticky}>
        <div className={styles.layout + ' page-container'}>
          <div className={styles.intro}>
            <SectionTitle dark className={styles.heading} eyebrow="SERVIÇOS" title={<span id="services-title">Temos a solução que você precisa</span>} />
            <p className={styles.lead}>Desenvolvemos com as tecnologias mais modernas para garantir eficiência, escalabilidade e inovação na sua operação.</p>
            <Button variant="primary-dark" href="#contato" showArrow={false}>Fale com nosso time</Button>
          </div>
          <div className={`${styles.rail} ${!pinned ? styles.railSwipe : ''}`} role="region" aria-label="Soluções e serviços" tabIndex={0} ref={railRef}>
            <motion.div className={styles.track} ref={trackRef} style={pinned ? { x } : undefined}>
              {services.map((service, index) => <ServiceCard key={service.title} service={service} index={index} progress={scrollYProgress} metrics={metrics} pinned={pinned} mobileActive={activeIndex === index} activeIndex={activeIndex} />)}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
