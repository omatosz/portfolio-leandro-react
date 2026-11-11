import { useEffect, useState } from "react";

// Nome do topo, letra por letra. Ao abrir, as letras embaralham e assentam da
// esquerda para a direita; ao passar o mouse, a letra estica (eixo de largura da
// fonte variável) e troca de cor. O limite de 100% cabe na coluna em qualquer
// largura de tela; acima disso a linha estourava e a última letra caía.

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&$@/<>01";

function reduced() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

export function HeroName({ lines }) {
  const full = lines.map((line) => line.text).join("");
  const [shown, setShown] = useState(() => (reduced() ? full : Array.from(full, randomGlyph).join("")));

  useEffect(() => {
    if (reduced()) {
      setShown(full);
      return undefined;
    }
    // setTimeout em vez de requestAnimationFrame: continua andando mesmo se o
    // navegador pausar os quadros da aba
    const start = performance.now();
    const settleAt = Array.from(full, (_, i) => 160 + i * 75 + Math.random() * 140);
    const end = Math.max(...settleAt) + 40;
    let timer = 0;
    const tick = () => {
      const t = performance.now() - start;
      setShown(Array.from(full, (ch, i) => (t >= settleAt[i] ? ch : randomGlyph())).join(""));
      if (t < end) timer = setTimeout(tick, 45);
      else setShown(full);
    };
    timer = setTimeout(tick, 45);
    return () => clearTimeout(timer);
  }, [full]);

  let offset = 0;
  return (
    // o nome não tem acento nem cedilha, então fica com a entrelinha mais justa
    <h1 className="display text-[clamp(5rem,15.5vw,14rem)] leading-[0.84]">
      <span className="sr-only">{lines.map((line) => line.text).join(" ")}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => {
          const first = offset;
          offset += line.text.length;
          return (
            // nowrap: a letra esticada no hover não pode empurrar a última para a linha de baixo
            <span key={li} className={`block whitespace-nowrap ${line.className ?? ""}`}>
              {Array.from(line.text).map((_, i) => (
                <span
                  key={i}
                  className={`inline-block cursor-default transition-[font-stretch,color] duration-500 ease-soft [font-stretch:62%] hover:[font-stretch:100%] ${line.hover ?? ""}`}
                >
                  {shown[first + i]}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </h1>
  );
}
