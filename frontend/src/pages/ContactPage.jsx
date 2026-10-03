import { useState } from 'react';
import Section from '../components/Section';

function ContactPage({ notify }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const submit = (event) => { event.preventDefault(); notify('Thanks — your message is ready to send.'); setForm({ name: '', email: '', message: '' }); };
  return <div className="page-shell contact-page">
    <Section eyebrow="Let’s connect" title="Have a question about CattleAI?" align="center">
      <p className="section-intro">Whether you&apos;re exploring the model or planning a demo, we&apos;d love to hear from you.</p>
    </Section>
    <div className="contact-layout">
      <aside className="contact-aside"><span className="mini-label">PROJECT CONTACT</span><h2>Build with purposeful AI.</h2><p>Reach out for project feedback, collaboration, or a walkthrough of the computer vision workflow.</p><div className="contact-links"><a href="mailto:hello@cattleai.example">✉ &nbsp;hello@cattleai.example</a><a href="https://github.com" target="_blank" rel="noreferrer">◌ &nbsp;GitHub</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">in &nbsp;LinkedIn</a></div></aside>
      <form className="contact-form card-surface" onSubmit={submit}>
        <label>Your name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Name" /></label>
        <label>Email address<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label>
        <label>Message<textarea required rows="5" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell us how we can help" /></label>
        <button className="btn btn-primary" type="submit">Send message <span>→</span></button>
      </form>
    </div>
  </div>;
}
export default ContactPage;
