import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "../i18n/LanguageContext";
import { Glitch } from "./Glitch";
import { LanguageToggle } from "./LanguageToggle";
import chapeu from "../assets/chapeu-de-palha.png";

export const SECTIONS = ["sobre", "projetos", "trajetoria", "contato"];

export function Header({ active }) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const labels = { sobre: t.nav.about, projetos: t.nav.work, trajetoria: t.nav.journey, contato: t.nav.contact };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // menu do celular aberto: trava a rolagem e fecha com Esc
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        solid ? "border-cream-50/10 bg-ink-950/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-6 px-5 sm:h-[4.5rem] sm:px-8">
        <a href="#inicio" className="group label flex items-center gap-3 text-cream-50" aria-label={`Leandro Matos, ${t.nav.home}`}>
          {/* chapéu de palha como marca; inclina um pouco ao passar o mouse */}
          <img
            src={chapeu}
            alt=""
            width="58"
            height="32"
            className="h-7 w-auto origin-bottom transition-transform duration-500 ease-soft group-hover:-rotate-[10deg] sm:h-8"
          />
          {/* no celular o nome fica em duas linhas ao lado do chapéu; do sm em diante, uma linha só */}
          <span className="text-[12px] leading-tight tracking-[0.22em]">
            Leandro<br className="sm:hidden" /> Matos
          </span>
        </a>

        <nav aria-label={t.nav.main} className="hidden items-center gap-8 lg:flex">
          {SECTIONS.map((id) => {
            const current = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={current ? "true" : undefined}
                className={`label relative flex items-center gap-2 transition-colors duration-300 ${current ? "text-cream-50" : "text-cream-500 hover:text-cream-50"}`}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 bg-red-500 transition-transform duration-300 ${current ? "scale-100" : "scale-0"}`}
                />
                <Glitch text={labels[id]} />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <LanguageToggle id="cabecalho" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-celular"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="label border border-cream-50/25 px-3 py-2 text-cream-50 transition-colors hover:border-red-500 lg:hidden"
          >
            {open ? "×" : "Menu"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-celular"
            aria-label={t.nav.main}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
            className="h-[calc(100svh-4rem)] overflow-y-auto border-t border-cream-50/10 bg-ink-950 px-5 pb-10 pt-6 sm:h-[calc(100svh-4.5rem)] lg:hidden"
          >
            <ul>
              {SECTIONS.map((id) => (
                <li key={id} className="border-b border-cream-50/10">
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`display flex items-center justify-between py-5 text-[3.25rem] ${active === id ? "text-red-500" : "text-cream-50"}`}
                  >
                    <Glitch text={labels[id]} onMount />
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
