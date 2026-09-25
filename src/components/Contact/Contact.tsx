import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { fadeUp, headingReveal, staggerContainer } from '../../styles/motion';
import { Button } from '../Button/Button';
import styles from './Contact.module.css';

type Journey = 'project' | 'partnership' | 'other';
type View = 'selector' | Journey;
type FormValues = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  interests: string[];
};

type JourneyConfig = {
  eyebrow: string;
  title: string;
  description: string;
  cardTitle: string;
  cardDescription: string;
  cardCta: string;
  formTitle: string;
  formDescription: string;
  companyLabel?: string;
  choiceLabel?: string;
  choices?: string[];
  subjectOptions?: string[];
  contactEmail?: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
};

const configs: Record<Journey, JourneyConfig> = {
  project: {
    eyebrow: 'PROJETOS', title: 'Conte seu desafio',
    description: 'Conte-nos os detalhes do seu desafio tecnológico ou estratégico. Nossa equipe avaliará seu contexto para entender como podemos apoiar sua operação com soluções digitais.',
    cardTitle: 'Quero desenvolver um projeto', cardDescription: 'Tenho um desafio tecnológico ou de negócios e quero entender como o time de Soluções Digitais do SENAI pode acelerar minha operação com engenharia premium.', cardCta: 'Conte seu desafio',
    formTitle: 'Sobre seu desafio', formDescription: 'Conte-nos os detalhes do seu desafio tecnológico ou estratégico. Nossa equipe avaliará seu contexto para entender como podemos apoiar sua operação com soluções digitais.', companyLabel: 'Empresa', choiceLabel: 'Tecnologias de interesse (selecione uma ou mais)', choices: ['Desenvolvimento Web', 'Desenvolvimento Mobile', 'Inteligência Artificial', 'Dados & Analytics', 'AWS / Cloud', 'Realidade Estendida', 'Ainda não sei'], messageLabel: 'Mensagem', messagePlaceholder: 'Descreva brevemente seu desafio, objetivos e contexto do projeto.', submitLabel: 'Enviar solicitação',
  },
  partnership: {
    eyebrow: 'PARCERIAS', title: 'Vamos construir juntos',
    description: 'Conte-nos um pouco sobre sua organização e a oportunidade de parceria. Queremos entender como podemos colaborar em iniciativas de tecnologia, inovação e transformação digital.',
    cardTitle: 'Quero construir uma parceria', cardDescription: 'Quero explorar oportunidades de colaboração, inovação e desenvolvimento conjunto com o SENAI Soluções Digitais.', cardCta: 'Vamos conversar',
    formTitle: 'Sobre sua parceria', formDescription: 'Conte-nos um pouco sobre sua organização e a oportunidade de parceria. Queremos entender como podemos colaborar em iniciativas de tecnologia, inovação e transformação digital.', companyLabel: 'Empresa / Instituição', choiceLabel: 'Tipo de parceria (selecione uma ou mais)', choices: ['Tecnologia', 'Inovação', 'Pesquisa e desenvolvimento', 'Educação', 'Indústria', 'Cooperação institucional', 'Outro'], messageLabel: 'Mensagem', messagePlaceholder: 'Conte brevemente a oportunidade, objetivo ou ideia de parceria.', submitLabel: 'Enviar proposta',
  },
  other: {
    eyebrow: 'OUTROS ASSUNTOS', title: 'Vamos conversar',
    description: 'Use este espaço para falar com o SENAI Soluções Digitais sobre outros assuntos.',
    cardTitle: 'Quero falar sobre outro assunto', cardDescription: '', cardCta: 'Fale com a gente', contactEmail: 'solucoesdigitais@sc.senai.br',
    formTitle: 'Sobre sua mensagem', formDescription: 'Use este espaço para falar com o SENAI Soluções Digitais sobre outros assuntos.', subjectOptions: ['Imprensa', 'Institucional', 'Suporte', 'Informações gerais', 'Outro'], messageLabel: 'Mensagem', messagePlaceholder: 'Como podemos ajudar?', submitLabel: 'Enviar mensagem',
  },
};

