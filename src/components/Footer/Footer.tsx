import { useRef } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowUp, Instagram, Linkedin, Facebook } from 'lucide-react';


const navigation = [
  { text: 'Início', href: '#topo' },
  { text: 'Cases', href: '#cases' },
  { text: 'Serviços', href: '#servicos' },
  { text: 'AWS', href: '#aws' },
  { text: 'Sobre', href: '#sobre' },
  { text: 'Trabalhe conosco', href: '#trabalhe-conosco' },
  { text: 'Na mídia', href: '#midia' },
];

export function Footer() {
  const signatureRef = useRef<HTMLDivElement>(null);
  const signatureInView = useInView(signatureRef, { once: true, amount: 0.45 });
  const prefersReducedMotion = useReducedMotion();
  const signatureVisible = signatureInView || prefersReducedMotion;

  const echoVariants: Variants = {
    hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.72, ease: 'easeOut', staggerChildren: 0.1 },
    },
  };
  const echoItemVariants: Variants = {
    hidden: { y: 12, filter: 'blur(4px)' },
    visible: { y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: 'easeOut' } },
  };
  const signatureVariants: Variants = {
    hidden: { opacity: 0, y: 22, scale: 0.98, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' },
    },
  };
  const signatureBlueVariants: Variants = {
    hidden: { opacity: 0, y: 8, filter: 'blur(3px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.58, delay: 0.14, ease: 'easeOut' } },
  };

  const signatureLine = (className = '', animateBlue = false) => (
    <span className={`footer__signature-line ${className}`}>
      <span>SENAI</span>
      <span>Soluções</span>
      {animateBlue ? <motion.span className="footer__signature-blue" variants={signatureBlueVariants}>Digitais</motion.span> : <span className="footer__signature-blue">Digitais</span>}
    </span>
  );

  return (
    <footer className="footer">
      <div className="page-container">
        <div className="footer__top-rule" aria-hidden="true" />
        <div className="footer__top">
          <div className="footer__brand">
            <a className="footer__brand-link" href="#topo" aria-label="SENAI Soluções Digitais, início">
              <img className="footer__brand-logo" src="/images/logo/senai-solucoes-digitais.svg" alt="SENAI Soluções Digitais" />
            </a>
            <p>Parte do ecossistema FIESC - tecnologia para a indústria catarinense.</p>
            <div className="footer__social">
              <a href="https://www.instagram.com/senaisolucoesdigitais.sc/" aria-label="Instagram SENAI Soluções Digitais" target="_blank" rel="noopener noreferrer"><Instagram /></a>
              <a href="https://www.linkedin.com/company/senai-solu%C3%A7%C3%B5es-digitais/home/" aria-label="LinkedIn SENAI Soluções Digitais" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
              <a href="https://www.facebook.com/senaisolucoesdigitais.sc" aria-label="Facebook SENAI Soluções Digitais" target="_blank" rel="noopener noreferrer"><Facebook /></a>
            </div>
          </div>
          <div className="footer__site-map">
            <div className="footer__links"><h2>Navegue</h2>{navigation.map(item => <a href={item.href} key={item.text}>{item.text}</a>)}</div>
            <div className="footer__links"><h2>Social</h2><a href="https://www.instagram.com/senaisolucoesdigitais.sc/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.linkedin.com/company/senai-solu%C3%A7%C3%B5es-digitais/home/" target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
            <div className="footer__links"><h2>Trabalhe conosco</h2><a href="https://fiesc.com.br/trabalhe-conosco" target="_blank" rel="noopener noreferrer">Ver vagas abertas</a></div>
          </div>
        </div>
        <div className="footer__divider" />
        <div className="footer__bottom"><span>© 2026 SENAI Soluções Digitais. Todos os direitos reservados.</span><a href="#topo">Voltar ao início <ArrowUp size={16} /></a></div>
      </div>
      <motion.div
        ref={signatureRef}
        className="footer__signature"
        initial={prefersReducedMotion ? false : 'hidden'}
        animate={signatureVisible ? 'visible' : 'hidden'}
        aria-label="SENAI Soluções Digitais"
      >
        <motion.div className="footer__signature-echoes" variants={echoVariants} aria-hidden="true">
          <motion.div className="footer__signature-echo footer__signature-echo--back" variants={echoItemVariants}>{signatureLine()}</motion.div>
          <motion.div className="footer__signature-echo footer__signature-echo--middle" variants={echoItemVariants}>{signatureLine()}</motion.div>
        </motion.div>
        <motion.div className="footer__signature-main" variants={signatureVariants} aria-hidden="true">
          {signatureLine('', true)}
        </motion.div>
      </motion.div>
    </footer>
  );
}
