import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Glitch } from "./Glitch";

// As 10 etapas do Veryon numa barra segmentada. Avança sozinha enquanto está na
// tela; um clique escolhe a etapa e segura a troca automática por alguns segundos.
export function Pipeline({ stages, title, hint, stageWord }) {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const ref = useRef(null);
  const holdTimer = useRef(0);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const total = stages.length;

  useEffect(() => {
    if (!inView || hold || reduce) return undefined;
    const id = setInterval(() => setActive((a) => (a + 1) % total), 3200);
    return () => clearInterval(id);
  }, [inView, hold, reduce, total]);

  useEffect(() => () => clearTimeout(holdTimer.current), []);

  const pick = (i) => {
    setActive(i);
    setHold(true);
    clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(() => setHold(false), 10000);
  };

  const stage = stages[active];
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <Glitch as="h4" text={title} className="label text-red-500" />
        <Glitch as="p" text={hint} className="label text-cream-500" />
      </div>

      <ol className="mt-6 grid grid-cols-10 gap-1 sm:gap-1.5">
        {stages.map((s, i) => {
          const isActive = i === active;
          const passed = i < active;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => pick(i)}
                aria-label={`${stageWord} ${i + 1}: ${s.name}`}
                aria-current={isActive ? "step" : undefined}
                className="group block w-full py-2 text-left"
              >
                <span className={`label mb-2 hidden text-[10px] sm:block ${isActive ? "text-cream-50" : "text-cream-500/70"}`}>{pad(i + 1)}</span>
                <span className="relative block h-2 overflow-hidden bg-ink-700 transition-colors group-hover:bg-ink-600">
                  {passed && <span className="absolute inset-0 bg-red-700" />}
                  {isActive && (
                    <motion.span
                      layoutId="pipeline-ativo"
                      className="absolute inset-0 bg-red-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </span>
                <span
                  className={`label mt-2 hidden truncate text-[10px] transition-colors lg:block ${isActive ? "text-cream-50" : "text-cream-500/70"}`}
                >
                  {s.short}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 grid gap-6 border-t border-ink-700 pt-8 sm:grid-cols-[auto_1fr] sm:gap-12">
        <p className="display text-[5.5rem] leading-none text-red-500 tabular-nums [font-stretch:70%]">{pad(active + 1)}</p>
        <div className="max-w-2xl">
          <Glitch as="h5" text={stage.name} speed={1.4} className="display text-[2.4rem] [font-stretch:75%]" />
          <Glitch as="p" text={stage.fact} speed={1.4} className="label mt-2 text-cream-300" />
          <Glitch as="p" text={stage.text} speed={1.6} className="mt-4 text-[15px] leading-relaxed text-cream-300" />
        </div>
      </div>
    </div>
  );
}
