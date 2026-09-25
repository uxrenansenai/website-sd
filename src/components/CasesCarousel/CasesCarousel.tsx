import { useCallback, useEffect, useState, type Ref } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CaseCard } from './CaseCard';
import { caseFilterCaseIds, caseFilters, caseItems } from './casesData';
import styles from './CasesCarousel.module.css';

const AUTOPLAY_MS = 6000;
type Props = { onOpenCase?: (caseId: string) => void; firstCardRef?: Ref<HTMLElement> };

export function CasesCarousel({ onOpenCase, firstCardRef }: Props) {
  const reduced = Boolean(useReducedMotion());
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const [progressCycle, setProgressCycle] = useState(0);
  const activeCase = caseItems.find(item => item.id === caseFilterCaseIds[active]) ?? caseItems[0];

  const getDirection = (index: number): 1 | -1 => {
    const total = caseFilters.length;
    if (index === active) return 1;
    if (index === (active + 1) % total) return 1;
    if (index === (active - 1 + total) % total) return -1;
    return index > active ? 1 : -1;
  };

  const select = useCallback((index: number, nextDirection?: 1 | -1) => {
    const normalized = (index + caseFilters.length) % caseFilters.length;
    setDirection(nextDirection ?? getDirection(normalized));
    setActive(normalized);
    setProgressCycle(cycle => cycle + 1);
  }, [active]);
  const advance = useCallback(() => { setDirection(1); setActive(current => (current + 1) % caseFilters.length); setProgressCycle(cycle => cycle + 1); }, []);
  useEffect(() => {
    if (reduced || paused) return undefined;
    const timer = window.setTimeout(advance, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, advance, paused, progressCycle, reduced]);
  return (
    <div className={styles.root} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false); }}>
      <motion.div className={styles.filters} role="group" aria-label="Filtrar cases">
        {caseFilters.map((filter, index) => { const isActive = active === index; return <button key={filter} type="button" className={`${styles.filter} ${isActive ? styles.filterActive : ''}`} aria-pressed={isActive} onClick={() => select(index)}><span>{filter}</span>{isActive && !reduced && !paused && <motion.span key={progressCycle} className={styles.filterProgress} aria-hidden="true" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }} />}</button>; })}
      </motion.div>
      <div className={styles.carousel}>
        <button className={styles.arrow} type="button" aria-label="Case anterior" onClick={() => select(active - 1, -1)}><ArrowLeft size={18} strokeWidth={1.5} /></button>
        <div className={styles.viewport}><AnimatePresence initial={false} custom={direction} mode="wait"><CaseCard key={activeCase.id} item={activeCase} reduced={reduced} direction={direction} onOpen={onOpenCase && (activeCase.id === 'senai-lab' || activeCase.id === 'educacao-saude' || activeCase.id === 'industria' || activeCase.id === 'dados') ? () => onOpenCase(activeCase.id) : undefined} cardRef={activeCase.id === 'senai-lab' || activeCase.id === 'educacao-saude' || activeCase.id === 'industria' || activeCase.id === 'dados' ? firstCardRef : undefined} /></AnimatePresence></div>
        <button className={styles.arrow} type="button" aria-label="Próximo case" onClick={() => select(active + 1, 1)}><ArrowRight size={18} strokeWidth={1.5} /></button>
      </div>
      <div className={styles.dots} role="group" aria-label="Selecionar categoria">{caseFilters.map((filter, index) => <button key={filter} type="button" className={index === active ? styles.dotActive : styles.dot} aria-label={`Ver categoria ${index + 1}: ${filter}`} aria-current={index === active ? 'true' : undefined} onClick={() => select(index)} />)}</div>
    </div>
  );
}