const optionOrder: Journey[] = ['project', 'partnership', 'other'];
const selectorVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } }, exit: { opacity: 0, y: -18, transition: { duration: 0.35, ease: 'easeIn' as const } } };
const itemVariants = { hidden: { opacity: 0, y: 24, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.62, ease: 'easeOut' as const } } };
const formVariants = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: 'easeOut' as const, staggerChildren: 0.07, delayChildren: 0.1 } }, exit: { opacity: 0, y: 18, transition: { duration: 0.35, ease: 'easeIn' as const } } };
const fieldVariants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } } };
const initialValues = (): FormValues => ({ name: '', email: '', company: '', subject: '', message: '', interests: [] });

function ContactOptionCard({ journey, selected, onSelect, reduced }: { journey: Journey; selected: boolean; onSelect: (journey: Journey) => void; reduced: boolean | null }) {
  const config = configs[journey];
  const cardClass = `${styles.optionCard} ${selected ? styles.optionCardSelected : ''}`;
  const cardContent = <>
    <span className={styles.optionTop}>{config.eyebrow}</span>
    <span className={styles.optionMiddle}><span className={styles.optionTitle}>{config.cardTitle}</span>{config.cardDescription && <span className={styles.optionDescription}>{config.cardDescription}</span>}</span>
    {config.contactEmail ? <span className={styles.emailContact}><span className={styles.emailIcon} aria-hidden="true"><img src="/figma/contact-v2/envelope.svg" alt="" /></span><span>{config.contactEmail}</span></span> : <span className={styles.optionBottom}><span>{config.cardCta}</span><span className={styles.arrowButton} aria-hidden="true"><img src="/figma/contact-v2/arrow-right.svg" alt="" /></span></span>}
  </>;

  if (config.contactEmail) {
    return <motion.a href={`mailto:${config.contactEmail}`} className={cardClass} variants={reduced ? undefined : itemVariants} aria-label="Enviar e-mail para SENAI Soluções Digitais">{cardContent}</motion.a>;
  }

  return <motion.button type="button" className={cardClass} variants={reduced ? undefined : itemVariants} onClick={() => onSelect(journey)} aria-label={`${config.cardTitle}. ${config.cardCta}`} aria-pressed={selected}>{cardContent}</motion.button>;
}

function ContactSelector({ onSelect, selected, reduced }: { onSelect: (journey: Journey) => void; selected?: Journey; reduced: boolean | null }) {
  return <motion.div className={styles.selector} variants={reduced ? undefined : selectorVariants} initial={reduced ? undefined : 'hidden'} whileInView={reduced ? undefined : 'visible'} viewport={{ once: true, amount: 0.25 }} exit={reduced ? undefined : 'exit'}>
    <motion.div className={styles.selectorHeader} variants={reduced ? undefined : staggerContainer}><motion.span className={styles.selectorEyebrow} variants={reduced ? undefined : fadeUp}>Contato</motion.span><motion.h2 variants={reduced ? undefined : headingReveal}>Fale com a gente</motion.h2></motion.div>
    <div className={styles.optionGrid}>{optionOrder.map(journey => <ContactOptionCard key={journey} journey={journey} selected={selected === journey} onSelect={onSelect} reduced={reduced} />)}</div>
  </motion.div>;
}

function ChoiceChips({ choices, selected, onChange, describedBy }: { choices: string[]; selected: string[]; onChange: (choices: string[]) => void; describedBy?: string }) {
  function toggle(choice: string) { onChange(selected.includes(choice) ? selected.filter(item => item !== choice) : [...selected, choice]); }
  return <div className={styles.chips} role="group" aria-describedby={describedBy}>{choices.map(choice => { const isSelected = selected.includes(choice); return <button key={choice} type="button" className={`${styles.chip} ${isSelected ? styles.chipSelected : ''}`} aria-pressed={isSelected} onClick={() => toggle(choice)}>{choice}</button>; })}</div>;
}

