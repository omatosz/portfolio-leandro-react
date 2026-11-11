import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Send } from "lucide-react";
import { LINKS } from "../i18n/content";
import { useLang } from "../i18n/LanguageContext";
import { Glitch } from "./Glitch";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "./icons";

// EmailJS: a chave pública pode ficar no front, é feita para isso.
const EMAILJS_SERVICE_ID = "service_sybifue";
const EMAILJS_TEMPLATE_ID = "template_m80cy6o";
const EMAILJS_PUBLIC_KEY = "fAY7b5B9FGnpPEKlj";

const ease = [0.22, 1, 0.36, 1];
const EMPTY = { nome: "", email: "", assunto: "", mensagem: "" };

const inputClass =
  "mt-2 w-full border-0 border-b border-cream-50/25 bg-transparent px-0 py-3 text-[16px] text-cream-50 placeholder:text-cream-500/70 outline-none transition-colors duration-300 focus:border-red-500 focus-visible:outline-none";

function Field({ id, label, children }) {
  return (
    <label htmlFor={id} className="block">
      <Glitch text={label} className="label text-cream-500" />
      {children}
    </label>
  );
}

export function Contact() {
  const { t } = useLang();
  const c = t.contact;
  const f = c.form;
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [copied, setCopied] = useState(false);

  const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { nome: form.nome, email: form.email, assunto: form.assunto || f.defaultSubject, mensagem: form.mensagem },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("success");
      setForm(EMPTY);
    } catch (err) {
      console.error("Falha ao enviar pelo EmailJS:", err);
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${LINKS.email}`;
    }
  };

  const channels = [
    { key: "linkedin", label: c.channels.linkedin, href: LINKS.linkedin, icon: LinkedinIcon },
    { key: "github", label: c.channels.github, href: LINKS.github, icon: GithubIcon },
    { key: "whatsapp", label: c.channels.whatsapp, href: LINKS.whatsapp, icon: WhatsAppIcon },
  ];

  // quebra o título no ponto de interrogação para pintar a segunda frase de cream
  const [first, ...rest] = c.title.split("? ");
  const second = rest.join("? ");

  return (
    <section id="contato" className="focus-ink relative overflow-hidden bg-red-500 text-ink-950">
      <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 sm:py-32">
        <Glitch as="p" onView text={`[ ${c.eyebrow} ]`} className="label text-ink-950" />
        {/* mínimo menor no celular para "desenvolvimento" caber inteiro na largura */}
        <h2 className="display mt-6 text-[clamp(2.4rem,9.5vw,9.5rem)] [overflow-wrap:break-word]">
          <Glitch onView text={second ? `${first}?` : c.title} className="block" />
          {second && <Glitch onView text={second} className="block text-cream-50" />}
        </h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-6"
          >
            <Glitch as="p" text={c.text} className="text-lg text-ink-900" />
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${LINKS.email}`}
                className="display break-all text-[clamp(1.9rem,4.2vw,3.5rem)] underline decoration-ink-950 decoration-[3px] underline-offset-8 [font-stretch:80%] hover:text-cream-50"
              >
                {LINKS.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="label inline-flex items-center gap-2 bg-ink-950 px-3 py-2 text-cream-50 transition-colors hover:bg-ink-800"
              >
                {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
                <span aria-live="polite">{copied ? c.copied : c.copy}</span>
              </button>
            </div>

            <ul className="mt-12 grid gap-3 sm:grid-cols-3">
              {channels.map(({ key, label, href, icon: Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 border-2 border-ink-950 px-4 py-3.5 transition-colors hover:bg-ink-950 hover:text-cream-50"
                  >
                    <span className="flex items-center gap-3">
                      <Icon />
                      <Glitch text={label} className="label text-[12px]" />
                    </span>
                    <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>

            <p className="label mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-950">
              <span aria-hidden="true" className="h-2 w-2 bg-ink-950" />
              <Glitch text={c.status} />
              <span aria-hidden="true">/</span>
              <Glitch text={c.location} />
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
            className="bg-ink-950 p-6 text-cream-50 shadow-[18px_18px_0_0_rgba(7,6,6,0.25)] sm:p-9 lg:col-span-6"
          >
            <Glitch as="h3" text={f.title} className="display text-[2.4rem] [font-stretch:75%]" />
            <div className="mt-8 grid gap-7 sm:grid-cols-2">
              <Field id="contato-nome" label={f.name}>
                <input id="contato-nome" name="nome" type="text" required autoComplete="name" value={form.nome} onChange={update("nome")} placeholder={f.namePh} className={inputClass} />
              </Field>
              <Field id="contato-email" label={f.email}>
                <input id="contato-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={update("email")} placeholder={f.emailPh} className={inputClass} />
              </Field>
              <div className="sm:col-span-2">
                <Field id="contato-assunto" label={f.subject}>
                  <input id="contato-assunto" name="assunto" type="text" value={form.assunto} onChange={update("assunto")} placeholder={f.subjectPh} className={inputClass} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field id="contato-mensagem" label={f.message}>
                  <textarea id="contato-mensagem" name="mensagem" required rows={4} value={form.mensagem} onChange={update("mensagem")} placeholder={f.messagePh} className={`${inputClass} resize-none`} />
                </Field>
              </div>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative isolate inline-flex items-center gap-3 overflow-hidden bg-red-500 px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-cream-50 disabled:opacity-60 [&:focus-visible]:outline-cream-50"
              >
                <span aria-hidden="true" className="absolute inset-0 -z-10 origin-left scale-x-0 bg-cream-50 transition-transform duration-500 ease-snap group-hover:scale-x-100" />
                <Send size={15} aria-hidden="true" className="transition-colors duration-300 group-hover:text-ink-950" />
                <Glitch text={status === "sending" ? f.sending : f.send} className="transition-colors duration-300 group-hover:text-ink-950" />
              </button>
              <p role="status" aria-live="polite" className="text-sm">
                {status === "success" && <span className="text-cream-50">{f.success}</span>}
                {status === "error" && <span className="text-red-400">{f.error}</span>}
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
