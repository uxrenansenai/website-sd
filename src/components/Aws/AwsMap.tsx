import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { AppWindow, Cloud, Database, Layers3, Network, Server, ShieldCheck, type LucideIcon } from 'lucide-react';
import styles from './AwsMap.module.css';

const mapWidth = 1231.31;
const mapHeight = 399.507;
const origin = { x: 303, y: 249 };

const destinations: { x: number; y: number; route: string; Icon: LucideIcon; label: string }[] = [
  { x: 261, y: 202, route: 'M303 249 Q248 220 261 202', Icon: Layers3, label: 'Brasil' },
  { x: 202, y: 115, route: 'M303 249 Q150 195 202 115', Icon: Cloud, label: 'América do Norte' },
  { x: 608, y: 112, route: 'M303 249 Q395 55 608 112', Icon: Database, label: 'Europa' },
  { x: 613, y: 226, route: 'M303 249 Q430 165 613 226', Icon: ShieldCheck, label: 'África' },
  { x: 865, y: 147, route: 'M303 249 Q547 10 865 147', Icon: Server, label: 'Ásia' },
  { x: 1060, y: 291, route: 'M303 249 Q665 75 1060 291', Icon: Network, label: 'Oceania' },
  { x: 757, y: 199, route: 'M303 249 Q555 112 757 199', Icon: AppWindow, label: 'Aplicações globais' },
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
              animate={active ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
              transition={reduced ? { duration: 0 } : { duration: 1.15, delay: 0.45 + index * 0.19, ease: 'easeInOut' }}
            />
          ))}
        </svg>
        <motion.div
          className={styles.origin}
          style={{ left: `${origin.x / mapWidth * 100}%`, top: `${origin.y / mapHeight * 100}%` }}
          initial={reduced ? false : { opacity: 0, scale: 0.5 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: reduced ? 0 : 0.5 }}
        ><span /></motion.div>
        {destinations.map(({ x, y, Icon, label }, index) => (
          <motion.div
            className={styles.node}
            key={label}
            style={{ left: `${x / mapWidth * 100}%`, top: `${y / mapHeight * 100}%` }}
            initial={reduced ? false : { opacity: 0, scale: 0.55 }}
            animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.55 }}
            transition={reduced ? { duration: 0 } : { duration: 0.45, delay: 1.18 + index * 0.19, ease: 'easeOut' }}
          ><Icon strokeWidth={1.7} /></motion.div>
        ))}
      </div>
    </div>
  );
}
