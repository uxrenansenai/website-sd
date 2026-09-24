import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { SectionTitle } from '../SectionTitle/SectionTitle';

type Testimonial = {
  initials: string;
  name: string;
  role: string;
  company: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  { initials: 'NC', name: 'Nome do cliente', role: 'Cargo a inserir', company: 'Empresa a inserir', quote: 'Depoimento a ser inserido após validação com o cliente.' },
  { initials: 'NC', name: 'Nome do cliente', role: 'Cargo a inserir', company: 'Empresa a inserir', quote: 'Depoimento a ser inserido após validação com o cliente.' },
  { initials: 'NC', name: 'Nome do cliente', role: 'Cargo a inserir', company: 'Empresa a inserir', quote: 'Depoimento a ser inserido após validação com o cliente.' },
  { initials: 'NC', name: 'Nome do cliente', role: 'Cargo a inserir', company: 'Empresa a inserir', quote: 'Depoimento a ser inserido após validação com o cliente.' },
  { initials: 'NC', name: 'Nome do cliente', role: 'Cargo a inserir', company: 'Empresa a inserir', quote: 'Depoimento a ser inserido após validação com o cliente.' },
];

export function Testimonials() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const current = testimonials[selected];
  const move = (direction: -1 | 1) => setSelected(index => (index + direction + testimonials.length) % testimonials.length);

  return (
    <section className="testimonials" id="depoimentos" aria-labelledby="testimonials-title">
      <div className="page-container">
        <SectionTitle dark className="testimonials__heading" eyebrow="DEPOIMENTOS" title={<>Parcerias que viram<br /> resultados reais.</>} />
        <p className="testimonials__lead">Tecnologia construída em conjunto com organizações que compartilham desafios, ideias e objetivos.</p>
        <div className="testimonials__layout">
          <article className="testimonials__featured" aria-live="polite">
            <Quote className="testimonials__quote-mark" aria-hidden="true" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={selected} className="testimonials__featured-content" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -10 }} transition={{ duration: reduced ? 0 : 0.28 }}>
                <p className="testimonials__quote">{current.quote}</p>
                <div className="testimonials__person"><span className="testimonials__avatar">{current.initials}</span><div><strong>{current.name}</strong><span>{current.role} · {current.company}</span></div></div>
              </motion.div>
            </AnimatePresence>
            <div className="testimonials__controls">
              <span>{String(selected + 1).padStart(2, '0')} <em>/ {String(testimonials.length).padStart(2, '0')}</em></span>
              <div><button type="button" onClick={() => move(-1)} aria-label="Depoimento anterior"><ArrowLeft size={18} /></button><button type="button" onClick={() => move(1)} aria-label="Próximo depoimento"><ArrowRight size={18} /></button></div>
            </div>
          </article>
          <div className="testimonials__list" role="list" aria-label="Selecionar depoimento">
            {testimonials.map((item, index) => <button type="button" role="listitem" className={index === selected ? 'is-active' : ''} key={`${item.initials}-${index}`} onClick={() => setSelected(index)} aria-pressed={index === selected}><span className="testimonials__avatar">{item.initials}</span><span><strong>{item.name}</strong><small>{item.role}</small></span><i aria-hidden="true" /></button>)}
          </div>
        </div>
      </div>
    </section>
  );
}
