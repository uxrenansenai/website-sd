import { ArrowUp, Instagram, Linkedin, Facebook } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { Sprite } from '../Sprite/Sprite';
import { Button } from '../Button/Button';

const navigation = [
  { text: 'Início', href: '#topo' }, { text: 'Portfólio', href: '#cases' }, { text: 'Serviços', href: '#servicos' }, { text: 'Soluções AWS', href: '#aws' }, { text: 'Sobre', href: '#sobre' }, { text: 'Contato', href: '#contato' }, { text: 'Trabalhe Conosco', href: 'https://fiesc.com.br/trabalhe-conosco' },
];

export function Footer() {
  const reduced = useReducedMotion();
  function scrollTop(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }
  return (
    <footer className="footer">
      <div className="footer__marquee" aria-label="SENAI Soluções Digitais"><div className="footer__marquee-track"><span>SENAI SOLUÇÕES DIGITAIS <b aria-hidden="true">✦</b> SENAI SOLUÇÕES DIGITAIS <b aria-hidden="true">✦</b> SENAI SOLUÇÕES DIGITAIS <b aria-hidden="true">✦</b></span><span aria-hidden="true">SENAI SOLUÇÕES DIGITAIS <b>✦</b> SENAI SOLUÇÕES DIGITAIS <b>✦</b> SENAI SOLUÇÕES DIGITAIS <b>✦</b></span></div></div>
      <div className="page-container">
        <div className="footer__top">
          <div className="footer__brand"><a className="footer__brand-link" href="#topo" aria-label="SENAI Soluções Digitais, início"><Sprite className="sprite--mark" label="Marca SENAI Soluções Digitais" /><span><strong>SENAI</strong><small>SOLUÇÕES DIGITAIS</small></span></a><p>Parte do ecossistema FIESC -<br /> tecnologia para a indústria catarinense.</p><div className="footer__social"><a href="https://www.instagram.com/senai.sc/" aria-label="Instagram" target="_blank" rel="noreferrer"><Instagram /></a><a href="https://www.linkedin.com/school/senai-sc/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin /></a><a href="https://www.facebook.com/senaisc/" aria-label="Facebook" target="_blank" rel="noreferrer"><Facebook /></a></div></div>
          <div className="footer__links"><h2>Navegue</h2>{navigation.map(item => <a href={item.href} key={item.text}>{item.text}</a>)}</div>
          <div className="footer__links"><h2>Social</h2><a href="https://www.instagram.com/senai.sc/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.linkedin.com/school/senai-sc/" target="_blank" rel="noreferrer">LinkedIn</a></div>
          <div className="footer__links"><h2>Trabalhe conosco</h2><a href="https://fiesc.com.br/trabalhe-conosco" target="_blank" rel="noreferrer">Ver vagas abertas</a><a href="#contato">Contato</a></div>
          <div className="footer__cta"><span>Tem um projeto em mente?</span><Button variant="secondary" href="#contato">Fale com nosso time</Button></div>
        </div>
        <div className="footer__bottom"><span>© 2026 SENAI Soluções Digitais. Todos os direitos reservados.</span><a href="#topo" onClick={scrollTop}>Voltar ao início <ArrowUp size={17} /></a></div>
      </div>
    </footer>
  );
}

