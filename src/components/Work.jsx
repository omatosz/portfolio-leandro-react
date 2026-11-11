import { motion } from "motion/react";
import { ArrowUpRight, Lock } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { CountUp } from "./CountUp";
import { Glitch } from "./Glitch";
import { Pipeline } from "./Pipeline";

const ease = [0.22, 1, 0.36, 1];

// Botão de link externo dos projetos; o vermelho entra da esquerda no hover.
function ProjectLink({ href, label, solid }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative isolate inline-flex items-center gap-2.5 overflow-hidden px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] ${
        solid ? "bg-cream-50 text-ink-950" : "border border-cream-50/30 text-cream-50"
      }`}
    >
      <span aria-hidden="true" className="absolute inset-0 -z-10 origin-left scale-x-0 bg-red-500 transition-transform duration-500 ease-snap group-hover:scale-x-100" />
      <Glitch text={label} className="transition-colors duration-300 group-hover:text-cream-50" />
      <ArrowUpRight size={15} aria-hidden="true" className="transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cream-50" />
    </a>
  );
}

function Featured({ f, locale }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, ease }}
      className="relative border border-ink-700 bg-ink-900"
    >
      <div className="h-1.5 bg-red-500" />
      <div className="grid gap-12 p-6 sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-14">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <Glitch text={f.label} className="label bg-red-500 px-2.5 py-1 text-ink-950" />
            <Glitch text={f.period} className="label text-cream-500" />
          </div>
          <h3 className="display mt-8 flex items-start gap-3 text-[clamp(4.5rem,12vw,10rem)]">
            {f.name}
            <span aria-hidden="true" className="mt-[0.12em] h-[0.16em] w-[0.16em] animate-[ping-red_2.2s_ease-out_infinite] bg-red-500" />
          </h3>
          <Glitch as="p" text={f.tagline} className="mt-6 text-2xl font-semibold leading-snug text-cream-50 [font-stretch:90%] sm:text-3xl" />
          <Glitch as="p" text={f.description} className="mt-6 max-w-2xl text-[16px] leading-relaxed text-cream-300" />
          <div className="mt-9 flex flex-wrap gap-3">
            {f.links.map((link, i) => (
              <ProjectLink key={i} href={link.href} label={link.label} solid={i === 0} />
            ))}
          </div>
        </div>

        <dl className="grid grid-cols-2 self-end border-l border-t border-ink-700 lg:col-span-5">
          {f.stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-3 border-b border-r border-ink-700 p-5">
              <dt className="order-2">
                <Glitch text={stat.label} className="label text-cream-500" />
              </dt>
              <dd className="display order-1 text-[clamp(2.75rem,5vw,4.25rem)] text-red-500 [font-stretch:70%]">
                <CountUp value={stat.value} locale={locale} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="border-t border-ink-700 pt-10 lg:col-span-12">
          <Pipeline stages={f.stages} title={f.pipelineTitle} hint={f.pipelineHint} stageWord={f.stageWord} />
        </div>

        <p className="label text-cream-500 lg:col-span-12">{f.stack.join("  /  ")}</p>
      </div>
    </motion.article>
  );
}

// Projeto secundário: mesmo vocabulário do destaque, em escala menor e sem a faixa vermelha.
function OtherProject({ p, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease, delay: index * 0.08 }}
      className="grid gap-10 border border-ink-700 bg-ink-900 p-6 sm:p-10 lg:grid-cols-12 lg:p-14"
    >
      <div className="lg:col-span-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="label inline-flex items-center gap-2 border border-cream-50/25 px-2.5 py-1 text-cream-100">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-red-500" />
            <Glitch text={p.status} />
          </span>
          <Glitch text={p.period} className="label text-cream-500" />
        </div>
        <Glitch as="h3" text={p.name} className="display mt-7 block text-[clamp(2.8rem,6.4vw,5.6rem)]" />
        <Glitch as="p" text={p.tagline} className="mt-5 text-xl font-semibold leading-snug text-cream-50 [font-stretch:90%] sm:text-2xl" />
        <Glitch as="p" text={p.description} className="mt-5 max-w-2xl text-[16px] leading-relaxed text-cream-300" />
        <div className="mt-9">
          {p.link ? (
            <ProjectLink href={p.link.href} label={p.link.label} />
          ) : (
            <span className="label inline-flex items-center gap-2 text-cream-500">
              <Lock size={13} aria-hidden="true" />
              <Glitch text={p.note} />
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-end gap-8 border-t border-ink-700 pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
        <ul className="space-y-3">
          {p.points.map((point, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-cream-100">
              <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-red-500" />
              <Glitch text={point} />
            </li>
          ))}
        </ul>
        <p className="label leading-relaxed text-cream-500">{p.stack.join("  /  ")}</p>
      </div>
    </motion.article>
  );
}

export function Work() {
  const { t } = useLang();
  const w = t.work;

  return (
    <section id="projetos" className="relative bg-ink-950">
      <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Glitch as="p" onView text={`[ ${w.eyebrow} ]`} className="label text-red-500" />
            <Glitch as="h2" onView text={w.title} className="display mt-6 text-[clamp(3rem,7.4vw,7rem)]" />
          </div>
          <Glitch as="p" text={w.intro} className="text-[16px] leading-relaxed text-cream-300 lg:col-span-4" />
        </div>

        <div className="mt-16">
          <Featured f={w.featured} locale={t.meta.locale} />
        </div>

        {w.projects.length > 0 && (
          <div className="mt-20">
            <Glitch
              as="p"
              onView
              text={`[ ${w.projects.length === 1 ? w.moreLabel.one : w.moreLabel.many} ]`}
              className="label text-red-500"
            />
            <div className="mt-6 space-y-6">
              {w.projects.map((p, i) => (
                <OtherProject key={i} p={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
