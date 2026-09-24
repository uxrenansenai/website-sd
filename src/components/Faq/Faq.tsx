import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '../Button/Button';

const categories = {
  GERAL: ['O que é a SENAI Soluções Digitais?', 'Quais tipos de soluções vocês desenvolvem?', 'Onde a SENAI Soluções Digitais atua?'],
  EMPRESAS: ['Vocês desenvolvem soluções sob medida?', 'Como funciona o início de um projeto?', 'É possível integrar uma solução aos sistemas que minha empresa já utiliza?', 'Vocês atendem empresas fora de Santa Catarina?'],
  EDUCAÇÃO: ['Vocês desenvolvem soluções para educação?', 'É possível criar plataformas e experiências de aprendizagem personalizadas?', 'As soluções podem ser utilizadas por outras instituições?'],
  PARCERIAS: ['Como funciona uma parceria com a SENAI Soluções Digitais?', 'A empresa trabalha com provedores e parceiros tecnológicos?', 'Como posso propor uma parceria?'],
  CARREIRAS: ['Como faço para trabalhar na SENAI Soluções Digitais?', 'Onde encontro as vagas abertas?', 'Existem oportunidades para estágio?'],
} as const;

type Category = keyof typeof categories;

export function Faq() {
  const reduced = useReducedMotion();
  const [category, setCategory] = useState<Category>('GERAL');
  const [open, setOpen] = useState<number | null>(null);
  const questions = categories[category];

  function changeCategory(next: Category) { setCategory(next); setOpen(null); }

  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="page-container faq__layout">
        <div className="faq__intro"><span className="eyebrow">FAQ</span><h2 id="faq-title">Perguntas<br /> frequentes</h2><span className="faq__ornament" aria-hidden="true" /></div>
        <div className="faq__content">
          <div className="faq__categories" role="tablist" aria-label="Categorias de perguntas">
            {(Object.keys(categories) as Category[]).map(item => <button type="button" role="tab" aria-selected={category === item} className={category === item ? 'is-active' : ''} onClick={() => changeCategory(item)} key={item}>{item}</button>)}
          </div>
          <div className="faq__questions">
            {questions.map((question, index) => { const isOpen = open === index; const answerId = `faq-answer-${category.toLowerCase()}-${index}`; return <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={question}>
              <button type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpen(isOpen ? null : index)}><span>{question}</span><ChevronDown size={19} aria-hidden="true" /></button>
              <AnimatePresence initial={false}>{isOpen && <motion.div id={answerId} className="faq__answer" initial={reduced ? false : { opacity: 0, height: 0, y: -5 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={reduced ? undefined : { opacity: 0, height: 0, y: -5 }} transition={{ duration: reduced ? 0 : 0.22 }}><p>Resposta a ser confirmada e inserida pela equipe SENAI Soluções Digitais.</p></motion.div>}</AnimatePresence>
            </div>; })}
          </div>
          <div className="faq__cta"><span>Ainda ficou alguma dúvida?</span><Button variant="secondary" href="#contato">Fale com nosso time</Button></div>
        </div>
      </div>
    </section>
  );
}
