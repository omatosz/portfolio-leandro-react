import { ArrowUp } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { Glitch } from "./Glitch";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="overflow-hidden bg-ink-950">
      <div className="mx-auto max-w-[88rem] px-5 pt-16 sm:px-8">
        {/* nome cheio em tom quase igual ao fundo, ocupando a largura; fica vermelho ao passar o mouse */}
        <p
          aria-hidden="true"
          className="display cursor-default select-none whitespace-nowrap text-[16vw] leading-[0.8] text-ink-800 transition-colors duration-700 ease-soft hover:text-red-500 lg:text-[15rem]"
        >
          Leandro Matos
        </p>
      </div>
      <div className="label mx-auto mt-10 flex max-w-[88rem] flex-col gap-4 border-t border-ink-700 px-5 py-8 text-cream-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 Leandro Matos</p>
        <Glitch as="p" text={t.footer.made} />
        <a href="#inicio" className="inline-flex items-center gap-2 text-cream-300 transition-colors hover:text-red-500">
          <Glitch text={t.footer.top} />
          <ArrowUp size={13} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
