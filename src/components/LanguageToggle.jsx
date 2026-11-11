import { motion } from "motion/react";
import { useLang } from "../i18n/LanguageContext";

// Botão PT / EN. O traço vermelho desliza até o idioma ativo; a troca dispara o
// efeito de falha em todo texto visível (ver Glitch.jsx).
export function LanguageToggle({ id = "idioma", className = "" }) {
  const { lang, setLang, t } = useLang();

  return (
    <div role="group" aria-label={t.nav.language} className={`label inline-flex items-center gap-1 ${className}`}>
      {["pt", "en"].map((code, i) => {
        const active = lang === code;
        return (
          <span key={code} className="inline-flex items-center gap-1">
            {i > 0 && (
              <span aria-hidden="true" className="text-cream-500/60">
                /
              </span>
            )}
            <button
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={active}
              aria-label={t.nav.switchTo[code]}
              className={`relative px-1.5 py-1 transition-colors duration-300 ${active ? "text-cream-50" : "text-cream-500 hover:text-cream-50"}`}
            >
              {code}
              {active && (
                <motion.span
                  layoutId={`${id}-traco`}
                  aria-hidden="true"
                  className="absolute inset-x-1 -bottom-0.5 h-0.5 bg-red-500"
                  transition={{ type: "spring", stiffness: 480, damping: 34 }}
                />
              )}
            </button>
          </span>
        );
      })}
    </div>
  );
}
