import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Sprite } from '../Sprite/Sprite';
import { Button } from '../Button/Button';

const links = [
  { label: 'Cases', href: '#cases' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'AWS', href: '#aws' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      window.setTimeout(() => {
        const target = document.getElementById(id);
        if (!target) return;
        const headerHeight = document.querySelector<HTMLElement>('.header')?.getBoundingClientRect().height ?? 0;
        const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight);
        window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
      }, 0);
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [reducedMotion]);

  useEffect(() => {
    const observed = links
      .map(link => ({ href: link.href, element: document.querySelector<HTMLElement>(link.href) }))
      .filter((item): item is { href: string; element: HTMLElement } => Boolean(item.element));
    if (!observed.length) return;

    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveHref(observed.find(item => item.element === visible.target)?.href ?? null);
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, 0.15, 0.5] });

    observed.forEach(item => observer.observe(item.element));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="header" id="inicio">
      <div className="header__inner page-container">
        <a className="header__brand" href="#topo" aria-label="SENAI Soluções Digitais, início"><Sprite className="sprite--mark" label="Marca SENAI Soluções Digitais" /></a>
        <nav className={open ? 'header__nav is-open' : 'header__nav'} aria-label="Navegação principal">
          {links.map(link => <a key={link.href} className={activeHref === link.href ? 'is-active' : ''} aria-current={activeHref === link.href ? 'location' : undefined} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
          <a className="header__mobile-cta" href="#contato" onClick={() => setOpen(false)}>Fale com nosso time</a>
        </nav>
        <Button className="header__cta" variant="primary" href="#contato">Fale com nosso time</Button>
        <button className="header__menu" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}
