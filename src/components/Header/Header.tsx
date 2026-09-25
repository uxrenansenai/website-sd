import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../Button/Button';

const links = [
  { label: 'Início', href: '#topo' },
  { label: 'Cases', href: '#cases' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'AWS', href: '#aws' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Trabalhe conosco', href: '#trabalhe-conosco' },
  { label: 'Na mídia', href: '#midia' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>('#topo');
  useEffect(() => {
    const contactElement = document.querySelector<HTMLElement>('#contato');
    const observed = links
      .map(link => ({ href: link.href, element: document.querySelector<HTMLElement>(link.href) }))
      .filter((item): item is { href: string; element: HTMLElement } => Boolean(item.element));
    if (!observed.length) return;
    const ratios = new Map<Element, number>();
    const updateActiveSection = () => {
      if (window.scrollY <= 120) {
        setActiveHref('#topo');
        return;
      }
      if (contactElement && (ratios.get(contactElement) ?? 0) > 0.2) {
        setActiveHref('');
        return;
      }
      const visible = observed
        .map(item => ({ ...item, ratio: ratios.get(item.element) ?? 0 }))
        .filter(item => item.ratio > 0)
        .sort((a, b) => b.ratio - a.ratio)[0];
      if (visible) setActiveHref(visible.href);
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => ratios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0));
      updateActiveSection();
    }, { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.05, 0.2, 0.5, 0.8] });
    observed.forEach(item => observer.observe(item.element));
    if (contactElement) observer.observe(contactElement);
    const handleScroll = () => {
      if (window.scrollY <= 120) setActiveHref('#topo');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateActiveSection();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="header" id="inicio">
      <div className="header__inner page-container">
        <a className="header__brand" href="#topo" aria-label="SENAI Soluções Digitais, início">
          <img src="/figma/header/logo.svg" alt="SENAI Soluções Digitais" />
        </a>
        <nav className={open ? 'header__nav is-open' : 'header__nav'} aria-label="Navegação principal">
          {links.map(link => <a key={link.href} className={activeHref === link.href ? 'is-active' : ''} aria-current={activeHref === link.href ? 'location' : undefined} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
          <Button className="header__mobile-cta" variant="primary-dark" href="#contato" showArrow={false} onClick={() => setOpen(false)}>Fale com nosso time</Button>
        </nav>
        <div className="header__actions">
          <Button className="header__cta" variant="primary-dark" href="#contato" showArrow={false}>Fale com nosso time</Button>
        </div>
        <button className="header__menu" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(current => !current)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}
