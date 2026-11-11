import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { Glitch } from "./Glitch";
import { HeroName } from "./HeroName";
import { TECNOLOGIAS } from "../data/tecnologias";
import foto from "../assets/leandro-retrato.jpg";

const ease = [0.22, 1, 0.36, 1];

// Sem tela de carregamento: o nome embaralha e assenta e o resto sobe numa sequência curta.
const rise = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
});

export function Hero() {
  const { t } = useLang();
  const h = t.hero;

  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* marcas de registro nos cantos, como num visor */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-5 bottom-10 top-24 sm:inset-x-8">
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-cream-50/25" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-cream-50/25" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-cream-50/25" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-cream-50/25" />
      </div>

      <div className="relative mx-auto grid max-w-[88rem] gap-14 px-5 pb-28 pt-28 sm:px-8 lg:min-h-[100svh] lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24">
        <div className="lg:col-span-7">
          <HeroName
            lines={[
              { text: "LEANDRO", hover: "hover:text-red-500" },
              { text: "MATOS", className: "text-red-500", hover: "hover:text-cream-50" },
            ]}
          />

          <motion.p {...rise(0.3)} className="label mt-9 text-cream-300">
            <Glitch text={h.eyebrow} />
          </motion.p>
          <motion.div {...rise(0.4)} className="mt-5 max-w-xl space-y-3">
            <Glitch as="p" text={h.lead} className="text-lg leading-relaxed text-cream-50 sm:text-xl" />
            <Glitch as="p" text={h.focus} className="text-[15px] leading-relaxed text-cream-500" />
          </motion.div>

          <motion.div {...rise(0.5)} className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projetos"
              className="group relative isolate inline-flex items-center gap-3 overflow-hidden bg-red-500 px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-cream-50"
            >
              <span aria-hidden="true" className="absolute inset-0 -z-10 origin-left scale-x-0 bg-cream-50 transition-transform duration-500 ease-snap group-hover:scale-x-100" />
              <Glitch text={h.ctaWork} className="transition-colors duration-300 group-hover:text-ink-950" />
              <ArrowDown size={16} aria-hidden="true" className="transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-ink-950" />
            </a>
            <a
              href="#contato"
              className="group relative isolate inline-flex items-center gap-3 overflow-hidden border border-cream-50/30 px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-cream-50"
            >
              <span aria-hidden="true" className="absolute inset-0 -z-10 origin-left scale-x-0 bg-cream-50 transition-transform duration-500 ease-snap group-hover:scale-x-100" />
              <Glitch text={h.ctaContact} className="transition-colors duration-300 group-hover:text-ink-950" />
              <ArrowUpRight size={16} aria-hidden="true" className="transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-950" />
            </a>
          </motion.div>
        </div>

        <motion.div {...rise(0.2)} className="lg:col-span-5">
          {/* foto com moldura fina e uma faixa translúcida embaixo com as tecnologias */}
          <figure className="border border-cream-50/20 p-2">
            <div className="relative overflow-hidden">
              <img src={foto} alt={h.photoAlt} width="960" height="1200" className="block aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-5 border-t border-cream-50/15 bg-ink-950/55 px-4 py-3 backdrop-blur-md sm:px-5">
                <span aria-hidden="true" className="label hidden shrink-0 text-cream-300 sm:block">
                  {h.stackLabel}
                </span>
                <ul aria-label={h.stackLabel} className="flex flex-1 items-center justify-between gap-2">
                  {TECNOLOGIAS.map((tec) => (
                    <li key={tec.slug} className="group relative">
                      <svg
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label={tec.nome}
                        className="h-[18px] w-[18px] fill-cream-50/80 transition-colors duration-300 group-hover:fill-red-400 sm:h-5 sm:w-5"
                      >
                        <path d={tec.d} />
                      </svg>
                      <span
                        aria-hidden="true"
                        className="label pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-ink-950 px-2 py-1 text-[10px] text-cream-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      >
                        {tec.nome}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </figure>
        </motion.div>
      </div>

      <div className="label absolute inset-x-0 bottom-0 mx-auto flex max-w-[88rem] items-center justify-between gap-4 border-t border-cream-50/10 px-5 py-4 text-cream-500 sm:px-8">
        <span>
          <Glitch text={h.location} /> <span aria-hidden="true">/</span> {h.coords}
        </span>
        <a href="#sobre" className="inline-flex items-center gap-2 transition-colors hover:text-cream-50">
          <Glitch text={h.scroll} />
          <ArrowDown size={13} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
