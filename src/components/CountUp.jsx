import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

// Número que conta de zero até o valor quando entra na tela, no formato do idioma
// (17.824 em português, 17,824 em inglês).
export function CountUp({ value, locale, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) {
      setCurrent(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCurrent(Math.round(v)),
    });
    // se o navegador pausar os quadros, o valor final aparece mesmo assim
    const fallback = setTimeout(() => setCurrent(value), 2100);
    return () => {
      controls.stop();
      clearTimeout(fallback);
    };
  }, [inView, reduce, value]);

  const format = new Intl.NumberFormat(locale);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{format.format(value)}</span>
      <span aria-hidden="true" className="tabular-nums">
        {format.format(current)}
      </span>
    </span>
  );
}
