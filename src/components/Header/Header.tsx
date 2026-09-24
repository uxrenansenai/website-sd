import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../Button/Button';

const links = [
  { label: 'Cases', href: '#cases' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'AWS', href: '#aws' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  useEffect(() => {
    const observed = links
      .map(link => ({ href: link.href, element: document.querySelector<HTMLElement>(link.href) }))
      .filter((item): item is { href: string; element: HTMLElement } => Boolean(item.element));
    if (!observed.length) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveHref(observed.find(item => item.element === visible.target)?.href ?? null);
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, 0.15, 0.5] });
    observed.forEach(item => observer.observe(item.element));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="header" id="inicio">
      <div className="header__inner page-container">
        <a className="header__brand" href="#topo" aria-label="SENAI Soluções Digitais, início">
          <img src="/figma/header/logo.svg" alt="SENAI Soluções Digitais" />
        </a>
        <nav className={open ? 'header__nav is-open' : 'header__nav'} aria-label="Navegação principal">
          {links.map(link => <a key={link.href} className={activeHref === link.href ? 'is-active' : ''} aria-current={activeHref === link.href ? 'location' : undefined} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
          <a className="header__mobile-cta" href="#contato" onClick={() => setOpen(false)}>Fale com nosso time</a>
        </nav>
        <div className="header__actions">
          <span className="header__locale"><b>PT</b> / EN</span>
          <span className="header__divider" aria-hidden="true" />
          <Button className="header__cta" variant="secondary" href="#contato" showArrow={false}>Fale com nosso time</Button>
        </div>
        <button className="header__menu" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(current => !current)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}
