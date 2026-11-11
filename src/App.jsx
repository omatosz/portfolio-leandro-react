import { MotionConfig } from "motion/react";
import { useLang } from "./i18n/LanguageContext";
import { useActiveSection } from "./hooks/useSite";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Header, SECTIONS } from "./components/Header";
import { Hero } from "./components/Hero";
import { Journey } from "./components/Journey";
import { Ticker } from "./components/Ticker";
import { Work } from "./components/Work";

const OBSERVED = ["inicio", ...SECTIONS];

export default function App() {
  const { t } = useLang();
  const active = useActiveSection(OBSERVED);

  return (
    // reducedMotion="user": quem pede menos movimento no sistema recebe a página sem as animações de deslocamento
    <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-red-500 focus:px-4 focus:py-2 focus:text-cream-50"
      >
        {t.skip}
      </a>
      <div aria-hidden="true" className="grain" />
      <Header active={active} />
      <main id="conteudo">
        <Hero />
        <Ticker words={t.ticker} />
        <About />
        <Work />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
