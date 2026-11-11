import { motion } from "motion/react";
import { useLang } from "../i18n/LanguageContext";
import { Glitch } from "./Glitch";

const ease = [0.22, 1, 0.36, 1];

function IdBlock({ label, when, title, text, live, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease, delay }}
      className="border-t-2 border-cream-50 pt-6"
    >
      <div className="label flex items-center justify-between gap-4">
        <Glitch text={label} className="text-red-500" />
        <span className="flex items-center gap-2 text-cream-300">
          {live && <span aria-hidden="true" className="h-2 w-2 animate-[ping-red_2.2s_ease-out_infinite] bg-red-500" />}
          <Glitch text={when} />
        </span>
      </div>
      <Glitch as="h3" text={title} className="display mt-6 text-[clamp(2.4rem,4.6vw,3.75rem)] [font-stretch:70%]" />
      <Glitch as="p" text={text} className="mt-3 text-[16px] text-cream-300" />
    </motion.div>
  );
}

export function Journey() {
  const { t } = useLang();
  const j = t.journey;

  return (
    <section id="trajetoria" className="relative border-t border-ink-700 bg-ink-950">
      <div className="mx-auto max-w-[88rem] px-5 py-24 sm:px-8 sm:py-32">
        <Glitch as="p" onView text={`[ ${j.eyebrow} ]`} className="label text-red-500" />
        <Glitch as="h2" onView text={j.title} className="display mt-6 max-w-5xl text-[clamp(3rem,7.4vw,7rem)]" />

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-10">
          <IdBlock label={j.roleLabel} when={j.roleWhen} title={j.roleTitle} text={j.roleText} live delay={0} />
          <IdBlock label={j.eduLabel} when={j.eduWhen} title={j.eduTitle} text={j.eduPlace} delay={0.08} />
        </div>

        <div className="mt-24">
          <Glitch as="h3" onView text={j.timelineTitle} className="label text-cream-500" />
          <ol className="mt-6 border-t border-ink-700">
            {j.timeline.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease, delay: i * 0.06 }}
                className="group grid gap-2 border-b border-ink-700 py-6 transition-colors hover:bg-ink-900 sm:grid-cols-[11rem_minmax(0,22rem)_1fr] sm:items-baseline sm:gap-8 sm:px-3"
              >
                <Glitch text={item.when} className="label text-red-500" />
                <Glitch text={item.title} className="display text-[2rem] [font-stretch:75%] transition-colors group-hover:text-red-500" />
                <Glitch as="p" text={item.text} className="text-[15px] leading-relaxed text-cream-300" />
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
