import { useState, type FormEvent } from 'react';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { Button } from '../Button/Button';

export function Contact() {
  const [sent, setSent] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Contato pelo site: ${data.get('subject')}`;
    const body = `Nome: ${data.get('name')}\nE-mail: ${data.get('email')}\n\n${data.get('message')}`;
    window.location.href = `mailto:solucoesdigitais@sc.senai.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }
  return (
    <section className="contact" id="contato">
      <div className="page-container">
        <SectionTitle dark eyebrow="CONTATO" title="Fale com a gente" />
        <form className="contact__form" onSubmit={handleSubmit}>
          <label>Nome<input name="name" type="text" placeholder="Digite seu nome" autoComplete="name" required /></label>
          <label>E-mail<input name="email" type="email" placeholder="Digite seu e-mail" autoComplete="email" required /></label>
          <label>Como podemos lhe ajudar?<select name="subject" defaultValue="" required><option value="" disabled>Selecione um assunto</option><option>Quero conhecer as soluções</option><option>Tenho um projeto</option><option>Quero fazer parte do time</option><option>Outro assunto</option></select></label>
          <label>Mensagem<textarea name="message" placeholder="Escreva sua mensagem" rows={6} required /></label>
          <Button className="contact__submit" variant="primary" type="submit">Enviar mensagem</Button>
          {sent && <p className="contact__notice" role="status">Seu aplicativo de e-mail foi aberto com a mensagem preenchida.</p>}
        </form>
        <p className="contact__direct">Prefere escrever direto? <a href="mailto:solucoesdigitais@sc.senai.br">solucoesdigitais@sc.senai.br</a></p>
      </div>
    </section>
  );
}
