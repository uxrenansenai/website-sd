import { ArrowUp, Instagram, Linkedin, Facebook } from 'lucide-react';


const navigation = [
  { text: 'Início', href: '#topo' }, { text: 'Portfólio', href: '#cases' }, { text: 'Serviços', href: '#servicos' }, { text: 'Soluções AWS', href: '#aws' }, { text: 'Sobre', href: '#sobre' }, { text: 'Contato', href: '#contato' }, { text: 'Trabalhe Conosco', href: 'https://fiesc.com.br/trabalhe-conosco' },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="page-container">
        <div className="footer__top">
          <div className="footer__brand">
            <a className="footer__brand-link" href="#topo" aria-label="SENAI Soluções Digitais, início">
              <img src="/figma/footer/svg-1.svg" alt="" />
              <span><img src="/figma/footer/svg-10.svg" alt="SENAI" /><img src="/figma/footer/svg-6.svg" alt="Soluções Digitais" /></span>
            </a>
            <p>Parte do ecossistema FIESC - tecnologia para a indústria catarinense.</p>
            <div className="footer__social"><a href="https://www.instagram.com/senai.sc/" aria-label="Instagram" target="_blank" rel="noreferrer"><Instagram /></a><a href="https://www.linkedin.com/school/senai-sc/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin /></a><a href="https://www.facebook.com/senaisc/" aria-label="Facebook" target="_blank" rel="noreferrer"><Facebook /></a></div>
          </div>
          <div className="footer__links"><h2>Navegue</h2>{navigation.map(item => <a href={item.href} key={item.text}>{item.text}</a>)}</div>
          <div className="footer__links"><h2>Social</h2><a href="https://www.instagram.com/senai.sc/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.linkedin.com/school/senai-sc/" target="_blank" rel="noreferrer">LinkedIn</a></div>
          <div className="footer__links"><h2>Trabalhe conosco</h2><a href="https://fiesc.com.br/trabalhe-conosco" target="_blank" rel="noreferrer">Ver vagas abertas</a><a href="#contato">Contato</a></div>
        </div>
        <div className="footer__divider" />
        <div className="footer__bottom"><span>© 2026 SENAI Soluções Digitais. Todos os direitos reservados.</span><a href="#topo">Voltar ao início <ArrowUp size={16} /></a></div>
      </div>
    </footer>
  );
}
