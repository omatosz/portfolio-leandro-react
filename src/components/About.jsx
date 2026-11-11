import { motion } from "motion/react";
import { useLang } from "../i18n/LanguageContext";
import { Glitch } from "./Glitch";

const ease = [0.22, 1, 0.36, 1];
const snap = [0.7, 0, 0.2, 1];

// Título com cada palavra coberta por uma tarja preta que sai quando a seção
// aparece, como um documento sendo liberado. O trecho destacado fica vermelho.
function RedactedTitle({ text, highlight, className }) {
  const words = text.split(" ");
  const target = highlight.toLowerCase().split(" ");
  const plain = words.map((w) => w.toLowerCase().replace(/[.,!?]/g, ""));
  const marked = Array.from({ length: words.length }, () => false);
  for (let i = 0; i + target.length <= plain.length; i++) {
    if (target.every((w, k) => plain[i + k] === w)) {
      for (let k = 0; k < target.length; k++) marked[i + k] = true;
      break;
    }
  }

  return (
    <h2 className={className}>
      {words.map((word, i) => (
        <span key={i} className="relative mr-[0.2em] inline-block">
          <Glitch text={word} className={marked[i] ? "text-red-500" : undefined} />
          <motion.span
            aria-hidden="true"
            className="absolute -inset-x-[0.04em] inset-y-[0.04em] origin-right bg-ink-950"
            initial={{ scaleX: 1 }}
            whileInView={{ scaleX: 0 }}
            viewport={{ once: true, amount: 0.9 }}
            transition={{ duration: 0.55, ease: snap, delay: 0.15 + i * 0.07 }}
          />
        </span>
      ))}
    </h2>
  );
}

export function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="sobre" className="relative bg-cream-50 text-ink-950">
      <div className="mx-auto max-w-[88rem] px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40">
        <Glitch as="p" onView text={`[ ${a.eyebrow} ]`} className="label text-red-600" />

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <RedactedTitle text={a.title} highlight={a.titleHighlight} className="display text-[clamp(3rem,7.4vw,7rem)] lg:col-span-8" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="space-y-5 text-[17px] leading-relaxed text-ink-800 lg:col-span-4 lg:self-end"
          >
            {a.body.map((paragraph, i) => (
              <Glitch key={i} as="p" text={paragraph} />
            ))}
          </motion.div>
        </div>

        <div className="mt-24 grid gap-10 md:grid-cols-3 md:gap-8">
          {a.focus.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              className="group border-t-2 border-ink-950 pt-6"
            >
              <span aria-hidden="true" className="block h-0.5 w-0 -translate-y-[1.6rem] bg-red-500 transition-all duration-500 ease-snap group-hover:w-full" />
              <Glitch as="h3" text={item.title} className="display text-[2.6rem] [font-stretch:72%]" />
              <Glitch as="p" text={item.text} className="mt-4 text-[15px] leading-relaxed text-ink-800" />
            </motion.div>
          ))}
        </div>

        <div className="mt-24">
          <Glitch as="h3" onView text={a.stackTitle} className="label text-red-600" />
          <dl className="mt-6 divide-y divide-ink-950/15 border-y border-ink-950/15">
            {a.stack.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="grid gap-2 py-5 sm:grid-cols-[13rem_1fr] sm:gap-8"
              >
                <dt>
                  <Glitch text={group.group} className="display text-2xl [font-stretch:80%]" />
                </dt>
                <dd className="font-mono text-[13px] leading-relaxed text-ink-800">{group.items.join("  /  ")}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
