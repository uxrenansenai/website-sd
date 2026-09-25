import { useCallback, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { CasesCarousel } from '../CasesCarousel/CasesCarousel';
import { ecommerceCase, habilitaCase, labExperienceCase, ProjectCaseOverlay, senaiLabExperienceCase, type ProjectCaseData } from '../ProjectCase/ProjectCaseOverlay';
import { caseItems } from '../CasesCarousel/casesData';

export function Portfolio() {
  const [caseOpen, setCaseOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectCaseData>(labExperienceCase);
  const firstCardRef = useRef<HTMLElement>(null);
  const openCase = useCallback((caseId: string) => {
    const project = caseId === 'industria' ? ecommerceCase : caseId === 'dados' ? habilitaCase : caseId === 'educacao-saude' ? senaiLabExperienceCase : labExperienceCase;
    const card = caseItems.find(item => item.id === caseId);
    setActiveProject({ ...project, summary: card?.description });
    setCaseOpen(true);
  }, []);
  const closeCase = useCallback(() => setCaseOpen(false), []);

  return (
    <>
      <section className="portfolio surface-light" id="cases" aria-labelledby="portfolio-title">
        <div className="page-container">
          <SectionTitle eyebrow="CASES" title={<span id="portfolio-title">Conheça nossas soluções</span>} />
          <CasesCarousel onOpenCase={openCase} firstCardRef={firstCardRef} />
        </div>
      </section>
      <AnimatePresence>{caseOpen && <ProjectCaseOverlay project={activeProject} onClose={closeCase} returnFocusRef={firstCardRef} />}</AnimatePresence>
    </>
  );
}
