import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

// Texto que "falha" e se reorganiza letra por letra. É usado na troca de idioma,
// no nome do topo ao abrir a página e nos títulos quando entram na tela.
//
// Para leitor de tela o texto final fica sempre disponível (sr-only); a versão
// embaralhada é só visual (aria-hidden).

const POOLS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&$",
  lower: "abcdefghijklmnopqrstuvwxyz",
  digit: "0123456789",
  other: "/\\<>[]{}=+*?!",
};

function poolFor(ch) {
  if (/[A-ZÀ-Ý]/.test(ch)) return POOLS.upper;
  if (/[a-zß-ÿ]/.test(ch)) return POOLS.lower;
  if (/[0-9]/.test(ch)) return POOLS.digit;
  return POOLS.other;
}

function randomChar(ch) {
  const pool = poolFor(ch);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function scramble(text) {
  return Array.from(text, (ch) => (ch === " " ? " " : randomChar(ch))).join("");
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export function Glitch({ text, as: Tag = "span", className, onMount = false, onView = false, speed = 1, ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -8% 0px" });
  const startsScrambled = (onMount || onView) && !prefersReducedMotion();

  const [display, setDisplay] = useState(() => (startsScrambled ? scramble(text) : text));
  const [glitching, setGlitching] = useState(false);

  const target = useRef(text);
  const frame = useRef(0);
  const fallback = useRef(0);
  const revealed = useRef(!onView);
  const inViewRef = useRef(false);
  inViewRef.current = inView;

  const stop = useCallback(() => {
    cancelAnimationFrame(frame.current);
    clearTimeout(fallback.current);
  }, []);

  const run = useCallback(
    (from, to) => {
      stop();
      if (prefersReducedMotion()) {
        setDisplay(to);
        setGlitching(false);
        return;
      }
      const a = Array.from(from);
      const b = Array.from(to);
      const len = Math.max(a.length, b.length, 1);
      const duration = Math.min(1100, 420 + len * 6) / speed;
      // cada letra tem a sua hora de começar a falhar e a sua hora de assentar;
      // as do começo assentam antes, o que dá a leitura da esquerda para a direita
      const plan = Array.from({ length: len }, (_, i) => {
        const settle = (i / len) * duration * 0.55 + Math.random() * duration * 0.45;
        return { settle, start: Math.random() * settle * 0.5 };
      });
      const t0 = performance.now();
      let last = -Infinity;
      setGlitching(true);

      // rede de segurança: se o navegador pausar os quadros (aba em segundo plano),
      // o texto final assenta mesmo assim
      fallback.current = setTimeout(() => {
        cancelAnimationFrame(frame.current);
        setDisplay(to);
        setGlitching(false);
      }, duration + 250);

      const tick = (now) => {
        const t = now - t0;
        if (t - last >= 45 || t >= duration) {
          last = t;
          let out = "";
          for (let i = 0; i < len; i++) {
            const fromCh = a[i] ?? "";
            const toCh = b[i] ?? "";
            const { settle, start } = plan[i];
            if (t >= settle) out += toCh;
            else if (t >= start) out += toCh === " " ? " " : randomChar(toCh || fromCh || "a");
            else out += fromCh;
          }
          setDisplay(out);
        }
        if (t < duration) {
          frame.current = requestAnimationFrame(tick);
        } else {
          clearTimeout(fallback.current);
          setDisplay(to);
          setGlitching(false);
        }
      };
      frame.current = requestAnimationFrame(tick);
    },
    [speed, stop],
  );

  // decodifica ao montar (o nome no topo)
  useEffect(() => {
    if (!onMount || !startsScrambled) return undefined;
    run(scramble(target.current), target.current);
    return stop;
    // só na montagem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // decodifica na primeira vez que entra na tela (títulos de seção)
  useEffect(() => {
    if (!onView || revealed.current || !inView) return;
    revealed.current = true;
    if (startsScrambled) run(scramble(target.current), target.current);
    else setDisplay(target.current);
  }, [inView, onView, run, startsScrambled]);

  // texto mudou (idioma ou etapa): falha do texto antigo para o novo, se estiver visível
  useEffect(() => {
    if (target.current === text) return;
    const from = target.current;
    target.current = text;
    if (!revealed.current) {
      setDisplay(prefersReducedMotion() ? text : scramble(text));
      return;
    }
    if (inViewRef.current) {
      run(from, text);
    } else {
      stop();
      setDisplay(text);
      setGlitching(false);
    }
  }, [text, run, stop]);

  useEffect(() => stop, [stop]);

  return (
    <Tag ref={ref} className={className} data-glitching={glitching ? "" : undefined} {...rest}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
