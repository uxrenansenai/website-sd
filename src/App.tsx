import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { PageLoader } from './components/PageLoader/PageLoader';
import { Marquee } from './components/Marquee/Marquee';
import { Portfolio } from './components/Portfolio/Portfolio';
import { Services } from './components/Services/Services';
import { Aws } from './components/Aws/Aws';
import { About } from './components/About/About';
import { Press } from './components/Press/Press';
import { Careers } from './components/Careers/Careers';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { SmoothScroll } from './components/SmoothScroll/SmoothScroll';
import './styles/motion.css';

export default function App() {
  const [showLoader, setShowLoader] = useState(() => {
    try { return !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !sessionStorage.getItem('senai-motion-loaded'); }
    catch { return false; }
  });
  const [heroReady, setHeroReady] = useState(!showLoader);

  return <>
    <SmoothScroll />
    <AnimatePresence onExitComplete={() => setHeroReady(true)}>
      {showLoader && <PageLoader onFinished={() => {
        try { sessionStorage.setItem('senai-motion-loaded', '1'); } catch { /* Session storage can be unavailable. */ }
        setShowLoader(false);
      }} />}
    </AnimatePresence>
    <Header />
    <main><Hero ready={heroReady} /><Marquee /><Portfolio /><Services /><Aws /><About /><Careers /><Press /><Contact /></main>
    <Footer />
  </>;
}