function ContactForm({ journey, onBack, reduced }: { journey: Journey; onBack: () => void; reduced: boolean | null }) {
  const config = configs[journey];
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [interactive, setInteractive] = useState(Boolean(reduced));
  const titleId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => { formRef.current?.querySelector<HTMLElement>('input, select, textarea, button')?.focus(); }, []);

  function updateValue(name: string, value: string) { setValues(previous => ({ ...previous, [name]: value })); setErrors(previous => ({ ...previous, [name]: '' })); }
  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!values.name.trim()) nextErrors.name = 'Informe seu nome.';
    if (!values.email.trim()) nextErrors.email = 'Informe seu e-mail.';
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = 'Informe um e-mail válido.';
    if (config.companyLabel && !values.company.trim()) nextErrors.company = 'Informe a empresa ou instituição.';
    if (config.choices && values.interests.length === 0) nextErrors.interests = 'Selecione pelo menos uma opção.';
    if (config.subjectOptions && !values.subject) nextErrors.subject = 'Selecione um assunto.';
    if (!values.message.trim()) nextErrors.message = 'Escreva uma mensagem.';
    return nextErrors;
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(); setErrors(nextErrors); if (Object.keys(nextErrors).length > 0) return;
    const subject = `${config.title} pelo site`;
    const body = [`Nome: ${values.name}`, `E-mail: ${values.email}`, values.company ? `Empresa: ${values.company}` : '', values.subject ? `Assunto: ${values.subject}` : '', values.interests.length ? `Interesses: ${values.interests.join(', ')}` : '', '', values.message].filter(Boolean).join('\n');
    setSent(true); window.location.href = `mailto:solucoesdigitais@sc.senai.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  const fieldError = (name: string) => errors[name] ? <span className={styles.error} id={`${titleId}-${name}-error`} role="alert">{errors[name]}</span> : null;
  const describedBy = (name: string) => errors[name] ? `${titleId}-${name}-error` : undefined;

  return <motion.div className={`${styles.formState} ${interactive ? '' : styles.formEntering}`} variants={reduced ? undefined : formVariants} initial={reduced ? undefined : 'hidden'} animate={reduced ? undefined : 'visible'} exit={reduced ? undefined : 'exit'} onAnimationComplete={() => setInteractive(true)}>
    <motion.aside className={styles.formSidebar} variants={reduced ? undefined : fieldVariants}><div className={styles.formHeader}><span className={styles.formEyebrow}>{config.eyebrow}</span><h2>{config.title}</h2><p>{config.formDescription}</p></div></motion.aside>
    <motion.form ref={formRef} className={styles.formCard} onSubmit={handleSubmit} noValidate variants={reduced ? undefined : fieldVariants}>
      <h3 id={titleId}>{config.formTitle}</h3>
      <div className={styles.formFields}>
        <motion.div className={styles.field} variants={reduced ? undefined : fieldVariants}><label htmlFor={`${titleId}-name`}>Nome</label><input id={`${titleId}-name`} name="name" value={values.name} onChange={event => updateValue('name', event.target.value)} placeholder="Digite seu nome completo" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('name')} />{fieldError('name')}</motion.div>
        <motion.div className={styles.field} variants={reduced ? undefined : fieldVariants}><label htmlFor={`${titleId}-email`}>{journey === 'other' ? 'E-mail' : 'E-mail corporativo'}</label><input id={`${titleId}-email`} name="email" type="email" value={values.email} onChange={event => updateValue('email', event.target.value)} placeholder="exemplo@empresa.com.br" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email')} />{fieldError('email')}</motion.div>
        {config.companyLabel && <motion.div className={styles.field} variants={reduced ? undefined : fieldVariants}><label htmlFor={`${titleId}-company`}>{config.companyLabel}</label><input id={`${titleId}-company`} name="company" value={values.company} onChange={event => updateValue('company', event.target.value)} placeholder="Sua empresa ou instituição" aria-invalid={Boolean(errors.company)} aria-describedby={describedBy('company')} />{fieldError('company')}</motion.div>}
        {config.choices && config.choiceLabel && <motion.div className={styles.choiceField} variants={reduced ? undefined : fieldVariants}><span className={styles.fieldLabel}>{config.choiceLabel}</span><ChoiceChips choices={config.choices} selected={values.interests} onChange={choices => { setValues(previous => ({ ...previous, interests: choices })); setErrors(previous => ({ ...previous, interests: '' })); }} describedBy={describedBy('interests')} />{fieldError('interests')}</motion.div>}
        {config.subjectOptions && <motion.div className={styles.field} variants={reduced ? undefined : fieldVariants}><label htmlFor={`${titleId}-subject`}>Assunto</label><select id={`${titleId}-subject`} name="subject" value={values.subject} onChange={event => updateValue('subject', event.target.value)} aria-invalid={Boolean(errors.subject)} aria-describedby={describedBy('subject')}><option value="">Selecione um assunto</option>{config.subjectOptions.map(option => <option key={option} value={option}>{option}</option>)}</select>{fieldError('subject')}</motion.div>}
        <motion.div className={styles.field} variants={reduced ? undefined : fieldVariants}><label htmlFor={`${titleId}-message`}>{config.messageLabel}</label><textarea id={`${titleId}-message`} name="message" value={values.message} onChange={event => updateValue('message', event.target.value)} placeholder={config.messagePlaceholder} rows={5} aria-invalid={Boolean(errors.message)} aria-describedby={describedBy('message')} />{fieldError('message')}</motion.div>
      </div>
      <div className={styles.formActions}><button type="button" className={styles.backButton} onClick={onBack}><span className={styles.backArrow} aria-hidden="true"><img src="/figma/contact-v2/arrow-left.svg" alt="" /></span><span>Voltar</span></button><Button variant="primary-dark" type="submit" className={styles.submitButton} showArrow={false}>{config.submitLabel}</Button></div>
      {sent && <p className={styles.success} role="status">Seu aplicativo de e-mail foi aberto com a mensagem preenchida.</p>}
    </motion.form>
  </motion.div>;
}

export function Contact() {
  const reduced = useReducedMotion();
  const [view, setView] = useState<View>('selector');
  const [selected, setSelected] = useState<Journey>();
  const pendingTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => { if (pendingTimer.current) window.clearTimeout(pendingTimer.current); }, []);
  function handleSelect(journey: Journey) { if (view !== 'selector' || pendingTimer.current) return; setSelected(journey); pendingTimer.current = window.setTimeout(() => { setView(journey); pendingTimer.current = undefined; }, reduced ? 0 : 180); }
  function handleBack() { setSelected(undefined); setView('selector'); }
  return <section className={styles.section} id="contato" aria-labelledby="contact-section-title">
    <span className={`${styles.ambientGlow} ${styles.ambientGlowLeft}`} aria-hidden="true"><img src="/figma/contact-v2/ambient-glow-left.svg" alt="" /></span><span className={`${styles.ambientGlow} ${styles.ambientGlowRight}`} aria-hidden="true"><img src="/figma/contact-v2/ambient-glow-right.svg" alt="" /></span>
    <div className={styles.container}><AnimatePresence mode="wait" initial={false}>{view === 'selector' ? <ContactSelector key="selector" onSelect={handleSelect} selected={selected} reduced={reduced} /> : <ContactForm key={view} journey={view} onBack={handleBack} reduced={reduced} />}</AnimatePresence></div>
    <span className={styles.srOnly} id="contact-section-title">Fale com a gente</span>
  </section>;
}
