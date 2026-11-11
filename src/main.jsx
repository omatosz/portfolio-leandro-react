import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// fontes servidas pelo próprio site (sem chamada a serviço de terceiros)
import "@fontsource-variable/anybody/standard.css";
import "@fontsource-variable/archivo/standard.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";

import "./index.css";
import App from "./App.jsx";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
