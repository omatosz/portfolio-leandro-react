import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { content } from "./content";

const LanguageContext = createContext(null);
const STORAGE_KEY = "lm-idioma";

// Primeiro idioma: o que a pessoa escolheu antes; se nunca escolheu, português para
// navegador em português e inglês para o resto.
function initialLanguage() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch {
    // armazenamento bloqueado (aba anônima, por exemplo): segue sem lembrar
  }
  const browser = typeof navigator !== "undefined" ? navigator.language || "" : "";
  return browser.toLowerCase().startsWith("pt") || browser === "" ? "pt" : "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLanguage);

  useEffect(() => {
    const t = content[lang];
    document.documentElement.lang = t.meta.lang;
    document.title = t.meta.title;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // sem armazenamento, a troca vale só para esta visita
    }
  }, [lang]);

  const toggle = useCallback(() => setLang((atual) => (atual === "pt" ? "en" : "pt")), []);
  const value = useMemo(() => ({ lang, setLang, toggle, t: content[lang] }), [lang, toggle]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang precisa estar dentro do LanguageProvider");
  return ctx;
}
