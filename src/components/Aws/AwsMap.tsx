import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { AppWindow, Cloud, Database, Layers3, Network, Server, ShieldCheck, type LucideIcon } from 'lucide-react';
import styles from './AwsMap.module.css';

const mapWidth = 1231.31;
const mapHeight = 399.507;
const origin = { x: 250, y: 301 };

const destinations: { x: number; y: number; route: string; Icon: LucideIcon; label: string }[] = [
  { x: 266, y: 217, route: 'M250 301 Q230 260 266 217', Icon: Layers3, label: 'Brasil' },
  { x: 202, y: 115, route: 'M250 301 Q145 230 202 115', Icon: Cloud, label: 'América do Norte' },
  { x: 608, y: 112, route: 'M250 301 Q395 90 608 112', Icon: Database, label: 'Europa' },
  { x: 613, y: 226, route: 'M250 301 Q430 190 613 226', Icon: ShieldCheck, label: 'África' },
  { x: 865, y: 147, route: 'M250 301 Q547 35 865 147', Icon: Server, label: 'Ásia' },
  { x: 1060, y: 291, route: 'M250 301 Q665 120 1060 291', Icon: Network, label: 'Oceania' },
  { x: 776, y: 183, route: 'M250 301 Q555 145 776 183', Icon: AppWindow, label: 'Aplicações globais' },
];

export function AwsMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const active = inView || reduced;

  return (
    <div className="aws__map page-container" ref={ref} aria-hidden="true">
      <div className={styles.canvas}>
        <img className={styles.base} src="/figma/aws/svg-1.svg" alt="" />
        <svg className={styles.routes} viewBox={`0 0 ${mapWidth} ${mapHeight}`} preserveAspectRatio="xMidYMid meet" fill="none">
          {destinations.map(({ route, label }, index) => (
            <motion.path
              key={label}
              d={route}
              stroke="#169dff"
              strokeWidth="2"
              strokeLinecap="round"
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={active ? (reduced ? { pathLength: 1, opacity: 0.8 } : { pathLength: [0, 1, 1, 0], opacity: [0, 0.82, 0.82, 0] }) : { pathLength: 0, opacity: 0 }}
              transition={reduced ? { duration: 0 } : { duration: 4.6, delay: 0.4 + index * 0.16, repeat: Infinity, repeatType: 'loop', repeatDelay: 0.35, ease: 'easeInOut' }}
            />
          ))}
        </svg>
        <motion.div
          className={styles.origin}
          style={{ left: `${origin.x / mapWidth * 100}%`, top: `${origin.y / mapHeight * 100}%` }}
          initial={reduced ? false : { opacity: 0, scale: 0.5 }}
          animate={active ? (reduced ? { opacity: 1, scale: 1 } : { opacity: [0.35, 1, 1, 0.35], scale: [0.72, 1, 1, 0.72] }) : { opacity: 0, scale: 0.5 }}
          transition={reduced ? { duration: 0 } : { duration: 4.6, repeat: Infinity, repeatType: 'loop', repeatDelay: 0.35, ease: 'easeInOut' }}
        ><span /></motion.div>
        {destinations.map(({ x, y, Icon, label }, index) => (
          <motion.div
            className={styles.node}
            key={label}
            style={{ left: `${x / mapWidth * 100}%`, top: `${y / mapHeight * 100}%` }}
            initial={reduced ? false : { opacity: 0, scale: 0.55 }}
            animate={active ? (reduced ? { opacity: 1, scale: 1 } : { opacity: [0, 1, 1, 0], scale: [0.55, 1, 1, 0.55] }) : { opacity: 0, scale: 0.55 }}
            transition={reduced ? { duration: 0 } : { duration: 4.6, delay: 1.05 + index * 0.16, repeat: Infinity, repeatType: 'loop', repeatDelay: 0.35, ease: 'easeInOut' }}
          ><Icon strokeWidth={1.7} /></motion.div>
        ))}
      </div>
    </div>
  );
}
