// Duas fitas inclinadas atravessando a passagem entre o topo e o Sobre, rolando em
// sentidos opostos, como fita de isolamento. Só decorativas: o texto já está na página.
// O -mt-6 (em vez de -mt-14) desce as fitas o bastante para a ponta direita da vermelha,
// que sobe com a inclinação, não cobrir o "Role" na barra de baixo do topo.

export function Ticker({ words }) {
  const line = `${words.join("  ■  ")}  ■  `;

  return (
    <div aria-hidden="true" className="pointer-events-none relative z-20 -mb-14 -mt-6 overflow-hidden py-14">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-[1.6deg] scale-x-110 bg-cream-50 py-1.5 text-ink-950">
        <div className="flex w-max animate-[marquee-rev_60s_linear_infinite] whitespace-nowrap">
          <span className="label px-3 text-[12px]">{line.repeat(3)}</span>
          <span className="label px-3 text-[12px]">{line.repeat(3)}</span>
        </div>
      </div>
      <div className="relative -rotate-[2.2deg] scale-x-110 bg-red-500 py-3 text-ink-950 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]">
        <div className="flex w-max animate-[marquee_40s_linear_infinite] whitespace-nowrap">
          <span className="display px-4 text-[clamp(1.6rem,3.2vw,2.75rem)] [font-stretch:75%]">{line.repeat(2)}</span>
          <span className="display px-4 text-[clamp(1.6rem,3.2vw,2.75rem)] [font-stretch:75%]">{line.repeat(2)}</span>
        </div>
      </div>
    </div>
  );
}
